import { collaboration } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { CollaborationBoard } from "@/components/illustrations/collaboration-board";

/** Section 8 — founder-friendly approach: principles beside a collaboration workspace concept. */
export function Collaboration() {
  return (
    <Section id="collaboration" aria-labelledby="collaboration-heading">
      <Reveal className="mb-14 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-4">{collaboration.eyebrow}</Eyebrow>
          <h2 id="collaboration-heading" className="text-h2 max-w-[16ch]">
            {collaboration.heading}
          </h2>
        </div>
        <p className="text-lead text-ink-muted lg:col-span-5 lg:self-end">{collaboration.lead}</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-6">
        <ul className="grid grid-cols-1 content-start gap-x-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-2">
          {collaboration.principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.05} className="border-t border-line py-5">
              <h3 className="text-h4 text-[1.0625rem]">{p.title}</h3>
              <p className="text-body-sm mt-1.5 text-ink-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1} className="lg:col-span-7">
          <figure className="m-0 rounded-md bg-surface-muted p-4 sm:p-6">
            <ScaledCanvas width={560} height={440}>
              <div aria-hidden className="absolute inset-0">
                <CollaborationBoard />
              </div>
            </ScaledCanvas>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="text-small text-ink-muted">A shared workspace: priorities, milestones, reviews and releases in one place.</span>
              <span className="shrink-0 rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
                Illustration
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
