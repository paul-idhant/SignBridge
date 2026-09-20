import { useEffect, useRef, useState } from "react";
import { FINGERTIPS, HAND_BONES, POSES } from "../lib/hand";

const HOLD_MS = 2300;
const MORPH_MS = 950;
const CONFIDENCE = ["0.98", "0.97", "0.99"] as const;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Simulated SignBridge tracker card.
 * Renders the 21-landmark hand skeleton exactly the way the app does —
 * landmark data only, no camera imagery — and morphs between signs.
 */
export function HandCanvas({ className = "" }: { className?: string }) {
  const boneRefs = useRef<Array<SVGLineElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (fromIdx: number, toIdx: number, k: number, time: number) => {
      const from = POSES[fromIdx];
      const to = POSES[toIdx];
      const wob = time * 0.0016;

      const pointAt = (i: number): [number, number] => {
        const [ax, ay] = from.points[i];
        const [bx, by] = to.points[i];
        if (reduceMotion) return [ax, ay];
        return [
          ax + (bx - ax) * k + Math.sin(wob + i * 1.7) * 0.9,
          ay + (by - ay) * k + Math.cos(wob * 0.85 + i * 2.3) * 0.9,
        ];
      };

      for (let i = 0; i < 21; i++) {
        const dot = dotRefs.current[i];
        if (!dot) continue;
        const [x, y] = pointAt(i);
        dot.setAttribute("cx", x.toFixed(2));
        dot.setAttribute("cy", y.toFixed(2));
      }
      HAND_BONES.forEach(([a, b], j) => {
        const line = boneRefs.current[j];
        if (!line) return;
        const [ax, ay] = pointAt(a);
        const [bx, by] = pointAt(b);
        line.setAttribute("x1", ax.toFixed(2));
        line.setAttribute("y1", ay.toFixed(2));
        line.setAttribute("x2", bx.toFixed(2));
        line.setAttribute("y2", by.toFixed(2));
      });
    };

    if (reduceMotion) {
      paint(0, 0, 0, 0);
      return;
    }

    let raf = 0;
    let poseIdx = 0;
    let phase: "hold" | "morph" = "hold";
    let phaseStart = performance.now();

    const frame = (now: number) => {
      const elapsed = now - phaseStart;
      const nextIdx = (poseIdx + 1) % POSES.length;
      let k = 0;

      if (phase === "hold") {
        if (elapsed > HOLD_MS) {
          phase = "morph";
          phaseStart = now;
          setWordIndex(nextIdx);
        }
      } else {
        const t = Math.min(elapsed / MORPH_MS, 1);
        k = easeInOutCubic(t);
        if (t >= 1) {
          phase = "hold";
          phaseStart = now;
          poseIdx = nextIdx;
        }
      }

      paint(poseIdx, nextIdx, k, now);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const first = POSES[0];

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-surface ${className}`}
      role="img"
      aria-label="Simulated SignBridge hand-tracking view. A skeleton of twenty-one landmark points forms a hand and cycles through the signs for hello, yes and peace, while an output line shows the detected word. No camera imagery is shown."
    >
      {/* Tracker header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
          <span
            aria-hidden="true"
            className="pulse-dot inline-block h-2 w-2 rounded-full bg-success"
          />
          Hand tracking · Active
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          21 landmarks
        </span>
      </div>

      {/* Canvas */}
      <div className="dot-grid-fine relative flex items-center justify-center px-6 py-8 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,229,255,0.07), transparent 72%)",
          }}
        />
        {/* Corner brackets — detection frame */}
        <span aria-hidden="true" className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-accent/50" />
        <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-accent/50" />
        <span aria-hidden="true" className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-accent/50" />
        <span aria-hidden="true" className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-accent/50" />

        <svg
          viewBox="0 0 200 240"
          aria-hidden="true"
          className="h-64 w-auto sm:h-72 lg:h-80"
        >
          <g>
            {HAND_BONES.map(([a, b], j) => (
              <line
                key={j}
                ref={(el) => {
                  boneRefs.current[j] = el;
                }}
                x1={first.points[a][0]}
                y1={first.points[a][1]}
                x2={first.points[b][0]}
                y2={first.points[b][1]}
                stroke="#00E5FF"
                strokeOpacity={0.72}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            ))}
          </g>
          <g style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.5))" }}>
            {first.points.map(([x, y], i) => (
              <circle
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                cx={x}
                cy={y}
                r={i === 0 ? 4 : FINGERTIPS.includes(i) ? 3.4 : 2.9}
                fill={FINGERTIPS.includes(i) ? "#FFFFFF" : "#050505"}
                stroke="#00E5FF"
                strokeWidth={1.7}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Output line */}
      <div className="flex items-end justify-between gap-4 border-t border-line px-4 py-3.5 sm:px-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Output · Sign → Text
          </p>
          <p className="mt-1.5 flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink">
            <span key={wordIndex} className="word-swap inline-block">
              {POSES[wordIndex].label}
            </span>
            <span aria-hidden="true" className="caret-blink inline-block h-[18px] w-[9px] bg-accent" />
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Conf <span className="text-success">{CONFIDENCE[wordIndex % CONFIDENCE.length]}</span>
        </p>
      </div>
    </figure>
  );
}
