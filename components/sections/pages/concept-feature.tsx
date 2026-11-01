import Image from "next/image";
import type { ProductConcept } from "@/content/types";
import { Tag } from "@/components/ui/tag";
import { Badge3D } from "@/components/illustrations/scene";
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
            className="relative overflow-hidden rounded-[16px] border-[1.5px] bg-surface"
            style={{ borderColor: `${concept.accent}aa`, boxShadow: `0 0 70px -16px ${concept.accent}aa, 0 40px 70px -30px rgb(0 0 0 / 0.55)` }}
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
            {concept.original
              ? `${concept.name}: an original product concept with sample data.`
              : `${concept.name}: “${concept.tagline}” — concept with sample data. Not affiliated with ${concept.name}.`}
          </figcaption>
        </figure>
        <div className={cn("flex flex-col lg:col-span-4 lg:self-center", flip && "lg:order-1")}>
          <span className="self-start">
            <Badge3D accent={concept.accent}>{concept.tagline}</Badge3D>
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

/**
 * A compact concept card for the category rows on /work: a photo of the
 * product in use, its name and kind, the problem in one line, and chips.
 */
export function ConceptCard({ concept, index }: { concept: ProductConcept; index: number }) {
  const a = concept.accent;
  return (
    <Reveal as="li" delay={index * 0.06} className="group flex flex-col overflow-hidden rounded-[18px] border-[1.5px] bg-surface-raised" style={{ borderColor: `${a}66`, boxShadow: `0 0 50px -22px ${a}, 0 30px 60px -36px rgb(0 0 0 / 0.8)` }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={concept.image.src} alt={concept.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-studio group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/85 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold tracking-[0.06em] uppercase" style={{ color: a, borderColor: `${a}88`, background: "rgb(11 18 32 / 0.8)" }}>
          {concept.tagline}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink">{concept.name}</h4>
        <p className="text-mono mt-1 text-ink-muted">{concept.category}</p>
        <p className="text-body-sm mt-3 text-ink-muted">{concept.problem}</p>
        <ul aria-label="Capabilities" className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {concept.tags.map((t) => (
            <li key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] text-ink" style={{ borderColor: `${a}55`, background: `${a}14` }}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
