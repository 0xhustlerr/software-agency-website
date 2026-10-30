/**
 * A collaboration workspace concept as a 3D scene: backlog priorities feed
 * the sprint, the sprint feeds the release plan, and a product review turns
 * feedback into a logged decision. Illustration with sample data.
 */
import { Flag, ListOrdered, MousePointer2, Presentation, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Done, Glow, Header, Item, Particle, Scene, Wires, slab } from "./scene";

function Backlog() {
  return (
    <div className={cn(slab, "h-full")}>
      <Header icon={<ListOrdered className="size-3.5" strokeWidth={2.25} />} title="Backlog" step="ranked together" />
      <ol className="grid gap-1.5 px-3.5 pt-3">
        {[
          ["Self-serve onboarding", "Must"],
          ["Team invitations", "Must"],
          ["Usage export", "Should"],
          ["Slack alerts", "Could"],
        ].map(([t, p], i) => (
          <li key={t} className="flex h-[30px] items-center gap-2 rounded-[7px] border border-white/10 bg-white/[0.04] px-2 text-[11px]">
            <span className="w-3 font-mono text-[9.5px] text-ink-muted">{i + 1}</span>
            <span className="flex-1 truncate text-ink">{t}</span>
            <span className={cn("rounded-[5px] px-1.5 py-0.5 text-[9px] font-semibold", p === "Must" ? "bg-mint-400/15 text-mint-400" : "bg-white/[0.07] text-ink-muted")}>{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Sprint() {
  return (
    <div className={cn(slab, "nm-sheen h-full")}>
      <Header icon={<Flag className="size-3.5" strokeWidth={2.25} />} title="Sprint 4 of 6" step="milestones" />
      <ul className="grid gap-2.5 px-3.5 pt-3">
        {[
          ["Onboarding flow", 100],
          ["Invitations & roles", 70],
          ["Billing settings", 25],
        ].map(([t, v]) => (
          <li key={t as string}>
            <div className="flex justify-between text-[11px]">
              <span className="text-ink">{t}</span>
              <span className={cn("font-mono text-[9.5px]", v === 100 ? "text-mint-400" : "text-ink-muted")}>{v === 100 ? "done" : `${v}%`}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-linear-to-r from-mint-400 to-[#3fa7c9]" style={{ width: `${v}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Review() {
  return (
    <div className={cn(slab, "h-full")}>
      <Header icon={<Presentation className="size-3.5" strokeWidth={2.25} />} title="Product review" step="Thursday demo" />
      <div className="px-3.5 pt-3">
        <p className="text-[10.5px] font-medium text-ink-muted">Onboarding · step 2 of 3</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          <span className="h-7 rounded-[5px] bg-white/[0.07]" />
          <span className="h-7 rounded-[5px] bg-linear-to-br from-mint-400/45 to-[#3fa7c9]/25 ring-1 ring-mint-400" />
          <span className="h-7 rounded-[5px] bg-white/[0.07]" />
        </div>
        <div className="mt-2.5 flex items-start gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#8fb3ff] text-[8.5px] font-bold text-navy-900">F</span>
          <p className="rounded-[8px] rounded-tl-[2px] bg-white/[0.07] px-2 py-1 text-[10.5px] leading-snug text-ink">Can we skip this step for invited users?</p>
        </div>
        <div className="mt-1.5 flex items-start gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-mint-400 text-[8.5px] font-bold text-navy-900">N</span>
          <p className="rounded-[8px] rounded-tl-[2px] bg-mint-400/12 px-2 py-1 text-[10.5px] leading-snug text-ink">Yes — added to the next sprint.</p>
        </div>
      </div>
    </div>
  );
}

function Release() {
  return (
    <div className={cn(slab, "h-full")}>
      <Header icon={<Rocket className="size-3.5" strokeWidth={2.25} />} title="Release plan" step="v0.4" />
      <ol className="relative mx-3.5 mt-3 grid gap-2.5 pl-5">
        <span aria-hidden className="absolute top-1 bottom-1 left-[4px] w-px bg-white/20" />
        <Particle d="M4.5 4 V 62" dur="2.6s" delay="2s" />
        {[
          ["Private beta", "released", true],
          ["Team plans", "next", false],
          ["Public launch", "planned", false],
        ].map(([t, s, done]) => (
          <li key={t as string} className="relative text-[11px]">
            <span className={cn("absolute top-[3px] -left-5 size-[10px] rounded-full border", done ? "border-mint-400 bg-mint-400" : "border-white/40 bg-surface-raised")} />
            <span className="text-ink">{t}</span>
            <span className={cn("ml-2 font-mono text-[9.5px]", done ? "text-mint-400" : "text-ink-muted")}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DecisionToast() {
  return (
    <div className={cn(slab, "flex h-full items-center gap-2.5 px-3")}>
      <Done />
      <div className="min-w-0">
        <p className="text-[11.5px] font-semibold text-ink">Decision logged</p>
        <p className="truncate text-[10px] text-ink-muted">Skip step 2 for invited users</p>
      </div>
    </div>
  );
}

const wires = {
  sprint: "M262 80 H 284",
  release: "M440 160 V 180",
  decision: "M300 406 H 318",
};

/** Priorities, sprint, review and release on one shared stage. */
export function CollaborationBoard() {
  return (
    <>
      {/* Phones: backlog and review only, large enough to read. */}
      <div className="sm:hidden">
        <Scene width={300} height={436}>
          <Glow x={20} y={80} size={240} />
          <Item x={0} y={0} w={300} h={206} enter={150} float="-3px" floatDur="8s">
            <Backlog />
          </Item>
          <Item x={0} y={230} w={300} h={196} enter={400} float="-5px" floatDelay="-2s">
            <Review />
          </Item>
        </Scene>
      </div>
      <div className="hidden sm:block">
        <Scene width={560} height={440} phase="-7s">
          <Glow x={40} y={60} size={300} />
          <Glow x={300} y={200} size={220} tone="blue" />
          <Wires id="col" width={560} height={440} paths={Object.values(wires)} ends={[[284, 80], [440, 180], [318, 406]]} delay={1000} />
          <Particle d={wires.sprint} dur="1.4s" delay="1.4s" />
          <Particle d={wires.release} dur="1.4s" delay="2.2s" />
          <Particle d={wires.decision} dur="1.4s" delay="3s" />
          <Item x={0} y={14} w={262} h={206} enter={150} float="-3px" floatDur="8s">
            <Backlog />
          </Item>
          <Item x={284} y={0} w={276} h={160} enter={350} float="-5px" floatDur="7s" floatDelay="-3s">
            <Sprint />
          </Item>
          <Item x={0} y={238} w={300} h={196} enter={550} float="-4px" floatDelay="-1s">
            <Review />
          </Item>
          <Item x={318} y={180} w={242} h={146} enter={750} float="-6px" floatDur="6.5s" floatDelay="-4s">
            <Release />
          </Item>
          {/* A collaborator pointing at the screen under review */}
          <Item x={170} y={296} w={90} z={60} enter={1200} float="-10px" floatDur="4.5s">
            <div className="flex items-start">
              <MousePointer2 className="size-5 -rotate-6 fill-[#8fb3ff] text-[#8fb3ff] drop-shadow-[0_6px_8px_rgb(0_0_0/0.5)]" strokeWidth={1.5} />
              <span className="mt-3.5 -ml-1 rounded-[5px] bg-[#8fb3ff] px-1.5 py-0.5 text-[10px] font-semibold text-navy-900">Founder</span>
            </div>
          </Item>
          <Item x={318} y={378} w={242} h={54} z={70} enter={1400} float="-8px" floatDur="5.5s" floatDelay="-2s">
            <DecisionToast />
          </Item>
        </Scene>
      </div>
    </>
  );
}
