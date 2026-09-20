import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** Technical index, e.g. "01". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading id used by aria-labelledby on the parent section. */
  id: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "flex flex-col items-center text-center" : ""}>
      <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
