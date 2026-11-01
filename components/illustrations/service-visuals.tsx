/**
 * Service pictures, one per core service: a real photo of the service's
 * purpose in its own colour (the hero's palette), with floating cards that
 * name what we deliver. Tilted 3D stages, decorative (aria-hidden by the
 * caller), always dark so they read on navy stages and light panels.
 *
 * Photos (free licences, no attribution required, stored in public/img/services/; not public/services, which proxy.ts answers with 404):
 * MVP planning: Unsplash TSyD0nGc0Bs · custom software in a warehouse:
 * Unsplash 4kjtbC-wMHs · SaaS dashboard: Unsplash photo-1460925895917-afdab827c52f ·
 * AI: Unsplash FHgWFzDDAOs.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { CalendarClock, Check, LayoutDashboard, LockKeyhole, MapPin, Rocket, Sparkles, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";
import { Item, Scene } from "./scene";

const W = 440;
const H = 330;

interface Look {
  src: string;
  /** Focal point of the photo inside the card. */
  position: string;
  accent: string;
  /** Colour grade blended over the photo. */
  grade: string;
  icon: LucideIcon;
}

/** A floating glass card, framed in the service's colour. */
function Chip({ accent, className, children }: { accent: string; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn("relative h-full overflow-hidden rounded-[12px] border-[1.5px] bg-linear-to-b from-[#22314a] to-[#141d2e] text-left", className)}
      style={{ borderColor: `${accent}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 30px -8px ${accent}99, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
    >
      {children}
    </div>
  );
}

function Tile({ accent, icon: Icon, size = 28 }: { accent: string; icon: LucideIcon; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-[8px]" style={{ width: size, height: size, background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 0 16px ${accent}88` }}>
      <Icon aria-hidden className="text-[#0b1220]" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.5} />
    </span>
  );
}

/** The photo, framed and graded in the service's colour, with its icon in the corner. */
function Photo({ look }: { look: Look }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[16px] border-[1.5px] bg-[#0b1220]"
      style={{ borderColor: `${look.accent}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 60px -12px ${look.accent}99, 0 40px 70px -24px rgb(0 0 0 / 0.85)` }}
    >
      <Image src={look.src} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" style={{ objectPosition: look.position }} />
      <div className={cn("absolute inset-0 bg-linear-to-br mix-blend-color", look.grade)} />
      <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/80 via-transparent to-[#0b1220]/20" />
      <span className="absolute top-3 left-3">
        <Tile accent={look.accent} icon={look.icon} size={36} />
      </span>
    </div>
  );
}

/** Stage shared by all four: the photo on the left, floating cards on the right. */
function PhotoScene({ look, phase, children }: { look: Look; phase: string; children: ReactNode }) {
  return (
    <Scene width={W} height={H} phase={phase}>
      <div className="absolute top-[40px] left-[60px] size-[300px] rounded-full blur-[70px]" style={{ background: `${look.accent}22`, transform: "translateZ(-80px)" }} />
      <Item x={0} y={22} w={360} h={270} enter={150} float="-3px" floatDur="8s">
        <Photo look={look} />
      </Item>
      {children}
    </Scene>
  );
}

const mvp: Look = { src: "/img/services/mvp.webp", position: "center 40%", accent: "#f6b26b", grade: "from-[#f6b26b]/30 to-[#e8734a]/15", icon: Rocket };
const custom: Look = { src: "/img/services/custom.webp", position: "center 42%", accent: "#6ea8ff", grade: "from-[#6ea8ff]/30 to-[#3d5afe]/15", icon: Workflow };
const saas: Look = { src: "/img/services/saas.webp", position: "center 40%", accent: "#6de1d2", grade: "from-[#6de1d2]/25 to-[#3fa7c9]/15", icon: LayoutDashboard };
const ai: Look = { src: "/img/services/ai.webp", position: "center", accent: "#b794f6", grade: "from-[#b794f6]/25 to-[#7c6cf0]/15", icon: Sparkles };

/** MVP: deciding what ships first, then shipping it. */
function MvpVisual() {
  const a = mvp.accent;
  return (
    <PhotoScene look={mvp} phase="-3s">
      <Item x={250} y={0} w={190} h={64} z={50} enter={700} float="-7px" floatDur="7s" floatDelay="-2s">
        <Chip accent={a} className="px-3.5 py-2.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-white">v1 ships</span>
            <span className="font-mono text-[10.5px]" style={{ color: a }}>
              in 6 weeks
            </span>
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-[40%] rounded-full" style={{ background: `linear-gradient(90deg, ${a}, #e8734a)` }} />
          </div>
        </Chip>
      </Item>
      <Item x={280} y={200} w={160} h={112} z={70} enter={950} float="-9px" floatDur="6s" floatDelay="-4s">
        <Chip accent={a} className="px-3.5 py-3">
          <p className="text-[12px] font-semibold text-white">Must-haves</p>
          <p className="font-display mt-1 text-[30px] leading-none font-semibold tracking-[-0.03em] text-white">
            3 <span className="text-[13px] font-medium tracking-normal text-white/60">of 12 ideas</span>
          </p>
          <div className="mt-3 grid grid-cols-12 gap-[3px]">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="h-2 rounded-[2px]" style={{ background: i < 3 ? a : "rgb(255 255 255 / 0.12)" }} />
            ))}
          </div>
        </Chip>
      </Item>
    </PhotoScene>
  );
}

