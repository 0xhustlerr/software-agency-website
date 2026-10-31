import { Fragment } from "react";
import { ArrowRight, Lightbulb, PenTool, Rocket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconTile, slab } from "@/components/illustrations/scene";

const icons = [Lightbulb, PenTool, Rocket, TrendingUp];

interface Stage {
  title: string;
  where: string;
  focus: string;
  leaveWith: string;
  /** Services that fit, joined by " → " (a sequence) or " · " (alternatives). */
  fit: string;
}

/**
 * One engagement stage as a raised dark tile in the 3D scenes' language:
 * mint frame, thickness and a hover tilt. Reads situation → work → result,
 * with the result ("You leave with") given the weight.
 */
export function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const Icon = icons[index % icons.length];
  const [main, sub] = stage.title.split(" / ");
  const fit = stage.fit.split(/ (→|·) /);
  return (
    <div className="group h-full [perspective:900px]">
      <div
        data-theme="dark"
        className={cn(
          slab,
          "flex h-full flex-col p-6 transition-transform duration-500 ease-studio motion-safe:group-hover:[transform:rotateX(4deg)_rotateY(-5deg)_translateY(-6px)]",
        )}
      >
        <div className="flex items-start justify-between">
          <span className="font-display bg-linear-to-br from-mint-400 to-[#3fa7c9] bg-clip-text text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-transparent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn(iconTile, "size-9 rounded-[9px]")}>
            <Icon aria-hidden className="size-[18px]" strokeWidth={2.25} />
          </span>
        </div>
        <h3 className="font-display mt-6 text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-ink">
          {main}
          {sub ? <span className="text-ink-muted"> / {sub}</span> : null}
        </h3>
        <dl className="mt-5 mb-5 grid gap-3.5">
          <div>
            <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">Where you are</dt>
            <dd className="text-body-sm mt-1 text-pretty text-ink-muted">{stage.where}</dd>
          </div>
          <div>
            <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">What we focus on</dt>
            <dd className="text-body-sm mt-1 text-pretty text-ink-muted">{stage.focus}</dd>
          </div>
          <div className="rounded-[10px] border border-mint-400/30 bg-mint-400/[0.07] p-3">
            <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-mint-400 uppercase">You leave with</dt>
            <dd className="text-body-sm mt-1 font-medium text-pretty text-ink">{stage.leaveWith}</dd>
          </div>
        </dl>
        {/* Room for two rows of chips, so every card's divider lines up. */}
        <p className="mt-auto flex min-h-[4.5rem] flex-wrap content-start items-center gap-1.5 border-t border-white/10 pt-4">
          <span className="sr-only">Services that fit: </span>
          {fit.map((part, i) =>
            i % 2 === 1 ? (
              part === "→" ? (
                <ArrowRight key={i} aria-hidden className="size-3.5 text-mint-400" strokeWidth={2.25} />
              ) : (
                <Fragment key={i} />
              )
            ) : (
              <span key={i} className="rounded-[6px] border border-white/15 bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink">
                {part}
              </span>
            ),
          )}
        </p>
      </div>
    </div>
  );
}
