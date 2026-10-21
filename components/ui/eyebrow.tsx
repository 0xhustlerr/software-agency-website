import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  as?: "p" | "span" | "div" | "h2" | "h3";
  /** The hairline-and-node mark. Default true. */
  mark?: boolean;
  className?: string;
}

/** Section kicker above an h1/h2. Write in sentence case; CSS uppercases it. */
export function Eyebrow({ children, as: Tag = "p", mark = true, className }: EyebrowProps) {
  return (
    <Tag className={cn("text-eyebrow inline-flex items-center gap-2.5 text-accent-ink", className)}>
      {mark ? (
        <span aria-hidden className="inline-flex items-center">
          <span className="block h-px w-5 bg-line-strong" />
          <span className="block size-[7px] rounded-full bg-accent" />
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
