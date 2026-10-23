"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * WAI-ARIA accordion: each question is a button inside a heading, with
 * aria-expanded/aria-controls and a labelled region. Any number can be open.
 * Height animates via grid rows; reduced motion is handled globally.
 */
export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 3 | 4 }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const H = headingLevel === 3 ? "h3" : "h4";

  const toggle = (i: number) => {
    if (!open.has(i)) track("faq_open", { question: items[i].question.slice(0, 80), from: window.location.pathname });
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="border-b border-line">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="border-t border-line">
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 rounded-xs py-6 text-left"
              >
                <span className="text-h4 transition-colors duration-200 group-hover:text-accent-ink">{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-studio",
                    isOpen ? "rotate-45 border-ink bg-ink text-surface" : "border-line-strong text-ink",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-studio", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="text-body max-w-(--measure) pr-12 pb-7 text-ink-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
