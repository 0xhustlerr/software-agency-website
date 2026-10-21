/**
 * A collaboration workspace concept: backlog priorities, sprint milestones,
 * product review and release planning. Illustration with sample data.
 */
import { cn } from "@/lib/utils";

function Card({ title, meta, children, className }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-md border border-line bg-surface p-3.5 shadow-frame", className)}>
      <header className="mb-2.5 flex items-center justify-between">
        <h4 className="text-[12px] font-semibold text-ink">{title}</h4>
        {meta ? <span className="font-mono text-[9.5px] text-ink-muted">{meta}</span> : null}
      </header>
      {children}
    </section>
  );
}

export function CollaborationBoard() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card title="Backlog priorities" meta="ranked together">
        <ol className="grid gap-1.5">
          {[
            ["Self-serve onboarding", "Must"],
            ["Team invitations", "Must"],
            ["Usage export", "Should"],
            ["Slack alerts", "Could"],
          ].map(([t, p], i) => (
            <li key={t} className="flex items-center gap-2 rounded-xs border border-line px-2 py-1.5 text-[10.5px]">
              <span className="w-3 font-mono text-[9px] text-ink-muted">{i + 1}</span>
              <span className="flex-1 text-ink">{t}</span>
              <span className={cn("rounded-xs px-1.5 py-0.5 text-[8.5px] font-medium", p === "Must" ? "bg-accent-soft text-accent-ink" : "bg-surface-muted text-ink-muted")}>{p}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card title="Sprint milestones" meta="sprint 4 of 6">
        <ul className="grid gap-2.5">
          {[
            ["Onboarding flow", 100],
            ["Invitations & roles", 70],
            ["Billing settings", 25],
          ].map(([t, v]) => (
            <li key={t as string}>
              <div className="flex justify-between text-[10.5px]">
                <span className="text-ink">{t}</span>
                <span className="font-mono text-[9px] text-ink-muted">{v === 100 ? "done" : `${v}%`}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-surface-muted">
                <div className={cn("h-1 rounded-full", v === 100 ? "bg-accent" : "bg-ink")} style={{ width: `${v}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Product review" meta="Thursday demo">
        <div className="rounded-xs border border-line p-2">
          <p className="text-[10.5px] font-medium text-ink">Onboarding · step 2 of 3</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            <span className="h-6 rounded-xs bg-surface-muted" />
            <span className="h-6 rounded-xs border border-accent-ink/50 bg-accent-soft" />
            <span className="h-6 rounded-xs bg-surface-muted" />
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-surface-muted text-[8px] font-semibold text-ink">F</span>
          <p className="rounded-xs bg-surface-muted px-2 py-1 text-[10px] leading-snug text-ink">Can we skip this step for invited users?</p>
        </div>
        <div className="mt-1.5 flex gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[8px] font-semibold text-on-accent">N</span>
          <p className="rounded-xs bg-surface-muted px-2 py-1 text-[10px] leading-snug text-ink">Yes — added to next sprint.</p>
        </div>
      </Card>
      <Card title="Release planning" meta="v0.4">
        <ol className="relative grid gap-2.5 pl-4">
          <span aria-hidden className="absolute top-1 bottom-1 left-[4px] w-px bg-line-strong/60" />
          {[
            ["Private beta", "released", true],
            ["Team plans", "next", false],
            ["Public launch", "planned", false],
          ].map(([t, s, done]) => (
            <li key={t as string} className="relative text-[10.5px]">
              <span className={cn("absolute top-1 -left-4 size-[9px] rounded-full border", done ? "border-accent bg-accent" : "border-line-strong bg-surface")} />
              <span className="text-ink">{t}</span>
              <span className="ml-2 font-mono text-[9px] text-ink-muted">{s}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
