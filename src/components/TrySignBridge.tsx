import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

/** Small decorative landmark cluster — echoes the tracking skeleton. */
function LandmarkCluster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className={className}>
      <g stroke="#00E5FF" strokeWidth="1.4" strokeOpacity="0.6" strokeLinecap="round">
        <line x1="30" y1="52" x2="20" y2="40" />
        <line x1="20" y1="40" x2="20" y2="16" />
        <line x1="30" y1="52" x2="30" y2="10" />
        <line x1="30" y1="52" x2="40" y2="40" />
        <line x1="40" y1="40" x2="40" y2="18" />
        <line x1="20" y1="40" x2="10" y2="32" />
        <line x1="40" y1="40" x2="50" y2="32" />
      </g>
      <g fill="#00E5FF">
        <circle cx="30" cy="52" r="3" />
        <circle cx="20" cy="40" r="2.2" />
        <circle cx="20" cy="16" r="2.2" />
        <circle cx="30" cy="10" r="2.2" />
        <circle cx="40" cy="40" r="2.2" />
        <circle cx="40" cy="18" r="2.2" />
        <circle cx="10" cy="32" r="2.2" />
        <circle cx="50" cy="32" r="2.2" />
      </g>
    </svg>
  );
}

export function TrySignBridge() {
  return (
    <section
      id="try"
      aria-labelledby="try-heading"
      className="scroll-mt-20 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="dot-grid-fine relative overflow-hidden rounded-2xl border border-line bg-card px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            {/* Soft detection-frame corners */}
            <span aria-hidden="true" className="absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-accent/40" />
            <span aria-hidden="true" className="absolute right-5 top-5 h-6 w-6 border-r-2 border-t-2 border-accent/40" />
            <span aria-hidden="true" className="absolute bottom-5 left-5 h-6 w-6 border-b-2 border-l-2 border-accent/40" />
            <span aria-hidden="true" className="absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-accent/40" />

            <LandmarkCluster className="absolute -left-6 -top-6 h-36 w-36 opacity-20 sm:h-44 sm:w-44" />
            <LandmarkCluster className="absolute -bottom-6 -right-6 h-36 w-36 rotate-180 opacity-20 sm:h-44 sm:w-44" />

            <div className="relative">
              <p className="flex items-center justify-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
                <span aria-hidden="true">07</span>
                <span aria-hidden="true" className="h-px w-8 bg-line" />
                Experience
              </p>

              <h2
                id="try-heading"
                className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl"
              >
                Experience <span className="text-accent">SignBridge</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Open the app, allow camera access, and try the two-way loop
                yourself — everything runs right here in your browser.
              </p>

              <div className="mt-10">
                <a
                  href="/app.html"
                  className="inline-flex items-center gap-2.5 rounded-md bg-accent px-8 py-4 text-base font-semibold text-bg transition-colors duration-200 hover:bg-accent-hover"
                >
                  Launch SignBridge
                  <ArrowUpRight size={19} strokeWidth={2.4} aria-hidden="true" />
                </a>
              </div>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Runs at <span className="text-accent">/app.html</span> · no download required
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}