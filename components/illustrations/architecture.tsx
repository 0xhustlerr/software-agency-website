/**
 * Architecture and delivery pipeline for the engineering section, as a 3D
 * scene: requests flow down through the tiers, a health check watches the
 * system, and a pull request deploys into the cloud. A typical shape for a
 * startup SaaS product, with sample data.
 */
import { Activity, GitPullRequest, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConceptBadge, Done, Glow, Header, Item, Particle, Scene, Wires, slab } from "./scene";

function Node({ label, meta, on }: { label: string; meta: string; on?: boolean }) {
  return (
    <div
      className={cn(
        "h-[38px] min-w-0 rounded-[8px] border px-2 py-1",
        on ? "border-mint-400/60 bg-mint-400/10 shadow-[0_0_16px_-4px_rgb(109_225_210/0.55)]" : "border-white/10 bg-white/[0.04]",
      )}
    >
      <p className="truncate text-[11px] leading-tight font-medium text-ink">{label}</p>
      <p className="truncate font-mono text-[9px] text-ink-muted">{meta}</p>
    </div>
  );
}

function Tier({ title, nodes }: { title: string; nodes: [string, string, boolean?][] }) {
  return (
    <div className="grid grid-cols-[58px_1fr] items-center gap-1.5">
      <p className="font-mono text-[9.5px] tracking-wide text-ink-muted uppercase">{title}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {nodes.map(([l, m, on]) => (
          <Node key={l} label={l} meta={m} on={on} />
        ))}
      </div>
    </div>
  );
}

/** Links between tiers, with a request travelling down each. */
function Flow({ delay }: { delay: number }) {
  return (
    <div aria-hidden className="grid grid-cols-[58px_1fr] gap-1.5">
      <span />
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="relative mx-auto block h-4 w-px bg-white/20">
            <Particle d="M0.5 0 V 16" dur="1.6s" delay={`${delay + i * 0.5}s`} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchitecturePanel() {
  return (
    <div className={cn(slab, "nm-sheen h-full")}>
      <Header icon={<Network className="size-3.5" strokeWidth={2.25} />} title="Architecture" step="overview" />
      <div className="p-3.5">
        <Tier
          title="Clients"
          nodes={[
            ["Web app", "Next.js"],
            ["Mobile web", "responsive"],
            ["Admin", "Next.js"],
          ]}
        />
        <Flow delay={1.2} />
        <Tier
          title="API"
          nodes={[
            ["Auth & roles", "OIDC"],
            ["Product API", "REST · typed", true],
            ["Webhooks", "signed"],
          ]}
        />
        <Flow delay={1.8} />
        <div className="relative mt-1 rounded-[10px] border border-dashed border-mint-400/35 px-2 pt-4 pb-2">
          <span className="absolute -top-2 left-3 rounded-[4px] bg-surface-raised px-1.5 font-mono text-[9px] text-mint-400">cloud · private network</span>
          <Tier
            title="Services"
            nodes={[
              ["Workflows", "Node.js"],
              ["AI service", "Python", true],
              ["Jobs queue", "retries"],
            ]}
          />
          <Flow delay={2.4} />
          <Tier
            title="Data"
            nodes={[
              ["PostgreSQL", "primary + replica"],
              ["Object storage", "encrypted"],
              ["Audit log", "append-only"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function HealthCard() {
  return (
    <div className={cn(slab, "h-full px-3.5 py-2.5")}>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
        <Activity className="size-3.5 text-mint-400" strokeWidth={2.5} /> Health
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-[10.5px] text-mint-400">
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-mint-400 motion-safe:animate-ping" />
          <span className="relative size-1.5 rounded-full bg-mint-400" />
        </span>
        All systems healthy
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <p className="text-ink-muted">Uptime</p>
          <p className="font-display text-[15px] font-semibold text-ink">99.99%</p>
        </div>
        <div>
          <p className="text-ink-muted">p95</p>
          <p className="font-display text-[15px] font-semibold text-ink">118 ms</p>
        </div>
      </div>
    </div>
  );
}

const checks = [
  ["Lint & format", "12s"],
  ["Type check", "21s"],
  ["Tests", "214 passed"],
  ["Security scan", "0 issues"],
  ["Preview deploy", "ready"],
];

function PipelineCard() {
  return (
    <div className={cn(slab, "h-full")}>
      <Header icon={<GitPullRequest className="size-3.5" strokeWidth={2.25} />} title="PR #128" step="onboarding" />
      <ul className="grid gap-1.5 px-3.5 pt-3">
        {checks.map(([n, m]) => (
          <li key={n} className="flex items-center gap-2 text-[10.5px]">
            <Done />
            <span className="flex-1 text-ink">{n}</span>
            <span className="font-mono text-[9.5px] text-ink-muted">{m}</span>
          </li>
        ))}
      </ul>
      <span className="mx-3.5 mt-3 block rounded-[8px] bg-mint-400 py-1.5 text-center text-[10.5px] font-semibold text-navy-900">Deploy to production</span>
    </div>
  );
}

const wires = {
  health: "M400 70 H 436",
  deploy: "M388 420 H 216 Q 210 420 210 414 V 340",
};

/** The engineering section's figure: architecture, health and the pipeline that ships into it. */
export function EngineeringArt() {
  return (
    <figure className="m-0" aria-label="Architecture illustration: clients, API, services and data tiers in a private cloud network, a health check, and a pull request whose checks have passed, ready to deploy.">
      {/* Phones: the architecture alone, then the pipeline, so labels stay legible. */}
      <div className="grid gap-2 sm:hidden">
        <Scene width={440} height={330}>
          <Glow x={80} y={60} size={260} />
          <Item x={10} y={10} w={420} h={310} enter={150} float="-3px" floatDur="8s">
            <ArchitecturePanel />
          </Item>
        </Scene>
        <div className="ml-auto w-full max-w-[280px]">
          <Scene width={228} height={232} phase="-5s">
            <Item x={0} y={0} w={228} h={232} enter={400} float="-5px">
              <PipelineCard />
            </Item>
          </Scene>
        </div>
      </div>
      <div className="hidden sm:block">
        <Scene width={600} height={470} phase="-4s">
          <Glow x={80} y={80} size={320} />
          <Glow x={360} y={240} size={220} tone="blue" />
          <Wires id="eng" width={600} height={470} paths={Object.values(wires)} ends={[[436, 70], [210, 340]]} delay={1000} />
          <Particle d={wires.health} dur="1.4s" delay="1.6s" />
          <Particle d={wires.deploy} dur="2.6s" delay="2.4s" />
          <Item x={0} y={30} w={400} h={310} enter={150} float="-3px" floatDur="8s">
            <ArchitecturePanel />
          </Item>
          <Item x={436} y={20} w={164} h={100} z={40} enter={600} float="-7px" floatDur="7s" floatDelay="-2s">
            <HealthCard />
          </Item>
          <Item x={388} y={228} w={212} h={232} z={60} enter={850} float="-9px" floatDur="6.5s" floatDelay="-1s">
            <PipelineCard />
          </Item>
        </Scene>
      </div>
      <ConceptBadge>Architecture illustration</ConceptBadge>
    </figure>
  );
}
