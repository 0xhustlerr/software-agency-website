/**
 * The engineering section's picture, for everyone (not only developers):
 * a laptop running a clean, live product, an "everything's working" status,
 * and four promises in plain words around it: safe, fast, always on, ready to
 * grow. Software that just works, at a glance.
 */
import Image from "next/image";
import { ShieldCheck, TrendingUp, Wifi, Zap, type LucideIcon } from "lucide-react";
import { ConceptBadge, Item, Scene } from "./scene";

const promises: { icon: LucideIcon; label: string; line: string; accent: string; x: number; y: number; z: number; delay: string }[] = [
  { icon: ShieldCheck, label: "Safe & secure", line: "Your data is protected", accent: "#6de1d2", x: -20, y: 20, z: 60, delay: "-1s" },
  { icon: Zap, label: "Fast", line: "Quick for every user", accent: "#f6b26b", x: 420, y: 20, z: 50, delay: "-3s" },
  { icon: Wifi, label: "Always on", line: "Works when people need it", accent: "#6ea8ff", x: -20, y: 340, z: 70, delay: "-2s" },
  { icon: TrendingUp, label: "Ready to grow", line: "Grows with your users", accent: "#b794f6", x: 420, y: 340, z: 60, delay: "-4s" },
];

export function EngineeringArt() {
  return (
    <figure className="m-0" aria-label="A laptop running a live product with an everything’s working status, and four promises: safe and secure, fast, always on, and ready to grow.">
      <Scene width={600} height={430} phase="-4s">
        <div className="absolute inset-[-20px] rounded-[40px] bg-[radial-gradient(closest-side,rgb(109_225_210/0.18),transparent)] blur-[20px]" style={{ transform: "translateZ(-90px)" }} />
        {/* a laptop running a real, live product */}
        <Item x={40} y={64} w={520} h={330} enter={150} float="-4px" floatDur="8s">
          <div className="flex h-full flex-col items-center">
            <div className="w-full flex-1 rounded-t-[14px] border-[1.5px] border-mint-400/60 bg-[#0b1220] p-2 shadow-[0_0_70px_-14px_rgb(109_225_210/0.7)]">
              <div className="relative h-full overflow-hidden rounded-[8px]">
                <Image src="/img/concepts/plausible.webp" alt="" fill sizes="(min-width: 1024px) 35vw, 80vw" className="object-cover object-top" />
              </div>
            </div>
            <div className="h-3 w-[112%] rounded-b-[12px] bg-linear-to-b from-[#3a4b66] to-[#1a2538] shadow-[0_24px_40px_-10px_rgb(0_0_0/0.8)]" />
          </div>
        </Item>
        {/* everything's working */}
        <Item x={190} y={8} w={220} h={44} z={80} enter={500} float="-6px" floatDur="5.5s">
          <div className="flex h-full items-center justify-center gap-2.5 rounded-full border-[1.5px] border-mint-400/70 bg-[#0b1220]/90 shadow-[0_0_30px_-6px_rgb(109_225_210/0.8)] backdrop-blur-md">
            <span className="relative flex size-3">
              <span className="absolute inset-0 rounded-full bg-mint-400 motion-safe:animate-ping" />
              <span className="relative size-3 rounded-full bg-mint-400" />
            </span>
            <span className="font-display text-[16px] font-semibold text-white">Everything’s working</span>
          </div>
        </Item>
        {promises.map((p) => {
          const Icon = p.icon;
          return (
            <Item key={p.label} x={p.x} y={p.y} w={214} h={74} z={p.z} enter={600} float="-8px" floatDur="6.5s" floatDelay={p.delay}>
              <div
                className="flex h-full items-center gap-3 rounded-[16px] border-[1.5px] bg-linear-to-b from-[#22314a]/95 to-[#141d2e]/95 px-3 backdrop-blur-md"
                style={{ borderColor: `${p.accent}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 36px -8px ${p.accent}aa, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[11px]" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`, boxShadow: `0 0 20px ${p.accent}88` }}>
                  <Icon aria-hidden className="size-5 text-[#0b1220]" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="font-display block text-[16.5px] leading-tight font-semibold whitespace-nowrap text-white">{p.label}</span>
                  <span className="block text-[12.5px] leading-snug font-medium whitespace-nowrap" style={{ color: p.accent }}>
                    {p.line}
                  </span>
                </span>
              </div>
            </Item>
          );
        })}
      </Scene>
      <ConceptBadge>Software that just works</ConceptBadge>
    </figure>
  );
}
