/**
 * Hero pictures for the inner pages. Each tells its page's main idea in its own
 * medium, so no two heroes look alike:
 * /work: problem → product, slide by slide · /about: jargon becoming plain
 * words · /contact: a photo with glass interface cards. Decorative (aria-hidden inside).
 *
 * Contact photo (free licence, no attribution required): Unsplash UK78i6vK3sc.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, CircleAlert, MessageSquareText, Send, ShieldCheck, Smile, User, Zap, type LucideIcon } from "lucide-react";
import { productConcepts } from "@/content/concepts";
import type { ProductConcept } from "@/content/types";
import { cn } from "@/lib/utils";
import { ConceptBadge, Item, Scene, type Vars } from "./scene";

/** A soft pool of light behind part of a scene. */
function Light({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return <div className="absolute rounded-full" style={{ left: x, top: y, width: size, height: size, background: `${color}26`, filter: `blur(${Math.round(size / 4)}px)`, transform: "translateZ(-120px)" }} />;
}

/** A framed glass panel in an accent colour. */
function Glass({ accent, className, children }: { accent: string; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn("relative h-full overflow-hidden rounded-[14px] border-[1.5px] bg-linear-to-b from-[#22314a]/95 to-[#141d2e]/95 backdrop-blur-md", className)}
      style={{ borderColor: `${accent}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 36px -8px ${accent}aa, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {children}
    </div>
  );
}

/* ---------- /work: every product starts with a problem worth solving ---------- */

const kindLabel: Record<ProductConcept["kind"], string> = { saas: "SaaS Platform", mvp: "MVP", ai: "AI Product", custom: "Custom Software" };

/** One slide per product, 6s each (the reel's keyframes are in twelfths of the loop). */
const SLIDE_SECONDS = 6;

/**
 * The page's idea, slide by slide: a real problem in plain words on the left,
 * the product that solves it on the right. Anyone reads it as "problem in,
 * product out". Sized so the hero copy and the reel fit one screen.
 */
/** The reel shows three products of each kind: twelve slides, matching its keyframes. */
const reelProducts = (["saas", "mvp", "ai", "custom"] as const).flatMap((k) => productConcepts.filter((c) => c.kind === k).slice(0, 3));

export function WorkHeroArt() {
  const loop = SLIDE_SECONDS * reelProducts.length;
  const delay = (i: number) => `${loop - i * SLIDE_SECONDS}s`;
  return (
    <figure className="m-0" aria-label="Problem to product: each slide shows a real problem in plain words and the product that solves it.">
      <div className="relative">
        <div aria-hidden className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(closest-side,rgb(109_225_210/0.2),transparent)] blur-[30px]" />
        <div
          aria-hidden
          className="relative h-[clamp(240px,calc(100svh-35rem),620px)] overflow-hidden rounded-[22px] border-[1.5px] border-mint-400/60 bg-[#0b1220] shadow-[0_0_80px_-20px_rgb(109_225_210/0.7),0_50px_90px_-40px_rgb(0_0_0/0.9)]"
        >
          {reelProducts.map((c, i) => (
            <div key={c.slug} className="nm-reel absolute inset-0 grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)]" style={{ "--reel": `${loop}s`, "--delay": delay(i), "--ro": i === 0 ? "1" : "0" } as Vars}>
              {/* the problem */}
              <div className="relative hidden flex-col justify-center gap-4 bg-linear-to-br from-[#2a1d24] to-[#141a28] p-7 sm:flex lg:p-9">
                <span className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-[0.14em] text-[#f08a6b] uppercase">
                  <CircleAlert className="size-4" strokeWidth={2.5} /> The problem
                </span>
                <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-[-0.01em] text-white">“{c.problem}”</p>
              </div>
              {/* the turn: problem → product */}
              <div className="relative z-10 hidden items-center sm:flex">
                <span className="-mx-6 grid size-12 place-items-center rounded-full bg-mint-400 text-navy-900 shadow-[0_0_0_6px_#0b1220,0_0_30px_rgb(109_225_210/0.8)]">
                  <ArrowRight className="size-6" strokeWidth={2.5} />
                </span>
              </div>
              {/* the product */}
              <div className="relative">
                <Image src={c.image.src} alt="" fill priority={i < 2} sizes="(min-width: 1280px) 700px, 100vw" className="object-cover" style={{ objectPosition: "50% 0%" }} />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-[#0b1220]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3.5 sm:left-9">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[13px] font-display text-[22px] font-bold text-[#0b1220]" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}99)`, boxShadow: `0 0 24px ${c.accent}aa` }}>
                    {c.name[0]}
                  </span>
                  <span>
                    <span className="block font-mono text-[11.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: c.accent }}>
                      The product · {kindLabel[c.kind]}
                    </span>
                    <span className="font-display block text-[clamp(1.5rem,2.4vw,2.125rem)] leading-tight font-semibold tracking-[-0.02em] text-white">{c.name}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute right-5 bottom-5 hidden items-center gap-1.5 lg:flex">
            {reelProducts.map((c, i) => (
              <span key={c.slug} className="nm-reel-dot block h-2 w-2 rounded-full bg-white/30" style={{ "--reel": `${loop}s`, "--delay": delay(i) } as Vars} />
            ))}
          </div>
        </div>
      </div>
      <ConceptBadge>From a real problem to a real product</ConceptBadge>
    </figure>
  );
}

