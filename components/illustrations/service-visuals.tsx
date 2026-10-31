/**
 * Interface scenes, one per core service: tilted 3D stages with floating
 * cards, connectors and particles, sharing the services hero's language.
 * Decorative (aria-hidden by the caller). Always dark, so they read the same
 * on navy stages and light panels. Sample data.
 */
import { CalendarClock, ClipboardCheck, FileSignature, KanbanSquare, LockKeyhole, MessageSquareText, MousePointer2, Receipt, Settings2, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";
import { Done, Glow, Header, Item, Particle, Scene, Wires, iconTile, slab, type Vars } from "./scene";

const W = 440;
const H = 330;

/** MVP: deciding what ships first. A feature is dragged from "Next" into version 1. */
function MvpVisual() {
  const drag = "M204 197 C 186 232, 110 236, 80 214";
  const columns = [
    { t: "Version 1", items: ["Sign up", "New project"], on: true },
    { t: "Next", items: ["Templates", "Comments"] },
    { t: "Later", items: ["Integrations", "Public API"] },
  ];
  return (
    <Scene width={W} height={H} phase="-3s">
      <Glow x={20} y={90} size={260} />
      <Glow x={260} y={170} size={200} tone="blue" />
      <Item x={0} y={30} w={400} h={236} enter={150} float="-3px" floatDur="8s">
        <div className={cn(slab, "h-full")}>
          <Header icon={<KanbanSquare className="size-3.5" strokeWidth={2.25} />} title="Release plan" step="scope" />
          <div className="grid grid-cols-3 gap-2 p-3">
            {columns.map((c, ci) => (
              <div key={c.t} className={cn("grid content-start gap-1.5 rounded-[8px] p-1.5", c.on ? "bg-mint-400/10 ring-1 ring-mint-400/30" : "bg-white/[0.03]")}>
                <p className={cn("px-1 pb-0.5 text-[10.5px] font-semibold", c.on ? "text-mint-400" : "text-ink-muted")}>{c.t}</p>
                {c.items.map((i) => (
                  <div key={i} className="flex h-[30px] items-center gap-1.5 rounded-[6px] whitespace-nowrap border border-white/10 bg-surface-raised px-2 text-[11px] font-medium text-ink shadow-[0_2px_0_#0d1626]">
                    {c.on ? <Done /> : null}
                    {i}
                  </div>
                ))}
                {ci === 0 ? (
                  <div className="grid h-[30px] place-items-center rounded-[6px] border border-dashed border-mint-400/70 bg-mint-400/[0.06] text-[10px] text-mint-400">Drop here</div>
                ) : ci === 1 ? (
                  <div className="h-[30px] rounded-[6px] border border-dashed border-white/15" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Item>
      <Particle d={drag} dur="2.4s" delay="1.4s" />

      {/* The feature being dragged into version 1 */}
      <Item x={52} y={214} w={124} z={60} enter={900} float="-8px" floatDur="4.5s">
        <div className="-rotate-[5deg]">
          <div className="flex h-[32px] items-center gap-1.5 rounded-[6px] border border-mint-400/60 bg-surface-raised px-2.5 text-[11px] font-semibold text-ink shadow-[0_3px_0_#0d1626,0_24px_30px_-10px_rgb(0_0_0/0.8),0_0_20px_-4px_rgb(109_225_210/0.5)]">
            Invite teammate
          </div>
          <div className="mt-[-4px] ml-[96px] flex items-start">
            <MousePointer2 className="size-5 fill-[#8fb3ff] text-[#8fb3ff] drop-shadow-[0_6px_8px_rgb(0_0_0/0.5)]" strokeWidth={1.5} />
            <span className="mt-3.5 -ml-1 rounded-[5px] bg-[#8fb3ff] px-1.5 py-0.5 text-[10px] font-semibold text-navy-900">Founder</span>
          </div>
        </div>
      </Item>

      {/* Ship date */}
      <Item x={250} y={0} w={190} h={60} z={50} enter={700} float="-7px" floatDur="7s" floatDelay="-2s">
        <div className={cn(slab, "h-full px-3.5 py-2.5")}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-ink">v1 ships</span>
            <span className="font-mono text-[10px] text-ink-muted">in 6 weeks</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-[35%] rounded-full bg-linear-to-r from-mint-400 to-[#3fa7c9]" />
          </div>
        </div>
      </Item>

      {/* Focus: few must-haves out of many ideas */}
      <Item x={316} y={236} w={124} h={92} z={40} enter={1100} float="-6px" floatDelay="-4s">
        <div className={cn(slab, "h-full px-3.5 py-2.5")}>
          <p className="text-[11px] font-semibold text-ink">Must-haves</p>
          <p className="font-display mt-1 text-[26px] leading-none font-semibold tracking-[-0.03em] text-ink">
            3 <span className="text-[12px] font-medium tracking-normal text-ink-muted">of 12 ideas</span>
          </p>
          <div className="mt-2.5 grid grid-cols-12 gap-[3px]">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={cn("h-2 rounded-[2px]", i < 3 ? "bg-mint-400" : "bg-white/10")} />
            ))}
          </div>
        </div>
      </Item>
    </Scene>
  );
}

/** Custom software: a field-service workflow, with the technician's app on the move. */
function CustomVisual() {
  const steps = [
    { t: "Quote", m: "drafted", icon: FileSignature },
    { t: "Approve", m: "by client", icon: ClipboardCheck },
    { t: "Schedule", m: "Tue 9:00", icon: CalendarClock, on: true },
    { t: "Invoice", m: "automatic", icon: Receipt },
  ];
  const links = ["M92 62 H 116", "M208 62 H 232", "M324 62 H 348", "M312 104 V 122"];
  return (
    <Scene width={W} height={H} phase="-6s">
      <Glow x={180} y={0} size={220} />
      <Glow x={0} y={160} size={220} tone="blue" />
      <Wires
        id="cus"
        width={W}
        height={H}
        paths={links}
        ends={[
          [116, 62],
          [232, 62],
          [348, 62],
          [312, 122],
        ]}
        delay={800}
      />
      {links.map((d, i) => (
        <Particle key={d} d={d} dur="1.6s" delay={`${1.2 + i * 0.8}s`} />
      ))}
      {steps.map((s, i) => (
        <Item key={s.t} x={i * 116} y={20} w={92} h={84} z={s.on ? 24 : 0} enter={150 + i * 150} float={s.on ? "-7px" : "-3px"} floatDelay={`${-i}s`}>
          <div className={cn(slab, "h-full px-3 py-2.5", s.on && "border-mint-400/60 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_3px_0_#0d1626,0_6px_0_#0a111e,0_40px_60px_-18px_rgb(0_0_0/0.8),0_0_28px_-6px_rgb(109_225_210/0.6)]")}>
            <span className={iconTile}>
              <s.icon className="size-3.5" strokeWidth={2.25} />
            </span>
            <p className="mt-2 text-[12px] font-semibold text-ink">{s.t}</p>
            <p className={cn("text-[10px]", s.on ? "text-mint-400" : "text-ink-muted")}>{s.m}</p>
          </div>
        </Item>
      ))}

      {/* Operations overview */}
      <Item x={0} y={140} w={280} h={180} enter={700} float="-3px" floatDur="8s" floatDelay="-2s">
        <div className={cn(slab, "h-full")}>
          <Header icon={<Settings2 className="size-3.5" strokeWidth={2.25} />} title="Operations" step="this week" />
          <div className="grid grid-cols-2 gap-2 px-3.5 pt-3">
            {[
              ["Jobs", "42"],
              ["Awaiting approval", "6"],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-[10px] text-ink-muted">{l}</p>
                <p className="font-display text-[24px] leading-tight font-semibold tracking-[-0.03em] text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="mx-3.5 mt-2 flex h-[46px] items-end gap-2">
            {[0.5, 0.72, 0.6, 0.9, 0.66, 0.38, 0.24].map((v, i) => (
              <span
                key={i}
                className="nm-bar flex-1 rounded-t-[3px] bg-linear-to-t from-[#3fa7c9]/60 to-mint-400"
                style={{ height: `${v * 100}%`, "--from": `${0.65 + (i % 3) * 0.1}`, "--dur": `${2.8 + i * 0.25}s`, "--delay": `${-i * 0.5}s` } as Vars}
              />
            ))}
          </div>
        </div>
      </Item>

      {/* Technician app */}
      <Item x={300} y={122} w={140} h={206} z={60} enter={1000} float="-9px" floatDur="6.5s" floatDelay="-1s">
        <div className={cn(slab, "h-full rounded-[22px] px-3 pt-2.5")}>
          <div className="mx-auto h-1.5 w-12 rounded-full bg-white/15" />
          <div className="mt-2.5 flex items-center gap-1.5">
            <Smartphone className="size-3.5 text-mint-400" strokeWidth={2.25} />
            <span className="text-[11.5px] font-semibold text-ink">Today · 3 jobs</span>
          </div>
          <ul className="mt-2.5 grid gap-1.5">
            {[
              ["#1042", "En route", true],
              ["#1043", "10:30", false],
              ["#1044", "14:00", false],
            ].map(([j, st, live]) => (
              <li key={j as string} className={cn("flex items-center justify-between rounded-[8px] px-2 py-1.5 text-[10.5px] whitespace-nowrap", live ? "bg-mint-400/12 ring-1 ring-mint-400/40" : "bg-white/[0.05]")}>
                <span className="font-medium text-ink">{j}</span>
                <span className={cn("flex items-center gap-1", live ? "text-mint-400" : "text-ink-muted")}>
                  {live ? (
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 rounded-full bg-mint-400 motion-safe:animate-ping" />
                      <span className="relative size-1.5 rounded-full bg-mint-400" />
                    </span>
                  ) : null}
                  {st}
                </span>
              </li>
            ))}
          </ul>
          <span className="mt-3 block rounded-[8px] bg-mint-400 py-1.5 text-center text-[10.5px] font-semibold text-navy-900">Start job</span>
        </div>
      </Item>
    </Scene>
  );
}

/** SaaS: the admin side of a multi-tenant product, with revenue and security at a glance. */
function SaasVisual() {
  const spark = "M0 34 C 12 32, 18 26, 28 27 S 44 30, 54 22 S 70 10, 80 14 S 92 6, 100 4";
  const workspaces = [
    { n: "Design team", p: "Team", s: 12, of: 15, on: true },
    { n: "Sales", p: "Starter", s: 3, of: 5 },
    { n: "Customer success", p: "Business", s: 48, of: 50 },
  ];
  const links = ["M320 80 H 336", "M320 228 H 336", "M236 270 V 284"];
  return (
    <Scene width={W} height={H} phase="-9s">
      <Glow x={60} y={60} size={260} />
      <Glow x={300} y={120} size={160} tone="blue" />
      <Wires
        id="saas"
        width={W}
        height={H}
        paths={links}
        ends={[
          [336, 80],
          [336, 228],
          [236, 284],
        ]}
      />
      {links.map((d, i) => (
        <Particle key={d} d={d} dur="1.5s" delay={`${1.5 + i * 0.9}s`} />
      ))}

      {/* Admin console */}
      <Item x={0} y={30} w={320} h={240} enter={150} float="-3px" floatDur="8s">
        <div className={cn(slab, "nm-sheen h-full")}>
          <Header icon={<Settings2 className="size-3.5" strokeWidth={2.25} />} title="Admin" step="acme.app" />
          <div className="flex gap-1 border-b border-white/[0.07] px-3 py-2 text-[10.5px]">
            {["Workspaces", "Billing", "Roles", "SSO"].map((t, i) => (
              <span key={t} className={cn("rounded-[5px] px-2 py-0.5", i === 0 ? "bg-mint-400/15 font-semibold text-mint-400" : "text-ink-muted")}>
                {t}
              </span>
            ))}
          </div>
          {workspaces.map((w, i) => (
            <div key={w.n} className={cn("flex items-center gap-2.5 px-3.5 py-2.5", i > 0 && "border-t border-white/[0.06]")}>
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-[7px] text-[11px] font-bold", w.on ? "bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900" : "bg-white/10 text-ink")}>{w.n[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-semibold text-ink">{w.n}</p>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-mint-400/80" style={{ width: `${(w.s / w.of) * 100}%` }} />
                </div>
              </div>
              <span className="rounded-[5px] border border-white/15 px-1.5 py-0.5 text-[9.5px] text-ink-muted">{w.p}</span>
              <span className="w-12 text-right font-mono text-[10px] text-ink-muted">{w.s} seats</span>
            </div>
          ))}
        </div>
      </Item>

      {/* Monthly recurring revenue */}
      <Item x={336} y={10} w={104} h={104} z={40} enter={800} float="-8px" floatDur="7s" floatDelay="-2s">
        <div className={cn(slab, "h-full px-3 py-2.5")}>
          <p className="flex items-center gap-1 text-[10.5px] font-semibold text-ink-muted">
            <TrendingUp className="size-3 text-mint-400" strokeWidth={2.5} /> MRR
          </p>
          <p className="font-display mt-0.5 text-[21px] leading-tight font-semibold tracking-[-0.03em] text-ink">$24.8k</p>
          <div className="relative mt-1 h-[38px] w-[80px]">
            <svg className="absolute inset-0 overflow-visible" width="80" height="38" viewBox="0 0 100 38" preserveAspectRatio="none" fill="none">
              <path d={spark} stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </Item>

      {/* Security */}
      <Item x={336} y={190} w={104} h={84} z={40} enter={1000} float="-6px" floatDelay="-4s">
        <div className={cn(slab, "h-full px-3 py-2.5")}>
          <span className={iconTile}>
            <LockKeyhole className="size-3.5" strokeWidth={2.25} />
          </span>
          <p className="mt-1.5 text-[11.5px] font-semibold text-ink">SAML SSO</p>
          <p className="flex items-center gap-1 text-[10px] text-mint-400">
            <Done /> Enforced
          </p>
        </div>
      </Item>

      {/* Seats added */}
      <Item x={130} y={284} w={196} h={44} z={70} enter={1200} float="-9px" floatDur="5.5s" floatDelay="-1s">
        <div className={cn(slab, "flex h-full items-center gap-2 px-3")}>
          <Done />
          <span className="text-[11px] font-semibold whitespace-nowrap text-ink">Sales · 2 seats added</span>
          <span className="ml-auto font-mono text-[9.5px] text-ink-muted">now</span>
        </div>
      </Item>
    </Scene>
  );
}

/** AI: a support assistant drafting a grounded reply that a person reviews before it's sent. */
function AiVisual() {
  const links = ["M320 68 H 312 Q 306 68 306 74 V 150 Q 306 156 300 156", "M320 140 H 312 Q 306 140 306 146 V 172 Q 306 178 300 178"];
  return (
    <Scene width={W} height={H} phase="-12s">
      <Glow x={40} y={100} size={260} />
      <Glow x={300} y={140} size={180} tone="blue" />

      {/* Inbox */}
      <Item x={0} y={14} w={300} h={262} enter={150} float="-3px" floatDur="8s">
        <div className={cn(slab, "h-full")}>
          <Header icon={<MessageSquareText className="size-3.5" strokeWidth={2.25} />} title="Support inbox" step="#4821" />
          <div className="px-3.5 pt-3">
            <div className="flex items-start gap-2">
              <span className="size-6 shrink-0 rounded-full bg-[#f4b183]" />
              <p className="rounded-[10px] rounded-tl-[3px] bg-white/[0.07] px-3 py-2 text-[11.5px] leading-snug text-ink">Can we move our renewal date to the 1st?</p>
            </div>
            <div className="nm-sheen relative mt-3 overflow-hidden rounded-[10px] border border-mint-400/50 bg-mint-400/[0.08] px-3 py-2.5 shadow-[0_0_28px_-8px_rgb(109_225_210/0.6)]">
              <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-mint-400">
                <Sparkles className="size-3.5" strokeWidth={2.25} /> Suggested reply
              </p>
              <p className="mt-1.5 text-[11.5px] leading-snug text-ink">Yes — renewals can move to the 1st. The change is prorated on your next invoice.</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-[6px] bg-mint-400 px-2.5 py-1 text-[10.5px] font-semibold text-navy-900">Review &amp; send</span>
              <span className="rounded-[6px] border border-white/15 px-2.5 py-1 text-[10.5px] text-ink-muted">Edit</span>
              <span className="ml-auto flex gap-1" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-mint-400/70 motion-safe:animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </span>
            </div>
          </div>
        </div>
      </Item>

      <Wires
        id="ai"
        width={W}
        height={H}
        paths={links}
        ends={[
          [300, 156],
          [300, 178],
        ]}
      />
      {links.map((d, i) => (
        <Particle key={d} d={d} dur="1.8s" delay={`${1.4 + i * 0.9}s`} />
      ))}

      {/* Sources the reply is grounded in */}
      {[
        ["Billing policy", "§4 · renewals", 40],
        ["Account history", "plan · invoices", 112],
      ].map(([t, m, y], i) => (
        <Item key={t as string} x={320} y={y as number} w={120} h={56} z={40} enter={800 + i * 200} float="-6px" floatDelay={`${-i * 2}s`}>
          <div className={cn(slab, "h-full px-3 py-2")}>
            <p className="text-[11px] font-semibold text-ink">{t}</p>
            <p className="font-mono text-[9.5px] text-ink-muted">{m}</p>
          </div>
        </Item>
      ))}

      {/* Confidence, with a person in the loop */}
      <Item x={320} y={196} w={120} h={118} z={60} enter={1200} float="-9px" floatDur="6.5s" floatDelay="-3s">
        <div className={cn(slab, "grid h-full place-items-center px-3 py-2 text-center")}>
          <div className="relative size-[54px]">
            <svg className="absolute inset-0 -rotate-90" width="54" height="54" viewBox="0 0 54 54" fill="none">
              <circle cx="27" cy="27" r="23" stroke="rgb(255 255 255 / 0.1)" strokeWidth="5" />
              <circle cx="27" cy="27" r="23" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" pathLength={100} strokeDasharray="94 100" />
            </svg>
            <span className="font-display absolute inset-0 grid place-items-center text-[14px] font-semibold text-ink">94%</span>
          </div>
          <p className="text-[10.5px] font-semibold text-ink">Confidence</p>
          <p className="text-[9.5px] text-ink-muted">human review on</p>
        </div>
      </Item>
    </Scene>
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
    <div data-theme="dark" className={cn("bg-transparent", className)}>
      <V />
    </div>
  ) : null;
}
