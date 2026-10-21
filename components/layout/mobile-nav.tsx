"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import type { NavItem } from "@/content/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
  talkHref: string;
}

const triggerCls =
  "inline-flex size-11 items-center justify-center rounded-sm border border-line text-ink transition-colors duration-200 hover:border-line-strong active:bg-surface-raised lg:hidden";

/**
 * Below lg. Radix Dialog provides the focus trap, Escape to close, return of
 * focus to the trigger, scroll lock and inert background content. The panel
 * is full height and repeats the header bar, so the toggle never moves.
 */
export function MobileNav({ items, talkHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Routes stay mounted under Activity: close the panel when this route is hidden.
  useLayoutEffect(() => () => setOpen(false), []);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={triggerCls} aria-label="Open menu">
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 8h16M4 16h16" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="nm-overlay fixed inset-0 z-50 bg-navy-900/60" />
        <Dialog.Content
          data-theme="dark"
          className="nm-panel fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-surface pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between border-b border-line">
            <Dialog.Title className="font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em]">Nexus Morrow</Dialog.Title>
            <Dialog.Close className={cn(triggerCls, "border-line-strong")} aria-label="Close menu">
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Main" className="container-site mt-2 flex-1">
            <ol>
              {items.map((item, i) => {
                const current = !item.href.startsWith("/#") && pathname.startsWith(item.href);
                return (
                  <li key={item.label} className="nm-panel-item border-b border-line" style={{ animationDelay: `${60 + i * 40}ms` }}>
                    <Link
                      href={item.href}
                      onNavigate={close}
                      onClick={close}
                      aria-current={current ? "page" : undefined}
                      className="group flex min-h-18 items-center gap-4 rounded-xs py-4"
                    >
                      <span aria-hidden className="text-mono w-6 text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display flex-1 text-[1.875rem] leading-none font-semibold tracking-[-0.03em]">{item.label}</span>
                      {current ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
                      <ArrowRight
                        aria-hidden
                        className="size-5 text-ink-muted transition-transform duration-200 ease-studio group-hover:translate-x-[3px] group-active:translate-x-[3px]"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="container-site nm-panel-item mt-8" style={{ animationDelay: `${60 + items.length * 40}ms` }}>
            <Button href={talkHref} className="w-full justify-center" arrow onClick={close}>
              Let&rsquo;s Talk
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
