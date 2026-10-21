import type { ReactNode } from "react";
import { showPending } from "@/lib/flags";
import { cn } from "@/lib/utils";

interface PendingContentProps {
  /** What is missing, e.g. "Case study". */
  kind: string;
  title?: string;
  /** The content source that will supply it. */
  field?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Marks content awaiting supply or approval. Renders nothing in production
 * (see lib/flags.ts), so unfinished material never reaches visitors.
 */
export function PendingContent({ kind, title, field, children, className }: PendingContentProps) {
  if (!showPending) return null;
  return (
    <div
      role="note"
      className={cn(
        "grid gap-2 rounded-md border border-dashed border-line-strong p-6",
        "bg-[repeating-linear-gradient(-45deg,var(--surface-muted)_0_10px,var(--surface)_10px_20px)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[11px] leading-[18px] font-semibold tracking-[0.08em] text-ink-muted uppercase">
        <span aria-hidden className="size-[7px] rounded-full border border-line-strong" />
        {kind} · awaiting content
      </div>
      {title ? <p className="text-h4 text-ink">{title}</p> : null}
      {children ? <p className="text-body-sm text-ink-muted">{children}</p> : null}
      {field ? (
        <code className="justify-self-start rounded-xs border border-line bg-surface-raised px-2 font-mono text-xs leading-5 text-ink">
          {field}
        </code>
      ) : null}
    </div>
  );
}
