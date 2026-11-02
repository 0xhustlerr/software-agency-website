import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, Code2, Compass, LayoutDashboard, Lightbulb, PenTool, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { Item, type Vars } from "@/components/illustrations/scene";
import { cn } from "@/lib/utils";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";

/**
 * "You bring the idea, we deliver the product", as a picture on a flat stage
 * so everything stays readable: the idea on the left, the four steps we take
 * it through in the middle, and the product, live, on the right, one kind at
 * a time. One 16s clock: every 4s the steps light up in order, a burst rides
 * the beam, and the next product appears. Colours follow the product.
 *
 * Photos (free licences, no attribution required, stored in public/hero/):
 * brain: Unsplash h6R3zA7vZI4 · MVP sketches: Unsplash weRQAu9TA-A ·
 * SaaS dashboard: Unsplash JKUTrJ4vK00 · AI assistant: Unsplash BlWbfrQrI5k ·
 * custom software: Unsplash LJ9KY8pIH3E.
 */

const products: { src: string; label: string; promise: string; icon: LucideIcon; position: string; accent: string }[] = [
  { src: "/hero/product-mvp.webp", label: "MVPs", promise: "From sketch to first users", icon: Rocket, position: "center 45%", accent: "#f6b26b" },
  { src: "/hero/product-saas.webp", label: "SaaS Platforms", promise: "Built to scale and grow", icon: LayoutDashboard, position: "center", accent: "#6de1d2" },
  { src: "/hero/product-ai.webp", label: "AI Products", promise: "Intelligence users can trust", icon: Sparkles, position: "center 45%", accent: "#b794f6" },
  { src: "/hero/product-custom.webp", label: "Custom Software", promise: "Shaped around how you work", icon: Code2, position: "center 40%", accent: "#6ea8ff" },
];

/** Each card's place on the 16s clock: one in view at a time, 4s each. */
const delays = ["0s", "-12s", "-8s", "-4s"];

/** The idea: the brain photo (black baked into transparency) masks a white-to-accent gradient; it pulses on each beat. */
function IdeaBrain({ size }: { size: number }) {
  const mask = "url(/hero/brain-glow.webp) center / contain no-repeat";
  return (
    <div className="nm-think relative" style={{ width: size, height: size }}>
      <div className="absolute inset-[12%] rounded-full blur-[26px]" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--nm-hue) 55%, transparent), transparent 70%)" }} />
      <div className="absolute inset-0" style={{ filter: "drop-shadow(0 0 14px var(--nm-hue))" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #ffffff 10%, var(--nm-hue) 60%)", mask, WebkitMask: mask }} />
      </div>
    </div>
  );
}

/** What we take the idea through: the proof of "complete". */
const steps: { label: string; icon: LucideIcon }[] = [
  { label: "Plan", icon: Compass },
  { label: "Design", icon: PenTool },
  { label: "Build", icon: Code2 },
  { label: "Launch", icon: Rocket },
];

