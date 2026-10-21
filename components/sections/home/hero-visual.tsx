"use client";

import * as m from "motion/react-m";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { ReactNode, PointerEvent } from "react";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { RelayDashboard, RelayPhone, RelayWorkflow } from "@/components/illustrations/relay-concept";

/** Design canvas; the whole composition scales to its container. */
const W = 640;
const H = 560;
const ease = [0.2, 0.7, 0.2, 1] as const;

function Layer({
  children,
  depth,
  px,
  py,
  delay,
  from,
  className,
}: {
  children: ReactNode;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  delay: number;
  from: { x?: number; y?: number };
  className: string;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <m.div className={className} style={{ x, y }}>
      <m.div
        initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </m.div>
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

  // Same markup either way; reduced motion only shortens the draw to nothing.
  const draw = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: reduce ? { duration: 0 } : { duration: 1.4, ease, delay: 0.9 },
  };

  return (
    <figure className="relative m-0" aria-label="Product concept illustration: an operations dashboard, a mobile app view and an automation workflow for a sample product called Relay.">
      <div onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden>
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
            <rect width={W} height={H} fill="url(#hero-grid)" mask="url(#hero-mask)" />
            {/* connectors: workflow → dashboard → phone */}
            <m.path d="M560 128 V 200 H 520" fill="none" className="stroke-accent-ink" strokeWidth="1.25" {...draw} />
            <m.path d="M80 440 H 40 V 300 H 72" fill="none" className="stroke-accent-ink" strokeWidth="1.25" {...draw} />
            <circle cx="560" cy="128" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="520" cy="200" r="4.5" className="fill-accent" />
            <circle cx="40" cy="300" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="72" cy="300" r="4.5" className="fill-accent" />
            <circle cx="80" cy="440" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
          </svg>

          <Layer px={px} py={py} depth={4} delay={0.25} from={{ y: 28 }} className="absolute top-[64px] left-[72px] w-[520px]">
            <RelayDashboard />
          </Layer>
          <Layer px={px} py={py} depth={11} delay={0.55} from={{ x: 24 }} className="absolute top-[12px] right-0 w-[206px]">
            <RelayWorkflow />
          </Layer>
          <Layer px={px} py={py} depth={8} delay={0.7} from={{ y: 32 }} className="absolute bottom-0 left-[8px] w-[150px]">
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
