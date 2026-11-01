import { approvedProjects } from "@/content/projects";
import { productConcepts } from "@/content/concepts";
import { engineeringApproach, takingShape, workHero } from "@/content/pages/work";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { FeatureTile } from "@/components/ui/tile-3d";
import { BadgeCheck, Compass, FileClock, GitBranch, Images, Lightbulb, PenTool, Target, Wrench } from "lucide-react";
import { WorkHeroArt } from "@/components/illustrations/page-hero-art";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { ConceptFeature } from "@/components/sections/pages/concept-feature";
import { WorkFilters } from "@/components/sections/pages/work-filters";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: approvedProjects.length ? "Case studies and engineering approach" : "Our work and engineering approach",
  description: approvedProjects.length
    ? "Product case studies from Nexus Morrow, published with client approval, and how we approach every engagement."
    : "How Nexus Morrow designs and engineers products for founders, shown through labelled product concepts. Case studies are published only with client approval.",
  path: "/work",
});

/** What every case study will cover: challenge, approach, engineering, screenshots, outcomes. */
const coverIcons = [Target, Lightbulb, Wrench, Images, BadgeCheck];
/** The approach: the problem, design first, build in the open, maintainable. */
const approachIcons = [Compass, PenTool, GitBranch, Wrench];

export default function WorkPage() {
  const hasWork = approvedProjects.length > 0;
  const industries = Array.from(new Set(approvedProjects.map((p) => p.industry)));

  return (
    <>
      <PageHero size="display" eyebrow={workHero.eyebrow} title={workHero.title} lead={workHero.lead} aside={<WorkHeroArt />} />

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
                {/* A case study in progress: the blueprint every published one will follow. */}
                <div className="relative mt-6 overflow-hidden rounded-[18px] border-2 border-dashed border-accent-ink/40 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[24px_24px] p-5">
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-[0.1em] text-accent-ink uppercase">
                      <FileClock aria-hidden className="size-4" strokeWidth={2.25} /> Case study · in progress
                    </span>
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="size-1.5 rounded-full bg-accent-ink motion-safe:animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                      ))}
                    </span>
                  </p>
                  <ol className="mt-4 grid gap-2">
                    {takingShape.covers.map((c, i) => {
                      const Icon = coverIcons[i % coverIcons.length];
                      return (
                        <li key={c} className="flex items-center gap-3 rounded-[12px] border border-line bg-surface px-3.5 py-2.5 shadow-[0_10px_24px_-18px_rgb(16_24_39/0.5)]">
                          <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-accent-soft text-accent-ink">
                            <Icon className="size-4" strokeWidth={2.25} />
                          </span>
                          <span className="text-body-sm font-medium">{c}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Reveal>
            </div>
          </Section>

          {productConcepts.length ? (
            <Section theme="dark" aria-labelledby="concepts-h">
              <Reveal className="mb-14 lg:mb-20">
                <Eyebrow>Product concepts</Eyebrow>
                <h2 id="concepts-h" className="text-h1 mt-5 max-w-[18ch]">
                  The kind of product we design and engineer.
                </h2>
              </Reveal>
              <ul className="grid gap-20 lg:gap-28">
                {productConcepts.map((c, i) => (
                  <ConceptFeature key={c.slug} concept={c} index={i} />
                ))}
              </ul>
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
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {engineeringApproach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06}>
              <FeatureTile mark={String(i + 1).padStart(2, "0")} icon={approachIcons[i % approachIcons.length]} title={a.title} body={a.body} />
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
