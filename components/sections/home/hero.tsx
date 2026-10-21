import { hero } from "@/content/home";
import { primaryCta, secondaryCta } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NodeGrid } from "@/components/ui/node-grid";
import { Reveal } from "@/components/motion/reveal";

/** Dark hero: copy in columns 1–7, the connected-node motif in the right columns. */
export function Hero() {
  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-heading"
      className="pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-36"
      containerClassName="relative"
    >
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-0 hidden w-[36%] max-w-[520px] -translate-y-1/2 xl:right-14 lg:block">
        <NodeGrid cols={6} rows={7} pitch={72} path={[[0, 1], [3, 1], [3, 4], [5, 4], [5, 6]]} animate />
      </div>
      <div className="relative lg:max-w-[58%]">
        <Reveal>
          <Eyebrow className="mb-6 lg:mb-8">{hero.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 id="hero-heading" className="text-display max-w-[11ch] text-ink">
            {hero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-lead mt-8 max-w-[44ch] text-ink-muted lg:mt-10">{hero.lead}</p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          <Button href={secondaryCta.href} variant="secondary">
            {secondaryCta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
