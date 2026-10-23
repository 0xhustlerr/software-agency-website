/**
 * "Relay" seen through its product decisions rather than its dashboard (the
 * hero already shows that): a decision log, and the triage screen that one of
 * those decisions produced. Original concept with sample data — not client work.
 */
import { cn } from "@/lib/utils";

export const relayDecisions = [
  { id: "D1", title: "One queue for email, chat and forms", why: "Requests got lost between tools. One queue makes ownership visible.", area: "Product" },
  { id: "D2", title: "AI suggests the owner; a person confirms", why: "Misrouting is costly. Review keeps trust while the model earns it.", area: "AI" },
  { id: "D3", title: "Mobile is for triage, not setup", why: "People away from a desk need to act on their queue, not edit rules.", area: "Mobile" },
  { id: "D4", title: "Workspace per customer from day one", why: "Each customer's data stays isolated as accounts grow.", area: "Architecture" },
] as const;

/** The decision the triage screen illustrates; the connector lands on it. */
export const highlightedDecision = "D2";

export function RelayDecisionLog({ className, fluid = false }: { className?: string; fluid?: boolean }) {
  return (
    <div className={cn("rounded-md border border-line bg-surface-raised shadow-frame", fluid ? "p-5" : "p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className={cn("font-mono text-ink-muted", fluid ? "text-xs" : "text-[10px]")}>relay / decisions · version 1</p>
        <span className={cn("rounded-xs bg-accent-soft px-1.5 py-0.5 font-medium text-accent-ink", fluid ? "text-[11px]" : "text-[9px]")}>4 decided</span>
      </div>
      <ol className={cn("mt-3 grid", fluid ? "gap-2" : "gap-1.5")}>
        {relayDecisions.map((d) => {
          const on = d.id === highlightedDecision;
          return (
            <li
              key={d.id}
              data-decision={d.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-sm border",
                fluid ? "px-3.5 py-3" : "px-3 py-2.5",
                on ? "border-accent-ink/60 bg-surface" : "border-line",
              )}
            >
              <span className={cn("font-mono", fluid ? "pt-0.5 text-xs" : "pt-px text-[10px]", on ? "text-accent-ink" : "text-ink-muted")}>{d.id}</span>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className={cn("leading-snug font-medium text-ink", fluid ? "text-[0.9375rem]" : "text-[12px]")}>{d.title}</p>
                  <span className={cn("shrink-0 rounded-xs border border-line px-1.5 font-mono text-ink-muted", fluid ? "text-[10px] leading-5" : "text-[8.5px] leading-4")}>
                    {d.area}
                  </span>
                </div>
                <p className={cn("mt-1 leading-snug text-ink-muted", fluid ? "text-[0.8125rem]" : "text-[10px]")}>
                  <span className="text-ink">Why: </span>
                  {d.why}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Phone triage screen: the AI suggests an owner and a person confirms it (decision D2). */
export function RelayTriagePhone({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[24px] border border-line-strong/50 bg-surface p-1.5 shadow-frame", className)}>
      <div className="overflow-hidden rounded-[19px] border border-line bg-surface-muted">
        <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1 font-mono text-[8px] text-ink-muted">
          <span>9:41</span>
          <span className="h-1 w-8 rounded-full bg-line" />
          <span>●●</span>
        </div>
        <div className="px-3.5 pt-1.5 pb-3.5">
          <p className="font-mono text-[8.5px] text-ink-muted">‹ Queue · RQ-2041</p>
          <p className="font-display mt-1.5 text-[14px] leading-tight font-semibold tracking-[-0.01em] text-ink">Billing address change</p>
          <p className="mt-0.5 text-[8.5px] text-ink-muted">via email · 4 min ago</p>
          <div className="mt-2.5 grid gap-1 rounded-sm border border-line bg-surface p-2">
            <span className="h-1.5 w-[92%] rounded-full bg-line" />
            <span className="h-1.5 w-[78%] rounded-full bg-line" />
            <span className="h-1.5 w-[55%] rounded-full bg-line" />
          </div>
          <div data-suggestion className="mt-2.5 rounded-sm border border-accent-ink/50 bg-accent-soft p-2">
            <p className="flex items-center justify-between text-[8.5px] text-accent-ink">
              Suggested owner
              <span className="rounded-xs border border-accent-ink/50 px-1 font-mono text-[7.5px]">AI</span>
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-ink">Billing team</p>
            <p className="text-[8px] text-ink-muted">Matched: billing · address</p>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <span className="rounded-sm bg-action py-1.5 text-center text-[9px] font-semibold text-on-action">Confirm</span>
            <span className="rounded-sm border border-line-strong py-1.5 text-center text-[9px] font-medium text-ink">Reassign</span>
          </div>
        </div>
      </div>
    </div>
  );
}
