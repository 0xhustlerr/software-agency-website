import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  id?: string;
  /** dark = Midnight Navy section; tokens flip automatically. */
  theme?: "light" | "dark";
  /** muted = off-white ground, to separate consecutive light sections. */
  tone?: "default" | "muted";
  /** lg = 144px desktop padding, for the hero, dark statements and the final CTA. */
  spacing?: "default" | "lg" | "none";
  /** Accessible name when the section has no visible heading id. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  theme = "light",
  tone = "default",
  spacing = "default",
  className,
  containerClassName,
  children,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        "relative scroll-mt-(--header-h) overflow-hidden",
        tone === "muted" ? "bg-surface-muted" : "bg-surface",
        spacing === "lg" ? "section-y-lg" : spacing === "default" ? "section-y" : null,
        className,
      )}
      {...aria}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
