import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  as?: "p" | "span" | "div" | "h2" | "h3";
  /** The hairline-and-node mark. Default true. */
  mark?: boolean;
  /** Draw the mark's hairline in on first paint (hero entrances). */
  drawMark?: boolean;
  className?: string;
}

/** Section kicker above an h1/h2. Write in sentence case; CSS uppercases it. */
export function Eyebrow({ children, as: Tag = "p", mark = true, drawMark = false, className }: EyebrowProps) {
  return (
    <Tag className={cn("text-eyebrow inline-flex items-center gap-2.5 text-accent-ink", className)}>
      {mark ? (
        <span aria-hidden className="inline-flex items-center">
          <span className={cn("block h-px w-5 bg-line-strong", drawMark && "nm-mark-draw")} />
          <span className="block size-[7px] rounded-full bg-accent" />
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
