import ProfileCard from "./ProfileCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * "Built with purpose by" — the founding team.
 * Contact buttons open each member's Instagram in a new tab.
 * Photos live in  public/team/  (idhant.jpg, felina.jpg).
 */
const MEMBERS = [
  {
    name: "IDHANT",
    title: "Founder / Developer",
    handle: "paul_idhant",
    status: "15 · Riverstone International School",
    photo: "/team/idhant.jpg",
    contactUrl: "https://www.instagram.com/paul_idhant/",
    // Cyan glow, tuned per-card so the two glows don't look copy-pasted
    glow: "rgba(0, 229, 255, 0.45)",
  },
  {
    name: "FELINA",
    title: "Co-Founder / Designer",
    handle: "h.doungelll",
    status: "15 · Riverstone International School",
    photo: "/team/felina.jpg",
    contactUrl: "https://www.instagram.com/h.doungelll/",
    glow: "rgba(77, 208, 225, 0.4)",
  },
] as const;

/** Tiny landmark divider — three tracked points. */
function LandmarkDivider() {
  return (
    <svg
      viewBox="0 0 120 20"
      aria-hidden="true"
      className="mx-auto h-5 w-auto text-accent"
    >
      <line
        x1="8"
        y1="10"
        x2="48"
        y2="10"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <line
        x1="72"
        y1="10"
        x2="112"
        y2="10"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <circle
        cx="60"
        cy="10"
        r="3.5"
        fill="#050505"
        stroke="currentColor"
        strokeWidth="1.5"
      />
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
      className="scroll-mt-20 overflow-hidden border-t border-line bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="team-heading"
          index="08"
          eyebrow="Team"
          title="Built with purpose by"
          align="center"
        />

        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-10 sm:mt-16 sm:gap-8 lg:flex-row lg:items-start">
          {MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 120}>
              <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                status={member.status}
                avatarUrl={member.photo}
                contactText="Contact"
                showUserInfo
                enableTilt
                enableMobileTilt
                behindGlowEnabled
                behindGlowColor={member.glow}
                behindGlowSize="55%"
                innerGradient="linear-gradient(145deg, rgba(0,229,255,0.16) 0%, rgba(0,59,77,0.35) 100%)"
                onContactClick={() =>
                  window.open(member.contactUrl, "_blank", "noopener,noreferrer")
                }
              />
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
