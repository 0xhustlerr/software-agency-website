import { hero } from "@/content/home";
import { primaryCta, secondaryCta } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "./hero-visual";

/** Section 2 — dark two-column hero: copy left, product-engineering composition right. */
export function Hero() {
  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-heading"
      className="pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <Eyebrow className="mb-6 lg:mb-8">{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-heading" className="text-display max-w-[11ch] text-ink lg:text-[clamp(3.5rem,5.6vw,6.25rem)]">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lead mt-7 max-w-[42ch] text-ink-muted lg:mt-9">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.26} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.8125rem] text-ink-muted">
              <span className="sr-only">We build: </span>
              {hero.capabilities.map((c, i) => (
                <span key={c} className="inline-flex items-center gap-3">
                  {i > 0 ? <span aria-hidden className="text-line-strong">/</span> : null}
                  {c}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:-mr-4 xl:-mr-10">
          <HeroVisual />
        </div>
      </div>
    </Section>
  );
}
