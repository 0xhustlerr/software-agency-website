import { complementaryServices, coreServices, serviceHref } from "@/content/services";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceRow } from "@/components/ui/service-row";
import { Reveal } from "@/components/motion/reveal";

/** Horizontal service list — four core capabilities, then two complementary services. */
export function ServicesList() {
  return (
    <Section id="services" tone="muted" aria-labelledby="services-heading">
      <div className="grid-site mb-12 gap-y-6 lg:mb-16">
        <SectionHeading
          id="services-heading"
          className="col-span-full lg:col-span-7"
          eyebrow="What we build"
          heading="Four ways we help founders ship."
        />
        <p className="text-body col-span-full self-end text-ink-muted lg:col-span-4 lg:col-start-9">
          Each engagement covers product thinking and engineering together, so the first version is designed and built as one piece of work.
        </p>
      </div>
      <div>
        {coreServices.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <ServiceRow service={s} href={serviceHref(s)} />
          </Reveal>
        ))}
      </div>
      <h3 className="text-eyebrow mt-16 mb-4 text-ink-muted">Complementary services</h3>
      <div className="border-b border-line">
        {complementaryServices.map((s) => (
          <ServiceRow key={s.slug} service={s} href={serviceHref(s)} headingLevel="h4" />
        ))}
      </div>
    </Section>
  );
}
