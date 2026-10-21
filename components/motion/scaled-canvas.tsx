"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScaledCanvasProps {
  /** Design width and height in px. The canvas scales uniformly to fit its container's width. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}

/**
 * Lays out an illustration at a fixed design size, then scales it to the
 * available width so dense interface concepts stay proportionate from 320px
 * phones to wide desktops. Hidden until measured to avoid a flash.
 */
export function ScaledCanvas({ width, height, className, children }: ScaledCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute top-0 left-0 origin-top-left transition-opacity duration-300"
        style={{ width, height, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
}
