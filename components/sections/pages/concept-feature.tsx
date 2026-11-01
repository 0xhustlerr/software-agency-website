import Image from "next/image";
import type { ProductConcept } from "@/content/types";
import { ProductDialog } from "./product-dialog";
import { Reveal } from "@/components/motion/reveal";

/** The four kinds of product, as named on the services. */
const kindLabel: Record<ProductConcept["kind"], string> = { saas: "SaaS Platform", mvp: "MVP", ai: "AI Product", custom: "Custom Software" };

/**
 * A compact concept card for the category rows on /work: a photo of the
 * product in use, its name and kind, the problem in one line, and chips.
 */
export function ConceptCard({ concept, index, items = [concept], className }: { concept: ProductConcept; index: number; items?: ProductConcept[]; className?: string }) {
  const a = concept.accent;
  return (
    <Reveal as="li" delay={index * 0.06} className={`group relative flex flex-col overflow-hidden rounded-[18px] border-[1.5px] bg-surface-raised ${className ?? ""}`} style={{ borderColor: `${a}66`, boxShadow: `0 0 50px -22px ${a}, 0 30px 60px -36px rgb(0 0 0 / 0.8)` }}>
      <ProductDialog items={items} index={Math.max(0, items.indexOf(concept))}>
        <button type="button" className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-400">
          <span className="sr-only">See the project: {concept.name}</span>
        </button>
      </ProductDialog>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={concept.image.src} alt={concept.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 ease-studio group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/85 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold tracking-[0.06em] uppercase" style={{ color: a, borderColor: `${a}88`, background: "rgb(11 18 32 / 0.8)" }}>
          {concept.tagline}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h4 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink">{concept.name}</h4>
        <p className="mt-1 font-mono text-[12px] tracking-[0.04em]">
          <span className="font-semibold" style={{ color: a }}>
            {kindLabel[concept.kind]}
          </span>
          <span className="text-ink-muted"> · {concept.category}</span>
        </p>
        <p className="text-body-sm mt-2 line-clamp-2 text-ink-muted">{concept.problem}</p>
        <ul aria-label="Capabilities" className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {concept.tags.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] text-ink" style={{ borderColor: `${a}55`, background: `${a}14` }}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
