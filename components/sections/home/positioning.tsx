import { positioning } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** Section 3 — spacious editorial statement with three ruled value pillars. */
export function Positioning() {
  return (
    <Section id="approach" spacing="lg" aria-labelledby="approach-heading">
      <div className="grid-site gap-y-10">
        <Reveal className="col-span-full lg:col-span-8">
          <Eyebrow className="mb-4">{positioning.eyebrow}</Eyebrow>
          <h2 id="approach-heading" className="text-h1 max-w-[14ch]">
            {positioning.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="col-span-full sm:col-span-6 sm:col-start-3 lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lead text-ink-muted">{positioning.body}</p>
        </Reveal>
      </div>
      <ol className="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-28">
        {positioning.pillars.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.07} className="border-t border-ink pt-6">
            <p className="text-mono mb-8 text-ink-muted lg:mb-14">
              {String(i + 1).padStart(2, "0")} <span className="text-line-strong">/</span>
            </p>
            <h3 className="text-h3 max-w-[14ch]">{p.title}</h3>
            <p className="text-body-sm mt-3 max-w-[34ch] text-ink-muted">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
