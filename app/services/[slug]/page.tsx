import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { services } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import { approvedProjects } from "@/content/projects";
import { talkHref } from "@/content/site";
import type { ServiceSlug } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { ServiceHeroBackdrop, serviceLooks } from "@/components/illustrations/service-visuals";
import { DeliverableTiles, PainCards, PersonaCards, ProcessRail, SpecCards } from "@/components/sections/pages/service-sections";
import { Split } from "@/components/sections/pages/split";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { CtaBand } from "@/components/sections/cta-band";

const published = services.filter((s) => s.detailPublished && serviceDetails[s.slug]);

export function generateStaticParams() {
  return published.map((s) => ({ slug: s.slug }));
}

function load(slug: string) {
  const service = published.find((s) => s.slug === slug);
  const detail = service ? serviceDetails[service.slug as ServiceSlug] : undefined;
  return service && detail ? { service, detail } : null;
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = load(slug);
  if (!data) return {};
  return pageMetadata({ title: `${data.detail.name} for startups`, description: data.detail.lead, path: `/services/${slug}` });
}

export default function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  // Read params inside Suspense so Partial Prefetching can serve the App Shell.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServiceDetailPageContent params={params} />
    </Suspense>
  );
}

async function ServiceDetailPageContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const data = load(slug);
  if (!data) notFound();
  const { service, detail: d } = data;
  const tint = serviceLooks[service.slug] ?? { accent: "#6de1d2", ink: "#0a7266" };
  const related = approvedProjects.filter((p) => p.services.includes(service.slug)).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: d.name }]}
        eyebrow={d.name}
        title={d.headline}
        lead={d.lead}
        actions={
          <>
            <Button href={talkHref}>Discuss Your Product</Button>
            <Button href="#deliverables" variant="secondary">
              See deliverables
            </Button>
          </>
        }
        backdrop={<ServiceHeroBackdrop slug={service.slug} />}
      />

      <Section aria-labelledby="who-h">
        <Split id="who-h" eyebrow="Who it’s for" heading={d.whoTitle}>
          <PersonaCards items={d.who.map((w) => ({ title: w.title, body: w.body }))} accent={tint.accent} ink={tint.ink} />
        </Split>
      </Section>

      <Section tone="muted" aria-labelledby="prob-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Problems it solves</Eyebrow>
          <h2 id="prob-h" className="text-h2 mt-4 max-w-[22ch]">
            {d.problemsTitle}
          </h2>
        </Reveal>
        <PainCards items={d.problems} />
      </Section>

      <Section id="deliverables" aria-labelledby="dlv-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Typical deliverables</Eyebrow>
          <h2 id="dlv-h" className="text-h2 mt-4">
            What you can expect to receive.
          </h2>
          <p className="text-lead mt-5 max-w-[52ch] text-ink-muted">Every engagement is scoped with you; these are the deliverables most {d.short} projects include.</p>
        </Reveal>
        <DeliverableTiles items={d.deliverables} accent={tint.accent} />
      </Section>

      <Section tone="muted" aria-labelledby="proc-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>How we deliver it</Eyebrow>
          <h2 id="proc-h" className="text-h2 mt-4 max-w-[20ch]">
            A collaborative process, in stages you can see.
          </h2>
        </Reveal>
        <ProcessRail items={d.process} accent={tint.accent} ink={tint.ink} />
      </Section>

      <Section theme="dark" aria-labelledby="tech-h">
        <Split
          id="tech-h"
          eyebrow="Technical considerations"
          heading={d.techTitle}
          note="Explained in plain language. We choose technologies based on your product goals, not because they’re fashionable."
        >
          <SpecCards items={d.technical} accent={tint.accent} />
        </Split>
      </Section>

      {related.length ? (
        <Section aria-labelledby="cs-h">
          <Reveal className="mb-12">
            <Eyebrow>Related work</Eyebrow>
            <h2 id="cs-h" className="text-h2 mt-4">
              Case studies
            </h2>
          </Reveal>
          <ul className="grid gap-24">
            {related.map((p, i) => (
              <ProjectFeature key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="muted" aria-labelledby="sdfaq-h">
        <Split id="sdfaq-h" eyebrow="FAQ" heading={`${d.short === "MVP" ? "MVP" : d.name} questions.`} note="Ownership and commercial terms are defined in each project agreement.">
          <Accordion items={d.faqs} />
        </Split>
      </Section>

      <CtaBand heading={d.cta.heading} body={d.cta.body} cta="Discuss Your Product" />
    </>
  );
}
