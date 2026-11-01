"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ColorTab {
  id: string;
  label: string;
  /** A rendered icon element (icons are components, which can't cross to the client). */
  icon: ReactNode;
  /** The tab's colour: its pill, glow and active border. */
  accent: string;
}

/**
 * WAI-ARIA tabs in the services' colours. Panels are rendered on the server
 * and passed in, so all content is in the HTML; only the active one shows.
 * Arrow keys move between tabs. Keeps long groups to one screen.
 */
export function ColorTabs({ tabs, panels, label, className }: { tabs: ColorTab[]; panels: ReactNode[]; label: string; className?: string }) {
  const base = useId();
  const [active, setActive] = useState(0);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              id={`${base}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={cn(
                "flex items-center gap-2.5 rounded-full border-[1.5px] py-1.5 pr-4 pl-1.5 text-[15px] font-semibold transition-[background-color,border-color,box-shadow,color] duration-300",
                on ? "text-ink" : "border-line text-ink-muted hover:text-ink",
              )}
              style={on ? { borderColor: t.accent, background: `${t.accent}1f`, boxShadow: `0 0 26px -8px ${t.accent}` } : undefined}
            >
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full text-navy-900 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}99)`, opacity: on ? 1 : 0.55 }}
              >
                {t.icon}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>
      {panels.map((p, i) => (
        <div key={tabs[i]?.id ?? i} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} hidden={i !== active} className="mt-6 lg:mt-8">
          {p}
        </div>
      ))}
    </div>
  );
}
