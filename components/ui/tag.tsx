import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-xs border border-line bg-surface px-2 font-mono text-xs leading-[22px] font-medium text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
