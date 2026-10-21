"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, X } from "lucide-react";
import type { NavItem } from "@/content/types";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  items: NavItem[];
  talkHref: string;
}

/**
 * Below lg. Radix Dialog provides the focus trap, Escape to close, return of
 * focus to the trigger, and inert background content.
 */
export function MobileNav({ items, talkHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  // Routes stay mounted under Activity: close the panel when this route is hidden.
  useLayoutEffect(() => () => setOpen(false), []);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-line-strong lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="nm-overlay fixed inset-0 z-50 bg-navy-900/70" />
        <Dialog.Content
          data-theme="dark"
          className="nm-panel fixed inset-x-0 top-0 z-50 flex max-h-dvh flex-col overflow-y-auto border-b border-line bg-surface px-5 pt-3 pb-8 sm:px-10"
        >
          <div className="flex h-12 items-center justify-between">
            <Dialog.Title className="font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em]">
              Nexus Morrow
            </Dialog.Title>
            <Dialog.Close
              className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-line-strong"
              aria-label="Close menu"
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Main" className="mt-6">
            <ul className="border-b border-line">
              {items.map((item, i) => (
                <li key={item.label} className="nm-panel-item border-t border-line" style={{ animationDelay: `${60 + i * 40}ms` }}>
                  <Link href={item.href} onNavigate={close} onClick={close} className="group flex items-center justify-between rounded-xs py-4">
                    <span className="text-h3">{item.label}</span>
                    <ArrowRight aria-hidden className="size-5 text-ink-muted transition-transform duration-200 group-hover:translate-x-[3px]" strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={talkHref} className="mt-8 w-full justify-center" onClick={close}>
            Let&rsquo;s Talk
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
