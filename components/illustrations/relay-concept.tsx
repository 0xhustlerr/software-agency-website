/**
 * "Relay" — an original operations-SaaS product concept used to illustrate
 * what the studio designs and builds. Not a client product. Every surface is
 * DOM/SVG drawn with design tokens, so it themes, scales and stays crisp.
 * All data shown is sample data.
 */
import { cn } from "@/lib/utils";

const navItems = ["Overview", "Requests", "Automations", "Customers", "Reports"];

const kpis = [
  { label: "Open requests", value: "128", delta: "-12", trend: "down" },
  { label: "Median first reply", value: "2h 14m", delta: "-18m", trend: "down" },
  { label: "Auto-routed", value: "63%", delta: "+9 pts", trend: "up" },
];

const rows = [
  { id: "RQ-2041", title: "Billing address change", owner: "AK", status: "Routed", tone: "accent" },
  { id: "RQ-2040", title: "SSO setup for new team", owner: "MJ", status: "In review", tone: "muted" },
  { id: "RQ-2038", title: "Export last quarter's usage", owner: "TS", status: "Done", tone: "done" },
];

/** Sample series for the area chart (0–100). */
const series = [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 76];

function Sparkline({ className }: { className?: string }) {
  const w = 420;
  const h = 120;
  const step = w / (series.length - 1);
  const pts = series.map((v, i) => [i * step, h - (v / 100) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("block h-full w-full", className)} aria-hidden>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={area} className="fill-accent/10" />
      <path d={line} className="stroke-accent" fill="none" strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" className="fill-accent" />
    </svg>
  );
}

