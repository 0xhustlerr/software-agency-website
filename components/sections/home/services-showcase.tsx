"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/types";
import { ServiceVisual } from "@/components/illustrations/service-visuals";
import { cn } from "@/lib/utils";

interface ServicesShowcaseProps {
  services: (Service & { href: string; linkLabel: string })[];
}

/**
 * Four large service rows. Hover or keyboard focus selects a row: its title
 * shifts, the arrow moves, and the matching interface vignette crossfades in
 * the sticky panel (lg+). Rows are real links.
 */
export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const [active, setActive] = useState(services[0]?.slug);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
      <ul className="border-b border-line lg:col-span-7">
        {services.map((s) => {
          const on = s.slug === active;
          return (
            <li key={s.slug} className="border-t border-line">
              <Link
                href={s.href}
                onMouseEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                className={cn(
                  "group relative -mx-3 grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-start gap-x-3 rounded-sm px-3 py-7 transition-colors duration-300 ease-studio sm:grid-cols-[4rem_minmax(0,1fr)_2rem] sm:py-9 lg:-mx-4 lg:px-4",
                  on ? "hover:bg-surface lg:bg-surface" : "hover:bg-surface",
                )}
              >
                {/* Divider draws in ink over the row's hairline on hover and keyboard focus. */}
                <span
                  aria-hidden
                  className="absolute inset-x-3 -top-px h-px origin-left scale-x-0 bg-ink transition-transform duration-[450ms] ease-studio group-hover:scale-x-100 group-focus-visible:scale-x-100 lg:inset-x-4"
                />
                <span
                  className={cn(
                    "text-mono pt-2 transition-colors duration-300 group-hover:text-accent-ink group-focus-visible:text-accent-ink",
                    on ? "text-ink-muted lg:text-accent-ink" : "text-ink-muted",
                  )}
                >
                  {s.index}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "font-display block text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.035em] transition-transform duration-300 ease-studio",
                      "group-hover:translate-x-1 group-focus-visible:translate-x-1",
                      on && "lg:translate-x-1",
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="text-body mt-3 block max-w-[46ch] text-ink-muted">{s.benefit}</span>
                  <span className="sr-only">{s.linkLabel}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className={cn(
                    "mt-2.5 size-6 justify-self-end transition-[transform,color] duration-300 ease-studio group-hover:translate-x-1 group-hover:text-ink group-focus-visible:translate-x-1 group-focus-visible:text-ink",
                    on ? "text-ink-muted lg:text-ink" : "text-ink-muted",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[5/4] overflow-hidden rounded-md border border-line bg-surface-muted">
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <pattern id="svc-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" className="fill-line-strong/40" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#svc-grid)" />
            </svg>
            {services.map((s) => (
              <div
                key={s.slug}
                className={cn(
                  "absolute inset-0 grid place-items-center p-5 transition-[opacity,transform] duration-500 ease-studio",
                  s.slug === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <ServiceVisual slug={s.slug} className="w-full" />
              </div>
            ))}
            <span className="absolute bottom-3 left-4 font-mono text-[10px] text-ink-muted">Interface concept</span>
          </div>
        </div>
      </div>
    </div>
  );
}
