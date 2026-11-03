import { Lightbulb, MapPin, PenTool, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import { ConceptBadge, Item, Scene, type Vars } from "./scene";

/**
 * /services hero: "the right engineering for the stage you're at", as a 3D
 * staircase of the four engagement stages. Each step rises and lights up in
 * turn (the 16s clock, a 4s beat each) with a "you are here" marker riding it.
 * Reduced motion keeps the first step lit.
 */
const steps: { label: string; icon: LucideIcon; accent: string; delay: string }[] = [
  { label: "Idea", icon: Lightbulb, accent: "#f6b26b", delay: "0s" },
  { label: "Prototype", icon: PenTool, accent: "#b794f6", delay: "-12s" },
  { label: "Launch", icon: Rocket, accent: "#6ea8ff", delay: "-8s" },
  { label: "Growth", icon: TrendingUp, accent: "#6de1d2", delay: "-4s" },
];

const W = 132;
const GAP = 12;
const BASE = 372;

export function ServicesHeroArt() {
  return (
    <figure className="m-0" aria-label="Four steps rising from idea to prototype, launch and growth; each lights up in turn.">
      <Scene width={564} height={384} phase="-5s">
        <div className="absolute inset-x-[-20px] bottom-[-10px] h-[90px] rounded-[50%] bg-[radial-gradient(closest-side,rgb(109_225_210/0.22),transparent)] blur-[10px]" style={{ transform: "translateZ(-60px)" }} />
        {steps.map((s, i) => {
          const h = 124 + i * 60;
          const Icon = s.icon;
          const first = i === 0;
          return (
            <Item key={s.label} x={i * (W + GAP)} y={BASE - h} w={W} h={h} enter={150 + i * 140} float="0px">
              <div
                className="nm-lift relative h-full overflow-hidden rounded-[14px] border-[1.5px] bg-linear-to-b from-[#22314a] to-[#121b2b] text-left"
                style={
                  {
                    borderColor: `${s.accent}aa`,
                    boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 4px 0 #0d1626, 0 8px 0 #0a111e, 0 0 50px -12px ${s.accent}, 0 40px 60px -24px rgb(0 0 0 / 0.85)`,
                    "--delay": s.delay,
                    "--lz": first ? "46px" : "0px",
                    "--lb": first ? "1.1" : "0.65",
                  } as Vars
                }
              >
                {/* the step's coloured top surface */}
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent}66)`, boxShadow: `0 0 18px ${s.accent}` }} />
                <div className="absolute inset-x-0 top-0 h-24" style={{ background: `linear-gradient(180deg, ${s.accent}2a, transparent)` }} />
                <div className="relative p-3.5">
                  <span className="grid size-10 place-items-center rounded-[10px]" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}99)`, boxShadow: `0 0 18px ${s.accent}99` }}>
                    <Icon aria-hidden className="size-5 text-[#0b1220]" strokeWidth={2.25} />
                  </span>
                  <p className="mt-3 font-mono text-[11px] font-semibold tracking-[0.12em]" style={{ color: s.accent }}>
                    0{i + 1}
                  </p>
                  <p className="font-display text-[19px] leading-tight font-semibold text-white">{s.label}</p>
                </div>
              </div>
            </Item>
          );
        })}
        {/* "you are here": rides above whichever step is lit */}
        {steps.map((s, i) => (
          <Item key={`pin-${s.label}`} x={i * (W + GAP) + W / 2 - 18} y={BASE - (124 + i * 60) - 52} w={36} h={44} z={80} enter={900} float="-6px" floatDur="2.4s">
            <div className="nm-pin grid h-full place-items-center" style={{ "--delay": s.delay, "--po": i === 0 ? "1" : "0" } as Vars}>
              <MapPin aria-hidden className="size-9 drop-shadow-[0_0_10px_currentColor]" style={{ color: s.accent }} strokeWidth={2.25} fill={`${s.accent}55`} />
            </div>
          </Item>
        ))}
      </Scene>
      <ConceptBadge>Start where you are</ConceptBadge>
    </figure>
  );
}
