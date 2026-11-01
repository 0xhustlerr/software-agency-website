import Image from "next/image";
import type { ReactNode } from "react";
import { Code2, LayoutDashboard, Lightbulb, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge3D, Item, Scene, type Vars } from "@/components/illustrations/scene";

/**
 * Your idea → the product, told only in pictures. One 16s clock, four 4s
 * beats, one per product (MVPs, SaaS platforms, AI products, custom software).
 * In every beat the brain pulses, a burst of light rides the beam through the
 * studio's portal, and the next product turns to the front of a 3D carousel
 * and materialises in the spotlight. The brain, beam and spotlight take the
 * product's colour, so idea and product read as the same thing.
 *
 * Photos (free licences, no attribution required, stored in public/hero/):
 * brain: Unsplash h6R3zA7vZI4 · MVP sketches: Unsplash weRQAu9TA-A ·
 * SaaS dashboard: Unsplash JKUTrJ4vK00 · AI assistant: Unsplash BlWbfrQrI5k ·
 * custom software: Unsplash LJ9KY8pIH3E.
 */

const products: { src: string; label: string; promise: string; icon: LucideIcon; position: string; accent: string; grade: string }[] = [
  { src: "/hero/product-mvp.webp", label: "MVPs", promise: "From sketch to first users", icon: Rocket, position: "center 45%", accent: "#f6b26b", grade: "from-[#f6b26b]/35 to-[#e8734a]/20" },
  { src: "/hero/product-saas.webp", label: "SaaS Platforms", promise: "Built to scale and grow", icon: LayoutDashboard, position: "center", accent: "#6de1d2", grade: "from-[#6de1d2]/25 to-[#3fa7c9]/15" },
  { src: "/hero/product-ai.webp", label: "AI Products", promise: "Intelligence users can trust", icon: Sparkles, position: "center 45%", accent: "#b794f6", grade: "from-[#b794f6]/35 to-[#7c6cf0]/20" },
  { src: "/hero/product-custom.webp", label: "Custom Software", promise: "Shaped around how you work", icon: Code2, position: "center 40%", accent: "#6ea8ff", grade: "from-[#6ea8ff]/30 to-[#3d5afe]/15" },
];

/**
 * Where each card starts on the clock (card 0 in front; card 1 next, on the
 * right; card 2 at the back; card 3 just left, on the left), as a delay into
 * the 16s cycle, plus its still position for reduced motion.
 */
const start = [
  { delay: "0s", place: "front" },
  { delay: "-12s", place: "right" },
  { delay: "-8s", place: "back" },
  { delay: "-4s", place: "left" },
] as const;

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

/** The studio: three spinning rings around a core lit in the current product's colour. */
function Portal({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute -inset-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent,rgb(109_225_210/0.18),transparent_20%,rgb(63_167_201/0.16),transparent_45%,rgb(109_225_210/0.14),transparent_70%)] blur-[18px]" />
      <div className="nm-core absolute inset-[28%] rounded-full blur-[6px]" style={{ background: "radial-gradient(circle, #ffffff, var(--nm-hue) 38%, transparent 70%)" }} />
      <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateY(62deg)]">
        {[
          { inset: "0%", dur: "9s", dir: "normal", cls: "border-t-transparent border-l-transparent border-mint-400" },
          { inset: "12%", dur: "6s", dir: "reverse", cls: "border-b-transparent border-mint-400/80" },
          { inset: "24%", dur: "4s", dir: "normal", cls: "border-r-transparent border-[#3fa7c9]" },
        ].map((r) => (
          <div
            key={r.inset}
            className={cn("nm-spin absolute rounded-full border-[3px] shadow-[0_0_18px_rgb(109_225_210/0.55),inset_0_0_18px_rgb(109_225_210/0.35)]", r.cls)}
            style={{ inset: r.inset, "--dur": r.dur, "--dir": r.dir } as Vars}
          />
        ))}
      </div>
    </div>
  );
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

/**
 * The carousel: four photo cards around the front spot, turning one place per
 * beat. Direct stage children, so the 3D sorts them. `dx/dz` set the spread.
 */
