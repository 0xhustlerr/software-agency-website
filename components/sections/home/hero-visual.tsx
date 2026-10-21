"use client";

import * as m from "motion/react-m";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CSSProperties, ReactNode, PointerEvent } from "react";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { RelayDashboard, RelayPhone, RelayWorkflow } from "@/components/illustrations/relay-concept";

/** Design canvas; the whole composition scales to its container. */
const W = 640;
const H = 560;

function Layer({
  children,
  depth,
  px,
  py,
  delay,
  enter,
  className,
}: {
  children: ReactNode;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  /** Entrance delay (ms). */
  delay: number;
  /** CSS entrance: rise from below, or slide in from the right. */
  enter: { rise: number } | { fromX: number };
  className: string;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  const style =
    "rise" in enter
      ? ({ "--reveal-delay": `${delay}ms`, "--rise": `${enter.rise}px`, "--enter-dur": "700ms" } as CSSProperties)
      : ({ "--reveal-delay": `${delay}ms`, "--from-x": `${enter.fromX}px`, "--enter-dur": "700ms" } as CSSProperties);
  return (
    <m.div className={className} style={{ x, y }}>
      <div className={"rise" in enter ? "nm-enter" : "nm-enter-x"} style={style}>
        {children}
      </div>
    </m.div>
  );
}

/**
 * Hero composition: dashboard, phone and workflow card for the "Relay"
 * product concept, joined by the connected-node system. Assembles once on
 * load; layers drift a few pixels with the pointer. No perpetual motion.
 */
export function HeroVisual() {
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const py = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

  return (
    <figure className="relative m-0" aria-label="Product concept illustration: an operations dashboard, a mobile app view and an automation workflow for a sample product called Relay.">
      {/* Phones: a 4:3 crop on the dashboard alone, larger and legible; side cards are left out. */}
      <div aria-hidden className="sm:hidden">
        <ScaledCanvas width={440} height={330} className="overflow-hidden rounded-md border border-line">
          <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[40px_40px] opacity-60" />
          <div className="nm-enter absolute top-[28px] left-[24px] w-[520px]" style={{ ...d(360), "--enter-dur": "700ms" } as CSSProperties}>
            <RelayDashboard />
          </div>
        </ScaledCanvas>
      </div>
      <div onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden className="hidden sm:block">
        <ScaledCanvas width={W} height={H}>
          {/* blueprint grid */}
          <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" className="stroke-line" strokeWidth="1" />
              </pattern>
              <radialGradient id="hero-fade" cx="55%" cy="45%" r="65%">
                <stop offset="0.55" stopColor="#fff" stopOpacity="1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="hero-mask">
                <rect width={W} height={H} fill="url(#hero-fade)" />
              </mask>
            </defs>
            <rect width={W} height={H} fill="url(#hero-grid)" mask="url(#hero-mask)" className="nm-enter-fade" style={d(300)} />
            {/* connectors through open space: workflow → dashboard, phone → dashboard */}
            <path d="M604 214 V 300 H 592" pathLength={1} fill="none" className="nm-draw stroke-accent-ink" strokeWidth="1.25" style={d(1000)} />
            <path d="M36 292 V 196 H 72" pathLength={1} fill="none" className="nm-draw stroke-accent-ink" strokeWidth="1.25" style={d(1080)} />
            <circle cx="604" cy="214" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="592" cy="300" r="4.5" className="nm-enter-fade fill-accent" style={d(1500)} />
            <circle cx="36" cy="292" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="72" cy="196" r="4.5" className="nm-enter-fade fill-accent" style={d(1580)} />
          </svg>

          <Layer px={px} py={py} depth={4} delay={360} enter={{ rise: 24 }} className="absolute top-[64px] left-[72px] w-[520px]">
            <RelayDashboard />
          </Layer>
          <Layer px={px} py={py} depth={11} delay={620} enter={{ fromX: 24 }} className="absolute top-[12px] right-0 w-[206px]">
            <RelayWorkflow />
          </Layer>
          <Layer px={px} py={py} depth={8} delay={740} enter={{ rise: 28 }} className="absolute bottom-0 left-[8px] w-[150px]">
            <RelayPhone />
          </Layer>
        </ScaledCanvas>
      </div>
      <figcaption className="mt-4 flex justify-end">
        <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
          Product concept illustration
        </span>
      </figcaption>
    </figure>
  );
}
