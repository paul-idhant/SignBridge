import { ArrowRight, Hand, MessagesSquare, Mic } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const MODES = [
  {
    number: "01",
    icon: Hand,
    title: "Sign → Text",
    description:
      "Webcam-based hand tracking and gesture recognition detect predefined hand gestures and convert them into text — no camera image ever appears on screen, only landmark data.",
    pipeline: ["Webcam", "Hand tracking", "Gesture model", "Text output"],
  },
  {
    number: "02",
    icon: Mic,
    title: "Speech → Sign",
    description:
      "Speech recognition converts spoken words into text and presents the matching sign through an animated visual representation the other person can follow.",
    pipeline: ["Microphone", "Speech recognition", "Sign library", "Animated sign"],
  },
  {
    number: "03",
    icon: MessagesSquare,
    title: "Live Conversation",
    description:
      "Both directions run together inside one shared conversation interface, so each person simply uses the communication method that is natural to them.",
    pipeline: ["Both pipelines", "Shared interface", "Real-time loop"],
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="scroll-mt-20 border-y border-line bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="how-heading"
          index="02"
          eyebrow="How it works"
          title={
            <>
              Three modes. <span className="text-accent">One shared conversation.</span>
            </>
          }
          description="Each direction of communication runs through its own pipeline. Together they form a complete loop between sign language and speech."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {MODES.map((mode, i) => (
            <Reveal key={mode.title} delay={i * 110}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-surface transition-colors duration-300 group-hover:border-accent/50">
                    <mode.icon size={22} className="text-accent" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-medium text-muted/60 transition-colors duration-300 group-hover:text-accent"
                  >
                    {mode.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink">
                  {mode.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {mode.description}
                </p>

                {/* Pipeline */}
                <div className="mt-7 flex flex-wrap items-center gap-y-2 border-t border-line pt-5">
                  <span className="sr-only">
                    Pipeline: {mode.pipeline.join(", then ")}
                  </span>
                  {mode.pipeline.map((step, j) => (
                    <span key={step} className="flex items-center">
                      <span className="rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {step}
                      </span>
                      {j < mode.pipeline.length - 1 && (
                        <ArrowRight
                          size={12}
                          className="mx-1.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