/* ---------- /about: serious engineering, explained in plain language ---------- */

/** Tech jargon, the way it often reaches founders: many words, little meaning. */
const jargon: { t: string; x: number; y: number; r: number; blur: number }[] = [
  { t: "Kubernetes", x: 6, y: 30, r: -8, blur: 0 },
  { t: "OAuth 2.0", x: 112, y: 6, r: 6, blur: 1 },
  { t: "p95 latency", x: 30, y: 92, r: 4, blur: 0.5 },
  { t: "CI/CD", x: 150, y: 70, r: -5, blur: 0 },
  { t: "sharding", x: 0, y: 150, r: 7, blur: 1.2 },
  { t: "API gateway", x: 92, y: 132, r: -3, blur: 0 },
  { t: "LLM evals", x: 40, y: 206, r: -7, blur: 0.6 },
  { t: "microservices", x: 120, y: 196, r: 5, blur: 0 },
  { t: "SSO / SAML", x: 10, y: 262, r: 3, blur: 1 },
  { t: "CDN edge cache", x: 104, y: 252, r: -4, blur: 0.4 },
];

/** What it means for you, in plain words. */
const meanings: { icon: LucideIcon; label: string; accent: string }[] = [
  { icon: ShieldCheck, label: "Safe", accent: "#6de1d2" },
  { icon: Zap, label: "Fast", accent: "#f6b26b" },
  { icon: Smile, label: "Easy to use", accent: "#b794f6" },
];

const toLens = "M232 160 C 250 160, 262 160, 280 160";

export function AboutHeroArt() {
  return (
    <figure className="m-0" aria-label="A cloud of confusing technical words passes through a lens and comes out as three plain words: safe, fast, easy to use.">
      <Scene width={580} height={330} phase="-7s">
        <Light x={0} y={40} size={260} color="#6ea8ff" />
        <Light x={330} y={40} size={260} color="#6de1d2" />
        {/* the jargon: tangled, slightly blurred */}
        <Item x={0} y={10} w={232} h={300} z={-50} enter={200} float="-5px" floatDur="8s">
          <div className="relative h-full">
            {jargon.map((j) => (
              <span
                key={j.t}
                className="absolute rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[12px] whitespace-nowrap text-white/70"
                style={{ left: j.x, top: j.y, transform: `rotate(${j.r}deg)`, filter: j.blur ? `blur(${j.blur}px)` : undefined }}
              >
                {j.t}
              </span>
            ))}
            <span className="absolute -top-1 left-1 grid size-9 place-items-center rounded-full bg-white/10 font-display text-[20px] font-bold text-white/70">?</span>
          </div>
        </Item>
        {/* the lens: we translate */}
        <svg className="absolute inset-0 overflow-visible" width="580" height="330" viewBox="0 0 580 330" fill="none" aria-hidden style={{ filter: "drop-shadow(0 0 6px #6de1d2)" }}>
          <path d={toLens} stroke="#6ea8ff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
          <path d="M330 160 C 342 160, 350 160, 366 160" stroke="#6de1d2" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <Item x={270} y={120} w={70} h={80} z={20} enter={500} float="0px">
          <div className="relative h-full">
            <div className="nm-core absolute inset-0 rounded-full blur-[10px]" style={{ background: "radial-gradient(circle, #ffffff, #6de1d2 40%, transparent 70%)" }} />
            <div className="absolute inset-[6px] rounded-[50%] border-[3px] border-mint-400 shadow-[0_0_22px_rgb(109_225_210/0.8),inset_0_0_14px_rgb(109_225_210/0.6)]" />
          </div>
        </Item>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="nm-particle absolute top-0 left-0 size-2.5 rounded-full bg-mint-400 shadow-[0_0_12px_3px_rgb(109_225_210/0.75)]"
            style={{ offsetPath: `path("${toLens} L 366 160")`, "--dur": "2s", "--delay": `${i * 0.66}s` } as Vars}
          />
        ))}
        {/* plain words: three big, friendly answers */}
        {meanings.map((m, i) => {
          const Icon = m.icon;
          return (
            <Item key={m.label} x={366} y={14 + i * 104} w={214} h={88} z={50 + i * 10} enter={800 + i * 150} float="-7px" floatDur="6.5s" floatDelay={`${-i * 1.5}s`}>
              <div
                className="flex h-full items-center gap-3.5 rounded-[18px] border-[1.5px] bg-linear-to-b from-[#22314a]/95 to-[#141d2e]/95 px-3.5"
                style={{ borderColor: `${m.accent}aa`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 36px -8px ${m.accent}, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-[15px]" style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}99)`, boxShadow: `0 0 22px ${m.accent}99` }}>
                  <Icon aria-hidden className="size-7 text-[#0b1220]" strokeWidth={2.25} />
                </span>
                <span className="font-display text-[24px] leading-tight font-semibold text-white">{m.label}</span>
              </div>
            </Item>
          );
        })}
      </Scene>
      <ConceptBadge>Engineering, in plain words</ConceptBadge>
    </figure>
  );
}

