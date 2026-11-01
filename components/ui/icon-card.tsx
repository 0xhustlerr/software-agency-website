import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/**
 * A light glass card for light sections: a colour strip and glow, a large
 * gradient icon, an optional mark (A, 01…), title, body and chips. The
 * light counterpart of FeatureTile, so neighbouring sections can differ.
 * `ink` is the accent's darker shade, readable as text on white.
 */
export function IconCard({
  icon: Icon,
  accent,
  ink,
  mark,
  title,
  body,
  tags,
  delay = 0,
}: {
  icon: LucideIcon;
  accent: string;
  ink: string;
  mark?: string;
  title: string;
  body: string;
  tags?: string[];
  delay?: number;
}) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className="relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface p-6 shadow-[0_24px_50px_-30px_rgb(16_24_39/0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }} />
      <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full blur-[40px]" style={{ background: `${accent}33` }} />
      <span aria-hidden className="relative grid size-14 place-items-center rounded-[16px]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 12px 28px -10px ${accent}` }}>
        <Icon className="size-7 text-navy-900" strokeWidth={2} />
      </span>
      {mark ? (
        <p className="relative mt-5 font-mono text-[0.75rem] font-semibold tracking-[0.12em]" style={{ color: ink }}>
          {mark}
        </p>
      ) : null}
      <h3 className={`text-h3 relative ${mark ? "mt-1" : "mt-5"}`}>{title}</h3>
      <p className="text-body-sm relative mt-2.5 text-ink-muted">{body}</p>
      {tags?.length ? (
        <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Includes">
          {tags.map((t) => (
            <li key={t} className="rounded-full border px-2.5 py-1 font-mono text-[12px] text-ink" style={{ borderColor: `${accent}66`, background: `${accent}1a` }}>
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}

/** Shared palette for icon cards: accent and its readable ink shade. */
export const tints = {
  amber: { accent: "#f6b26b", ink: "#b0661c" },
  violet: { accent: "#b794f6", ink: "#7b4fd0" },
  blue: { accent: "#6ea8ff", ink: "#2f6fd6" },
  mint: { accent: "#6de1d2", ink: "#0a7266" },
} as const;
