import { work } from "@/content/home";
import { approvedProjects } from "@/content/projects";
import { productConcepts } from "@/content/concepts";
import { talkHref } from "@/content/site";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ConceptFeature } from "@/components/sections/pages/concept-feature";

/** Section 5 — selected work. Approved case studies when they exist; otherwise labelled concepts and an honest "taking shape" state. */
export function Work() {
  const hasWork = approvedProjects.length > 0;
  return (
    <Section id="work" aria-labelledby="work-heading">
      <Reveal className="mb-14 lg:mb-20">
        <Eyebrow className="mb-4">{work.eyebrow}</Eyebrow>
        <h2 id="work-heading" className="text-h1 max-w-[16ch]">
          {work.heading}
        </h2>
      </Reveal>
      <ul className="grid gap-20 lg:gap-28">
        {hasWork
          ? approvedProjects.slice(0, 3).map((p, i) => <ProjectFeature key={p.slug} project={p} index={i} />)
          : productConcepts.map((c, i) => <ConceptFeature key={c.slug} concept={c} index={i} />)}
      </ul>
      {!hasWork ? (
        <Reveal className="mt-20 grid grid-cols-1 gap-8 border-t border-line pt-10 lg:mt-28 lg:grid-cols-12 lg:gap-6">
          <div className="flex items-start gap-4 lg:col-span-5">
            <span aria-hidden className="mt-3 flex shrink-0 items-center">
              <span className="block h-px w-6 bg-line-strong" />
              <span className="block size-2 rounded-full border border-accent-ink" />
            </span>
            <h3 className="text-h3">{work.emptyState.title}</h3>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-body text-ink-muted">{work.emptyState.body}</p>
            <Button href={talkHref} variant="ghost" className="mt-6">
              {work.emptyState.cta}
            </Button>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
