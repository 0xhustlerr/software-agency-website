"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal industry filter. Rendered only when there are enough projects for
 * filtering to help; hides non-matching features via a data attribute so the
 * list itself stays server-rendered.
 */
export function WorkFilters({ industries }: { industries: string[] }) {
  const [active, setActive] = useState("All");
  const options = ["All", ...industries];
  function pick(value: string) {
    setActive(value);
    document.querySelectorAll<HTMLElement>("[data-industry]").forEach((el) => {
      el.hidden = value !== "All" && el.dataset.industry !== value;
    });
  }
  return (
    <div role="group" aria-label="Filter by industry" className="mb-14 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={active === o}
          onClick={() => pick(o)}
          className={cn(
            "h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
            active === o ? "border-ink bg-ink text-surface" : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
