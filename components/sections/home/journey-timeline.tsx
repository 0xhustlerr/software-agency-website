"use client";

import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/content/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type StageState = "done" | "on" | "todo";

/**
 * Four-stage process. As the section moves through the viewport the rail
 * fills, the current stage's node lights mint and earlier stages turn ink.
 * Scrolling is never captured: the stage simply follows the page position.
 * Every stage stays fully readable at all times; progress is carried by the
 * rail, the nodes and the "You leave with" rule.
 * Server render, no JavaScript and reduced motion all show the completed state.
 */
export function JourneyTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });
  /** null = complete (server render, before measuring, reduced motion). */
  const [current, setCurrent] = useState<number | null>(null);

  const toStage = (v: number) => Math.min(steps.length, Math.max(1, Math.floor(v * steps.length) + 1));

  useEffect(() => {
    if (reduce) return;
    const v = scrollYProgress.get();
    fillRef.current?.style.setProperty("--p", String(v));
    // Sync with the page position the user is already at (e.g. after a reload mid-page).
    const id = requestAnimationFrame(() => setCurrent(v >= 1 ? steps.length + 1 : toStage(v)));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useMotionValueEvent(progress, "change", (v) => {
    if (!reduce) fillRef.current?.style.setProperty("--p", String(Math.min(1, Math.max(0, v))));
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setCurrent(v >= 1 ? steps.length + 1 : toStage(v));
  });

  const live = reduce ? null : current;
  const state = (i: number): StageState => (live === null || i + 1 < live ? "done" : i + 1 === live ? "on" : "todo");
  const shown = live === null ? steps.length : Math.min(live, steps.length);

  return (
    <div ref={ref}>
      <p aria-hidden className="text-mono mb-8 hidden items-center justify-end gap-2.5 text-ink-muted lg:flex">
        <span className="size-1.5 rounded-full bg-accent" />
        <span>
          <span className="text-ink">{String(shown).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")} ·{" "}
          {steps[shown - 1]?.title}
        </span>
      </p>
      <div className="relative">
        {/* track */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong/50 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
        {/* fill: transform only; full when there is no JavaScript (--p defaults to 1) */}
        <div
          ref={fillRef}
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top scale-y-[var(--p,1)] bg-accent-ink lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left lg:scale-x-[var(--p,1)] lg:scale-y-100"
        />
        <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-0">
          {steps.map((s, i) => {
            const st = state(i);
            return (
              <li key={s.title} className="relative pl-12 lg:pt-12 lg:pr-8 lg:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 size-[15px] rounded-full border transition-[background-color,border-color,box-shadow] duration-400 ease-studio",
                    st === "on" && "border-accent bg-accent shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_22%,transparent)]",
                    st === "done" && "border-ink bg-ink",
                    st === "todo" && "border-line-strong bg-surface-muted",
                  )}
                />
                <p className="text-mono flex items-baseline justify-between text-ink-muted">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className={cn("transition-opacity duration-300", st === "on" ? "text-accent-ink opacity-100" : "opacity-0")}>
                    Now
                  </span>
                </p>
                <h3 className={cn("text-h3 mt-4 transition-colors duration-400 lg:mt-5 lg:text-[2.125rem] lg:leading-[1.08]", st === "todo" ? "text-ink-muted" : "text-ink")}>
                  <span className="sr-only">Stage {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="text-body-sm mt-3 max-w-[32ch] text-ink-muted">{s.body}</p>
                {s.outcome ? (
                  <p
                    className={cn(
                      "text-body-sm mt-6 max-w-[32ch] border-t pt-3.5 text-ink transition-colors duration-400",
                      st === "on" ? "border-accent-ink" : "border-line",
                    )}
                  >
                    <span className="mb-1 block font-mono text-[0.6875rem] tracking-[0.04em] text-ink-muted">You leave with</span>
                    {s.outcome}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
