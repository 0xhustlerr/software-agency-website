import type { ProcessStep } from "@/content/types";
import { cn } from "@/lib/utils";

interface ProcessRailProps {
  steps: ProcessStep[];
  /** Step marked with the filled mint node. */
  active?: number;
  className?: string;
}

/** Numbered stages joined by one connector line. Horizontal from lg, vertical below. */
export function ProcessRail({ steps, active = 0, className }: ProcessRailProps) {
  return (
    <ol
      className={cn("grid grid-cols-1 lg:grid-cols-(--rail-cols)", className)}
      style={{ ["--rail-cols" as string]: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className="relative pb-10 pl-12 lg:pb-0 lg:pl-0 lg:pt-12 lg:pr-6">
            {/* connector */}
            <span
              aria-hidden
              className={cn(
                "absolute bg-line-strong",
                "top-0 bottom-0 left-[7px] w-px lg:top-[7px] lg:bottom-auto lg:left-0 lg:h-px lg:w-auto",
                last ? "hidden lg:block lg:right-auto lg:w-4" : "lg:right-0",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute top-0 left-0 size-[15px] rounded-full border",
                i === active ? "border-accent bg-accent" : "border-ink bg-surface",
              )}
            />
            <span className="text-mono mb-2 block text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-h4 mb-2">{step.title}</h3>
            <p className="text-body-sm text-ink-muted">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
