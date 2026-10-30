/**
 * Building blocks for the 3D illustration scenes (services hero and service
 * vignettes): a tilted stage, raised cards, floating items, connectors and
 * the particles that travel them. Motion lives in globals.css (3D scene).
 */
import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { cn } from "@/lib/utils";

export type Vars = CSSProperties & Record<`--${string}`, string>;

/** A raised card: thin mint frame, lit top edge, visible thickness, deep floor shadow. The frame and its faint glow keep cards distinct from a navy ground. */
export const slab =
  "relative overflow-hidden rounded-[12px] border-[1.5px] border-mint-400/50 bg-linear-to-b from-surface-raised to-surface-muted shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_3px_0_#0d1626,0_6px_0_#0a111e,0_0_0_1px_rgb(109_225_210/0.06),0_0_24px_-6px_rgb(109_225_210/0.3),0_40px_60px_-18px_rgb(0_0_0/0.8)]";

/** Gradient tile for icons and badges. */
export const iconTile = "grid size-6 place-items-center rounded-[6px] bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900 shadow-[0_0_14px_rgb(109_225_210/0.45)]";

/**
 * A scaled, tilted stage. `width` × `height` is the stage; the canvas adds a
 * margin so the tilt and float never clip. `phase` offsets the camera sway so
 * neighbouring scenes don't move in step.
 */
export function Scene({ width, height, phase = "0s", children }: { width: number; height: number; phase?: string; children: ReactNode }) {
  const m = 10;
  return (
    <ScaledCanvas width={width + m * 2} height={height + m * 2}>
      <div aria-hidden className="absolute inset-0 [perspective:1400px]">
        <div className="nm-stage absolute" style={{ top: m, left: m, width, height, animationDelay: phase }}>
          {/* Floor: the blueprint grid, receding below the scene */}
          <div
            className="absolute -inset-10 [mask-image:radial-gradient(closest-side,black_35%,transparent)] bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{ transform: "translateZ(-70px)" }}
          />
          {children}
        </div>
      </div>
    </ScaledCanvas>
  );
}

/** A soft light pooled behind part of the scene. */
export function Glow({ x, y, size, tone = "mint" }: { x: number; y: number; size: number; tone?: "mint" | "blue" }) {
  return (
    <div
      className={cn("absolute rounded-full", tone === "mint" ? "bg-mint-400/[0.16]" : "bg-[#3fa7c9]/[0.15]")}
      style={{ left: x, top: y, width: size, height: size, filter: `blur(${Math.round(size / 4)}px)`, transform: "translateZ(-60px)" }}
    />
  );
}

/** Places an element in the scene: position, depth, entrance and its own float. */
export function Item({
  x,
  y,
  w,
  h,
  z = 0,
  enter,
  float = "-4px",
  floatDur = "6s",
  floatDelay = "0s",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  z?: number;
  enter: number;
  float?: string;
  floatDur?: string;
  floatDelay?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="nm-enter-fade absolute"
      style={{ left: x, top: y, width: w, height: h, transform: `translateZ(${z}px)`, "--reveal-delay": `${enter}ms`, "--enter-dur": "900ms" } as Vars}
    >
      <div className="nm-float h-full" style={{ "--float": float, "--float-dur": floatDur, "--float-delay": floatDelay } as Vars}>
        {children}
      </div>
    </div>
  );
}

export function Header({ icon, title, step }: { icon: ReactNode; title: string; step?: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-3.5 py-2.5">
      <span className={iconTile}>{icon}</span>
      <span className="text-[13px] font-semibold text-ink">{title}</span>
      {step ? <span className="ml-auto font-mono text-[10px] text-ink-muted">{step}</span> : null}
    </div>
  );
}

export function Done() {
  return (
    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-mint-400 text-navy-900">
      <Check className="size-2.5" strokeWidth={3.5} />
    </span>
  );
}

/** A glowing dot that travels `d` (in its containing block's coordinates) on a loop. */
export function Particle({ d, dur, delay }: { d: string; dur: string; delay: string }) {
  return (
    <span
      className="nm-particle absolute top-0 left-0 size-2 rounded-full bg-mint-400 shadow-[0_0_12px_3px_rgb(109_225_210/0.75)]"
      style={{ offsetPath: `path("${d}")`, "--dur": dur, "--delay": delay } as Vars}
    />
  );
}

/** The 3D label under a scene: a raised mint tile that flips once every few seconds. */
export function ConceptBadge({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-4 flex justify-end">
      <Badge3D>{children}</Badge3D>
    </figcaption>
  );
}

/** The flipping 3D label on its own. Always dark, so it reads on light sections too. */
export function Badge3D({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block shrink-0 [perspective:600px]">
      <span
        data-theme="dark"
        className="nm-badge-3d block rounded-[8px] border border-mint-400/40 bg-linear-to-b from-surface-raised to-surface-muted px-3 py-1 text-[12.5px] leading-6 font-semibold tracking-[0.1em] text-mint-400 uppercase shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_3px_0_#0d1626,0_5px_0_#0a111e,0_14px_24px_-8px_rgb(0_0_0/0.8),0_0_18px_-4px_rgb(109_225_210/0.45)] sm:px-4.5 sm:py-1.5 sm:text-[16.5px] sm:leading-7 sm:tracking-[0.12em]"
      >
        {children}
      </span>
    </span>
  );
}

/** Connector lines that draw in, each landing on a filled mint node. */
export function Wires({ id, width, height, paths, ends, delay = 900 }: { id: string; width: number; height: number; paths: string[]; ends: [number, number][]; delay?: number }) {
  return (
    <svg className="absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={`${id}-flow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={d} d={d} pathLength={1} stroke={`url(#${id}-flow)`} strokeWidth="1.75" className="nm-draw" style={{ "--reveal-delay": `${delay + i * 180}ms` } as Vars} />
      ))}
      {ends.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="8" className="fill-accent/20" />
          <circle cx={cx} cy={cy} r="4" className="fill-accent" />
        </g>
      ))}
    </svg>
  );
}
