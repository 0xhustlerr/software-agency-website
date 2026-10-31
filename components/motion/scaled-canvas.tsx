"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScaledCanvasProps {
  /** Design width and height in px. The canvas scales uniformly to fit its container's width. */
  width: number;
  height: number;
  className?: string;
  /** Classes for the fixed-size inner canvas (e.g. a mobile crop offset). */
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Lays out an illustration at a fixed design size, then scales it to the
 * available width so dense interface concepts stay proportionate from 320px
 * phones to wide desktops. The box reserves its aspect ratio (no layout
 * shift). With JavaScript it stays invisible until measured and any entrance
 * inside waits for that moment; without JavaScript it renders at design size.
 * Off screen it is marked `data-offscreen`, which pauses its looping motion.
 */
export function ScaledCanvas({ width, height, className, innerClassName, children }: ScaledCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setScale(el.getBoundingClientRect().width / width);
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    ro.observe(el);
    // Set directly on the element: visibility changes shouldn't re-render the scene.
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("nm-scaled relative w-full", className)}
      data-scaled={scale === null ? undefined : ""}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div className={cn("absolute top-0 left-0 origin-top-left", innerClassName)} style={{ width, height, transform: `scale(${scale ?? 1})` }}>
        {children}
      </div>
    </div>
  );
}
