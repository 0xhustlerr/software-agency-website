"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Category filter over server-rendered cards. Each card is passed with its
 * category; only categories that have articles get a chip.
 */
export function InsightBrowser({ items }: { items: { key: string; category: string; node: ReactNode }[] }) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((i) => i.category === active);
  return (
    <>
      {categories.length > 1 ? (
        <div role="group" aria-label="Filter by category" className="mb-12 flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
                active === c ? "border-ink bg-ink text-surface" : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((i) => (
          <li key={i.key}>{i.node}</li>
        ))}
      </ul>
    </>
  );
}
