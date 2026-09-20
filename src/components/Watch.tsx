import { useEffect, useState } from "react";
import { ArrowUpRight, Clapperboard, Cpu, Play } from "lucide-react";
import { AD_VIDEO_POSTER, AD_VIDEO_SRC, APP_URL } from "../lib/constants";
import { Reveal } from "./Reveal";

type VideoState = "checking" | "ready" | "missing";

/**
 * "Watch the film" — the advertisement / demo reel.
 *
 * The film lives in public/media/signbridge-ad.mp4 and is prepared by
 * scripts/prepare-video.sh. Until that file exists the section degrades
 * gracefully: it shows the graded poster still and a short note instead
 * of an empty, broken player — so the landing page never looks unfinished.
 */
export function Watch() {
  const [state, setState] = useState<VideoState>("checking");

  /* Probe for the film once. A HEAD request is enough: if the static
     server answers 200 with a video type, the <video> can use it. */
  useEffect(() => {
    let alive = true;
    fetch(AD_VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        const ok = res.ok && (type.includes("video") || type.includes("octet-stream"));
        if (alive) setState(ok ? "ready" : "missing");
      })
      .catch(() => {
        if (alive) setState("missing");
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section
      id="watch"
      aria-labelledby="watch-heading"
      className="scroll-mt-20 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
            <Play size={13} className="fill-accent" aria-hidden="true" />
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            Watch the film
            <span aria-hidden="true" className="h-px w-8 bg-line" />
          </p>
          <h2
            id="watch-heading"
            className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            See SignBridge <span className="text-accent">move.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A short film showing the loop end to end — a sign becomes text and
            speech, a voice becomes sign, and a conversation happens across the
            gap between them.
          </p>
        </Reveal>

        {/* Film frame */}
        <Reveal delay={120} className="mt-12 lg:mt-16">
          <div className="dot-grid-fine relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-card">
            {/* Detection-frame corners */}
            <span aria-hidden="true" className="absolute left-4 top-4 z-10 h-6 w-6 border-l-2 border-t-2 border-accent/40" />
            <span aria-hidden="true" className="absolute right-4 top-4 z-10 h-6 w-6 border-r-2 border-t-2 border-accent/40" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 z-10 h-6 w-6 border-b-2 border-l-2 border-accent/40" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 z-10 h-6 w-6 border-b-2 border-r-2 border-accent/40" />

            <div className="relative aspect-video bg-bg">
              {state === "ready" ? (
                <video
                  className="absolute inset-0 h-full w-full object-contain"
                  controls
                  preload="metadata"
                  playsInline
                  poster={AD_VIDEO_POSTER}
                  aria-label="SignBridge — advertisement film"
                >
                  <source src={AD_VIDEO_SRC} type="video/mp4" />
                  Your browser does not support embedded video.{" "}
                  <a href={AD_VIDEO_SRC} className="text-accent underline">
                    Download the film
                  </a>
                  .
                </video>
              ) : (
                /* Poster still stands in until the film is published */
                <>
                  <img
                    src={AD_VIDEO_POSTER}
                    alt="Two hands mid-sign, traced with cyan light — still from the SignBridge film"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {state === "missing" && (
                    <div
                      role="note"
                      className="absolute inset-0 flex items-center justify-center bg-bg/70 backdrop-blur-[2px]"
                    >
                      <div className="mx-6 max-w-md rounded-xl border border-line bg-card/90 p-6 text-center sm:p-8">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-surface">
                          <Clapperboard size={22} className="text-accent" aria-hidden="true" />
                        </span>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                          Advertisement film
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
                          Being finalised
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          The film lands at{" "}
                          <code className="font-mono text-accent">{AD_VIDEO_SRC}</code>. Until
                          then, try the live product — the loop below is the real thing.
                        </p>
                        <a
                          href={APP_URL}
                          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors duration-200 hover:bg-accent-hover"
                        >
                          Launch SignBridge
                          <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2.5">
            {[
              { icon: Play, label: "H.264 · AAC · MP4" },
              { icon: Cpu, label: "Plays in the browser" },
              { icon: Clapperboard, label: AD_VIDEO_SRC },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                <Icon size={12} className="text-accent" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