/** The four steps in a row, lighting up in order on each 4s beat. Sits on the beam. */
function Steps({ x, y, tile, text }: { x: number; y: number; tile: number; text: number }) {
  return (
    <ol className="absolute flex items-center gap-2.5" style={{ left: x, top: y }}>
      {steps.map((st, i) => {
        const Icon = st.icon;
        return (
          <li
            key={st.label}
            className="nm-step grid place-items-center gap-2 rounded-[16px] border-[1.5px] bg-[#141d2e] py-4"
            style={{ width: tile, borderColor: "var(--nm-hue)", boxShadow: "0 0 26px -8px var(--nm-hue)", "--delay": `${i}s` } as Vars}
          >
            <span className="grid size-14 place-items-center rounded-[14px] text-[#0b1220]" style={{ background: "var(--nm-hue)" }}>
              <Icon aria-hidden className="size-7" strokeWidth={2.25} />
            </span>
            <span className="font-display font-semibold text-white" style={{ fontSize: text }}>
              {st.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The same steps as a column, for narrow screens: top to bottom, with arrows between. */
function StepsColumn() {
  return (
    <ol className="flex w-full max-w-[280px] flex-col items-center gap-2">
      {steps.map((st, i) => {
        const Icon = st.icon;
        return (
          <Fragment key={st.label}>
            {i > 0 ? <ArrowDown aria-hidden className="size-5" style={{ color: "var(--nm-hue)" }} strokeWidth={2.5} /> : null}
            <li
              className="nm-step flex w-full items-center gap-4 rounded-[14px] border-[1.5px] bg-[#141d2e] px-3.5 py-2.5"
              style={{ borderColor: "var(--nm-hue)", boxShadow: "0 0 22px -8px var(--nm-hue)", "--delay": `${i}s` } as Vars}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] text-[#0b1220]" style={{ background: "var(--nm-hue)" }}>
                <Icon aria-hidden className="size-5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-[1.25rem] font-semibold text-white">{st.label}</span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}

/** A short glowing line joining the pieces of the column. */
function Link() {
  return <span aria-hidden className="h-7 w-[3px] rounded-full" style={{ background: "var(--nm-hue)", boxShadow: "0 0 10px var(--nm-hue)" }} />;
}

/** The beam: a solid light from the brain, through the portal, into the front card, with a burst on every beat. */
function Beam({ d, w, h }: { d: string; w: number; h: number }) {
  return (
    <svg className="absolute inset-0 overflow-visible" width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden style={{ filter: "drop-shadow(0 0 6px var(--nm-hue))" }}>
      <path d={d} stroke="var(--nm-hue)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      <path d={d} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      <path d={d} pathLength={1} stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeDasharray="0.16 1.2" className="nm-burst" />
    </svg>
  );
}

/** The product, live: one card at a time, flat and fully readable. */
function ProductCards({ box, small }: { box: CSSProperties; small?: boolean }) {
  return (
    <>
      {products.map((p, i) => {
        const Icon = p.icon;
        return (
          <div key={p.src} className="nm-solo absolute" style={{ ...box, "--delay": delays[i], "--so": i === 0 ? "1" : "0" } as Vars}>
            <div
              className="relative h-full overflow-hidden rounded-[18px] border-[1.5px] bg-[#0b1220]"
              style={{ borderColor: `${p.accent}cc`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 70px -12px ${p.accent}aa, 0 40px 70px -24px rgb(0 0 0 / 0.85)` }}
            >
              <div className="nm-kb absolute inset-0" style={{ "--delay": delays[i] } as Vars}>
                <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 36vw, 80vw" className="object-cover" style={{ objectPosition: p.position }} />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-transparent to-transparent" />
              <div className="nm-scan absolute inset-x-0 h-[3px]" style={{ background: p.accent, boxShadow: `0 0 18px 4px ${p.accent}`, "--delay": delays[i] } as Vars} />
              <div className="absolute inset-x-3.5 bottom-3.5 flex items-center gap-3.5 overflow-hidden rounded-[14px] border border-white/10 bg-[#0b1220]/90 px-3.5 py-3 text-left">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />
                <span className={cn("grid shrink-0 place-items-center rounded-[14px]", small ? "size-11" : "size-16")} style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`, boxShadow: `0 0 22px ${p.accent}88` }}>
                  <Icon aria-hidden className={cn("text-[#0b1220]", small ? "size-6" : "size-8")} strokeWidth={2.25} />
                </span>
                <span className="min-w-0">
                  <span className={cn("font-display block leading-tight font-semibold tracking-[-0.02em] text-white", small ? "text-[20px]" : "text-[32px]")}>{p.label}</span>
                  <span className={cn("mt-0.5 block font-medium", small ? "text-[14px]" : "text-[20px]")} style={{ color: p.accent }}>
                    {p.promise}
                  </span>
                </span>
              </div>
            </div>
            <div className="nm-flash pointer-events-none absolute inset-0 rounded-[18px]" style={{ boxShadow: `0 0 0 2px ${p.accent}, 0 0 60px 6px ${p.accent}`, "--delay": delays[i] } as Vars} />
          </div>
        );
      })}
    </>
  );
}

/** The glossy floor the products stand on. */
function Floor({ cx, y, w }: { cx: number; y: number; w: number }) {
  return (
    <>
      <div className="absolute h-[120px] rounded-[50%] blur-[16px]" style={{ left: cx - w / 2, top: y, width: w, background: "radial-gradient(closest-side, color-mix(in srgb, var(--nm-hue) 30%, transparent), transparent)", transform: "translateZ(-60px)" }} />
      <div className="absolute h-px" style={{ left: cx - w / 2, top: y + 22, width: w, background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--nm-hue) 70%, transparent), transparent)", transform: "translateZ(-60px)" }} />
    </>
  );
}

/** A glowing pill under each side: "Your idea" and "Your product, live". */
function Pill({ children, icon: Icon, accent }: { children: ReactNode; icon: LucideIcon; accent: string }) {
  return (
    <p className="flex justify-center whitespace-nowrap">
      <span
        className="font-display flex shrink-0 items-center gap-3 rounded-full border-2 py-2 pr-6 pl-2 text-[clamp(16px,1.6vw,23px)] font-semibold tracking-[0.02em] whitespace-nowrap text-white"
        style={{ borderColor: accent, background: `${accent}1f`, boxShadow: `0 0 36px -4px ${accent}, inset 0 0 18px -6px ${accent}` }}
      >
        <span className="grid size-[clamp(30px,2.8vw,40px)] place-items-center rounded-full text-navy-900" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)`, boxShadow: `0 0 20px ${accent}` }}>
          <Icon aria-hidden className="size-5" strokeWidth={2.5} />
        </span>
        <span className="whitespace-nowrap">{children}</span>
      </span>
    </p>
  );
}

/** A word lit in its colour, for the two key ideas. */
function Glow({ children, color }: { children: string; color: string }) {
  return (
    <span className="font-bold" style={{ color, textShadow: `0 0 18px ${color}` }}>
      {children}
    </span>
  );
}


/** Twinkling dust, deterministic so server and client agree. */
function Dust({ w, h, n }: { w: number; h: number; n: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
        const y = ((Math.sin(i * 78.233) * 12345.6789) % 1 + 1) % 1;
        return (
          <span
            key={i}
            className="nm-twinkle absolute size-[3px] rounded-full bg-white"
            style={{ left: Math.round(x * w), top: Math.round(y * h), opacity: 0.4, "--dur": `${2.4 + (i % 5) * 0.6}s`, "--delay": `${-(i % 7) * 0.5}s`, transform: `translateZ(${-90 + (i % 4) * 20}px)` } as Vars}
          />
        );
      })}
    </>
  );
}

/** Everything inside shares the 16s clock: the wrapper animates the accent colour. */
function Clock({ children, className = "absolute inset-0 [transform-style:preserve-3d]" }: { children: ReactNode; className?: string }) {
  return <div className={cn("nm-hue-cycle", className)}>{children}</div>;
}

const wideBeam = "M230 178 H 770";

/**
 * Hero composition. Wide screens read left to right on a scaled stage, with
 * the labels outside it so they stay one size. Narrow or portrait screens get
 * one column: your idea, the brain, the four steps, then your product.
 */
export function HeroVisual() {
  const yourIdea = (
    <Pill icon={Lightbulb} accent="#f6b26b">
      <Glow color="#f6b26b">Your idea</Glow>
    </Pill>
  );
  const yourProduct = (
    <Pill icon={Rocket} accent="#6de1d2">
      <Glow color="#6de1d2">Your product</Glow>, live
    </Pill>
  );
  return (
    <figure className="relative m-0" aria-label="You bring the idea: it goes through plan, design, build and launch, and comes out as your product, live: an MVP, a SaaS platform, an AI product or custom software.">
      <div className="relative hidden lg:block">
        <ScaledCanvas width={1200} height={356}>
          <div aria-hidden className="absolute inset-0">
            <Clock>
              <div className="absolute top-0 left-[380px] size-[440px] rounded-full bg-mint-400/[0.08] blur-[90px]" />
              <Dust w={1200} h={356} n={22} />
              <Floor cx={985} y={320} w={500} />
              <Item x={10} y={68} w={210} h={210} enter={200} float="-6px" floatDur="7s">
                <IdeaBrain size={210} />
              </Item>
              <Beam d={wideBeam} w={1200} h={356} />
              <Steps x={296} y={106} tile={90} text={21} />
              <ProductCards box={{ left: 770, top: 10, width: 430, height: 335 }} />
            </Clock>
          </div>
        </ScaledCanvas>
        {/* the two labels on their own line, under the idea and under the product */}
        <div className="relative mt-3 h-[3.75rem]">
          <div className="absolute top-0 left-[10%] -translate-x-1/2">{yourIdea}</div>
          <div className="absolute top-0 left-[82%] -translate-x-1/2">{yourProduct}</div>
        </div>
      </div>

      {/* Narrow or portrait screens: one column, top to bottom. */}
      <Clock className="flex flex-col items-center lg:hidden">
        {yourIdea}
        <div aria-hidden className="mt-3 contents">
          <IdeaBrain size={210} />
          <Link />
          <StepsColumn />
          <Link />
        </div>
        {yourProduct}
        <div aria-hidden className="relative mt-4 aspect-[4/3] w-full max-w-[520px]">
          <ProductCards box={{ inset: 0 }} small />
        </div>
      </Clock>
    </figure>
  );
}
