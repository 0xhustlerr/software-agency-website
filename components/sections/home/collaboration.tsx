import { collaboration } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { CollaborationBoard } from "@/components/illustrations/collaboration-board";
import { Badge3D } from "@/components/illustrations/scene";

/** Section 8 — founder-friendly approach: principles beside a collaboration workspace concept. */
export function Collaboration() {
  return (
    <Section id="collaboration" aria-labelledby="collaboration-heading">
      <Reveal className="mb-12 grid grid-cols-1 gap-6 sm:gap-8 lg:mb-18 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-4">{collaboration.eyebrow}</Eyebrow>
          <h2 id="collaboration-heading" className="text-h2 max-w-[15ch]">
            {collaboration.heading}
          </h2>
        </div>
        <p className="text-lead text-ink-muted lg:col-span-5 lg:col-start-8">{collaboration.lead}</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        {/* The frame hugs the illustration; no empty ground below it. */}
        <Reveal className="lg:col-span-7">
          <figure className="m-0">
            {/* A navy stage, so the dark scene keeps its depth on a light section. */}
            <div
              data-theme="dark"
              aria-hidden
              className="rounded-md bg-surface p-3 sm:p-6"
            >
              <CollaborationBoard />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="text-small text-ink-muted">A shared workspace: priorities, milestones, reviews and releases in one place.</span>
              <Badge3D>Illustration</Badge3D>
            </figcaption>
          </figure>
        </Reveal>
        <ol className="border-b border-line sm:grid sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:col-start-9 lg:block">
          {collaboration.principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.06}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 border-t border-line pt-4.5 pb-5"
            >
              <span aria-hidden className="text-mono pt-0.5 text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h4 text-[1.125rem]">{p.title}</h3>
                <p className="text-body-sm mt-1 text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
