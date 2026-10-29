import Image from "next/image";
import type { ProductConcept } from "@/content/types";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * A product concept, clearly labelled: large image, alternating sides by index.
 * No case-study link: it is not client work. The image keeps its own aspect
 * ratio so no part of the interface is cropped.
 */
export function ConceptFeature({ concept, index }: { concept: ProductConcept; index: number }) {
  const flip = index % 2 === 1;
  return (
    <li>
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        <figure className={cn("m-0 lg:col-span-8", flip && "lg:order-2 lg:col-start-5")}>
          <div
            data-theme="dark"
            className="relative overflow-hidden rounded-md bg-surface shadow-frame after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]"
          >
            <Image
              src={concept.image.src}
              alt={concept.image.alt}
              width={concept.image.width}
              height={concept.image.height}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="text-small mt-3 text-ink-muted">
            {concept.name}: “{concept.tagline}” — concept with sample data. Not affiliated with {concept.name}.
          </figcaption>
        </figure>
        <div className={cn("flex flex-col lg:col-span-4 lg:self-center", flip && "lg:order-1")}>
          <span className="self-start rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
            {concept.tagline}
          </span>
          <h3 className="text-h2 mt-5">{concept.name}</h3>
          <p className="text-mono mt-2 text-ink-muted">{concept.category}</p>
          <dl className="mt-8 grid gap-6">
            {[
              ["The problem it explores", concept.problem],
              ["Product approach", concept.approach],
              ["What it demonstrates", concept.demonstrates],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-line pt-4">
                <dt className="text-label mb-1.5 text-ink">{k}</dt>
                <dd className="text-body-sm text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <ul aria-label="Capabilities" className="mt-6 flex flex-wrap gap-2">
            {concept.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </li>
  );
}
