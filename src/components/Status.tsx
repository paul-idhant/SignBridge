import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const DEMONSTRATES = [
  "Two-way sign ⇄ speech communication concept",
  "Real-time webcam hand-landmark rendering",
  "A working speech-to-sign pipeline",
  "An accessible, high-contrast interface",
];

const BOUNDARIES = [
  "Controlled vocabulary of gestures and words",
  "Predefined gesture set — no open vocabulary",
  "Not a complete sign-language interpreter",
  "Accuracy varies with lighting and conditions",
];

export function Status() {
  return (
    <section
      id="status"
      aria-labelledby="status-heading"
      className="scroll-mt-20 border-y border-line bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="status-heading"
          index="06"
          eyebrow="Current status"
          title={
            <>
              Where SignBridge <span className="text-accent">stands today.</span>
            </>
          }
        />

        <Reveal delay={100}>
          <div className="mt-12 flex flex-col gap-10 rounded-xl border border-line bg-card p-8 sm:p-10 lg:mt-16 lg:flex-row lg:gap-14">
            {/* Position statement */}
            <div className="lg:w-2/5">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-warning/40 bg-warning/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-warning">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warning" />
                Prototype / MVP
              </p>
              <h3 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight text-ink">
                A demonstration of concept —{" "}
                <span className="text-accent">presented honestly.</span>
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The current version of SignBridge uses a{" "}
                <strong className="font-semibold text-ink">controlled vocabulary</strong> and{" "}
                <strong className="font-semibold text-ink">predefined gestures</strong>. It
                exists to demonstrate the concept of two-way sign and speech
                communication — not to function as a complete sign-language
                interpreter.
              </p>
            </div>

            {/* Two honest lists */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:w-3/5">
              <div className="rounded-lg border border-line bg-surface p-6">
                <h4 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-success">
                  <Check size={14} aria-hidden="true" />
                  What it demonstrates
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {DEMONSTRATES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6">
                <h4 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-error">
                  <X size={14} aria-hidden="true" />
                  Current boundaries
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {BOUNDARIES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <X size={15} className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
