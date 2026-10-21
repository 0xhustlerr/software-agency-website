import type { CSSProperties } from "react";
import { hero } from "@/content/home";
import { primaryCta, secondaryCta } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroVisual } from "./hero-visual";

/** Entrance timing (ms). CSS only: plays at first paint, never waits for JavaScript. */
const at = (ms: number, extra?: Record<string, string>) => ({ "--reveal-delay": `${ms}ms`, ...extra }) as CSSProperties;

/**
 * Section 2 — dark two-column hero: copy left, product-engineering composition right.
 * Choreography: eyebrow (0) → headline lines (120 / 200 / 280) → lead (460) →
 * actions (580) → capabilities (680); the composition assembles from 360.
 */
export function Hero() {
  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-heading"
      className="nm-hero-grid pt-8 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32"
    >
      <div className="relative grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <div className="nm-enter" style={at(0, { "--rise": "8px", "--enter-dur": "500ms" })}>
            <Eyebrow drawMark className="mb-6 lg:mb-8">
              {hero.eyebrow}
            </Eyebrow>
          </div>
          {/* Three art-directed lines at every width; the type scales so none breaks. */}
          <h1
            id="hero-heading"
            className="text-display -ml-[0.045em] text-ink [font-size:clamp(2.5rem,12.4vw,6rem)] lg:[font-size:clamp(3.5rem,5.6vw,5.75rem)]"
          >
            {hero.headlineLines.map((line, i) => (
              <span key={line} className="nm-line" style={at(120 + i * 80)}>
                <span>{line} </span>
              </span>
            ))}
          </h1>
          <p className="nm-enter text-lead mt-6 max-w-[42ch] text-ink-muted sm:mt-7 lg:mt-9" style={at(460)}>
            {hero.lead}
          </p>
          <div
            className="nm-enter mt-8 grid grid-cols-1 gap-3 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center sm:mt-9"
            style={at(580, { "--rise": "10px", "--enter-dur": "500ms" })}
          >
            <Button href={primaryCta.href} className="justify-center">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" className="justify-center">
              {secondaryCta.label}
            </Button>
          </div>
          <p
            className="nm-enter-fade mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.8125rem] text-ink-muted sm:mt-10"
            style={at(680)}
          >
            <span className="sr-only">We build: </span>
            {hero.capabilities.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-3">
                {i > 0 ? <span aria-hidden className="text-line-strong">/</span> : null}
                {c}
              </span>
            ))}
          </p>
        </div>
        <div className="lg:col-span-6 lg:-mr-4 xl:-mr-10">
          <HeroVisual />
        </div>
      </div>
    </Section>
  );
}
