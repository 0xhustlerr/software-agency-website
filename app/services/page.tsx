import { services } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import { additionalCapabilities, coreServiceFeatures, engagementStages, servicesFaqs, servicesHero } from "@/content/pages/services";
import { talkHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { IconCard, tints } from "@/components/ui/icon-card";
import { ServiceBadge, ServiceVisual, serviceLooks } from "@/components/illustrations/service-visuals";
import { Check, Gauge, Palette, ServerCog, type LucideIcon } from "lucide-react";
import { BlueprintStage } from "@/components/sections/pages/blueprint-stage";
import { StageCard } from "@/components/sections/pages/stage-card";
import { ColorTabs } from "@/components/ui/color-tabs";
import { Split } from "@/components/sections/pages/split";
import { ServicesHeroArt } from "@/components/illustrations/services-hero-art";
import { CtaBand } from "@/components/sections/cta-band";

/** One icon and colour per additional capability: design, infrastructure, scaling. `ink` is the readable shade on white. */
const extras: { icon: LucideIcon; accent: string; ink: string }[] = [
  { icon: Palette, ...tints.violet },
  { icon: ServerCog, ...tints.blue },
  { icon: Gauge, ...tints.mint },
];

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
        full
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
        <Reveal className="mb-8 lg:mb-10">
          <Eyebrow>Core services</Eyebrow>
          <h2 id="core-h" className="text-h2 mt-4 max-w-[20ch]">
            Four ways we take products from idea to production.
          </h2>
        </Reveal>
        {/* One service at a time, so the section fits one screen. */}
        <ColorTabs
          label="Core services"
          tabs={coreServiceFeatures.map((f) => {
            const look = serviceLooks[f.slug];
            const Icon = look?.icon;
            return { id: f.slug, label: look?.label ?? f.slug, accent: look?.accent ?? "#6de1d2", icon: Icon ? <Icon className="size-4" strokeWidth={2.5} /> : null };
          })}
          panels={coreServiceFeatures.map((f) => {
            const s = services.find((x) => x.slug === f.slug)!;
            const look = serviceLooks[f.slug];
            return (
              <article key={f.slug} aria-labelledby={`svc-${f.slug}`} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
                <figure className="m-0 lg:col-span-7">
                  <BlueprintStage className="sm:p-4">
                    <div aria-hidden className="w-full max-w-[420px]">
                      <ServiceVisual slug={f.slug} />
                    </div>
                  </BlueprintStage>
                  <ServiceBadge slug={f.slug} />
                </figure>
                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.1em]" style={{ color: look?.ink }}>
                    {s.index}
                  </p>
                  <h3 id={`svc-${f.slug}`} className="text-h2 mt-2">
                    {serviceDetails[f.slug]?.name ?? s.title}
                  </h3>
                  <p className="text-body mt-3 text-ink-muted">{f.outcome}</p>
                  <ul className="mt-5 grid gap-2">
                    {f.capabilities.map((c) => (
                      <li key={c} className="text-body-sm flex items-start gap-3">
                        <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full" style={{ background: look?.accent }}>
                          <Check className="size-3 text-navy-900" strokeWidth={3.5} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/services/${f.slug}`} variant="ghost" className="mt-6">
                    {f.linkLabel}
                  </Button>
                </div>
              </article>
            );
          })}
        />
      </Section>

      {/* C · additional capabilities */}
      <Section tone="muted" aria-labelledby="add-h">
        <Reveal className="mb-8 lg:mb-10">
          <Eyebrow>Additional capabilities</Eyebrow>
          <h2 id="add-h" className="text-h2 mt-4 max-w-[22ch]">
            Support for every part of the product, before and after launch.
          </h2>
        </Reveal>
        {/* Light glass cards, so they don't repeat the dark stage tiles further down. */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {additionalCapabilities.map((c, i) => {
            const { icon, accent, ink } = extras[i % extras.length];
            return <IconCard key={c.title} icon={icon} accent={accent} ink={ink} mark={String.fromCharCode(65 + i)} title={c.title} body={c.body} tags={c.tags} delay={i * 0.06} />;
          })}
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
            <Reveal as="li" key={st.title} delay={i * 0.06}>
              <StageCard stage={st} index={i} />
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
