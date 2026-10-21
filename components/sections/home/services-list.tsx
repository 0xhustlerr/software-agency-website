import { complementaryServices, coreServices } from "@/content/services";
import { servicesIntro } from "@/content/home";
import { talkHref } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ServicesShowcase } from "./services-showcase";

/** Section 4 — four interactive service rows. Rows link to their detail page once published, otherwise to the conversation. */
export function ServicesList() {
  const rows = coreServices.map((s) => ({
    ...s,
    href: s.detailPublished ? `/services/${s.slug}` : talkHref,
    linkLabel: s.detailPublished ? `Learn more about ${s.title}` : `Discuss ${s.title} with us`,
  }));
  return (
    <Section id="services" tone="muted" aria-labelledby="services-heading">
      <Reveal className="mb-12 lg:mb-16">
        <Eyebrow className="mb-4">{servicesIntro.eyebrow}</Eyebrow>
        <h2 id="services-heading" className="text-h2 max-w-[18ch]">
          {servicesIntro.heading}
        </h2>
      </Reveal>
      <ServicesShowcase services={rows} />
      <p className="text-body-sm mt-10 flex flex-wrap gap-x-3 gap-y-1 text-ink-muted">
        <span className="font-semibold text-ink">{servicesIntro.alsoLabel}:</span>
        {complementaryServices.map((s, i) => (
          <span key={s.slug}>
            {s.title}
            {i < complementaryServices.length - 1 ? <span aria-hidden className="ml-3 text-line-strong">/</span> : null}
          </span>
        ))}
      </p>
    </Section>
  );
}
