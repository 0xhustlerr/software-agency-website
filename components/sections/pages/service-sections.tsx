import { CircleAlert, Code2, PackageCheck, UserRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section bodies for the service pages, each in its own medium and tinted with
 * the service's colour (`accent` for fills and glows, `ink` for text on light
 * grounds): persona cards, pain cards, deliverable tiles, a process rail and
 * technical spec cards.
 */
type Item = { title: string; body?: string };
interface Tint {
  accent: string;
  ink: string;
}

/** Who it's for: one persona card each. */
export function PersonaCards({ items, accent, ink }: { items: Item[] } & Tint) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.05} className="flex items-start gap-4 rounded-[16px] border border-line bg-surface p-5 shadow-[0_18px_40px_-30px_rgb(16_24_39/0.4)]">
          <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full" style={{ background: `${accent}26`, boxShadow: `inset 0 0 0 2px ${accent}` }}>
            <UserRound className="size-6" style={{ color: ink }} strokeWidth={2} />
          </span>
          <div>
            <h3 className="font-display text-[1.125rem] leading-[1.3] font-semibold tracking-[-0.01em]">{it.title}</h3>
            {it.body ? <p className="text-body-sm mt-1 text-ink-muted">{it.body}</p> : null}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Problems it solves: the pain, named plainly, with a warning marker. */
export function PainCards({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.05} className="relative overflow-hidden rounded-[16px] border border-line bg-surface p-6 pl-7">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#f08a6b] to-[#f6b26b]" />
          <p className="flex items-center gap-2.5">
            <CircleAlert aria-hidden className="size-5 shrink-0 text-[#d4603f]" strokeWidth={2.25} />
            <span className="font-display text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.01em]">{it.title}</span>
          </p>
          {it.body ? <p className="text-body mt-2.5 text-ink-muted">{it.body}</p> : null}
        </Reveal>
      ))}
    </ul>
  );
}

/** Typical deliverables: dark numbered tiles, like things handed over. */
export function DeliverableTiles({ items, accent }: { items: Item[]; accent: string }) {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {items.map((it, i) => (
        <Reveal
          as="li"
          key={it.title}
          delay={(i % 3) * 0.05}
          className="relative overflow-hidden rounded-[16px] border-[1.5px] bg-linear-to-b from-[#22314a] to-[#121b2b] p-5"
          style={{ borderColor: `${accent}77`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 30px -14px ${accent}, 0 24px 40px -24px rgb(0 0 0 / 0.6)` }}
        >
          <span aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full blur-[30px]" style={{ background: `${accent}2e` }} />
          <div className="relative flex items-center justify-between">
            <span aria-hidden className="grid size-10 place-items-center rounded-[10px]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 0 18px ${accent}77` }}>
              <PackageCheck className="size-5 text-[#0b1220]" strokeWidth={2.25} />
            </span>
            <span className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em]" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display relative mt-4 text-[1.125rem] leading-[1.3] font-semibold text-white">{it.title}</h3>
          {it.body ? <p className="text-body-sm relative mt-1.5 text-white/70">{it.body}</p> : null}
        </Reveal>
      ))}
    </ol>
  );
}

/** How we deliver it: a glowing rail with numbered nodes. */
export function ProcessRail({ items, accent, ink }: { items: Item[] } & Tint) {
  return (
    <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
      <span aria-hidden className="absolute top-6 bottom-6 left-[23px] w-[2px] lg:top-[23px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[2px] lg:w-auto" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}33)` }} />
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.06} className="relative pl-16 lg:pt-16 lg:pl-0">
          <span
            aria-hidden
            className="font-display absolute top-0 left-0 grid size-12 place-items-center rounded-full text-[1.0625rem] font-semibold"
            style={{
              background: i === 0 ? `linear-gradient(135deg, ${accent}, ${accent}99)` : "var(--surface)",
              color: i === 0 ? "#0b1220" : ink,
              boxShadow: `inset 0 0 0 2px ${accent}, 0 0 ${i === 0 ? 26 : 12}px ${accent}${i === 0 ? "aa" : "55"}`,
            }}
          >
            {i + 1}
          </span>
          <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.01em]">{it.title}</h3>
          {it.body ? <p className="text-body-sm mt-2 text-ink-muted">{it.body}</p> : null}
        </Reveal>
      ))}
    </ol>
  );
}

/** Technical considerations (dark section): glass spec cards. */
export function SpecCards({ items, accent, icon: Icon = Code2 }: { items: Item[]; accent: string; icon?: LucideIcon }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <Reveal
          as="li"
          key={it.title}
          delay={i * 0.05}
          className="rounded-[16px] border bg-white/[0.04] p-5 backdrop-blur-sm"
          style={{ borderColor: `${accent}55`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.06), 0 0 30px -18px ${accent}` }}
        >
          <p className="flex items-center gap-2.5">
            <span aria-hidden className="grid size-8 place-items-center rounded-[8px] font-mono" style={{ background: `${accent}22`, color: accent, boxShadow: `inset 0 0 0 1px ${accent}77` }}>
              <Icon className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-[1.0625rem] leading-[1.3] font-semibold">{it.title}</span>
          </p>
          {it.body ? <p className="text-body-sm mt-2.5 text-ink-muted">{it.body}</p> : null}
        </Reveal>
      ))}
    </ul>
  );
}
