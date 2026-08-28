import {
  Contrast,
  EyeOff,
  Gauge,
  MousePointerClick,
  ScanLine,
  TriangleAlert,
  WifiOff,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PRINCIPLES = [
  {
    icon: EyeOff,
    title: "No raw camera feed",
    description: "The camera stream is never displayed inside the interface.",
  },
  {
    icon: ScanLine,
    title: "Landmarks, not video",
    description: "Only the detected 21-point hand skeleton is rendered on screen.",
  },
  {
    icon: Contrast,
    title: "High-contrast interface",
    description: "White-on-black surfaces designed for maximum legibility.",
  },
  {
    icon: MousePointerClick,
    title: "Simple controls",
    description: "Clear buttons, keyboard navigation and visible focus states.",
  },
  {
    icon: Gauge,
    title: "Lightweight prototype",
    description: "A small browser-based build — fast to load, easy to run.",
  },
  {
    icon: WifiOff,
    title: "Offline-capable features",
    description:
      "Features that need no external service can operate without internet.",
  },
];

export function Privacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="scroll-mt-20 border-y border-line bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-2">
            <SectionHeader
              id="privacy-heading"
              index="04"
              eyebrow="Privacy & Accessibility"
              title={
                <>
                  Respect for the person{" "}
                  <span className="text-accent">behind the screen.</span>
                </>
              }
              description="SignBridge is designed with accessibility and privacy in mind from the first line of code — because a communication tool must first earn the trust of the people who rely on it."
            />
            <Reveal delay={140}>
              <div className="mt-8 flex gap-3.5 rounded-lg border border-line bg-card p-5">
                <TriangleAlert
                  size={18}
                  className="mt-0.5 shrink-0 text-warning"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">An honest standard.</span>{" "}
                  These are design commitments and current behaviour of an
                  evolving prototype — we deliberately avoid absolute claims such
                  as “100% private” or “100% accurate”.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Principles grid */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 100 + Math.floor(i / 2) * 60} className="h-full">
                  <div className="flex h-full gap-4 rounded-xl border border-line bg-card p-5 transition-colors duration-300 hover:border-accent/50">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
                      <item.icon size={18} className="text-accent" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