function Carousel({ cx, cy, w, h, dx, dz }: { cx: number; cy: number; w: number; h: number; dx: number; dz: number }) {
  const still = {
    front: { sx: "0px", sy: "0px", sz: "0px", sr: "0deg", so: "1" },
    right: { sx: `${dx}px`, sy: "6px", sz: `${dz}px`, sr: "-38deg", so: "0.6" },
    back: { sx: "0px", sy: "-12px", sz: `${dz * 2}px`, sr: "0deg", so: "0.3" },
    left: { sx: `${-dx}px`, sy: "6px", sz: `${dz}px`, sr: "38deg", so: "0.6" },
  };
  return (
    <>
      {products.map((p, i) => {
        const st = start[i];
        const s = still[st.place];
        const front = st.place === "front";
        const Icon = p.icon;
        return (
          <div
            key={p.src}
            className="nm-flow absolute"
            style={
              {
                left: cx - w / 2,
                top: cy - h / 2,
                width: w,
                height: h,
                "--dx": `${dx}px`,
                "--dy": "6px",
                "--dz": `${dz}px`,
                "--sx": s.sx,
                "--sy": s.sy,
                "--sz": s.sz,
                "--sr": s.sr,
                "--so": s.so,
                "--delay": st.delay,
              } as Vars
            }
          >
            <div
              className="relative h-full overflow-hidden rounded-[16px] border-[1.5px] bg-[#0b1220]"
              style={{
                borderColor: `${p.accent}99`,
                boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 60px -10px ${p.accent}88, 0 40px 70px -24px rgb(0 0 0 / 0.85)`,
                WebkitBoxReflect: "below 10px linear-gradient(transparent 62%, rgb(255 255 255 / 0.22))",
              }}
            >
              <div className="nm-kb absolute inset-0" style={{ "--delay": st.delay } as Vars}>
                <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 32vw, 60vw" className="object-cover" style={{ objectPosition: p.position }} />
              </div>
              <div className={cn("absolute inset-0 bg-linear-to-br mix-blend-color", p.grade)} />
              <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/95 via-[#0b1220]/20 to-transparent" />
              {/* not yet built: grey and dim until the scan line passes */}
              <div className="nm-unveil absolute inset-0 backdrop-brightness-[0.45] backdrop-grayscale" style={{ "--uv": front ? "inset(100% 0 0 0)" : "inset(0 0 0 0)", "--delay": st.delay } as Vars} />
              <div className="nm-scan absolute inset-x-0 h-[3px]" style={{ background: p.accent, boxShadow: `0 0 18px 4px ${p.accent}`, "--delay": st.delay } as Vars} />
              <span
                className="absolute top-3 right-3.5 rounded-full border bg-[#0b1220]/70 px-2.5 py-0.5 font-mono text-[12px] font-semibold tracking-[0.12em]"
                style={{ color: p.accent, borderColor: `${p.accent}66` }}
              >
                {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 overflow-hidden rounded-[12px] border border-white/10 bg-[#0b1220]/75 px-3 py-2.5 text-left backdrop-blur-md">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px]" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`, boxShadow: `0 0 22px ${p.accent}88` }}>
                  <Icon aria-hidden className="size-5 text-[#0b1220]" strokeWidth={2.25} />
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-[20px] leading-tight font-semibold tracking-[-0.02em] text-white">{p.label}</span>
                  <span className="mt-0.5 block truncate text-[13px] font-medium" style={{ color: p.accent }}>
                    {p.promise}
                  </span>
                </span>
              </div>
            </div>
            {/* frame flash as the product materialises */}
            <div className="nm-flash pointer-events-none absolute inset-0 rounded-[16px]" style={{ boxShadow: `0 0 0 2px ${p.accent}, 0 0 60px 6px ${p.accent}`, "--delay": st.delay } as Vars} />
          </div>
        );
      })}
    </>
  );
}

