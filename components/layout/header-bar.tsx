"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

interface HeaderBarProps {
  items: NavItem[];
  talkHref: string;
}

/** Tracks which homepage section is in view so its nav item can show as current. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");
  useEffect(() => {
    if (!enabled) return;
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = sections.find((s) => visible.get(s.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [key, enabled]);
  return enabled ? active : null;
}

export function HeaderBar({ items, talkHref }: HeaderBarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = pathname === "/";
  const activeSection = useActiveSection(
    items.flatMap((i) => (i.sectionId ? [i.sectionId] : [])),
    onHome,
  );

  const isCurrent = (item: NavItem) =>
    item.href.startsWith("/#") ? onHome && activeSection === item.sectionId : pathname.startsWith(item.href);

  return (
    <header
      data-theme="dark"
      data-scrolled={scrolled || undefined}
      className={cn(
        // One fixed height; only paint properties change, so nothing below ever shifts.
        // Over a dark first section this starts transparent (see globals.css → Header).
        "site-header sticky top-0 z-40 h-(--header-h) border-b border-line bg-surface/94 shadow-[0_12px_32px_-20px_rgb(0_0_0/0.7)] backdrop-blur-md",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-studio",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const current = isCurrent(item);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={current ? (item.href.startsWith("/#") ? "location" : "page") : undefined}
                    className={cn(
                      "group/nav text-label relative inline-flex h-10 items-center rounded-sm px-4 transition-colors duration-200",
                      current ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* Current marker: the motif in miniature — a short line arriving at a mint node. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-[5px] left-[calc(50%-14px)] h-px w-2.5 origin-right bg-accent transition-[opacity,transform] duration-300 ease-studio",
                        current ? "scale-x-100 opacity-70" : "scale-x-0 opacity-0",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-250 ease-studio",
                        current ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover/nav:scale-100 group-hover/nav:opacity-45",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button href={talkHref} variant="contrast" size="sm" className="hidden sm:inline-flex">
            Let&rsquo;s Talk
          </Button>
          <MobileNav items={items} talkHref={talkHref} />
        </div>
      </Container>
    </header>
  );
}
