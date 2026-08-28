import { AudioLines, Hand, MessagesSquare, Mic } from "lucide-react";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const MODES = [
  { icon: Hand, label: "Sign → Text" },
  { icon: Mic, label: "Speech → Sign" },
  { icon: MessagesSquare, label: "Live Conversation" },
];

/** Arrowhead markers shared by both connectors. */
function ArrowDefs() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        <marker
          id="sb-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#00E5FF" strokeWidth="1.6" />
        </marker>
      </defs>
    </svg>
  );
}

/** One animated data-flow connector; `reverse` flips direction. */
function Connector({ label, reverse = false }: { label: string; reverse?: boolean }) {
  return (
    <div className="relative h-14 min-w-10 flex-1" aria-hidden="true">
      <svg
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <line
          x1={reverse ? 96 : 4}
          y1={14}
          x2={reverse ? 4 : 96}
          y2={14}
          stroke="#00E5FF"
          strokeOpacity={0.55}
          strokeWidth={1.5}
          className="flow-dash"
          markerEnd="url(#sb-arrow)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-[26px] whitespace-nowrap rounded border border-line bg-surface px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:block">
        {label}
      </span>
    </div>
  );
}

/** Visual loop: person signing ⇄ SignBridge ⇄ person speaking. */
function CommunicationLoop() {
  return (
    <div className="relative h-full rounded-xl border border-line bg-card p-6 sm:p-8">
      <ArrowDefs />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        The SignBridge loop
      </p>

      <div className="mt-8 flex items-center gap-2 sm:gap-3">
        {/* Sign side */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-surface sm:h-[4.5rem] sm:w-[4.5rem]">
            <Hand size={26} className="text-accent" aria-hidden="true" />
          </span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Sign
            <br className="sm:hidden" /> language
          </span>
        </div>

        <Connector label="Sign → Text" />

        {/* SignBridge core */}
        <div className="flex shrink-0 flex-col items-center gap-2.5 rounded-lg border border-accent/35 bg-surface px-4 py-4 shadow-[0_0_28px_rgba(0,229,255,0.1)] sm:px-5">
          <Logo size={30} withWordmark={false} />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            SignBridge
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <AudioLines size={11} aria-hidden="true" /> Two-way AI
          </span>
        </div>

        <Connector label="Speech → Sign" reverse />

        {/* Speech side */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-surface sm:h-[4.5rem] sm:w-[4.5rem]">
            <AudioLines size={26} className="text-accent" aria-hidden="true" />
          </span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Spoken
            <br className="sm:hidden" /> language
          </span>
        </div>
      </div>

      <p className="mt-8 border-t border-line pt-5 text-sm leading-relaxed text-muted">
        One shared loop — each person communicates in the way that works for
        them, and SignBridge carries meaning in both directions.
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="about-heading"
          index="01"
          eyebrow="About SignBridge"
          title={
            <>
              Two ways to communicate.{" "}
              <span className="text-accent">One bridge between them.</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* Problem / solution copy */}
          <div className="flex flex-col justify-center gap-10">
            <Reveal delay={80}>
              <div className="border-l-2 border-accent pl-5">
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">
                  The barrier
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  Communication becomes difficult when two people do not share the
                  same communication method. Conversations between sign-language
                  users and speech users often fall back to typing, writing on
                  paper, or relying on a third party — slow, impersonal, and
                  never fully natural.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="border-l-2 border-accent pl-5">
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">
                  The answer
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  SignBridge provides <strong className="font-semibold text-ink">two-way communication</strong> in
                  a single lightweight browser interface — reading hand gestures
                  on one side and producing sign visuals on the other.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {MODES.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      <Icon size={14} className="text-accent" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Loop diagram */}
          <Reveal delay={140}>
            <CommunicationLoop />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