export function RelayDashboard({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-line bg-surface-muted shadow-frame", className)}>
      {/* window bar */}
      <div className="flex h-8 items-center gap-2 border-b border-line px-3">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
        </span>
        <span className="mx-auto rounded-xs bg-surface px-10 py-0.5 font-mono text-[10px] text-ink-muted">app.relay.example</span>
      </div>
      <div className="grid grid-cols-[132px_1fr]">
        {/* sidebar */}
        <aside className="border-r border-line px-3 py-4">
          <div className="mb-5 flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-xs bg-accent">
              <span className="size-1.5 rounded-full bg-on-accent" />
            </span>
            <span className="font-display text-[13px] font-semibold tracking-[-0.01em] text-ink">Relay</span>
          </div>
          <ul className="grid gap-0.5">
            {navItems.map((n, i) => (
              <li
                key={n}
                className={cn(
                  "flex items-center gap-2 rounded-xs px-2 py-1.5 text-[11px] font-medium",
                  i === 0 ? "bg-surface-raised text-ink" : "text-ink-muted",
                )}
              >
                <span className={cn("size-1.5 rounded-[2px]", i === 0 ? "bg-accent" : "bg-line-strong/60")} />
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xs border border-line p-2">
            <p className="text-[10px] leading-tight text-ink-muted">Workspace</p>
            <p className="mt-0.5 text-[11px] font-medium text-ink">Demo workspace</p>
          </div>
        </aside>
        {/* main */}
        <div className="min-w-0 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-ink-muted">Overview</p>
              <p className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">Operations this week</p>
            </div>
            <span className="rounded-xs border border-line px-2 py-1 font-mono text-[10px] text-ink-muted">Last 7 days</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-sm border border-line bg-surface px-2.5 py-2">
                <p className="truncate text-[10px] text-ink-muted">{k.label}</p>
                <div className="mt-1 flex items-baseline justify-between gap-1">
                  <span className="font-display text-[17px] leading-none font-semibold tracking-[-0.02em] text-ink">{k.value}</span>
                  <span className="font-mono text-[9px] text-accent-ink">{k.delta}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-sm border border-line bg-surface p-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-ink">Requests resolved</p>
              <span className="flex items-center gap-1 text-[9px] text-ink-muted">
                <i className="size-1.5 rounded-full bg-accent" /> Resolved
              </span>
            </div>
            <div className="mt-1.5 h-[76px]">
              <Sparkline />
            </div>
          </div>
          <div className="mt-2 overflow-hidden rounded-sm border border-line bg-surface">
            {rows.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-1.5 text-[10px] transition-colors duration-200 hover:bg-surface-raised",
                  i > 0 && "border-t border-line",
                )}
              >
                <span className="w-12 shrink-0 font-mono text-ink-muted">{r.id}</span>
                <span className="min-w-0 flex-1 truncate font-medium text-ink">{r.title}</span>
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-surface-raised text-[7px] font-semibold text-ink">{r.owner}</span>
                <span
                  className={cn(
                    "w-14 shrink-0 rounded-xs px-1.5 py-0.5 text-center text-[9px] font-medium",
                    r.tone === "accent" && "bg-accent-soft text-accent-ink",
                    r.tone === "muted" && "bg-surface-raised text-ink-muted",
                    r.tone === "done" && "border border-line text-ink-muted",
                  )}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const flow = [
  { label: "Request received", meta: "Email · form · chat" },
  { label: "Classify intent", meta: "AI assist", ai: true },
  { label: "Route to owner", meta: "Rules · workload" },
  { label: "Notify customer", meta: "Template" },
];

export function RelayWorkflow({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-md border border-line bg-surface-raised p-3.5 shadow-frame", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink-muted">automation / intake</p>
        <span className="flex items-center gap-1 rounded-xs bg-accent-soft px-1.5 py-0.5 text-[9px] font-medium text-accent-ink">
          <i className="size-1.5 rounded-full bg-accent" /> Live
        </span>
      </div>
      <ol className="relative mt-3 grid gap-2.5">
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong/60" />
        {flow.map((s, i) => (
          <li key={s.label} className="relative flex items-start gap-3">
            <span
              className={cn(
                "relative mt-0.5 size-[11px] shrink-0 rounded-full border",
                i === flow.length - 1 ? "border-accent bg-accent" : "border-accent-ink bg-surface-raised",
              )}
            />
            <div className="min-w-0">
              <p className="text-[11px] leading-tight font-medium text-ink">
                {s.label}
                {s.ai ? <span className="ml-1.5 rounded-xs border border-accent-ink/50 px-1 font-mono text-[8px] text-accent-ink">AI</span> : null}
              </p>
              <p className="text-[9.5px] text-ink-muted">{s.meta}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RelayPhone({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[22px] border border-line-strong/50 bg-surface p-1.5 shadow-frame", className)}>
      <div className="overflow-hidden rounded-[17px] border border-line bg-surface-muted">
        <div className="flex items-center justify-between px-3 pt-2 pb-1 font-mono text-[8px] text-ink-muted">
          <span>9:41</span>
          <span className="h-1 w-8 rounded-full bg-line" />
          <span>●●</span>
        </div>
        <div className="px-3 pt-1 pb-3">
          <p className="text-[9px] text-ink-muted">Good morning</p>
          <p className="font-display text-[13px] leading-tight font-semibold tracking-[-0.01em] text-ink">Your queue</p>
          <div className="mt-2 grid gap-1.5">
            {[
              { t: "Billing address change", s: "Due today", on: true },
              { t: "SSO setup for new team", s: "Waiting on IT" },
              { t: "Contract renewal question", s: "New" },
            ].map((r) => (
              <div key={r.t} className="rounded-sm border border-line bg-surface px-2 py-1.5">
                <p className="truncate text-[9px] font-medium text-ink">{r.t}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[8px] text-ink-muted">
                  <i className={cn("size-1 rounded-full", r.on ? "bg-accent" : "bg-line-strong")} />
                  {r.s}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2.5 rounded-sm bg-action py-1.5 text-center text-[9px] font-semibold text-on-action">New request</div>
        </div>
      </div>
    </div>
  );
}
