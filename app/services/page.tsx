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
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBadge, ServiceVisual, serviceLooks } from "@/components/illustrations/service-visuals";
import { Check, Gauge, Palette, ServerCog, type LucideIcon } from "lucide-react";
import { BlueprintStage } from "@/components/sections/pages/blueprint-stage";
import { StageCard } from "@/components/sections/pages/stage-card";
import { Split } from "@/components/sections/pages/split";
import { ServicesHeroArt } from "@/components/illustrations/services-hero-art";
import { CtaBand } from "@/components/sections/cta-band";

/** One icon and colour per additional capability: design, infrastructure, scaling. `ink` is the readable shade on white. */
const extras: { icon: LucideIcon; accent: string; ink: string }[] = [
  { icon: Palette, accent: "#b794f6", ink: "#7b4fd0" },
  { icon: ServerCog, accent: "#6ea8ff", ink: "#2f6fd6" },
  { icon: Gauge, accent: "#6de1d2", ink: "#0a7266" },
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
                  <figure className="m-0">
                    <BlueprintStage className="aspect-[4/3]">
                      <div aria-hidden className="w-full">
                        <ServiceVisual slug={f.slug} />
                      </div>
                    </BlueprintStage>
                    <ServiceBadge slug={f.slug} />
                  </figure>
                </Reveal>
                <Reveal delay={0.08} className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                  <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.1em]" style={{ color: serviceLooks[f.slug]?.ink }}>
                    {s.index}
                  </p>
                  <h3 id={`svc-${f.slug}`} className="text-h2 mt-3">
                    {serviceDetails[f.slug]?.name ?? s.title}
                  </h3>
                  <p className="text-lead mt-4 text-ink-muted">{f.outcome}</p>
                  <ul className="mt-7 grid gap-2.5">
                    {f.capabilities.map((c) => (
                      <li key={c} className="text-body-sm flex items-start gap-3">
                        <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full" style={{ background: serviceLooks[f.slug]?.accent }}>
                          <Check className="size-3 text-navy-900" strokeWidth={3.5} />
                        </span>
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
        <p className="text-small mt-12 text-ink-muted">Service photos are illustrative.</p>
      </Section>

      {/* C · additional capabilities */}
      <Section tone="muted" aria-labelledby="add-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Additional capabilities</Eyebrow>
          <h2 id="add-h" className="text-h2 mt-4 max-w-[22ch]">
            Support for every part of the product, before and after launch.
          </h2>
        </Reveal>
        {/* Light glass cards, so they don't repeat the dark stage tiles further down. */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {additionalCapabilities.map((c, i) => {
            const { icon: Icon, accent, ink } = extras[i % extras.length];
            return (
              <Reveal
                as="li"
                key={c.title}
                delay={i * 0.06}
                className="relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface p-6 shadow-[0_24px_50px_-30px_rgb(16_24_39/0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }} />
                <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full blur-[40px]" style={{ background: `${accent}33` }} />
                <span aria-hidden className="relative grid size-14 place-items-center rounded-[16px]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 12px 28px -10px ${accent}` }}>
                  <Icon className="size-7 text-navy-900" strokeWidth={2} />
                </span>
                <p className="relative mt-5 font-mono text-[0.75rem] font-semibold tracking-[0.12em]" style={{ color: ink }}>
                  {String.fromCharCode(65 + i)}
                </p>
                <h3 className="text-h3 relative mt-1">{c.title}</h3>
                <p className="text-body-sm relative mt-2.5 text-ink-muted">{c.body}</p>
                <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Includes">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-full border px-2.5 py-1 font-mono text-[12px] text-ink" style={{ borderColor: `${accent}66`, background: `${accent}1a` }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
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