/** Custom software: the operation's workflow, in the hands of the people who run it. */
function CustomVisual() {
  const a = custom.accent;
  const steps = ["Quote", "Approve", "Schedule", "Invoice"];
  return (
    <PhotoScene look={custom} phase="-6s">
      <Item x={230} y={0} w={210} h={74} z={50} enter={700} float="-7px" floatDur="7s" floatDelay="-2s">
        <Chip accent={a} className="px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white">
            <CalendarClock aria-hidden className="size-3.5" style={{ color: a }} strokeWidth={2.5} /> Workflow
          </p>
          <div className="mt-2.5 flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <span className="grid size-5 place-items-center rounded-full" style={{ background: i < 3 ? a : "rgb(255 255 255 / 0.14)" }}>
                  {i < 2 ? <Check aria-hidden className="size-3 text-[#0b1220]" strokeWidth={3.5} /> : <span className="size-1.5 rounded-full bg-[#0b1220]" />}
                </span>
                {i < steps.length - 1 ? <span className="h-0.5 flex-1" style={{ background: i < 2 ? a : "rgb(255 255 255 / 0.14)" }} /> : null}
              </div>
            ))}
          </div>
        </Chip>
      </Item>
      <Item x={270} y={214} w={170} h={86} z={70} enter={950} float="-9px" floatDur="6s" floatDelay="-4s">
        <Chip accent={a} className="px-3.5 py-3">
          <p className="text-[12px] font-semibold text-white">Job #1042</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px]" style={{ color: a }}>
            <MapPin aria-hidden className="size-3.5" strokeWidth={2.5} />
            En route · 14 min
          </p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-[70%] rounded-full" style={{ background: a }} />
          </div>
        </Chip>
      </Item>
    </PhotoScene>
  );
}

/** SaaS: a product people subscribe to, growing and secure. */
function SaasVisual() {
  const a = saas.accent;
  return (
    <PhotoScene look={saas} phase="-9s">
      <Item x={270} y={0} w={170} h={104} z={50} enter={700} float="-7px" floatDur="7s" floatDelay="-2s">
        <Chip accent={a} className="px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white/70">
            <TrendingUp aria-hidden className="size-3.5" style={{ color: a }} strokeWidth={2.5} /> MRR
          </p>
          <p className="font-display mt-0.5 text-[26px] leading-tight font-semibold tracking-[-0.03em] text-white">$24.8k</p>
          <svg className="mt-1 block" width="140" height="26" viewBox="0 0 140 26" fill="none" aria-hidden>
            <path d="M1 24 C 18 22, 26 14, 40 15 S 64 20, 78 12 S 104 4, 118 6 S 134 2, 139 1" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </Chip>
      </Item>
      <Item x={250} y={226} w={190} h={64} z={70} enter={950} float="-9px" floatDur="6s" floatDelay="-4s">
        <Chip accent={a} className="flex items-center gap-2.5 px-3">
          <Tile accent={a} icon={LockKeyhole} />
          <div>
            <p className="text-[12.5px] font-semibold text-white">SAML SSO</p>
            <p className="text-[11px]" style={{ color: a }}>
              Enforced
            </p>
          </div>
        </Chip>
      </Item>
    </PhotoScene>
  );
}

/** AI: an assistant that drafts, grounded and confident, with a person deciding. */
function AiVisual() {
  const a = ai.accent;
  return (
    <PhotoScene look={ai} phase="-12s">
      <Item x={220} y={0} w={220} h={96} z={50} enter={700} float="-7px" floatDur="7s" floatDelay="-2s">
        <Chip accent={a} className="px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: a }}>
            <Sparkles aria-hidden className="size-3.5" strokeWidth={2.5} /> Suggested reply
          </p>
          <p className="mt-1.5 text-[11.5px] leading-snug text-white">Yes — renewals can move to the 1st, prorated on your next invoice.</p>
        </Chip>
      </Item>
      <Item x={300} y={196} w={140} h={116} z={70} enter={950} float="-9px" floatDur="6s" floatDelay="-4s">
        <Chip accent={a} className="grid place-items-center px-3 py-2.5 text-center">
          <div className="relative size-[52px]">
            <svg className="absolute inset-0 -rotate-90" width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
              <circle cx="26" cy="26" r="22" stroke="rgb(255 255 255 / 0.12)" strokeWidth="5" />
              <circle cx="26" cy="26" r="22" stroke={a} strokeWidth="5" strokeLinecap="round" pathLength={100} strokeDasharray="94 100" />
            </svg>
            <span className="font-display absolute inset-0 grid place-items-center text-[14px] font-semibold text-white">94%</span>
          </div>
          <p className="text-[11.5px] font-semibold text-white">Confidence</p>
          <p className="text-[10.5px] text-white/60">human review on</p>
        </Chip>
      </Item>
    </PhotoScene>
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
