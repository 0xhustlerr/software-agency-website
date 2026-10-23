import { approvedProjects } from "@/content/projects";
import { productConcepts } from "@/content/concepts";
import { conceptCopy, engineeringApproach, takingShape, workHero } from "@/content/pages/work";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { RelayComposition } from "@/components/illustrations/relay-composition";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { WorkFilters } from "@/components/sections/pages/work-filters";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: approvedProjects.length ? "Case studies and engineering approach" : "Our work and engineering approach",
  description: approvedProjects.length
    ? "Product case studies from Nexus Morrow, published with client approval, and how we approach every engagement."
    : "How Nexus Morrow designs and engineers products for founders, shown through a labelled product concept. Case studies are published only with client approval.",
  path: "/work",
});

export default function WorkPage() {
  const hasWork = approvedProjects.length > 0;
  const concept = productConcepts[0];
  const industries = Array.from(new Set(approvedProjects.map((p) => p.industry)));

  return (
    <>
      <PageHero size="display" eyebrow={workHero.eyebrow} title={workHero.title} lead={workHero.lead} leadAside />

      {hasWork ? (
        <Section aria-labelledby="projects-h">
          <h2 id="projects-h" className="sr-only">
            Case studies
          </h2>
          {/* Filters only earn their place once there are several industries to choose from. */}
          {industries.length > 2 ? <WorkFilters industries={industries} /> : null}
          <ul className="grid gap-24 lg:gap-36">
            {approvedProjects.map((p, i) => (
              <ProjectFeature key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </Section>
      ) : (
        <>
          <Section aria-labelledby="shape-h">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
              <Reveal className="lg:col-span-6">
                <Eyebrow>{takingShape.eyebrow}</Eyebrow>
                <h2 id="shape-h" className="font-display mt-5 max-w-[22ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
                  {takingShape.statement} <span className="text-ink-muted">{takingShape.muted}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="self-end lg:col-span-5 lg:col-start-8">
                <p className="text-body text-ink-muted">{takingShape.body}</p>
                <ol className="mt-5 border-b border-line">
                  {takingShape.covers.map((c, i) => (
                    <li key={c} className="text-body-sm grid grid-cols-[3.5rem_minmax(0,1fr)] border-t border-line py-3">
                      <span className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                      {c}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Section>

          {concept ? (
            <Section theme="dark" aria-labelledby="concept-h">
              <Reveal className="mb-12">
                <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
                  Product concept · not client work
                </span>
                <h2 id="concept-h" className="text-h1 mt-5">
                  {concept.name}
                </h2>
                <p className="text-mono mt-2 text-ink-muted">{concept.category} · original concept with sample data</p>
              </Reveal>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
                <figure className="m-0 lg:col-span-8">
                  <RelayComposition tone="muted" />
                  <figcaption className="text-small mt-3 text-ink-muted">
                    {concept.name} is an original product concept created by Nexus Morrow. It is not a client project and has not been launched.
                  </figcaption>
                </figure>
                <div className="self-center lg:col-span-4">
                  <dl className="grid gap-6">
                    {[
                      ["The problem it explores", conceptCopy.problem],
                      ["Product approach", conceptCopy.approach],
                      ["What it demonstrates", conceptCopy.demonstrates],
                    ].map(([k, v]) => (
                      <div key={k} className="border-t border-line pt-4">
                        <dt className="text-label mb-1.5">{k}</dt>
                        <dd className="text-body-sm text-ink-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul aria-label="Capabilities" className="mt-6 flex flex-wrap gap-2">
                    {concept.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          ) : null}
        </>
      )}

      <Section tone="muted" aria-labelledby="appr-h">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:mb-18 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Our engineering approach</Eyebrow>
            <h2 id="appr-h" className="text-h2 mt-4">
              How every project is built.
            </h2>
          </Reveal>
          {!hasWork ? <p className="text-lead self-end text-ink-muted lg:col-span-5">Until our case studies are published, this is the clearest way to judge how we work.</p> : null}
        </div>
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringApproach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06} className="border-t border-ink pt-6">
              <p className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-h3 mt-6">{a.title}</h3>
              <p className="text-body-sm mt-2.5 text-ink-muted">{a.body}</p>
            </Reveal>
          ))}
        </ol>
        <Button href="/services" variant="ghost" className="mt-12">
          See how we deliver each service
        </Button>
      </Section>

      <CtaBand
        heading={hasWork ? "Have a problem worth solving?" : "Be one of our first partners."}
        body={
          hasWork
            ? "Tell us what you’re building. We’ll explore your goals, challenges, and the best way to move forward."
            : "If you’re building something worth solving, we’d like to hear about it — and earn a place on this page together."
        }
      />
    </>
  );
}
