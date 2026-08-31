import { Accessibility, ArrowRight, AppWindow, Cpu, MessagesSquare, ScanLine } from "lucide-react";
import { HandCanvas } from "./HandCanvas";
import { Reveal } from "./Reveal";

const BADGE_ITEMS = ["Accessibility", "Computer Vision", "Assistive Technology"];

const QUICK_POINTS = [
  { icon: AppWindow, label: "Runs entirely in the browser" },
  { icon: Cpu, label: "On-device hand-landmark vision" },
  { icon: MessagesSquare, label: "Two-way by design" },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="dot-grid relative overflow-hidden"
    >
      {/* Vignette to blend the sensor grid into the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 40%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pb-28 lg:pt-44">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              <ScanLine size={13} className="text-accent" aria-hidden="true" />
              {BADGE_ITEMS.map((item, i) => (
                <span key={item} className="inline-flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />}
                  {item}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1
              id="hero-heading"
              className="mt-7 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.35rem]"
            >
              Bridging Communication.
              <span className="mt-2 block text-accent">Breaking Barriers.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              An assistive communication platform that connects sign language and
              speech through accessible AI-powered technology.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#try"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition-colors duration-200 hover:bg-accent-hover"
              >
                Try SignBridge
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/60 px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent/60 hover:text-accent"
              >
                <Accessibility size={16} className="text-accent" aria-hidden="true" />
                Explore the Technology
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3">
              {QUICK_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-muted">
                  <Icon size={16} className="text-accent" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Visual — simulated tracker card */}
        <Reveal delay={220} className="relative">
          <div className="float-soft relative mx-auto w-full max-w-md lg:max-w-none">
            <HandCanvas />
            {/* Technology chips */}
            <div className="absolute -left-3 top-10 hidden rounded-md border border-line bg-card px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:block lg:-left-6">
              MediaPipe <span className="text-accent">Landmarker</span>
            </div>
            <div className="absolute -right-3 bottom-16 hidden rounded-md border border-line bg-card px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:block lg:-right-6">
              Web <span className="text-accent">Speech API</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Section divider */}
      <div aria-hidden="true" className="relative mx-auto h-px max-w-7xl bg-line" />
    </section>
  );
}