/** The spotlight from the portal onto the front card, in the product's colour. */
function Spotlight({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <div
      className="absolute blur-[14px]"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        clipPath: "polygon(0 42%, 0 58%, 100% 100%, 100% 0)",
        background: "linear-gradient(90deg, color-mix(in srgb, var(--nm-hue) 45%, transparent), color-mix(in srgb, var(--nm-hue) 12%, transparent) 70%, transparent)",
        transform: "translateZ(-220px)",
      }}
    />
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

/** A glowing pill under each side: "Only idea" and "Complete product". */
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
function Clock({ children }: { children: ReactNode }) {
  return <div className="nm-hue-cycle absolute inset-0 [transform-style:preserve-3d]">{children}</div>;
}

const wideBeam = "M300 225 C 400 225, 440 245, 530 245 S 720 205, 790 200";
const compactBeam = "M240 130 C 290 130, 330 120, 410 120 S 350 280, 330 322";

/**
 * Hero composition. Wide screens get the left-to-right story; narrower ones a
 * stacked arrangement of the same pieces, so nothing becomes tiny.
 */
export function HeroVisual() {
  return (
    <figure className="relative m-0" aria-label="From idea to product: a glowing brain sends a beam of light through the studio, and in turn an MVP, a SaaS platform, an AI product and custom software step forward, built.">
      <div className="relative hidden lg:block">
        <Scene width={1200} height={470}>
          <Clock>
            <div className="absolute top-[40px] left-[380px] size-[460px] rounded-full bg-mint-400/[0.08] blur-[90px]" style={{ transform: "translateZ(-160px)" }} />
            <Dust w={1200} h={470} n={26} />
            <Spotlight x={600} y={40} w={560} h={330} />
            <Floor cx={955} y={330} w={620} />

            <Item x={10} y={50} w={320} h={320} z={20} enter={200} float="-8px" floatDur="7s">
              <IdeaBrain size={320} />
            </Item>
            <Item x={430} y={145} w={200} h={200} z={10} enter={350} float="0px">
              <Portal size={200} />
            </Item>
            <Beam d={wideBeam} w={1200} h={470} />

            <Carousel cx={955} cy={200} w={330} h={220} dx={225} dz={-160} />

          </Clock>
        </Scene>
        {/* the two labels on one flat line, same size: under the brain and under the products */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[3%] h-0">
          <div className="absolute left-[14%] -translate-x-1/2 -translate-y-1/2">
            <Pill icon={Lightbulb} accent="#f6b26b">
              ONLY <Glow color="#f6b26b">IDEA</Glow>
            </Pill>
          </div>
          <div className="absolute left-[79%] -translate-x-1/2 -translate-y-1/2">
            <Pill icon={Rocket} accent="#6de1d2">
              <Glow color="#6de1d2">COMPLETE</Glow> PRODUCT
            </Pill>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Scene width={640} height={660}>
          <Clock>
            <Dust w={640} h={660} n={16} />
            <Floor cx={330} y={530} w={520} />
            <Item x={-10} y={0} w={260} h={260} z={20} enter={200} float="-8px" floatDur="7s">
              <IdeaBrain size={260} />
            </Item>
            <Item x={330} y={40} w={160} h={160} z={10} enter={350} float="0px">
              <Portal size={160} />
            </Item>
            <Beam d={compactBeam} w={640} h={660} />
            <Carousel cx={330} cy={420} w={300} h={200} dx={170} dz={-140} />
            <Item x={-30} y={262} w={320} enter={500} float="0px">
              <Pill icon={Lightbulb} accent="#f6b26b">
                ONLY <Glow color="#f6b26b">IDEA</Glow>
              </Pill>
            </Item>
            <Item x={60} y={596} w={540} enter={800} float="0px">
              <Pill icon={Rocket} accent="#6de1d2">
                <Glow color="#6de1d2">COMPLETE</Glow> PRODUCT
              </Pill>
            </Item>
          </Clock>
        </Scene>
      </div>
      {/* In the scene's corner on desktop, so the hero fits one screen; below it on smaller screens. */}
      <figcaption className="mt-3 flex justify-end lg:absolute lg:top-0 lg:left-0 lg:mt-0">
        <Badge3D>From idea to product</Badge3D>
      </figcaption>
    </figure>
  );
}
