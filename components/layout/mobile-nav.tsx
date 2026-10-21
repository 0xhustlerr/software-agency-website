"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/content/types";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  items: NavItem[];
  cta: { label: string; href: string };
}

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Routes stay mounted (React Activity) — close the menu when this one is hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-navy-900/60" />
        <Dialog.Content
          data-theme="dark"
          className="fixed inset-x-0 top-0 z-50 flex max-h-dvh flex-col overflow-y-auto border-b border-line bg-surface px-5 pt-5 pb-8 sm:px-10"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em]">
              Nexus Morrow
            </Dialog.Title>
            <Dialog.Close
              className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink"
              aria-label="Close menu"
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Main" className="mt-8">
            <ul className="border-b border-line">
              {items.map((item) => (
                <li key={item.href} className="border-t border-line">
                  <Link
                    href={item.href}
                    onNavigate={() => setOpen(false)}
                    onClick={() => setOpen(false)}
                    className="text-h3 block rounded-xs py-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={cta.href} className="mt-8 w-full justify-center" onClick={() => setOpen(false)}>
            {cta.label}
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
