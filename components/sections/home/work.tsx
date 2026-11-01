import { work } from "@/content/home";
import { approvedProjects } from "@/content/projects";
import { featuredConcepts, productConcepts } from "@/content/concepts";
import { talkHref } from "@/content/site";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ConceptCard } from "@/components/sections/pages/concept-feature";

/** Section 5 — selected work. Approved case studies when they exist; otherwise labelled concepts and an honest "taking shape" state. */
export function Work() {
  const hasWork = approvedProjects.length > 0;
  return (
    <Section id="work" aria-labelledby="work-heading">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
        <div>
          <Eyebrow className="mb-4">{work.eyebrow}</Eyebrow>
          <h2 id="work-heading" className="text-h2">
            {work.heading}
          </h2>
        </div>
        {!hasWork ? (
          <Button href="/work" variant="ghost">
            See all {productConcepts.length} products
          </Button>
        ) : null}
      </Reveal>
      {hasWork ? (
        <ul className="grid gap-20 lg:gap-28">
          {approvedProjects.slice(0, 3).map((p, i) => (
            <ProjectFeature key={p.slug} project={p} index={i} />
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {featuredConcepts.map((c, i) => (
            <ConceptCard key={c.slug} concept={c} index={i} />
          ))}
        </ul>
      )}
      {!hasWork ? (
        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-dashed border-line-strong/60 px-5 py-4">
          <p className="text-body-sm max-w-[70ch] text-ink-muted">
            <b className="font-semibold text-ink">{work.emptyState.title}</b> {work.emptyState.body}
          </p>
          <Button href={talkHref} variant="ghost">
            {work.emptyState.cta}
          </Button>
        </Reveal>
      ) : null}
    </Section>
  );
}
