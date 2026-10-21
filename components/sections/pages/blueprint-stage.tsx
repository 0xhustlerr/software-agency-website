import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Navy stage with a faint blueprint grid, used behind interface vignettes. */
export function BlueprintStage({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "muted" }) {
  return (
    <div
      data-theme="dark"
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-md p-6 sm:p-10",
        tone === "muted" ? "bg-surface-muted" : "bg-surface",
        "bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:40px_40px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
