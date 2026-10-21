import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** Heading block in columns 1–4, content in 6–12. */
export function Split({ eyebrow, heading, note, id, children }: { eyebrow: ReactNode; heading: ReactNode; note?: ReactNode; id: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
      <Reveal className="lg:col-span-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-h2 mt-4 max-w-[13ch]">
          {heading}
        </h2>
        {note ? <div className="text-body-sm mt-6 max-w-[34ch] text-ink-muted">{note}</div> : null}
      </Reveal>
      <div className="lg:col-span-7 lg:col-start-6">{children}</div>
    </div>
  );
}

/** Hairline-ruled list with mono index numbers. */
export function RuledList({ items, size = "md" }: { items: { title: string; body?: string }[]; size?: "md" | "sm" }) {
  return (
    <ol className="border-b border-line">
      {items.map((it, i) => (
        <li key={it.title} className="grid grid-cols-1 gap-x-6 gap-y-1 border-t border-line py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
          <span className="text-mono text-ink-muted" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={size === "sm" ? "text-body-sm font-medium" : "font-display text-[1.125rem] leading-[1.3] font-semibold tracking-[-0.01em]"}>{it.title}</h3>
            {it.body ? <p className="text-body-sm mt-1 text-ink-muted">{it.body}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
