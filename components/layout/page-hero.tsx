import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "./container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Shown on detail pages. */
  crumbs?: Crumb[];
  /** CTAs under the lead. */
  actions?: ReactNode;
  /** Right-hand column (illustration). Without it the title spans 8 columns. */
  aside?: ReactNode;
  /** Lead in the right column instead of under the title (editorial variant). */
  leadAside?: boolean;
  size?: "h1" | "display";
  id?: string;
  className?: string;
  children?: ReactNode;
}

/** Dark, compact page heading shared by every inner page. */
export function PageHero({ eyebrow, title, lead, crumbs, actions, aside, leadAside, size = "h1", id = "page-title", className, children }: PageHeroProps) {
  const titleClass =
    size === "display"
      ? "text-display max-w-[13ch] [font-size:clamp(3rem,6vw,6rem)]"
      : "text-h1 max-w-[16ch]";
  return (
    <section data-theme="dark" aria-labelledby={id} className={cn("relative overflow-hidden bg-surface pt-10 pb-18 lg:pt-14 lg:pb-28", className)}>
      <Container>
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-6">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-8"}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id={id} className={`${titleClass} mt-5 text-ink`}>
                {title}
              </h1>
            </Reveal>
            {lead && !leadAside ? (
              <Reveal delay={0.12}>
                <p className="text-lead mt-6 max-w-[48ch] text-ink-muted">{lead}</p>
              </Reveal>
            ) : null}
            {actions ? (
              <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
                {actions}
              </Reveal>
            ) : null}
          </div>
          {lead && leadAside ? (
            <Reveal delay={0.12} className="lg:col-span-4">
              <p className="text-lead text-ink-muted">{lead}</p>
            </Reveal>
          ) : null}
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
