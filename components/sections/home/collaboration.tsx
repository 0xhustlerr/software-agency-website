import Image from "next/image";
import { CalendarCheck, Eye, FileText, ListOrdered, MessagesSquare, SlidersHorizontal, Users, type LucideIcon } from "lucide-react";
import { collaboration } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Badge3D } from "@/components/illustrations/scene";

/** One icon per principle, in the order of content/home.ts. */
const principleIcons: LucideIcon[] = [MessagesSquare, Eye, ListOrdered, CalendarCheck, FileText, SlidersHorizontal];

/**
 * Section 8 — founder-friendly approach. A real photo of a team planning
 * together (the section's idea: built with you, in the open), beside the
 * principles as icon rows. Photo: Unsplash TSyD0nGc0Bs (free licence).
 */
export function Collaboration() {
  return (
    <Section id="collaboration" aria-labelledby="collaboration-heading">
      <Reveal className="mb-8 grid grid-cols-1 gap-6 sm:gap-8 lg:mb-10 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-4">{collaboration.eyebrow}</Eyebrow>
          <h2 id="collaboration-heading" className="text-h2 max-w-[15ch]">
            {collaboration.heading}
          </h2>
        </div>
        <p className="text-lead text-ink-muted lg:col-span-5 lg:col-start-8">{collaboration.lead}</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <figure className="m-0">
            <div
              aria-hidden
              className="relative aspect-[16/11] overflow-hidden rounded-[18px] border-[1.5px] border-mint-400/60 bg-navy-900 shadow-[0_0_70px_-18px_rgb(109_225_210/0.7),0_40px_70px_-30px_rgb(16_24_39/0.5)]"
            >
              <Image src="/img/home/collaboration.webp" alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
              <div className="absolute inset-0 bg-linear-to-br from-mint-400/20 to-[#7c6cf0]/15 mix-blend-color" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-transparent to-transparent" />
              {/* you, in the room */}
              <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-[14px] border-[1.5px] border-mint-400/60 bg-navy-900/80 py-2.5 pr-5 pl-2.5 backdrop-blur-md">
                <span className="grid size-10 place-items-center rounded-[10px] bg-linear-to-br from-mint-400 to-[#3fa7c9] shadow-[0_0_18px_rgb(109_225_210/0.7)]">
                  <Users className="size-5 text-navy-900" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="font-display block text-[18px] leading-tight font-semibold text-white">You, in every review</span>
                  <span className="block text-[13px] font-medium text-mint-400">One team, one shared backlog</span>
                </span>
              </span>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="text-small text-ink-muted">Priorities, milestones, reviews and releases, decided together.</span>
              <Badge3D>Built in the open</Badge3D>
            </figcaption>
          </figure>
        </Reveal>
        <ol className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6">
          {collaboration.principles.map((p, i) => {
            const Icon = principleIcons[i % principleIcons.length];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="flex items-start gap-3 rounded-[14px] border border-line bg-surface-muted p-3.5 transition-[border-color,box-shadow] duration-300 hover:border-accent-ink/40 hover:shadow-[0_0_28px_-12px_var(--accent)]">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900 shadow-[0_0_16px_-4px_rgb(109_225_210/0.8)]">
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="text-h4 text-[1.0625rem]">{p.title}</h3>
                  <p className="text-small mt-0.5 text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
