"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Lightbulb, X } from "lucide-react";
import type { ProductConcept } from "@/content/types";

const kindLabel: Record<ProductConcept["kind"], string> = { saas: "SaaS Platform", mvp: "MVP", ai: "AI Product", custom: "Custom Software" };

/**
 * Full-screen view of a product: its screen, large, beside the idea behind it
 * (a "What if…?" question), the problem, the approach and what it shows.
 * Opens from any product on the site; arrows step through the same list.
 * `children` is the trigger (rendered as-is, so it must be a button or link).
 */
export function ProductDialog({ items, index, children }: { items: ProductConcept[]; index: number; children: ReactNode }) {
  const [i, setI] = useState(index);
  const c = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <Dialog.Root onOpenChange={(open) => open && setI(index)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="nm-overlay fixed inset-0 z-50 bg-[#070c16]/90 backdrop-blur-sm" />
        <Dialog.Content
          data-theme="dark"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-transparent text-ink outline-none lg:overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="font-mono text-[12px] font-semibold tracking-[0.14em] uppercase" style={{ color: c.accent }}>
              {kindLabel[c.kind]} · {c.category}
            </p>
            <div className="flex items-center gap-2">
              {items.length > 1 ? (
                <>
                  <button type="button" aria-label="Previous product" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10">
                    <ArrowLeft className="size-5" strokeWidth={2.25} />
                  </button>
                  <button type="button" aria-label="Next product" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10">
                    <ArrowRight className="size-5" strokeWidth={2.25} />
                  </button>
                </>
              ) : null}
              <Dialog.Close aria-label="Close" className="grid size-11 place-items-center rounded-full bg-white text-navy-900 hover:bg-white/85">
                <X className="size-5" strokeWidth={2.5} />
              </Dialog.Close>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 px-5 pb-6 sm:px-8 lg:min-h-0 lg:grid-cols-12 lg:gap-10 lg:pb-8">
            {/* the product's screen, in a browser frame */}
            <div className="flex min-h-[240px] flex-col overflow-hidden rounded-[18px] border-[1.5px] bg-[#0e1626] lg:col-span-8 lg:min-h-0" style={{ borderColor: `${c.accent}99`, boxShadow: `0 0 90px -24px ${c.accent}` }}>
              <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/10 bg-[#1a2538] px-4">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto rounded-full bg-white/[0.07] px-6 py-0.5 font-mono text-[11px] text-white/60">{c.name}</span>
              </div>
              <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1">
                <Image key={c.slug} src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-contain object-top" />
              </div>
            </div>

            {/* the story */}
            <div className="flex flex-col lg:col-span-4 lg:min-h-0 lg:overflow-y-auto">
              <Dialog.Title className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.03em] text-white">{c.name}</Dialog.Title>
              <p className="mt-2 text-white/60">{c.tagline}</p>

              <div className="mt-6 rounded-[18px] border-[1.5px] p-5" style={{ borderColor: `${c.accent}88`, background: `${c.accent}14`, boxShadow: `0 0 40px -16px ${c.accent}` }}>
                <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase" style={{ color: c.accent }}>
                  <span className="grid size-7 place-items-center rounded-full" style={{ background: c.accent }}>
                    <Lightbulb aria-hidden className="size-4 text-navy-900" strokeWidth={2.5} />
                  </span>
                  The founder’s idea
                </p>
                <Dialog.Description className="font-display mt-3 text-[1.375rem] leading-snug font-medium text-white">{c.idea}</Dialog.Description>
              </div>

              <dl className="mt-6 grid gap-4">
                {[
                  ["The problem", c.problem],
                  ["The product", c.approach],
                  ["What it shows", c.demonstrates],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-white/10 pt-3">
                    <dt className="text-[12px] font-semibold tracking-[0.1em] text-white/50 uppercase">{k}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-white/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul aria-label="Capabilities" className="mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-[12px] text-white" style={{ borderColor: `${c.accent}66`, background: `${c.accent}1a` }}>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-[12px] text-white/45">An example of the kind of product we design and engineer. Not client work; not affiliated with {c.name}.</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
