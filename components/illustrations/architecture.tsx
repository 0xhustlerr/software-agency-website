/**
 * Architecture and delivery-pipeline fragments for the engineering section.
 * Illustrative: a typical shape for a startup SaaS product, with sample data.
 */
import { cn } from "@/lib/utils";

function Node({ label, meta, on }: { label: string; meta?: string; on?: boolean }) {
  return (
    <div className={cn("rounded-sm border bg-surface-raised px-3 py-2", on ? "border-accent-ink/60" : "border-line")}>
      <p className="text-[11px] font-medium text-ink">{label}</p>
      {meta ? <p className="font-mono text-[9px] text-ink-muted">{meta}</p> : null}
    </div>
  );
}

function Tier({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[72px_1fr] items-center gap-3">
      <p className="font-mono text-[10px] tracking-wide text-ink-muted uppercase">{title}</p>
      <div className="grid grid-cols-3 gap-2">{children}</div>
    </div>
  );
}

function Link() {
  return (
    <div aria-hidden className="grid grid-cols-[72px_1fr] gap-3">
      <span />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="mx-auto block h-4 w-px bg-line-strong/70" />
        ))}
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="rounded-md border border-line bg-surface-muted p-5 shadow-frame">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink-muted">architecture / overview</p>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
          <i className="size-1.5 rounded-full bg-accent" /> healthy
        </span>
      </div>
      <div className="grid gap-1">
        <Tier title="Clients">
          <Node label="Web app" meta="Next.js" />
          <Node label="Mobile web" meta="responsive" />
          <Node label="Admin" meta="Next.js" />
        </Tier>
        <Link />
        <Tier title="API">
          <Node label="Auth & roles" meta="OIDC" />
          <Node label="Product API" meta="REST · typed" on />
          <Node label="Webhooks" meta="signed" />
        </Tier>
        <Link />
        <div className="relative rounded-sm border border-dashed border-line-strong/70 p-2 pt-5">
          <span className="absolute -top-2 left-3 bg-surface-muted px-1.5 font-mono text-[9px] text-ink-muted">cloud · private network</span>
          <div className="grid gap-1">
            <Tier title="Services">
              <Node label="Workflows" meta="Node.js" />
              <Node label="AI service" meta="Python" on />
              <Node label="Jobs queue" meta="retries" />
            </Tier>
            <Link />
            <Tier title="Data">
              <Node label="PostgreSQL" meta="primary + replica" />
              <Node label="Object storage" meta="encrypted" />
              <Node label="Audit log" meta="append-only" />
            </Tier>
          </div>
        </div>
      </div>
    </div>
  );
}

const checks = [
  { name: "Lint & format", meta: "12s" },
  { name: "Type check", meta: "21s" },
  { name: "Tests", meta: "214 passed" },
  { name: "Security scan", meta: "0 issues" },
  { name: "Preview deploy", meta: "ready" },
];

export function PipelineCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-md border border-line bg-surface-raised p-3.5 shadow-frame", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink">PR #128 · onboarding flow</p>
        <span className="rounded-xs bg-accent-soft px-1.5 py-0.5 text-[9px] font-medium text-accent-ink">checks passed</span>
      </div>
      <ul className="mt-3 grid gap-1.5">
        {checks.map((c) => (
          <li key={c.name} className="flex items-center gap-2 text-[10.5px]">
            <svg viewBox="0 0 12 12" className="size-3 shrink-0" aria-hidden>
              <circle cx="6" cy="6" r="5.5" className="fill-accent" />
              <path d="M3.5 6.2 5.2 7.8 8.6 4.4" fill="none" className="stroke-on-accent" strokeWidth="1.4" />
            </svg>
            <span className="flex-1 text-ink">{c.name}</span>
            <span className="font-mono text-[9.5px] text-ink-muted">{c.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
