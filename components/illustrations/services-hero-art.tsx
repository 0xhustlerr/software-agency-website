import { Activity, Check, FileText, MousePointer2, PenTool, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConceptBadge, Done, Glow, Header, Item, Particle, Scene, Wires, iconTile, slab, type Vars } from "./scene";

/** Connector paths in stage coordinates (520 × 460). Particles travel the same paths. */
const paths = {
  discovery: "M190 100 H 198 Q 204 100 204 106 V 140 Q 204 146 210 146 H 214",
  prototype: "M190 268 H 198 Q 204 268 204 262 V 232 Q 204 226 210 226 H 214",
  test: "M95 346 V 372",
  deploy: "M262 300 V 362",
  growth: "M364 396 H 386",
};

/** Weekly active users, sample data, in chart coordinates (276 × 70). */
const chartLine = "M0 58 C 22 55, 30 43, 52 45 S 86 55, 108 42 S 146 18, 168 28 S 206 42, 228 22 S 260 7, 276 8";

/**
 * Discovery and prototype feed a live product; the product ships and grows.
 * A tilted 3D stage with a slow camera sway, floating cards and particles on the
 * connectors (still, but still tilted, with reduced motion). Concept illustration with sample data.
 */
export function ServicesHeroArt() {
  return (
    <figure className="m-0" aria-label="Product concept illustration: a discovery brief and a prototype flow into a live production dashboard, which ships a release and grows sign-ups.">
      <Scene width={520} height={460}>
        <Glow x={200} y={90} size={320} />
        <Glow x={20} y={250} size={240} tone="blue" />
        <Wires
          id="sh"
          width={520}
          height={460}
          paths={Object.values(paths)}
          ends={[
            [214, 146],
            [214, 226],
            [95, 372],
            [262, 362],
            [386, 396],
          ]}
        />
        <Particle d={paths.discovery} dur="2.6s" delay="1.6s" />
        <Particle d={paths.prototype} dur="2.6s" delay="2.4s" />
        <Particle d={paths.test} dur="1.8s" delay="3s" />
        <Particle d={paths.deploy} dur="2.2s" delay="3.4s" />
        <Particle d={paths.growth} dur="1.6s" delay="4.2s" />

        {/* 01 · Discovery */}
        <Item x={0} y={36} w={190} h={128} enter={150} floatDelay="-1s">
          <div className={cn(slab, "h-full")}>
            <Header icon={<FileText className="size-3.5" strokeWidth={2.25} />} title="Discovery" step="01" />
            <ul className="grid gap-2 px-3.5 pt-3">
              <li className="flex items-center gap-2 text-[11.5px] text-ink">
                <Done /> Users and their job
              </li>
              <li className="flex items-center gap-2 text-[11.5px] text-ink">
                <Done /> MVP scope agreed
              </li>
              <li className="flex items-center gap-2 text-[11.5px] text-ink-muted">
                <span className="size-4 shrink-0 rounded-full border border-dashed border-mint-400" /> Riskiest assumption
              </li>
            </ul>
          </div>
        </Item>

        {/* 02 · Prototype */}
        <Item x={0} y={196} w={190} h={150} enter={350} floatDelay="-3s">
          <div className={cn(slab, "h-full")}>
            <Header icon={<PenTool className="size-3.5" strokeWidth={2.25} />} title="Prototype" step="02 · v3" />
            <div className="px-3.5 pt-3">
              <div className="h-2 w-[60%] rounded-full bg-white/25" />
              <div className="relative mt-2.5 h-[44px] rounded-[6px] bg-linear-to-br from-mint-400/50 to-[#3fa7c9]/25 outline outline-1 outline-mint-400">
                {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((p) => (
                  <span key={p} className={cn("absolute size-1.5 rounded-[1px] border border-mint-400 bg-surface", p)} />
                ))}
              </div>
              <span className="mt-2.5 inline-block rounded-[5px] bg-mint-400 px-2.5 py-1 text-[10px] font-semibold text-navy-900">Start free trial</span>
            </div>
          </div>
        </Item>
        {/* A collaborator's cursor, hovering above the prototype */}
        <Item x={104} y={262} w={90} z={60} enter={1300} float="-10px" floatDur="4.5s">
          <div className="flex items-start">
            <MousePointer2 className="size-5 -rotate-6 fill-[#8fb3ff] text-[#8fb3ff] drop-shadow-[0_6px_8px_rgb(0_0_0/0.5)]" strokeWidth={1.5} />
            <span className="mt-3.5 -ml-1 rounded-[5px] bg-[#8fb3ff] px-1.5 py-0.5 text-[10px] font-semibold text-navy-900 shadow-[0_8px_16px_-4px_rgb(0_0_0/0.6)]">Founder</span>
          </div>
        </Item>

        {/* Usability test on the prototype */}
        <Item x={0} y={372} w={190} h={68} enter={700} floatDelay="-2s">
          <div className={cn(slab, "h-full px-3.5 py-2.5")}>
            <p className="text-[11.5px] font-semibold text-ink">Usability test</p>
            <div className="mt-2 flex items-center gap-1">
              {[1, 1, 1, 1, 0].map((ok, i) => (
                <span key={i} className={cn("grid size-[18px] place-items-center rounded-full", ok ? "bg-mint-400/20 text-mint-400" : "bg-white/10 text-ink-muted")}>
                  {ok ? <Check className="size-3" strokeWidth={3} /> : <span className="size-1 rounded-full bg-current" />}
                </span>
              ))}
              <span className="ml-auto text-[10.5px] text-ink-muted">4 of 5</span>
            </div>
          </div>
        </Item>

        {/* 03 · Production: the live product on screen */}
        <Item x={214} y={74} w={306} h={226} enter={550} float="-3px" floatDur="8s">
          <div className={cn(slab, "nm-sheen h-full rounded-[14px] bg-linear-to-b from-[#1d2a40] to-[#121b2b]")}>
            <Header icon={<Activity className="size-3.5" strokeWidth={2.25} />} title="Production" step="03" />
            <div className="flex items-end justify-between px-4 pt-3">
              <div>
                <p className="flex items-center gap-1.5 text-[10.5px] text-ink-muted">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 rounded-full bg-mint-400 motion-safe:animate-ping" />
                    <span className="relative size-2 rounded-full bg-mint-400" />
                  </span>
                  Live · weekly active users
                </p>
                <p className="font-display mt-1 text-[34px] leading-none font-semibold tracking-[-0.03em] text-ink">1,284</p>
              </div>
              <span className="mb-1 rounded-full bg-mint-400/15 px-2 py-0.5 text-[11px] font-semibold text-mint-400">+18%</span>
            </div>
            <div className="relative mx-4 mt-2 h-[70px] w-[276px]">
              <svg className="absolute inset-0 overflow-visible" width="276" height="70" viewBox="0 0 276 70" fill="none">
                <defs>
                  <linearGradient id="sh-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[18, 35, 52].map((y) => (
                  <line key={y} x1="0" x2="276" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />
                ))}
                <path d={`${chartLine} V 70 H 0 Z`} fill="url(#sh-area)" />
                <path d={chartLine} pathLength={1} stroke="var(--accent)" strokeWidth="2" className="nm-draw" style={{ "--reveal-delay": "1100ms" } as Vars} />
              </svg>
              <Particle d={chartLine} dur="5s" delay="2s" />
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/[0.07] text-[10px] whitespace-nowrap">
              {[
                ["Uptime", "99.98%"],
                ["Deploys", "12/wk"],
                ["p95", "120 ms"],
              ].map(([l, v], i) => (
                <div key={l} className={cn("px-2.5 py-2", i > 0 && "border-l border-white/[0.07]")}>
                  <span className="text-ink-muted">{l} </span>
                  <span className="font-semibold text-ink">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Monitor stand */}
          <div className="mx-auto h-[22px] w-[30px] bg-linear-to-b from-[#26354d] to-[#1a2538]" />
          <div className="mx-auto h-[7px] w-[120px] rounded-full bg-linear-to-b from-[#2b3b55] to-[#16202f] shadow-[0_18px_30px_-6px_rgb(0_0_0/0.8)]" />
        </Item>

        {/* Timeline, floating above the scene */}
        <Item x={250} y={0} w={270} h={52} z={50} enter={900} float="-8px" floatDur="7s" floatDelay="-2s">
          <div className={cn(slab, "h-full px-3.5 py-2.5")}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-ink">Idea to launch</span>
              <span className="font-mono text-[10px] text-ink-muted">week 6 of 8</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <span className="h-1.5 rounded-full bg-mint-400" />
              <span className="h-1.5 rounded-full bg-mint-400" />
              <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full w-1/2 rounded-full bg-linear-to-r from-mint-400 to-[#3fa7c9]" />
              </span>
            </div>
          </div>
        </Item>

        {/* Release shipped */}
        <Item x={214} y={362} w={150} h={66} enter={1100} floatDelay="-4s">
          <div className={cn(slab, "h-full px-3.5 py-2.5")}>
            <div className="flex items-center gap-2">
              <span className={iconTile}>
                <Rocket className="size-3.5" strokeWidth={2.25} />
              </span>
              <span className="text-[12px] font-semibold whitespace-nowrap text-ink">v1.4 deployed</span>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-ink-muted">
              <Done /> Checks passed
            </p>
          </div>
        </Item>

        {/* Growth, floating forward */}
        <Item x={386} y={336} w={134} h={104} z={70} enter={1300} float="-9px" floatDur="6.5s" floatDelay="-1.5s">
          <div className={cn(slab, "h-full px-3.5 py-2.5")}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">Sign-ups</span>
              <span className="text-[11px] font-semibold text-mint-400">+32%</span>
            </div>
            <div className="mt-2.5 flex h-[52px] items-end gap-1.5">
              {[0.35, 0.5, 0.42, 0.66, 0.78, 1].map((v, i) => (
                <span
                  key={i}
                  className="nm-bar flex-1 rounded-t-[3px] bg-linear-to-t from-[#3fa7c9]/60 to-mint-400"
                  style={{ height: `${v * 100}%`, "--from": `${0.6 + i * 0.05}`, "--dur": `${2.6 + i * 0.3}s`, "--delay": `${-i * 0.4}s` } as Vars}
                />
              ))}
            </div>
          </div>
        </Item>
      </Scene>
      <ConceptBadge>Product concept illustration</ConceptBadge>
    </figure>
  );
}
