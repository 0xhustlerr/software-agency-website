import { engineering } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { ArchitectureDiagram, PipelineCard } from "@/components/illustrations/architecture";

/** Section 7 — dark engineering capabilities, explained for founders. */
export function Engineering() {
  return (
    <Section id="engineering" theme="dark" spacing="lg" aria-labelledby="engineering-heading">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="mb-4">{engineering.eyebrow}</Eyebrow>
          <h2 id="engineering-heading" className="text-h1 max-w-[13ch]">
            {engineering.heading}
          </h2>
          <p className="text-lead mt-8 max-w-[36ch] text-ink-muted">{engineering.supporting}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <figure className="m-0">
            <ScaledCanvas width={620} height={470}>
              <div aria-hidden className="absolute top-0 left-0 w-[520px]">
                <ArchitectureDiagram />
              </div>
              <div aria-hidden className="absolute right-0 bottom-0 w-[240px]">
                <PipelineCard />
              </div>
            </ScaledCanvas>
            <figcaption className="mt-4 flex justify-end">
              <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
                Architecture illustration
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
        {engineering.themes.map((t, i) => (
          <Reveal as="li" key={t.title} delay={(i % 3) * 0.06} className="border-t border-line pt-6">
            <h3 className="text-h4">{t.title}</h3>
            <p className="text-body-sm mt-2 max-w-[38ch] text-ink-muted">{t.body}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-20 lg:mt-24">
        <h3 className="text-eyebrow mb-5 text-ink-muted">Capabilities</h3>
        <dl className="border-b border-line">
          {engineering.capabilities.map((c) => (
            <div key={c.category} className="grid grid-cols-1 gap-2 border-t border-line py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6 lg:grid-cols-[14rem_1fr]">
              <dt className="text-h4 text-[1.0625rem]">{c.category}</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.8125rem] text-ink-muted">
                {c.items.map((it, i) => (
                  <span key={it} className="inline-flex items-center gap-3">
                    {i > 0 ? <span aria-hidden className="text-line-strong">/</span> : null}
                    {it}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
