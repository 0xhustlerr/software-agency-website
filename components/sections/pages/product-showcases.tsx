"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { ProductConcept } from "@/content/types";
import { ProductDialog } from "./product-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Four ways to show a category of products, so each section of /work looks
 * different: a full-screen slideshow, a card carousel, a bento grid and a
 * list with a large preview. All show the product's own site, name, the
 * problem it solves and a few tags.
 */

function Chips({ tags, accent, dark }: { tags: string[]; accent: string; dark?: boolean }) {
  return (
    <ul aria-label="Capabilities" className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((t) => (
        <li key={t} className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[11.5px]", dark ? "text-white" : "text-ink")} style={{ borderColor: `${accent}66`, background: `${accent}1a` }}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function RoundButton({ label, onClick, children, accent }: { label: string; onClick: () => void; children: React.ReactNode; accent: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full border-[1.5px] bg-[#0b1220]/70 text-white backdrop-blur-md transition-[background-color,box-shadow,transform] duration-200 hover:scale-105"
      style={{ borderColor: `${accent}aa`, boxShadow: `0 0 24px -8px ${accent}` }}
    >
      {children}
    </button>
  );
}

/* ---------- SaaS: one product at a time, full screen ---------- */

export function FullSlideshow({ items, accent }: { items: ProductConcept[]; accent: string }) {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: number) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => go(1), 6000);
    return () => clearTimeout(t);
  }, [i, reduce, paused, go]);

  const c = items[i];
  return (
    <div
      className="relative h-[calc(100svh-20rem)] min-h-[380px] overflow-hidden rounded-[24px] border-[1.5px] bg-[#0b1220]"
      style={{ borderColor: `${accent}88`, boxShadow: `0 0 90px -24px ${accent}` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="SaaS platforms"
    >
      {items.map((p, k) => (
        <div key={p.slug} aria-hidden={k !== i} className={cn("absolute inset-0 transition-opacity duration-700", k === i ? "opacity-100" : "opacity-0")}>
          <Image src={p.image.src} alt={k === i ? p.image.alt : ""} fill sizes="100vw" className={cn("object-cover object-top transition-transform duration-[6000ms] ease-linear", k === i && !reduce ? "scale-[1.04]" : "scale-100")} />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-[#0b1220]/50 to-transparent" />
      <div aria-live="polite" className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 sm:p-10">
        <div className="max-w-[56ch]">
          <p className="font-mono text-[12px] font-semibold tracking-[0.14em] uppercase" style={{ color: c.accent }}>
            {String(i + 1).padStart(2, "0")} · {c.category}
          </p>
          <h3 className="font-display mt-2 text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.03em] text-white">{c.name}</h3>
          <p className="mt-3 text-[clamp(1rem,1.3vw,1.125rem)] text-white/80">{c.problem}</p>
          <div className="mt-4">
            <Chips tags={c.tags} accent={c.accent} dark />
          </div>
          <ProductDialog items={items} index={i}>
            <button type="button" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-navy-900 transition-transform duration-200 hover:scale-[1.03]" style={{ background: accent, boxShadow: `0 10px 30px -10px ${accent}` }}>
              See the project <ArrowRight className="size-4" strokeWidth={2.5} />
            </button>
          </ProductDialog>
        </div>
        <div className="flex items-center gap-3">
          <RoundButton label="Previous product" onClick={() => go(-1)} accent={accent}>
            <ArrowLeft className="size-5" strokeWidth={2.25} />
          </RoundButton>
          {!reduce ? (
            <RoundButton label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)} accent={accent}>
              {paused ? <Play className="size-5" strokeWidth={2.25} /> : <Pause className="size-5" strokeWidth={2.25} />}
            </RoundButton>
          ) : null}
          <RoundButton label="Next product" onClick={() => go(1)} accent={accent}>
            <ArrowRight className="size-5" strokeWidth={2.25} />
          </RoundButton>
        </div>
      </div>
      <div className="absolute top-5 right-5 flex gap-1.5">
        {items.map((p, k) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Show ${p.name}`}
            aria-current={k === i}
            onClick={() => setI(k)}
            className="h-2 rounded-full transition-[width,background-color] duration-300"
            style={{ width: k === i ? 28 : 8, background: k === i ? accent : "rgb(255 255 255 / 0.35)" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- MVPs: a row of cards with previous / next ---------- */

export function CardCarousel({ items, accent }: { items: ProductConcept[]; accent: string }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (d: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.getBoundingClientRect().width ?? 320) + 20), behavior: "smooth" });
  };
  return (
    <div>
      <ul ref={track} className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none]">
        {items.map((c, k) => (
          <li key={c.slug} className="w-[min(82vw,360px)] shrink-0 snap-start">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border-[1.5px] bg-surface shadow-[0_24px_50px_-30px_rgb(16_24_39/0.4)] transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: `${c.accent}66` }}>
              <ProductDialog items={items} index={k}>
            <button type="button" className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-400">
              <span className="sr-only">See the project: {c.name}</span>
            </button>
          </ProductDialog>
              <div className="relative aspect-[16/10]">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="360px" className="object-cover object-top" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">{c.name}</h3>
                <p className="font-mono text-[12px] text-ink-muted">{c.category}</p>
                <p className="text-body-sm line-clamp-2 text-ink-muted">{c.problem}</p>
                <div className="mt-auto pt-2">
                  <Chips tags={c.tags} accent={c.accent} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end gap-3">
        <button type="button" aria-label="Previous products" onClick={() => scroll(-1)} className="grid size-12 place-items-center rounded-full border-[1.5px] bg-surface transition-transform duration-200 hover:scale-105" style={{ borderColor: accent }}>
          <ArrowLeft className="size-5" strokeWidth={2.25} />
        </button>
        <button type="button" aria-label="Next products" onClick={() => scroll(1)} className="grid size-12 place-items-center rounded-full text-navy-900 transition-transform duration-200 hover:scale-105" style={{ background: accent, boxShadow: `0 10px 24px -10px ${accent}` }}>
          <ArrowRight className="size-5" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}

/* ---------- AI products: a bento with one featured product ---------- */

export function BentoGrid({ items }: { items: ProductConcept[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
      {items.map((c, k) => (
        <li key={c.slug} className={cn("group relative overflow-hidden rounded-[20px] border-[1.5px] bg-[#0b1220]", k === 0 ? "min-h-[300px] sm:col-span-2 lg:row-span-2" : "min-h-[200px]")} style={{ borderColor: `${c.accent}77`, boxShadow: `0 0 50px -22px ${c.accent}` }}>
          <ProductDialog items={items} index={k}>
            <button type="button" className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-400">
              <span className="sr-only">See the project: {c.name}</span>
            </button>
          </ProductDialog>
          <Image src={c.image.src} alt={c.image.alt} fill sizes={k === 0 ? "50vw" : "25vw"} className="object-cover object-top transition-transform duration-700 ease-studio group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-[#0b1220]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-[11.5px] font-semibold tracking-[0.12em] uppercase" style={{ color: c.accent }}>
              {c.category}
            </p>
            <h3 className={cn("font-display font-semibold tracking-[-0.02em] text-white", k === 0 ? "text-[2rem] leading-tight" : "text-[1.25rem]")}>{c.name}</h3>
            {k === 0 ? <p className="mt-1.5 max-w-[46ch] text-[15px] text-white/80">{c.problem}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Custom software: a list, and a large preview of the chosen one ---------- */

export function ListPreview({ items, accent }: { items: ProductConcept[]; accent: string }) {
  const [i, setI] = useState(0);
  const c = items[i];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <ol className="grid content-start gap-2 lg:col-span-5">
        {items.map((p, k) => {
          const on = k === i;
          return (
            <li key={p.slug}>
              <button
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setI(k)}
                onFocus={() => setI(k)}
                onClick={() => setI(k)}
                className={cn("flex w-full items-center gap-4 rounded-[14px] border-[1.5px] px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-300", on ? "bg-white/[0.06]" : "border-white/10 hover:bg-white/[0.03]")}
                style={on ? { borderColor: accent, boxShadow: `0 0 30px -12px ${accent}` } : undefined}
              >
                <span className="font-mono text-[13px] font-semibold" style={{ color: on ? accent : "rgb(255 255 255 / 0.4)" }}>
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-[1.25rem] leading-tight font-semibold text-white">{p.name}</span>
                  <span className="block truncate text-[13px] text-white/60">{p.category}</span>
                </span>
                <ArrowRight aria-hidden className={cn("size-5 transition-transform duration-300", on ? "translate-x-0.5" : "opacity-40")} style={{ color: on ? accent : "white" }} strokeWidth={2.25} />
              </button>
            </li>
          );
        })}
      </ol>
      <div aria-live="polite" className="lg:col-span-7">
        <div className="group relative aspect-[16/9] max-h-[calc(100svh-24rem)] w-full overflow-hidden rounded-[20px] border-[1.5px]" style={{ borderColor: `${accent}88`, boxShadow: `0 0 70px -20px ${accent}` }}>
          <ProductDialog items={items} index={i}>
            <button type="button" className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-400">
              <span className="sr-only">See the project: {c.name}</span>
            </button>
          </ProductDialog>
          {items.map((p, k) => (
            <Image key={p.slug} src={p.image.src} alt={k === i ? p.image.alt : ""} fill sizes="(min-width: 1024px) 55vw, 100vw" className={cn("object-cover object-top transition-opacity duration-500", k === i ? "opacity-100" : "opacity-0")} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <p className="text-body max-w-[52ch] text-white/80">{c.problem}</p>
          <ProductDialog items={items} index={i}>
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-navy-900 transition-transform duration-200 hover:scale-[1.03]" style={{ background: accent }}>
              See {c.name} <ArrowRight className="size-4" strokeWidth={2.5} />
            </button>
          </ProductDialog>
        </div>
      </div>
    </div>
  );
}

/* ---------- /work hero: every product, with the problem it solves ---------- */

const heroKind: Record<ProductConcept["kind"], string> = { saas: "SaaS Platform", mvp: "MVP", ai: "AI Product", custom: "Custom Software" };

/**
 * The /work hero: one product per slide — the problem in plain words on the
 * left, the product's screen on the right — every 6s, with previous / next,
 * pause and dots. The screen opens the product's full view.
 */
export function ProblemSlideshow({ items }: { items: ProductConcept[] }) {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: number) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => go(1), 6000);
    return () => clearTimeout(t);
  }, [i, reduce, paused, go]);

  const c = items[i];
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Products and the problems they solve"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative grid h-[clamp(260px,calc(100svh-36rem),620px)] grid-cols-1 overflow-hidden rounded-[22px] border-[1.5px] bg-[#0b1220] sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      style={{ borderColor: `${c.accent}99`, boxShadow: `0 0 80px -20px ${c.accent}, 0 50px 90px -40px rgb(0 0 0 / 0.9)`, transition: "border-color 600ms, box-shadow 600ms" }}
    >
      {/* the problem */}
      <div aria-live="polite" className="relative hidden flex-col justify-between bg-linear-to-br from-[#2a1d24] to-[#141a28] p-7 sm:flex lg:p-9">
        <div>
          <p className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-[0.14em] text-[#f08a6b] uppercase">
            <span className="size-2 rounded-full bg-[#f08a6b]" /> The problem
          </p>
          <p key={c.slug} className="nm-enter font-display mt-4 text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-[-0.01em] text-white">
            “{c.problem}”
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RoundButton label="Previous product" onClick={() => go(-1)} accent={c.accent}>
            <ArrowLeft className="size-5" strokeWidth={2.25} />
          </RoundButton>
          {!reduce ? (
            <RoundButton label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)} accent={c.accent}>
              {paused ? <Play className="size-5" strokeWidth={2.25} /> : <Pause className="size-5" strokeWidth={2.25} />}
            </RoundButton>
          ) : null}
          <RoundButton label="Next product" onClick={() => go(1)} accent={c.accent}>
            <ArrowRight className="size-5" strokeWidth={2.25} />
          </RoundButton>
        </div>
      </div>
      {/* the product */}
      <div className="group relative">
        {items.map((p, k) => (
          <div key={p.slug} aria-hidden={k !== i} className={cn("absolute inset-0 transition-opacity duration-700", k === i ? "opacity-100" : "opacity-0")}>
            <Image src={p.image.src} alt={k === i ? p.image.alt : ""} fill priority={k < 2} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-top" />
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-[#0b1220]/25 to-transparent" />
        <ProductDialog items={items} index={i}>
          <button type="button" className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-mint-400">
            <span className="sr-only">See the project: {c.name}</span>
          </button>
        </ProductDialog>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
          <div>
            <p className="font-mono text-[11.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: c.accent }}>
              The product · {heroKind[c.kind]}
            </p>
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white">{c.name}</p>
          </div>
          <span className="rounded-full border border-white/25 bg-[#0b1220]/70 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-navy-900">
            See the project
          </span>
        </div>
        <div className="absolute top-4 right-4 z-20 hidden max-w-[60%] flex-wrap justify-end gap-1 lg:flex">
          {items.map((p, k) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Show ${p.name}`}
              aria-current={k === i}
              onClick={() => setI(k)}
              className="h-1.5 rounded-full transition-[width,background-color] duration-300"
              style={{ width: k === i ? 22 : 6, background: k === i ? c.accent : "rgb(255 255 255 / 0.4)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
