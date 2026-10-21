"use client";

import * as m from "motion/react-m";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useRef, useState } from "react";
import type { ProcessStep } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Four-stage timeline. A thin line fills as the section scrolls through the
 * viewport and each stage's node lights as the fill reaches it. Horizontal
 * from lg, vertical below. Reduced motion shows the completed state.
 */
export function JourneyTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(steps.length, Math.floor(v * steps.length + 0.35)));
  });

  const lit = (i: number) => reduce || i < reached;

  return (
    <ol ref={ref} className="relative grid grid-cols-1 lg:grid-cols-4">
      {/* track + fill: vertical (mobile) */}
      <span aria-hidden className="absolute top-2 bottom-8 left-[7px] w-px bg-line lg:hidden" />
      <m.span
        aria-hidden
        className="absolute top-2 bottom-8 left-[7px] w-px origin-top bg-accent-ink lg:hidden"
        style={reduce ? undefined : { scaleY: progress }}
      />
      {/* track + fill: horizontal (desktop) */}
      <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-line lg:block" />
      <m.span
        aria-hidden
        className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-accent-ink lg:block"
        style={reduce ? undefined : { scaleX: progress }}
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8">
          <span
            aria-hidden
            className={cn(
              "absolute top-0 left-0 size-[15px] rounded-full border transition-colors duration-500 ease-studio",
              lit(i) ? "border-accent bg-accent" : "border-line-strong bg-surface",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "font-display block text-[clamp(4.5rem,9vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em] transition-colors duration-700 ease-studio lg:mt-12",
              lit(i) ? "text-ink" : "text-line",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-h3 mt-5 lg:mt-8">
            <span className="sr-only">Stage {i + 1}: </span>
            {s.title}
          </h3>
          <p className="text-body-sm mt-3 max-w-[30ch] text-ink-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
