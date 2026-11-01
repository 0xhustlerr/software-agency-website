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
  /** Full-bleed picture behind the copy (e.g. a service photo). Decorative. */
  backdrop?: ReactNode;
  /** Lead in the right column instead of under the title (editorial variant). */
  leadAside?: boolean;
  size?: "h1" | "display";
  /** Fill the window (the hero runs under the transparent header), content centred. */
  full?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
}

/** Dark, compact page heading shared by every inner page. */
export function PageHero({ eyebrow, title, lead, crumbs, actions, aside, backdrop, leadAside, size = "h1", full, id = "page-title", className, children }: PageHeroProps) {
  const titleClass =
    size === "display"
      ? full && aside
        ? "text-display max-w-[13ch] [font-size:clamp(2.75rem,4.4vw,4.5rem)]"
        : "text-display max-w-[13ch] [font-size:clamp(3rem,6vw,6rem)]"
      : "text-h1 max-w-[16ch]";
  return (
    <section data-theme="dark" aria-labelledby={id} className={cn("relative overflow-hidden bg-surface pt-10 pb-18 lg:pt-14 lg:pb-28", full && "flex min-h-svh flex-col justify-center lg:pb-16", className)}>
      {/* Atmosphere shared with the homepage hero: ambient light and a fading grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] size-[640px] rounded-full bg-mint-400/[0.10] blur-[120px]" />
        <div className="absolute bottom-[-30%] left-[20%] size-[520px] rounded-full bg-[#7c6cf0]/[0.10] blur-[120px]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_80%_at_70%_30%,black,transparent)] bg-[linear-gradient(rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>
      {backdrop}
      <Container className={cn("relative", full && "w-full")}>
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className={cn("grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6", full && aside ? "items-center" : "items-end")}>
          <div className={aside ? (full ? "lg:col-span-5" : "lg:col-span-7") : "lg:col-span-8"}>
            <Reveal mode="enter">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal mode="settle" delay={0.06}>
              <h1 id={id} className={`${titleClass} mt-5 text-ink`}>
                {title}
              </h1>
            </Reveal>
            {lead && !leadAside ? (
              <Reveal mode="settle" delay={0.12}>
                <p className="text-lead mt-6 max-w-[48ch] text-ink-muted">{lead}</p>
              </Reveal>
            ) : null}
            {actions ? (
              <Reveal mode="enter" delay={0.18} className="mt-8 flex flex-wrap gap-3">
                {actions}
              </Reveal>
            ) : null}
          </div>
          {lead && leadAside ? (
            <Reveal mode="settle" delay={0.12} className="lg:col-span-4">
              <p className="text-lead text-ink-muted">{lead}</p>
            </Reveal>
          ) : null}
          {aside ? <div className={full ? "lg:col-span-7" : "lg:col-span-5"}>{aside}</div> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
