import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { iconTile, slab } from "@/components/illustrations/scene";

/**
 * A raised dark tile in the 3D scenes' language: mint frame, thickness, and a
 * gentle tilt-and-lift on hover (none with reduced motion). Always dark, so it
 * reads as an object on light sections. `lift` gives it a lighter surface for
 * use on dark sections.
 */
export function Tile3D({ children, className, lift }: { children: ReactNode; className?: string; lift?: boolean }) {
  return (
    <div className="group h-full [perspective:900px]">
      <div
        data-theme="dark"
        className={cn(
          slab,
          "flex h-full flex-col p-6 transition-transform duration-500 ease-studio motion-safe:group-hover:[transform:rotateX(4deg)_rotateY(-5deg)_translateY(-6px)]",
          lift && "from-[#2d3e5a] to-[#1e2b40]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** The tile's top row: a large gradient mark (01, A…) and an icon tile. */
export function TileHead({ mark, icon: Icon }: { mark: string; icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }> }) {
  return (
    <div className="flex items-start justify-between">
      <span className="font-display bg-linear-to-br from-mint-400 to-[#3fa7c9] bg-clip-text text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-transparent">
        {mark}
      </span>
      <span className={cn(iconTile, "size-9 rounded-[9px]")}>
        <Icon aria-hidden className="size-[18px]" strokeWidth={2.25} />
      </span>
    </div>
  );
}

/** A numbered point (pillar, principle, capability) as a 3D tile, with optional chips. */
export function FeatureTile({
  mark,
  icon,
  title,
  body,
  tags,
  lift,
}: {
  mark: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  tags?: string[];
  lift?: boolean;
}) {
  return (
    <Tile3D lift={lift}>
      <TileHead mark={mark} icon={icon} />
      <h3 className="text-h3 mt-6 text-balance text-ink">{title}</h3>
      <p className={cn("text-body-sm mt-3 text-pretty text-ink-muted", tags?.length && "mb-6")}>{body}</p>
      {tags?.length ? (
        <ul aria-label="Includes" className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
          {tags.map((t) => (
            <li key={t} className="rounded-[6px] border border-white/15 bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink">
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </Tile3D>
  );
}
