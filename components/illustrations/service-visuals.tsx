/**
 * Small interface vignettes, one per core service. Decorative (aria-hidden by
 * the caller); built from tokens so they read in light and dark sections.
 */
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-md border border-line bg-surface p-4 shadow-frame", className)}>{children}</div>;
}

function Chip({ children, on }: { children: React.ReactNode; on?: boolean }) {
  return (
    <div className={cn("rounded-sm border px-2.5 py-2 text-[11px] font-medium", on ? "border-accent-ink/40 bg-accent-soft text-ink" : "border-line bg-surface text-ink")}>
      {children}
    </div>
  );
}

function MvpVisual() {
  const cols = [
    { t: "Version 1", items: ["Sign up", "Create project", "Invite teammate"], on: true },
    { t: "Next", items: ["Templates", "Comments"] },
    { t: "Later", items: ["Integrations"] },
  ];
  return (
    <Panel>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink-muted">scope / first release</p>
        <span className="rounded-xs bg-action px-1.5 py-0.5 font-mono text-[9px] text-on-action">v1</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c) => (
          <div key={c.t} className={cn("grid content-start gap-1.5 rounded-sm p-1.5", c.on ? "bg-surface-muted" : "")}>
            <p className="px-0.5 text-[10px] font-semibold text-ink-muted">{c.t}</p>
            {c.items.map((i) => (
              <Chip key={i} on={c.on}>
                {i}
              </Chip>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CustomVisual() {
  const steps = ["Quote", "Approve", "Schedule", "Invoice"];
  return (
    <Panel>
      <p className="mb-4 font-mono text-[10px] text-ink-muted">workflow / field service</p>
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className={cn("rounded-sm border px-2.5 py-2 text-[11px] font-medium text-ink", i === 2 ? "border-accent-ink/50 bg-accent-soft" : "border-line bg-surface")}>{s}</div>
            {i < steps.length - 1 ? (
              <span className="relative mx-1 h-px flex-1 bg-line-strong">
                <i className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-accent" />
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Jobs this week", "42"],
          ["Awaiting approval", "6"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-sm border border-line px-2.5 py-2">
            <p className="text-[10px] text-ink-muted">{l}</p>
            <p className="font-display text-[16px] font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SaasVisual() {
  const ws = [
    { n: "Design team", p: "Team", s: "12 seats", on: true },
    { n: "Sales", p: "Starter", s: "3 seats" },
    { n: "Customer success", p: "Business", s: "48 seats" },
  ];
  return (
    <Panel>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink-muted">admin / workspaces</p>
        <span className="text-[10px] text-ink-muted">Billing · Roles · SSO</span>
      </div>
      <div className="overflow-hidden rounded-sm border border-line">
        {ws.map((w, i) => (
          <div key={w.n} className={cn("flex items-center gap-2.5 px-3 py-2.5", i > 0 && "border-t border-line")}>
            <span className={cn("grid size-6 place-items-center rounded-xs text-[9px] font-bold", w.on ? "bg-accent text-on-accent" : "bg-surface-muted text-ink")}>{w.n[0]}</span>
            <span className="flex-1 text-[11px] font-medium text-ink">{w.n}</span>
            <span className="rounded-xs border border-line px-1.5 py-0.5 text-[9px] text-ink-muted">{w.p}</span>
            <span className="w-14 text-right font-mono text-[9px] text-ink-muted">{w.s}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AiVisual() {
  return (
    <Panel>
      <p className="mb-3 font-mono text-[10px] text-ink-muted">assistant / support inbox</p>
      <div className="ml-auto max-w-[78%] rounded-sm bg-surface-muted px-3 py-2 text-[11px] text-ink">
        Can we move our renewal date to the 1st?
      </div>
      <div className="mt-2.5 rounded-sm border border-accent-ink/40 bg-accent-soft/60 px-3 py-2.5">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-ink">
          <i className="size-1.5 rounded-full bg-accent" /> Suggested reply
        </p>
        <p className="mt-1 text-[11px] leading-snug text-ink">Yes — renewals can move to the 1st. The change is prorated on the next invoice.</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Billing policy §4", "Account history"].map((s) => (
            <span key={s} className="rounded-xs border border-line bg-surface px-1.5 py-0.5 font-mono text-[9px] text-ink-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex gap-2">
        <span className="rounded-xs bg-action px-2 py-1 text-[10px] font-semibold text-on-action">Review & send</span>
        <span className="rounded-xs border border-line px-2 py-1 text-[10px] text-ink-muted">Edit</span>
      </div>
    </Panel>
  );
}

const visuals: Partial<Record<ServiceSlug, () => React.ReactElement>> = {
  "mvp-development": MvpVisual,
  "custom-software": CustomVisual,
  "saas-development": SaasVisual,
  "ai-development": AiVisual,
};

export function ServiceVisual({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const V = visuals[slug];
  return V ? (
    <div className={className}>
      <V />
    </div>
  ) : null;
}
