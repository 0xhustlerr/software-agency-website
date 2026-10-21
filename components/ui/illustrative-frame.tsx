import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IllustrativeFrameProps {
  /** Mono title in the frame bar. */
  title?: string;
  /** Visible badge. Keep "Illustrative concept" for anything that is not an approved client project. */
  label?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Product-interface presentation. Concepts always carry a visible label — never imply a real launch. */
export function IllustrativeFrame({ title, label = "Illustrative concept", caption, children, className }: IllustrativeFrameProps) {
  return (
    <figure className={cn("m-0 overflow-hidden rounded-md border border-line bg-surface-raised shadow-frame", className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-surface-muted px-4">
        <span aria-hidden className="flex gap-1.5">
          <i className="size-2 rounded-xs bg-line" />
          <i className="size-2 rounded-xs bg-line" />
          <i className="size-2 rounded-xs bg-line" />
        </span>
        <span className="flex-1 truncate font-mono text-xs font-medium text-ink-muted">{title}</span>
        <span className="rounded-xs border border-dashed border-line-strong px-1.5 text-[11px] leading-[18px] font-semibold tracking-[0.08em] whitespace-nowrap text-ink-muted uppercase">
          {label}
        </span>
      </div>
      <div className="relative">{children}</div>
      {caption ? <figcaption className="text-small border-t border-line px-4 py-3 text-ink-muted">{caption}</figcaption> : null}
    </figure>
  );
}