/* ---------- /contact: tell us what you're building, a person replies ---------- */

export function ContactHeroArt() {
  return (
    <figure className="m-0" aria-label="A founder writing on a laptop; their idea is sent and a person from the studio replies.">
      <Scene width={560} height={360} phase="-2s">
        <Light x={120} y={40} size={320} color="#6de1d2" />
        {/* the founder, writing */}
        <Item x={50} y={20} w={460} h={300} z={-40} enter={150} float="-3px" floatDur="8s">
          <div
            className="relative h-full overflow-hidden rounded-[18px] border-[1.5px] border-mint-400/60 bg-[#0b1220]"
            style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 60px -12px rgb(109 225 210 / 0.6), 0 40px 70px -24px rgb(0 0 0 / 0.85)" }}
          >
            <Image src="/img/contact/hero.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" style={{ objectPosition: "40% 55%" }} />
            <div className="absolute inset-0 bg-linear-to-br from-[#0b1220]/10 via-transparent to-[#0b1220]/70" />
          </div>
        </Item>
        {/* their idea, sent */}
        <Item x={0} y={196} w={230} h={124} z={60} enter={600} float="-8px" floatDur="6.5s" floatDelay="-1s">
          <Glass accent="#6de1d2" className="px-3.5 py-3">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-white">
              <span className="grid size-7 place-items-center rounded-[8px] bg-linear-to-br from-mint-400 to-[#3fa7c9]">
                <MessageSquareText aria-hidden className="size-4 text-[#0b1220]" strokeWidth={2.5} />
              </span>
              Your idea
            </p>
            {["w-full", "w-[86%]", "w-[60%]"].map((w) => (
              <span key={w} className={cn("mt-2.5 block h-2 rounded-full bg-white/25", w)} />
            ))}
            <span className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-mint-400 shadow-[0_0_16px_rgb(109_225_210/0.8)]">
              <Send aria-hidden className="size-4 text-[#0b1220]" strokeWidth={2.5} />
            </span>
          </Glass>
        </Item>
        {/* a person replies */}
        <Item x={356} y={0} w={204} h={112} z={80} enter={1000} float="-10px" floatDur="6s" floatDelay="-3s">
          <Glass accent="#b794f6" className="px-3.5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative">
                <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-[#b794f6] to-[#8fb3ff]">
                  <User aria-hidden className="size-4 text-[#0b1220]" strokeWidth={2.5} />
                </span>
                <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#1b2638] bg-mint-400" />
              </span>
              <span className="text-[14px] font-semibold text-white">Reply</span>
            </div>
            <span className="mt-2.5 block h-2 w-full rounded-full bg-[#b794f6]/45" />
            <span className="mt-2 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 rounded-full bg-[#b794f6] motion-safe:animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </span>
          </Glass>
        </Item>
      </Scene>
      <ConceptBadge>Real people reply</ConceptBadge>
    </figure>
  );
}
