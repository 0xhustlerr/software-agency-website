import type { CSSProperties } from "react";
import { hero } from "@/content/home";
import { primaryCta, secondaryCta } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MintStop } from "@/components/ui/mint-stop";
import { HeroVisual } from "./hero-visual";

/** Entrance timing (ms). CSS only: plays at first paint, never waits for JavaScript. */
const at = (ms: number, extra?: Record<string, string>) => ({ "--reveal-delay": `${ms}ms`, ...extra }) as CSSProperties;

/**
 * Section 2 — dark hero that fits one screen on desktop: centred copy, the
 * "idea → product" scene, then the actions beneath it. On desktop the scene's
 * width follows the window height (aspect ≈ 2.49), so everything stays in view.
 * Choreography: eyebrow (0) → headline lines (120 / 200) → lead (460) →
 * scene (200–1000) → actions (900) → capabilities (1000).
 */
export function Hero() {
  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-heading"
      className="nm-hero-grid pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-8 lg:pb-12"
    >
      <div className="relative flex flex-col items-center text-center">
        <div className="nm-enter" style={at(0, { "--rise": "8px", "--enter-dur": "500ms" })}>
          <Eyebrow drawMark className="mb-4 lg:mb-5">
            {hero.eyebrow}
          </Eyebrow>
        </div>
        {/* Two art-directed lines at every width; the type scales so neither breaks. */}
        <h1 id="hero-heading" className="text-display text-ink [font-size:clamp(2.3rem,7.4vw,4.25rem)]">
          {hero.headlineLines.map((line, i) => (
            <span key={line} className="nm-line" style={at(120 + i * 80)}>
              <span>
                <MintStop>{line}</MintStop>{" "}
              </span>
            </span>
          ))}
        </h1>
        {/* The lead is usually the Largest Contentful Paint on phones: visible at first paint, it only settles. */}
        <p className="nm-settle text-lead mt-4 max-w-[58ch] text-ink-muted" style={at(460)}>
          {hero.lead}
        </p>
        <div className="mt-8 w-full lg:mt-5 lg:max-w-[max(40rem,calc((100svh-33rem)*2.49))]">
          <HeroVisual />
        </div>
        <div
          className="nm-enter mt-8 grid w-full grid-cols-1 gap-3 min-[420px]:flex min-[420px]:w-auto min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:justify-center lg:mt-5"
          style={at(900, { "--rise": "10px", "--enter-dur": "500ms" })}
        >
          <Button href={primaryCta.href} className="justify-center">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" className="justify-center">
            {secondaryCta.label}
          </Button>
        </div>
        <p className="nm-enter-fade mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.8125rem] text-ink-muted lg:mt-4" style={at(1000)}>
          <span className="sr-only">We build: </span>
          {hero.capabilities.map((c, i) => (
            <span key={c} className="inline-flex items-center gap-3">
              {i > 0 ? <span aria-hidden className="text-line-strong">/</span> : null}
              {c}
            </span>
          ))}
        </p>
      </div>
    </Section>
  );
}
