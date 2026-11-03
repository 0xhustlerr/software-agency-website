import { services } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import { additionalCapabilities, coreServiceFeatures, engagementStages, servicesFaqs, servicesHero } from "@/content/pages/services";
import { talkHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { IconCard, tints } from "@/components/ui/icon-card";
import { ServiceBadge, ServicePhoto, serviceLooks } from "@/components/illustrations/service-visuals";
import { Check, Gauge, Palette, ServerCog, type LucideIcon } from "lucide-react";
import { StageCard } from "@/components/sections/pages/stage-card";
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

      {/* B · core services: a short intro, then one full screen per service */}
      <Section aria-labelledby="core-h" className="lg:pb-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Core services</Eyebrow>
            <h2 id="core-h" className="text-h2 mt-4 max-w-[22ch]">
              Four ways we take products from idea to production.
            </h2>
          </div>
          <nav aria-label="Core services" className="flex flex-wrap gap-2">
            {coreServiceFeatures.map((f) => {
              const look = serviceLooks[f.slug];
              const Icon = look?.icon;
              return (
                <a
                  key={f.slug}
                  href={`#svc-${f.slug}`}
                  className="flex items-center gap-2.5 rounded-full border-[1.5px] py-1.5 pr-4 pl-1.5 text-[15px] font-semibold text-ink transition-[box-shadow] duration-300 hover:shadow-[0_0_26px_-8px_var(--c)]"
                  style={{ borderColor: look?.accent, background: `${look?.accent}1a`, "--c": look?.accent } as React.CSSProperties}
                >
                  <span aria-hidden className="grid size-8 place-items-center rounded-full text-navy-900" style={{ background: look?.accent }}>
                    {Icon ? <Icon className="size-4" strokeWidth={2.5} /> : null}
                  </span>
                  {look?.label}
                </a>
              );
            })}
          </nav>
        </Reveal>
      </Section>
      {coreServiceFeatures.map((f, i) => {
        const s = services.find((x) => x.slug === f.slug)!;
        const look = serviceLooks[f.slug];
        const flip = i % 2 === 1;
        /** Pictures alternate sides, starting on the right; each is angled toward its text. */
        const picRight = i % 2 === 0;
        return (
          <section
            key={f.slug}
            id={`svc-${f.slug}`}
            data-theme={flip ? "dark" : "light"}
            aria-labelledby={`svc-h-${f.slug}`}
            className={cn("relative flex scroll-mt-(--header-h) items-center overflow-clip py-16 lg:min-h-[calc(100svh-var(--header-h))] lg:py-10", flip ? "bg-surface" : i === 0 ? "bg-surface-muted" : "bg-surface")}
          >
            {/* the service's own light */}
            <div aria-hidden className="pointer-events-none absolute top-1/2 size-[680px] -translate-y-1/2 rounded-full blur-[120px]" style={{ background: `${look?.accent}${flip ? "26" : "33"}`, [picRight ? "right" : "left"]: "-10%" }} />
            <Container className="relative w-full">
              <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
                <figure className={cn("m-0 lg:col-span-7", picRight && "lg:order-2 lg:col-start-6")}>
                  <ServicePhoto slug={f.slug} side={picRight ? "right" : "left"} />
                  <ServiceBadge slug={f.slug} />
                </figure>
                <Reveal className={cn("lg:col-span-5", picRight ? "lg:order-1" : "lg:col-start-8")}>
                  <p className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.04em]" style={{ color: look?.accent }}>
                    {s.index}
                  </p>
                  <h3 id={`svc-h-${f.slug}`} className="text-h1 mt-3">
                    {serviceDetails[f.slug]?.name ?? s.title}
                  </h3>
                  <p className="text-lead mt-4 text-ink-muted">{f.outcome}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {f.capabilities.map((c) => (
                      <li key={c} className="text-body flex items-start gap-3">
                        <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full" style={{ background: look?.accent }}>
                          <Check className="size-3.5 text-navy-900" strokeWidth={3.5} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/services/${f.slug}`} className="mt-8" arrow>
                    {f.linkLabel}
                  </Button>
                </Reveal>
              </article>
            </Container>
          </section>
        );
      })}

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
