import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const MEMBERS = [
  { initial: "I", name: "IDHANT", role: "Founder / Developer" },
  { initial: "F", name: "FELINA", role: "Developer / Contributor" },
];

/** Tiny landmark divider — three tracked points. */
function LandmarkDivider() {
  return (
    <svg
      viewBox="0 0 120 20"
      aria-hidden="true"
      className="mx-auto h-5 w-auto text-accent"
    >
      <line x1="8" y1="10" x2="48" y2="10" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="72" y1="10" x2="112" y2="10" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <circle cx="60" cy="10" r="3.5" fill="#050505" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="10" r="2.4" fill="currentColor" />
      <circle cx="112" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-20 border-t border-line bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="team-heading"
          index="08"
          eyebrow="Team"
          title="Built with purpose by"
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16">
          {MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 120}>
              <article className="group flex h-full flex-col items-center rounded-xl border border-line bg-card px-8 py-10 text-center transition-colors duration-300 hover:border-accent/50">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-surface font-display text-2xl font-bold text-accent transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.15)]"
                >
                  {member.initial}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-[0.12em] text-ink">
                  {member.name}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {member.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 text-center">
            <LandmarkDivider />
            <p className="mt-6 text-lg text-muted">
              Built to make communication{" "}
              <span className="font-semibold text-ink">more accessible</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
