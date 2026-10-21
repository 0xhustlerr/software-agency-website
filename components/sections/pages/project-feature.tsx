import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** An approved client case study: large image, alternating sides by index. */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <li data-industry={project.industry}>
    <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
      <div className={cn("lg:col-span-8", flip && "lg:order-2 lg:col-start-5")}>
        <Link href={`/work/${project.slug}`} className="group/frame block rounded-md" tabIndex={-1} aria-hidden>
          {/* 4:3 on phones, 16:10 from sm. The image zooms 2% inside a fixed clip; the frame never moves. */}
          <div
            data-theme="dark"
            className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface shadow-frame after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] after:transition-shadow after:duration-300 group-hover/frame:after:shadow-[inset_0_0_0_1px_rgb(109_225_210/0.35)] sm:aspect-[16/10]"
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover object-[30%_30%] transition-transform duration-700 ease-studio group-hover/frame:scale-[1.02]"
            />
          </div>
        </Link>
      </div>
      <div className={cn("lg:col-span-4 lg:self-center", flip && "lg:order-1")}>
        <p className="text-mono text-ink-muted">{project.industry}</p>
        <h3 className="text-h2 mt-5">
          <Link href={`/work/${project.slug}`} className="rounded-xs transition-colors duration-200 hover:text-accent-ink">
            {project.title}
          </Link>
        </h3>
        <p className="text-mono mt-2 text-ink-muted">{project.client}</p>
        <dl className="mt-8 grid gap-6">
          <div className="border-t border-line pt-4">
            <dt className="text-label mb-1.5">The challenge</dt>
            <dd className="text-body-sm text-ink-muted">{project.challenge}</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="text-label mb-1.5">What we built</dt>
            <dd className="text-body-sm text-ink-muted">{project.built}</dd>
          </div>
        </dl>
        <ul aria-label="Capabilities" className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <Link
          href={`/work/${project.slug}`}
          className="group text-label mt-8 inline-flex items-center gap-2 rounded-xs text-ink underline decoration-line-strong underline-offset-[6px] hover:decoration-ink"
        >
          Read the case study<span className="sr-only">: {project.title}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" strokeWidth={1.75} />
        </Link>
      </div>
    </Reveal>
    </li>
  );
}
