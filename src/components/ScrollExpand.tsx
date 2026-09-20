import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MoveDown } from "lucide-react";

/**
 * ScrollExpand — a media frame that expands to fullscreen as you scroll.
 *
 * The component renders a tall spacer; a viewport-sized stage sticks inside it
 * while scroll progress drives the frame from a small rounded card to a full
 * cinematic takeover, then hands the stage to `children` (revealed overlay).
 *
 * Progress is smoothed every frame (lerp) so the motion feels fluid even when
 * the user scrolls in jerky steps. Honors `prefers-reduced-motion` by rendering
 * the fully-expanded frame with no scroll animation.
 */
export interface ScrollExpandProps {
  /** Media shown inside the expanding frame (image URL). */
  src?: string;
  alt?: string;
  /** Small caption chip inside the frame while collapsed. Fades out on expand. */
  title?: string;
  /** Scroll hint label. Fades out on expand. */
  scrollHint?: string;
  /** Content revealed once the frame is fully open. */
  children?: ReactNode;
  /** Extra scale on the media — a subtle Ken-Burns push while expanding. */
  mediaZoom?: number;
  /** Collapsed frame size, as % of the viewport. */
  startWidth?: number;
  startHeight?: number;
  /** Collapsed size on small screens (≤ 640px) — keeps the frame thumb-friendly on phones. */
  startWidthMobile?: number;
  startHeightMobile?: number;
  /** Corner radius collapsed → expanded, px. */
  startRadius?: number;
  endRadius?: number;
  /** Scroll length of the expansion, in viewport heights. */
  scrollDistance?: number;
  /** Extra scroll spent fully expanded, in viewport heights. */
  holdDistance?: number;
  /** 0–1 — per-frame lerp toward the scroll target. Higher = snappier. */
  smoothing?: number;
  /** 0–1 — scrim darkness behind the overlay content when open. */
  overlayScrim?: number;
  /** Drive progress from the page scroll (default) or an internal scroller. */
  useWindowScroll?: boolean;
  /** Render the frame fully expanded with no animation. */
  enabled?: boolean;
  /** Run the animation even when the OS asks for reduced motion. */
  forceMotion?: boolean;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ScrollExpand({
  src,
  alt = "",
  title,
  scrollHint = "Scroll inside the frame",
  children,
  mediaZoom = 1,
  startWidth = 42,
  startHeight = 58,
  startWidthMobile = 64,
  startHeightMobile = 44,
  startRadius = 24,
  endRadius = 0,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = true,
  enabled = true,
  forceMotion = true,
}: ScrollExpandProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef(0);
  const currentRef = useRef(0);

  /** Phones get their own collapsed frame size (see startWidthMobile). */
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const sw = isCompact ? startWidthMobile : startWidth;
  const sh = isCompact ? startHeightMobile : startHeight;

  /** Paint one progress value (0 = collapsed card, 1 = fullscreen). */
  const writeStyles = useCallback(
    (p: number) => {
      const e = easeInOutCubic(clamp01(p));

      const out = clamp01(p / 0.18); // caption fades out early
      const fadeIn = clamp01((p - 0.78) / 0.22); // overlay content arrives late
      const appear = clamp01(p / 0.16); // frame materializes out of the black

      if (frameRef.current) {
        frameRef.current.style.width = `${sw + (100 - sw) * e}%`;
        frameRef.current.style.height = `${sh + (100 - sh) * e}%`;
        frameRef.current.style.borderRadius = `${startRadius + (endRadius - startRadius) * e}px`;
        frameRef.current.style.opacity = `${appear}`;
        frameRef.current.style.transform = `scale(${0.92 + 0.08 * appear})`;
      }
      if (mediaRef.current) {
        mediaRef.current.style.transform = `scale(${mediaZoom * (1 + 0.06 * e)})`;
      }

      if (ringRef.current) ringRef.current.style.opacity = `${1 - e}`;
      if (captionRef.current) captionRef.current.style.opacity = `${1 - out}`;
      if (hintRef.current) {
        // Lives on the black stage — gone as soon as scrolling starts.
        hintRef.current.style.opacity = `${1 - clamp01(p / 0.08)}`;
      }
      if (scrimRef.current) scrimRef.current.style.opacity = `${overlayScrim * fadeIn}`;
      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${fadeIn}`;
        overlayRef.current.style.transform = `translateY(${(1 - fadeIn) * 26}px)`;
      }
    },
    [sw, sh, startRadius, endRadius, mediaZoom, overlayScrim],
  );

  /** A fresh load always starts the intro from the top, fully collapsed. */
  useLayoutEffect(() => {
    if (!enabled || !useWindowScroll) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // Respect deep links like /#team — only reset when there's no hash.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [enabled, useWindowScroll]);

  /** Track scroll position → target progress. */
  useEffect(() => {
    if (!enabled || (!forceMotion && prefersReducedMotion())) return;

    const update = () => {
      if (useWindowScroll) {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const vh = window.innerHeight || 1;
        targetRef.current = clamp01(-wrapper.getBoundingClientRect().top / (scrollDistance * vh));
      } else {
        const c = containerRef.current;
        if (!c) return;
        const h = c.clientHeight || 1;
        targetRef.current = clamp01(c.scrollTop / (scrollDistance * h));
      }
    };

    update();

    if (useWindowScroll) {
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    const c = containerRef.current;
    c?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      c?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, useWindowScroll, scrollDistance]);

  /** Internal-scroller mode: size the spacer in px from the container. */
  useLayoutEffect(() => {
    if (useWindowScroll) return;
    const c = containerRef.current;
    const w = wrapperRef.current;
    if (!c || !w) return;
    const h = c.clientHeight || 1;
    const reduced = !enabled || (!forceMotion && prefersReducedMotion());
    w.style.height = `${Math.round((reduced ? 1 : scrollDistance + holdDistance + 1) * h)}px`;
  }, [useWindowScroll, scrollDistance, holdDistance, enabled]);

  /** Animation loop with per-frame smoothing (or static when disabled). */
  useLayoutEffect(() => {
    if (!enabled) {
      // Explicit opt-out: render the stage fully open.
      targetRef.current = 1;
      currentRef.current = 1;
      writeStyles(1);
      return;
    }
    if (!forceMotion && prefersReducedMotion()) {
      // Accessibility opt-out: skip straight to the fully-open end state.
      targetRef.current = 1;
      currentRef.current = 1;
      writeStyles(1);
      return;
    }

    let raf = 0;
    let running = false;
    const step = smoothing <= 0 ? 1 : Math.min(1, Math.max(0.001, smoothing));

    // Pre-paint: apply current progress so the first frame is never wrong
    // (starts as pure black — frame hidden — before any animation frame runs).
    writeStyles(currentRef.current);

    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;
      const next = Math.abs(target - cur) < 0.0004 ? target : cur + (target - cur) * step;
      if (next !== cur) {
        currentRef.current = next;
        writeStyles(next);
      }
      if (next === target) {
        running = false; // settled — sleep until the next scroll saves battery
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    const c = useWindowScroll ? null : containerRef.current;
    c?.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      c?.removeEventListener("scroll", kick);
      cancelAnimationFrame(raf);
    };
  }, [enabled, forceMotion, smoothing, writeStyles, useWindowScroll]);

  const frame = (
    <div
      ref={frameRef}
      className="absolute overflow-hidden bg-card"
      style={{
        left: "50%",
        top: "50%",
        translate: "-50% -50%",
        width: `${sw}%`,
        height: `${sh}%`,
        borderRadius: startRadius,
        opacity: 0,
        transform: "scale(0.92)",
        boxShadow: "0 40px 120px -32px rgba(0, 0, 0, 0.9)",
        willChange: "width, height, border-radius, opacity, transform",
      }}
    >
      {src ? (
        <img
          ref={mediaRef}
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `scale(${mediaZoom})`, willChange: "transform" }}
        />
      ) : null}

      {/* Accent glow ring — visible while collapsed, gone when open */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          border: "1px solid color-mix(in srgb, var(--accent) 28%, transparent)",
          boxShadow: "0 0 80px -20px color-mix(in srgb, var(--accent) 30%, transparent)",
        }}
      />

      {/* Scrim under the overlay content */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: 0 }}
      />

      {/* Overlay content — revealed when fully open */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: 0 }}
      >
        {children}
      </div>

      {title ? (
        <div
          ref={captionRef}
          className="absolute bottom-4 left-4 rounded border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:bottom-5 sm:left-5"
        >
          {title}
        </div>
      ) : null}
    </div>
  );

  /** The scroll hint lives on the black stage, not on the frame. */
  const hint = scrollHint ? (
    <div
      ref={hintRef}
      className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70"
    >
      <span>{scrollHint}</span>
      <MoveDown size={15} className="animate-bounce text-accent" aria-hidden="true" />
    </div>
  ) : null;

  if (!enabled) {
    return (
      <div className="se-stage relative w-full" style={{ height: "100%", minHeight: 320 }}>
        {frame}
        {hint}
      </div>
    );
  }

  if (!useWindowScroll) {
    return (
      <div ref={containerRef} className="relative w-full overflow-y-auto overflow-x-hidden" style={{ height: "100%" }}>
        <div ref={wrapperRef} style={{ height: `${(scrollDistance + holdDistance) * 100 + 100}%` }}>
          <div className="sticky top-0 h-full w-full overflow-hidden">{frame}{hint}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${(scrollDistance + holdDistance) * 100 + 100}vh` }}
    >
      <div className="se-stage se-enter sticky top-0 w-full overflow-hidden">{frame}{hint}</div>
    </div>
  );
}
