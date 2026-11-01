import { approvedProjects } from "@/content/projects";
import { productConcepts } from "@/content/concepts";
import { engineeringApproach, takingShape, workHero } from "@/content/pages/work";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { FeatureTile } from "@/components/ui/tile-3d";
import { BadgeCheck, Code2, Compass, FileClock, GitBranch, Images, LayoutDashboard, Lightbulb, PenTool, Rocket, Sparkles, Target, Wrench, type LucideIcon } from "lucide-react";
import type { ConceptKind } from "@/content/types";
import { WorkHeroArt } from "@/components/illustrations/page-hero-art";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { ConceptCard } from "@/components/sections/pages/concept-feature";
import { ColorTabs } from "@/components/ui/color-tabs";
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

const kinds: ConceptKind[] = ["saas", "mvp", "ai", "custom"];
const byKind = (kind: ConceptKind) => productConcepts.filter((c) => c.kind === kind);

/** One heading per kind of product, in the services' colours. */
const groups: Record<ConceptKind, { label: string; line: string; icon: LucideIcon; accent: string }> = {
  saas: { label: "SaaS Platforms", line: "Products people subscribe to, built to scale.", icon: LayoutDashboard, accent: "#6de1d2" },
  mvp: { label: "MVPs", line: "Focused first versions, in front of real users fast.", icon: Rocket, accent: "#f6b26b" },
  ai: { label: "AI Products", line: "AI that helps people, with a person in control.", icon: Sparkles, accent: "#b794f6" },
  custom: { label: "Custom Software", line: "Tools shaped around how a business really works.", icon: Code2, accent: "#6ea8ff" },
};


export default function WorkPage() {
  const hasWork = approvedProjects.length > 0;
  const industries = Array.from(new Set(approvedProjects.map((p) => p.industry)));

  return (
    <>
      <PageHero eyebrow={workHero.eyebrow} title={workHero.title} lead={workHero.lead} leadAside className="lg:pb-16">
        <div className="mt-10 lg:mt-12">
          <WorkHeroArt />
        </div>
      </PageHero>

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
              <Reveal className="mb-8 lg:mb-10">
                <Eyebrow>Product concepts</Eyebrow>
                <h2 id="concepts-h" className="text-h2 mt-4">
                  The kind of product we design and engineer.
                </h2>
              </Reveal>
              <ColorTabs
                label="Product categories"
                tabs={kinds.map((kind) => {
                  const g = groups[kind];
                  const Icon = g.icon;
                  return { id: kind, label: `${g.label} · ${byKind(kind).length}`, accent: g.accent, icon: <Icon className="size-4" strokeWidth={2.5} /> };
                })}
                panels={kinds.map((kind) => (
                  <div key={kind}>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                      {byKind(kind).map((c, i) => (
                        <ConceptCard key={c.slug} concept={c} index={i} />
                      ))}
                    </ul>
                  </div>
                ))}
              />
              <p className="text-small mt-4 text-ink-muted">All concepts use sample data. Stride, Tablr, Fixly, Tutorly, Recap, Assist, StockFlow, ClinicDesk and GarageBay are original products invented for illustration; photos are illustrative.</p>
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
