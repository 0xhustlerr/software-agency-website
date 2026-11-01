/**
 * The engineering section's picture, for everyone (not only developers): a
 * building rising on solid foundations, with four promises in plain words.
 * Strong foundations → software that's safe, fast, always on and ready to grow.
 *
 * Photo: Unsplash 9ZVDJjy5hfA (free licence, no attribution required).
 */
import Image from "next/image";
import { ShieldCheck, TrendingUp, Wifi, Zap, type LucideIcon } from "lucide-react";
import { ConceptBadge, Item, Scene } from "./scene";

const promises: { icon: LucideIcon; label: string; line: string; accent: string; x: number; y: number; z: number; delay: string }[] = [
  { icon: ShieldCheck, label: "Safe & secure", line: "Your data is protected", accent: "#6de1d2", x: 0, y: 40, z: 60, delay: "-1s" },
  { icon: Zap, label: "Fast", line: "Quick for every user", accent: "#f6b26b", x: 380, y: 10, z: 50, delay: "-3s" },
  { icon: Wifi, label: "Always on", line: "Works when people need it", accent: "#6ea8ff", x: 0, y: 300, z: 70, delay: "-2s" },
  { icon: TrendingUp, label: "Ready to grow", line: "Grows with your users", accent: "#b794f6", x: 380, y: 330, z: 60, delay: "-4s" },
];

export function EngineeringArt() {
  return (
    <figure className="m-0" aria-label="A tall building rising on strong foundations, with four promises: safe and secure, fast, always on, and ready to grow.">
      <Scene width={600} height={430} phase="-4s">
        <div className="absolute inset-[-20px] rounded-[40px] bg-[radial-gradient(closest-side,rgb(109_225_210/0.18),transparent)] blur-[20px]" style={{ transform: "translateZ(-90px)" }} />
        <Item x={110} y={20} w={380} h={390} enter={150} float="-3px" floatDur="8s">
          <div className="relative h-full overflow-hidden rounded-[20px] border-[1.5px] border-mint-400/60 bg-[#0b1220] shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_70px_-14px_rgb(109_225_210/0.7),0_40px_70px_-24px_rgb(0_0_0/0.85)]">
            <Image src="/img/home/foundations.webp" alt="" fill sizes="(min-width: 1024px) 35vw, 80vw" className="object-cover" style={{ objectPosition: "40% 40%" }} />
            <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/80 via-transparent to-[#0b1220]/10" />
          </div>
        </Item>
        {promises.map((p) => {
          const Icon = p.icon;
          return (
            <Item key={p.label} x={p.x} y={p.y} w={220} h={78} z={p.z} enter={600} float="-8px" floatDur="6.5s" floatDelay={p.delay}>
              <div
                className="flex h-full items-center gap-3 rounded-[16px] border-[1.5px] bg-linear-to-b from-[#22314a]/95 to-[#141d2e]/95 px-3 backdrop-blur-md"
                style={{ borderColor: `${p.accent}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 36px -8px ${p.accent}aa, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[13px]" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`, boxShadow: `0 0 20px ${p.accent}88` }}>
                  <Icon aria-hidden className="size-6 text-[#0b1220]" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="font-display block text-[19px] leading-tight font-semibold text-white">{p.label}</span>
                  <span className="block text-[13px] font-medium" style={{ color: p.accent }}>
                    {p.line}
                  </span>
                </span>
              </div>
            </Item>
          );
        })}
      </Scene>
      <ConceptBadge>Built to last</ConceptBadge>
    </figure>
  );
}
