import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  heading: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  size?: "display" | "h1" | "h2";
  id?: string;
  className?: string;
}

/** Eyebrow → heading → lead, spaced per the design system (space-3, space-6). */
export function SectionHeading({ eyebrow, heading, lead, as: H = "h2", size = "h2", id, className }: SectionHeadingProps) {
  const sizeClass = size === "display" ? "text-display" : size === "h1" ? "text-h1" : "text-h2";
  return (
    <div className={cn("flex flex-col", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <H id={id} className={cn(sizeClass, "text-ink")}>
        {heading}
      </H>
      {lead ? <p className="text-lead mt-6 max-w-(--measure) text-ink-muted">{lead}</p> : null}
    </div>
  );
}
