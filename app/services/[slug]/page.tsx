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
import { ServiceVisual } from "@/components/illustrations/service-visuals";
import { BlueprintStage } from "@/components/sections/pages/blueprint-stage";
import { RuledList, Split } from "@/components/sections/pages/split";
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
  return pageMetadata({ title: data.detail.name, description: data.detail.lead, path: `/services/${slug}` });
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
        aside={
          <figure className="m-0">
            <BlueprintStage tone="muted" className="aspect-[5/4]">
              <div aria-hidden className="w-full max-w-[380px]">
                <ServiceVisual slug={service.slug} />
              </div>
            </BlueprintStage>
            <figcaption className="mt-4 flex justify-end">
              <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
                Interface concept
              </span>
            </figcaption>
          </figure>
        }
      />

      <Section aria-labelledby="who-h">
        <Split id="who-h" eyebrow="Who it’s for" heading={d.whoTitle}>
          <RuledList items={d.who.map((w) => ({ title: w.title, body: w.body }))} />
        </Split>
      </Section>

      <Section tone="muted" aria-labelledby="prob-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Problems it solves</Eyebrow>
          <h2 id="prob-h" className="text-h2 mt-4 max-w-[22ch]">
            {d.problemsTitle}
          </h2>
        </Reveal>
        <ul className="border-b border-line">
          {d.problems.map((p) => (
            <li key={p.title} className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-6">
              <h3 className="font-display text-[1.25rem] leading-[1.25] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-body text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="deliverables" aria-labelledby="dlv-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Typical deliverables</Eyebrow>
          <h2 id="dlv-h" className="text-h2 mt-4">
            What you can expect to receive.
          </h2>
          <p className="text-lead mt-5 max-w-[52ch] text-ink-muted">Every engagement is scoped with you; these are the deliverables most {d.short} projects include.</p>
        </Reveal>
        <ol className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.deliverables.map((x, i) => (
            <li key={x.title} className="border-t border-line pt-5 pb-7">
              <span className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2.5 text-[1.125rem] leading-[1.3] font-semibold">{x.title}</h3>
              <p className="text-body-sm mt-1.5 text-ink-muted">{x.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" aria-labelledby="proc-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>How we deliver it</Eyebrow>
          <h2 id="proc-h" className="text-h2 mt-4 max-w-[20ch]">
            A collaborative process, in stages you can see.
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
          {d.process.map((st, i) => (
            <li key={st.title} className="relative pt-8">
              <span aria-hidden className={i < d.process.length - 1 ? "absolute top-[7px] right-0 left-0 h-px bg-line-strong lg:-right-6" : "absolute top-[7px] left-0 h-px w-4 bg-line-strong"} />
              <span aria-hidden className={i === 0 ? "absolute top-0 left-0 size-[15px] rounded-full border border-accent bg-accent" : "absolute top-0 left-0 size-[15px] rounded-full border border-ink bg-surface"} />
              <span className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-[1.25rem] font-semibold tracking-[-0.01em]">{st.title}</h3>
              <p className="text-body-sm mt-2 text-ink-muted">{st.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section theme="dark" aria-labelledby="tech-h">
        <Split
          id="tech-h"
          eyebrow="Technical considerations"
          heading={d.techTitle}
          note="Explained in plain language. We choose technologies based on your product goals, not because they’re fashionable."
        >
          <RuledList items={d.technical} />
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
