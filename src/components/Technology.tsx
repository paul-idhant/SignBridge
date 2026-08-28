import {
  Braces,
  Code2,
  Cpu,
  Mic,
  Palette,
  PenTool,
  ScanLine,
  Volume2,
} from "lucide-react";
import { FINGERTIPS, HAND_BONES, POSES } from "../lib/hand";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const STACK = [
  {
    icon: Code2,
    name: "HTML",
    tag: "Structure",
    description: "Semantic, accessible markup for the entire interface.",
  },
  {
    icon: Palette,
    name: "CSS",
    tag: "Presentation",
    description: "High-contrast dark theme and a fully responsive layout.",
  },
  {
    icon: Braces,
    name: "JavaScript",
    tag: "Logic",
    description: "Gesture logic, application state and interaction.",
  },
  {
    icon: ScanLine,
    name: "MediaPipe Hand Landmarker",
    tag: "Computer vision",
    description: "Detects 21 hand landmarks per frame, in real time.",
  },
  {
    icon: Mic,
    name: "Web Speech API",
    tag: "Recognition",
    description: "Converts spoken input into text within the browser.",
  },
  {
    icon: Volume2,
    name: "Speech Synthesis API",
    tag: "Voice output",
    description: "Speaks recognised signs aloud for the listener.",
  },
  {
    icon: PenTool,
    name: "Canvas Rendering",
    tag: "Visualisation",
    description: "Draws the landmark skeleton, frame by frame.",
  },
  {
    icon: Cpu,
    name: "Browser-based Vision",
    tag: "No install",
    description: "Computer vision with no native code or downloads.",
  },
];

/** Static landmark skeleton — how the app renders a hand instead of raw video. */
function StaticHand() {
  const pose = POSES[0];
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className="h-44 w-auto sm:h-48">
      <g>
        {HAND_BONES.map(([a, b], j) => (
          <line
            key={j}
            x1={pose.points[a][0]}
            y1={pose.points[a][1]}
            x2={pose.points[b][0]}
            y2={pose.points[b][1]}
            stroke="#00E5FF"
            strokeOpacity={0.6}
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </g>
      <g style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.4))" }}>
        {pose.points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 0 ? 4 : FINGERTIPS.includes(i) ? 3.2 : 2.7}
            fill={FINGERTIPS.includes(i) ? "#FFFFFF" : "#050505"}
            stroke="#00E5FF"
            strokeWidth={1.6}
          />
        ))}
      </g>
    </svg>
  );
}

export function Technology() {
  return (
    <section
      id="technology"
      aria-labelledby="tech-heading"
      className="scroll-mt-20 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="tech-heading"
          index="03"
          eyebrow="Technology"
          title={
            <>
              Browser-native, <span className="text-accent">end to end.</span>
            </>
          }
          description="SignBridge is assembled entirely from standard web technologies — the same building blocks that make it lightweight, portable and easy to run anywhere a modern browser exists."
        />

        {/* Stack grid */}
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STACK.map((tech, i) => (
            <li key={tech.name}>
              <Reveal delay={(i % 4) * 90} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors duration-300 hover:border-accent/50">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface">
                      <tech.icon size={20} className="text-accent" aria-hidden="true" />
                    </span>
                    <span className="rounded border border-line bg-surface px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {tech.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-ink">{tech.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{tech.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* On-device panel */}
        <Reveal delay={120}>
          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-card lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">
                On-device by design
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The camera never becomes the interface.{" "}
                <span className="text-accent">The data does.</span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Hand landmarks are processed on the user's device{" "}
                <strong className="font-semibold text-ink">where possible</strong>, and the
                interface renders a skeleton of the detected landmarks rather
                than the raw camera feed. Recognised words are then spoken,
                signed back, or logged — all inside the same lightweight web
                page.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {["21 points / hand", "On-device processing", "No raw feed on screen"].map(
                  (chip) => (
                    <li
                      key={chip}
                      className="rounded border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      <span className="text-accent">{chip.split(" ")[0]}</span>{" "}
                      {chip.split(" ").slice(1).join(" ")}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="dot-grid-fine relative flex flex-col items-center justify-center border-t border-line bg-surface px-8 py-10 lg:border-l lg:border-t-0">
              <StaticHand />
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Detected landmark skeleton
                <span className="text-accent"> · </span>
                as rendered by the interface
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
