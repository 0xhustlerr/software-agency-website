import { cn } from "@/lib/utils";

interface NodeGridProps {
  cols?: number;
  rows?: number;
  /** Cell size in viewBox units. */
  pitch?: number;
  /** Grid coordinates the connector passes through; the last is the filled mint node. Move right and down. */
  path?: [number, number][];
  grid?: boolean;
  /** Draw the connector in once on load (skipped for reduced motion). */
  animate?: boolean;
  className?: string;
}

/** The connected-node motif. Decorative — aria-hidden. Once per viewport. */
export function NodeGrid({
  cols = 8,
  rows = 5,
  pitch = 64,
  path = [[0, 1], [3, 1], [3, 3], [6, 3], [6, 4]],
  grid = true,
  animate = false,
  className,
}: NodeGridProps) {
  const pad = 8;
  const w = cols * pitch;
  const h = rows * pitch;
  const pts = path.map(([c, r]) => [pad + c * pitch, pad + r * pitch] as const);
  return (
    <svg
      viewBox={`0 0 ${w + pad * 2} ${h + pad * 2}`}
      aria-hidden
      focusable="false"
      className={cn("block h-auto w-full", className)}
    >
      {grid ? (
        <g className="stroke-line" strokeWidth={1} fill="none">
          {Array.from({ length: cols + 1 }, (_, c) => (
            <line key={`c${c}`} x1={pad + c * pitch} y1={pad} x2={pad + c * pitch} y2={pad + h} />
          ))}
          {Array.from({ length: rows + 1 }, (_, r) => (
            <line key={`r${r}`} x1={pad} y1={pad + r * pitch} x2={pad + w} y2={pad + r * pitch} />
          ))}
        </g>
      ) : null}
      <polyline
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1.25}
        className={cn("stroke-accent-ink", animate && "motion-safe:animate-[nm-draw_1.6s_var(--ease-studio)_0.3s_both]")}
        pathLength={1}
        strokeDasharray={animate ? 1 : undefined}
      />
      {pts.map(([x, y], i) => {
        const last = i === pts.length - 1;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={last ? 6 : 4}
            strokeWidth={1.25}
            className={last ? "fill-accent stroke-accent" : "fill-surface stroke-accent-ink"}
          />
        );
      })}
    </svg>
  );
}
