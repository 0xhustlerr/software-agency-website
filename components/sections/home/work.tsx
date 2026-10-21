import { work } from "@/content/home";
import { approvedProjects } from "@/content/projects";
import { productConcepts } from "@/content/concepts";
import { talkHref } from "@/content/site";
import type { ProductConcept } from "@/content/types";
import { ProjectFeature } from "@/components/sections/pages/project-feature";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { RelayDashboard, RelayPhone, RelayWorkflow } from "@/components/illustrations/relay-concept";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { cn } from "@/lib/utils";

/** The large image area of a feature: a navy stage with a blueprint grid. */
function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-theme="dark" className={cn("relative overflow-hidden rounded-md bg-surface", className)}>
      <svg aria-hidden className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="stage-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" className="stroke-line" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stage-grid)" />
      </svg>
      {children}
    </div>
  );
}

function Details({
  label,
  name,
  category,
  challenge,
  built,
  tags,
  builtLabel,
  footer,
}: {
  label: React.ReactNode;
  name: string;
  category: string;
  challenge: string;
  built: string;
  tags: string[];
  builtLabel: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {label}
      <h3 className="text-h2 mt-5">{name}</h3>
      <p className="text-mono mt-2 text-ink-muted">{category}</p>
      <dl className="mt-8 grid gap-6">
        <div className="border-t border-line pt-4">
          <dt className="text-label mb-1.5 text-ink">The challenge</dt>
          <dd className="text-body-sm text-ink-muted">{challenge}</dd>
        </div>
        <div className="border-t border-line pt-4">
          <dt className="text-label mb-1.5 text-ink">{builtLabel}</dt>
          <dd className="text-body-sm text-ink-muted">{built}</dd>
        </div>
      </dl>
      <ul aria-label="Capabilities" className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      {footer ? <div className="mt-8">{footer}</div> : null}
    </div>
  );
}

/** An original concept, clearly labelled. No case-study link: it is not client work. */
function ConceptFeature({ concept }: { concept: ProductConcept }) {
  return (
    <Reveal as="li" className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
      <figure className="m-0 lg:col-span-8">
        <Stage>
          <ScaledCanvas width={760} height={580} className="relative">
            <div aria-hidden className="absolute top-[64px] left-[88px] w-[560px]">
              <RelayDashboard />
            </div>
            <div aria-hidden className="absolute top-[24px] right-[28px] w-[210px]">
              <RelayWorkflow />
            </div>
            <div aria-hidden className="absolute bottom-[24px] left-[32px] w-[150px]">
              <RelayPhone />
            </div>
          </ScaledCanvas>
        </Stage>
        <figcaption className="text-small mt-3 text-ink-muted">
          {concept.name} is an original product concept with sample data, created by Nexus Morrow to show the kind of product we build.
        </figcaption>
      </figure>
      <div className="lg:col-span-4 lg:self-center">
        <Details
          label={
            <span className="self-start rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
              Product concept · not client work
            </span>
          }
          name={concept.name}
          category={concept.category}
          challenge={concept.challenge}
          built={concept.built}
          builtLabel="What it demonstrates"
          tags={concept.tags}
        />
      </div>
    </Reveal>
  );
}

/** Section 5 — selected work. Approved case studies when they exist; otherwise one labelled concept and an honest "taking shape" state. */
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
          : productConcepts.slice(0, 1).map((c) => <ConceptFeature key={c.slug} concept={c} />)}
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
