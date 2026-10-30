import { Sparkles, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConceptBadge, Glow, Item, Particle, Scene, Wires, iconTile, slab, type Vars } from "@/components/illustrations/scene";

/**
 * "Relay" — an original operations-SaaS product concept used to show what the
 * studio designs and builds. Not a client product; all data is sample data.
 */
const navItems = ["Overview", "Requests", "Automations", "Customers", "Reports"];

const kpis = [
  { label: "Open requests", value: "128", delta: "−12" },
  { label: "First reply", value: "2h 14m", delta: "−18m" },
  { label: "Auto-routed", value: "63%", delta: "+9 pts" },
];

const rows = [
  { id: "RQ-2041", title: "Billing address change", owner: "AK", status: "Routed", on: true },
  { id: "RQ-2040", title: "SSO setup for new team", owner: "MJ", status: "In review" },
];

/** Requests resolved, sample series (0–100), drawn in chart coordinates (272 × 60). */
const series = [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 76];
const chartW = 272;
const chartH = 60;
const chartLine = series
  .map((v, i) => `${i ? "L" : "M"}${((i * chartW) / (series.length - 1)).toFixed(1)} ${(chartH - ((v - 30) / 50) * chartH).toFixed(1)}`)
  .join(" ");

/** The Relay operations dashboard (420 × 344). `id` keeps its gradient unique: phone and desktop copies share the page. */
function Dashboard({ id }: { id: string }) {
  return (
    <div className={cn(slab, "nm-sheen h-full rounded-[14px] bg-linear-to-b from-[#1d2a40] to-[#121b2b]")}>
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] px-3.5">
        <span className={cn(iconTile, "size-5 rounded-[5px]")}>
          <span className="size-1.5 rounded-full bg-navy-900" />
        </span>
        <span className="font-display text-[13px] font-semibold text-ink">Relay</span>
        <span className="ml-auto mr-auto rounded-[5px] bg-white/[0.06] px-6 py-0.5 font-mono text-[10px] text-ink-muted">app.relay.example</span>
        <span className="w-[62px]" />
      </div>
      <div className="grid grid-cols-[100px_1fr]">
        <ul className="grid content-start gap-0.5 border-r border-white/[0.07] px-2 py-3">
          {navItems.map((n, i) => (
            <li key={n} className={cn("flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-[11px] font-medium", i === 0 ? "bg-mint-400/12 text-ink" : "text-ink-muted")}>
              <span className={cn("size-1.5 rounded-[2px]", i === 0 ? "bg-mint-400" : "bg-white/20")} />
              {n}
            </li>
          ))}
        </ul>
        <div className="min-w-0 p-3.5">
          <p className="font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">Operations this week</p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-[8px] border border-white/[0.07] bg-white/[0.03] px-2 py-1.5">
                <p className="truncate text-[9.5px] text-ink-muted">{k.label}</p>
                <p className="font-display mt-0.5 text-[18px] leading-tight font-semibold tracking-[-0.02em] whitespace-nowrap text-ink">{k.value}</p>
                <p className="font-mono text-[9px] text-mint-400">{k.delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-[8px] border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
            <p className="text-[10px] font-medium text-ink">Requests resolved</p>
            <div className="relative mt-1.5" style={{ width: chartW, height: chartH }}>
              <svg className="absolute inset-0 overflow-visible" width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} fill="none">
                <defs>
                  <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--accent)" stopOpacity="0.45" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[15, 30, 45].map((y) => (
                  <line key={y} x1="0" x2={chartW} y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />
                ))}
                <path d={`${chartLine} L ${chartW} ${chartH} L 0 ${chartH} Z`} fill={`url(#${id}-area)`} />
                <path d={chartLine} pathLength={1} stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" className="nm-draw" style={{ "--reveal-delay": "1100ms" } as Vars} />
              </svg>
              <Particle d={chartLine} dur="5s" delay="2s" />
            </div>
          </div>
          <div className="mt-2 overflow-hidden rounded-[8px] border border-white/[0.07]">
            {rows.map((r, i) => (
              <div key={r.id} className={cn("flex items-center gap-2 px-2.5 py-1.5 text-[10px]", i > 0 && "border-t border-white/[0.07]")}>
                <span className="shrink-0 font-mono text-ink-muted">{r.id}</span>
                <span className="min-w-0 flex-1 truncate font-medium text-ink">{r.title}</span>
                <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-white/10 text-[8px] font-semibold text-ink">{r.owner}</span>
                <span className={cn("w-[58px] shrink-0 rounded-[5px] py-0.5 text-center text-[9px] font-medium", r.on ? "bg-mint-400/15 text-mint-400" : "bg-white/[0.06] text-ink-muted")}>
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

/** The intake automation, with a request travelling down its steps (170 × 196). */
function WorkflowCard() {
  return (
    <div className={cn(slab, "h-full px-3.5 py-3")}>
      <div className="flex items-center gap-2">
        <span className={iconTile}>
          <Workflow className="size-3.5" strokeWidth={2.25} />
        </span>
        <span className="text-[12px] font-semibold text-ink">Automation</span>
      </div>
      <ol className="relative mt-3 grid gap-2.5">
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-white/15" />
        <Particle d="M5.5 6 V 120" dur="3s" delay="1.8s" />
        {flow.map((s, i) => (
          <li key={s.label} className="relative flex items-start gap-2.5">
            <span className={cn("relative mt-0.5 size-[11px] shrink-0 rounded-full border", i === flow.length - 1 ? "border-mint-400 bg-mint-400" : "border-mint-400/70 bg-surface-raised")} />
            <div className="min-w-0">
              <p className="text-[11px] leading-tight font-medium whitespace-nowrap text-ink">
                {s.label}
                {s.ai ? <span className="ml-1.5 rounded-[4px] bg-mint-400/15 px-1 font-mono text-[8.5px] text-mint-400">AI</span> : null}
              </p>
              <p className="text-[9.5px] text-ink-muted">{s.meta}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The companion mobile view (150 × 244). */
function Phone() {
  return (
    <div className={cn(slab, "h-full rounded-[24px] px-3 pt-2.5")}>
      <div className="flex items-center justify-between font-mono text-[8.5px] text-ink-muted">
        <span>9:41</span>
        <span className="h-1.5 w-10 rounded-full bg-white/15" />
        <span>●●</span>
      </div>
      <p className="mt-2 text-[9.5px] text-ink-muted">Good morning</p>
      <p className="font-display text-[14px] leading-tight font-semibold text-ink">Your queue</p>
      <div className="mt-2 grid gap-1.5">
        {[
          { t: "Billing address", s: "Due today", on: true },
          { t: "SSO setup", s: "Waiting on IT" },
          { t: "Renewal question", s: "New" },
        ].map((r) => (
          <div key={r.t} className={cn("rounded-[8px] px-2 py-1.5", r.on ? "bg-mint-400/12 ring-1 ring-mint-400/40" : "bg-white/[0.05]")}>
            <p className="truncate text-[10px] font-medium text-ink">{r.t}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[8.5px] text-ink-muted">
              <i className={cn("size-1 rounded-full", r.on ? "bg-mint-400" : "bg-white/30")} />
              {r.s}
            </p>
          </div>
        ))}
      </div>
      <span className="mt-2.5 block rounded-[8px] bg-mint-400 py-1.5 text-center text-[10px] font-semibold text-navy-900">New request</span>
    </div>
  );
}

/** A request the product routed on its own. */
function RoutedToast() {
  return (
    <div className={cn(slab, "flex h-full items-center gap-2.5 px-3")}>
      <span className={iconTile}>
        <Sparkles className="size-3.5" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <p className="text-[11.5px] font-semibold whitespace-nowrap text-ink">RQ-2042 auto-routed</p>
        <p className="font-mono text-[9.5px] text-ink-muted">to AK · in 0.4s</p>
      </div>
    </div>
  );
}

const wires = {
  workflow: "M515 196 V 250 Q 515 256 509 256 H 450",
  toast: "M280 434 V 466 Q 280 472 286 472 H 300",
};
const mobileWire = "M180 344 V 368 Q 180 374 186 374 H 190";

/**
 * Hero composition: the Relay dashboard, its intake automation and companion
 * phone on a tilted 3D stage, joined by the connected-node system. Assembles
 * from 360ms (after the headline), then sways and floats; still with reduced motion.
 */
export function HeroVisual() {
  return (
    <figure className="relative m-0" aria-label="Product concept illustration: an operations dashboard, a mobile app view and an automation workflow for a sample product called Relay.">
      {/* Phones: the dashboard and its routed request only, large enough to read. */}
      <div className="sm:hidden">
        <Scene width={440} height={400}>
          <Glow x={60} y={40} size={300} />
          <Wires id="hvm" width={440} height={400} paths={[mobileWire]} ends={[[190, 374]]} delay={1100} />
          <Particle d={mobileWire} dur="1.6s" delay="2.2s" />
          <Item x={10} y={0} w={420} h={344} enter={360} float="-3px" floatDur="8s">
            <Dashboard id="hvm" />
          </Item>
          <Item x={190} y={350} w={230} h={48} z={50} enter={900} float="-7px" floatDelay="-2s">
            <RoutedToast />
          </Item>
        </Scene>
      </div>
      <div className="hidden sm:block">
        <Scene width={600} height={500}>
          <Glow x={140} y={80} size={340} />
          <Glow x={0} y={280} size={240} tone="blue" />
          <Wires id="hv" width={600} height={500} paths={Object.values(wires)} ends={[[450, 256], [300, 472]]} delay={1100} />
          <Particle d={wires.workflow} dur="2.2s" delay="2.4s" />
          <Particle d={wires.toast} dur="1.8s" delay="3.2s" />
          <Item x={30} y={90} w={420} h={344} enter={360} float="-3px" floatDur="8s">
            <Dashboard id="hv" />
          </Item>
          <Item x={430} y={0} w={170} h={196} z={50} enter={620} float="-8px" floatDur="7s" floatDelay="-2s">
            <WorkflowCard />
          </Item>
          <Item x={0} y={256} w={150} h={244} z={70} enter={740} float="-10px" floatDur="6s" floatDelay="-1s">
            <Phone />
          </Item>
          <Item x={300} y={448} w={240} h={48} z={40} enter={1000} float="-6px" floatDur="5.5s" floatDelay="-3s">
            <RoutedToast />
          </Item>
        </Scene>
      </div>
      <ConceptBadge>Product concept illustration</ConceptBadge>
    </figure>
  );
}
