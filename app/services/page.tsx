import { services } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import { additionalCapabilities, coreServiceFeatures, engagementStages, servicesFaqs, servicesHero } from "@/content/pages/services";
import { talkHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { ServiceVisual } from "@/components/illustrations/service-visuals";
import { BlueprintStage } from "@/components/sections/pages/blueprint-stage";
import { Split } from "@/components/sections/pages/split";
import { ServicesHeroArt } from "@/components/illustrations/services-hero-art";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Services: MVP, SaaS, AI and custom software development",
  description:
    "MVP development, custom software, SaaS and AI product development for startup founders — from early product decisions to production-ready engineering.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        lead={servicesHero.lead}
        actions={
          <>
            <Button href={talkHref}>Discuss Your Product</Button>
            <Button href="#stages" variant="secondary">
              Find your stage
            </Button>
          </>
        }
        aside={<ServicesHeroArt />}
      />

      {/* B · core services */}
      <Section aria-labelledby="core-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Core services</Eyebrow>
          <h2 id="core-h" className="text-h2 mt-4 max-w-[20ch]">
            Four ways we take products from idea to production.
          </h2>
        </Reveal>
        <div className="grid gap-24 lg:gap-36">
          {coreServiceFeatures.map((f, i) => {
            const s = services.find((x) => x.slug === f.slug)!;
            const flip = i % 2 === 1;
            return (
              <article key={f.slug} aria-labelledby={`svc-${f.slug}`} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
                <Reveal className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
                  <BlueprintStage className="aspect-[4/3]">
                    {/* DOM vignettes stay crisp when scaled; at 1:1 they left most of the stage empty. */}
                    <div aria-hidden className="w-full max-w-[400px] sm:scale-[1.2] xl:scale-[1.35]">
                      <ServiceVisual slug={f.slug} />
                    </div>
                  </BlueprintStage>
                </Reveal>
                <Reveal delay={0.08} className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                  <p className="text-mono text-accent-ink">{s.index}</p>
                  <h3 id={`svc-${f.slug}`} className="text-h2 mt-3">
                    {serviceDetails[f.slug]?.name ?? s.title}
                  </h3>
                  <p className="text-lead mt-4 text-ink-muted">{f.outcome}</p>
                  <ul className="mt-7 border-b border-line">
                    {f.capabilities.map((c) => (
                      <li key={c} className="text-body-sm border-t border-line py-3">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/services/${f.slug}`} variant="ghost" className="mt-7">
                    {f.linkLabel}
                  </Button>
                </Reveal>
              </article>
            );
          })}
        </div>
        <p className="text-small mt-12 text-ink-muted">Interface vignettes are illustrative concepts with sample data.</p>
      </Section>

      {/* C · additional capabilities */}
      <Section tone="muted" aria-labelledby="add-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Additional capabilities</Eyebrow>
          <h2 id="add-h" className="text-h2 mt-4 max-w-[22ch]">
            Support for every part of the product, before and after launch.
          </h2>
        </Reveal>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
          {additionalCapabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06} className="border-t border-ink pt-6">
              <p className="text-mono text-ink-muted">{String.fromCharCode(65 + i)}</p>
              <h3 className="text-h3 mt-6">{c.title}</h3>
              <p className="text-body-sm mt-2.5 text-ink-muted">{c.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Includes">
                {c.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* D · engagement stages */}
      <Section id="stages" aria-labelledby="stages-h">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:mb-18 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Engagement stages</Eyebrow>
            <h2 id="stages-h" className="text-h2 mt-4 max-w-[20ch]">
              Wherever you are, there’s a sensible next step.
            </h2>
          </Reveal>
          <p className="text-lead self-end text-ink-muted lg:col-span-5">We shape each engagement around your product’s stage — not a fixed package.</p>
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagementStages.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 0.06} className="rounded-md border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className={cn("size-[9px] rounded-full border", i === 0 ? "border-accent bg-accent" : "border-accent-ink")} />
              </div>
              <h3 className="font-display mt-7 text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.02em]">{st.title}</h3>
              <dl className="mt-5 grid gap-3.5">
                {[
                  ["Where you are", st.where],
                  ["What we focus on", st.focus],
                  ["You leave with", st.leaveWith],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">{k}</dt>
                    <dd className="text-body-sm mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-line pt-3.5 font-mono text-xs text-accent-ink">{st.fit}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* E · founder FAQ */}
      <Section tone="muted" aria-labelledby="sfaq-h">
        <Split id="sfaq-h" eyebrow="Founder FAQ" heading="Choosing where to start." note="Engagement structure, ownership and commercial terms are defined in each project agreement.">
          <Accordion items={servicesFaqs} />
        </Split>
      </Section>

      <CtaBand
        heading="Not sure which service fits? Let’s work it out together."
        body="Tell us where your product is today. We’ll suggest a sensible starting point — even if that means a smaller first step."
        cta="Discuss Your Product"
      />
    </>
  );
}
