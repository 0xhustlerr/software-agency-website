/**
 * Hero pictures for the inner pages. Each tells its page's main idea in its own
 * medium, so no two heroes look alike:
 * /work: device mockups · /about: code becoming plain language · /contact: a
 * photo with glass interface cards. Decorative (aria-hidden inside).
 *
 * Contact photo (free licence, no attribution required): Unsplash UK78i6vK3sc.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { Check, MessageSquareText, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { productConcepts } from "@/content/concepts";
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

/* ---------- /work: the concepts as real products, in browser windows and a phone ---------- */

/** A browser window around a screenshot: traffic lights, address bar, framed in the concept's colour. */
function Browser({ src, url, accent }: { src: string; url: string; accent: string }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[12px] border-[1.5px] bg-[#0e1626]"
      style={{ borderColor: `${accent}aa`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 50px -10px ${accent}aa, 0 40px 60px -24px rgb(0 0 0 / 0.85)` }}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-[#1a2538] px-3">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-full bg-white/[0.07] px-5 py-0.5 font-mono text-[10px] text-white/60">{url}</span>
      </div>
      <div className="relative flex-1">
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 26vw, 70vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

export function WorkHeroArt() {
  const [a, b, c] = productConcepts;
  return (
    <figure className="m-0" aria-label="Product concepts shown as real products: Qovery and Adaline in browser windows, Cofounder on a phone.">
      <Scene width={560} height={360} phase="-4s">
        <Light x={140} y={10} size={340} color="#6ea8ff" />
        <Light x={300} y={160} size={220} color="#f6b26b" />
        {a ? (
          <Item x={0} y={10} w={330} h={220} z={-90} enter={200} float="-5px" floatDur="8s" floatDelay="-2s">
            <Browser src={a.image.src} url={`${a.slug}.concept`} accent={a.accent} />
          </Item>
        ) : null}
        {b ? (
          <Item x={130} y={92} w={360} h={240} z={0} enter={400} float="-7px" floatDur="7s">
            <Browser src={b.image.src} url={`${b.slug}.concept`} accent={b.accent} />
          </Item>
        ) : null}
        {c ? (
          <Item x={452} y={150} w={104} h={200} z={70} enter={650} float="-10px" floatDur="6s" floatDelay="-3s">
            <div
              className="h-full rounded-[22px] border-[1.5px] bg-[#0b1220] p-1.5"
              style={{ borderColor: `${c.accent}cc`, boxShadow: `0 0 40px -8px ${c.accent}cc, 0 30px 50px -16px rgb(0 0 0 / 0.85)` }}
            >
              <div className="relative h-full overflow-hidden rounded-[17px]">
                <Image src={c.image.src} alt="" fill sizes="10vw" className="object-cover" style={{ objectPosition: "18% 30%" }} />
              </div>
            </div>
          </Item>
        ) : null}
      </Scene>
      <ConceptBadge>Product concepts</ConceptBadge>
    </figure>
  );
}

/* ---------- /about: serious engineering, explained in plain language ---------- */

const code: { t: string; c: string }[][] = [
  [{ t: "const", c: "#8fb3ff" }, { t: " cache ", c: "#e6edf7" }, { t: "=", c: "#8fb3ff" }, { t: " edge", c: "#6de1d2" }, { t: "({ ttl: 300 })", c: "#e6edf7" }],
  [{ t: "await", c: "#8fb3ff" }, { t: " db.replica.", c: "#e6edf7" }, { t: "read", c: "#6de1d2" }, { t: "(query)", c: "#e6edf7" }],
  [{ t: "backup", c: "#6de1d2" }, { t: ".schedule(", c: "#e6edf7" }, { t: "'0 2 * * *'", c: "#f6b26b" }, { t: ")", c: "#e6edf7" }],
  [{ t: "if", c: "#8fb3ff" }, { t: " (!user.", c: "#e6edf7" }, { t: "can", c: "#6de1d2" }, { t: "('billing'))", c: "#e6edf7" }],
  [{ t: "  throw", c: "#8fb3ff" }, { t: " new ", c: "#e6edf7" }, { t: "Forbidden", c: "#f6b26b" }, { t: "()", c: "#e6edf7" }],
  [{ t: "retry", c: "#6de1d2" }, { t: "(sendInvoice, { tries: ", c: "#e6edf7" }, { t: "3", c: "#f6b26b" }, { t: " })", c: "#e6edf7" }],
];

const plain = ["Pages load in under a second.", "Your data is backed up every night.", "Only the right people see billing.", "Invoices never get lost."];

const lensBeam = "M232 180 C 252 180, 262 180, 280 180";
const outBeam = "M330 180 C 342 180, 350 180, 362 180";

export function AboutHeroArt() {
  return (
    <figure className="m-0" aria-label="Engineering code passes through a lens and comes out as plain sentences: pages load fast, data is backed up, access is controlled.">
      <Scene width={580} height={360} phase="-7s">
        <Light x={0} y={60} size={260} color="#6ea8ff" />
        <Light x={330} y={60} size={260} color="#6de1d2" />
        {/* the engineering: dense, technical */}
        <Item x={0} y={60} w={232} h={240} z={-40} enter={200} float="-5px" floatDur="8s">
          <Glass accent="#6ea8ff" className="px-3.5 py-3">
            <div className="mb-2.5 flex gap-1.5">
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/25" />
            </div>
            <div className="font-mono text-[10.5px] leading-[1.95]">
              {code.map((line, i) => (
                <p key={i} className="truncate whitespace-pre">
                  <span className="mr-2 text-white/25">{i + 1}</span>
                  {line.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>
                      {tok.t}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#141d2e] to-transparent" />
          </Glass>
        </Item>
        {/* the lens: we translate */}
        <svg className="absolute inset-0 overflow-visible" width="580" height="360" viewBox="0 0 580 360" fill="none" aria-hidden style={{ filter: "drop-shadow(0 0 6px #6de1d2)" }}>
          <path d={lensBeam} stroke="#6ea8ff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
          <path d={outBeam} stroke="#6de1d2" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <Item x={270} y={140} w={70} h={80} z={20} enter={500} float="0px">
          <div className="relative h-full">
            <div className="nm-core absolute inset-0 rounded-full blur-[10px]" style={{ background: "radial-gradient(circle, #ffffff, #6de1d2 40%, transparent 70%)" }} />
            <div className="absolute inset-[6px] rounded-[50%] border-[3px] border-mint-400 shadow-[0_0_22px_rgb(109_225_210/0.8),inset_0_0_14px_rgb(109_225_210/0.6)]" />
          </div>
        </Item>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="nm-particle absolute top-0 left-0 size-2.5 rounded-full bg-mint-400 shadow-[0_0_12px_3px_rgb(109_225_210/0.75)]"
            style={{ offsetPath: `path("${lensBeam} L 362 180")`, "--dur": "2s", "--delay": `${i * 0.66}s` } as Vars}
          />
        ))}
        {/* the plain language: clear, readable */}
        <Item x={362} y={48} w={218} h={264} z={50} enter={800} float="-8px" floatDur="6.5s" floatDelay="-2s">
          <Glass accent="#6de1d2" className="px-4 py-4">
            <p className="font-display text-[15px] font-semibold text-mint-400">In plain words</p>
            <ul className="mt-3 grid gap-3">
              {plain.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug font-medium text-white">
                  <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-mint-400">
                    <Check aria-hidden className="size-3 text-[#0b1220]" strokeWidth={3.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Glass>
        </Item>
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
