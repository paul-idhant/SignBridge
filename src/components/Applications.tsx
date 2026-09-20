import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  Siren,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const FIELDS = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Classrooms where Deaf and hearing students learn side by side.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Clearer exchanges between patients and medical staff.",
  },
  {
    icon: Siren,
    title: "Emergency Communication",
    description: "Fast, direct understanding when every second counts.",
  },
  {
    icon: Plane,
    title: "Travel Assistance",
    description: "Asking, understanding and being understood on the move.",
  },
  {
    icon: Briefcase,
    title: "Workplace Communication",
    description: "More inclusive meetings and everyday collaboration.",
  },
  {
    icon: Landmark,
    title: "Public Services",
    description: "Counters, offices and help desks that everyone can use.",
  },
];

export function Applications() {
  return (
    <section
      id="applications"
      aria-labelledby="apps-heading"
      className="scroll-mt-20 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="apps-heading"
          index="05"
          eyebrow="Applications"
          title={
            <>
              Where a bridge <span className="text-accent">matters most.</span>
            </>
          }
          description="Anywhere two people communicate through different methods, SignBridge can help close the gap."
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {FIELDS.map((field, i) => (
            <li key={field.title}>
              <Reveal delay={(i % 3) * 100 + Math.floor(i / 3) * 60} className="h-full">
                <div className="group flex h-full flex-col rounded-xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/50">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface transition-colors duration-300 group-hover:border-accent/50">
                    <field.icon size={20} className="text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{field.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {field.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}

          {/* Everyday communication — wide card */}
          <li className="sm:col-span-2 lg:col-span-3">
            <Reveal delay={120}>
              <div className="group flex flex-col gap-5 rounded-xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface transition-colors duration-300 group-hover:border-accent/50">
                    <Users size={20} className="text-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      Everyday Communication
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                      Conversations with family, friends and strangers — the
                      small, ordinary moments that matter most of all.
                    </p>
                  </div>
                </div>
                <a
                  href="#try"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent/60 hover:text-accent"
                >
                  Try it now
                  <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
