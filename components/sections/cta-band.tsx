import { ArrowRight } from "lucide-react";
import { emailHref, projectStartHref, site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

interface CtaBandProps {
  heading: string;
  body: string;
  cta?: string;
  id?: string;
}

/** Shared dark closing call to action for inner pages. */
export function CtaBand({ heading, body, cta = "Start a Project", id = "cta" }: CtaBandProps) {
  return (
    <Section id={id} theme="dark" spacing="lg" aria-labelledby={`${id}-heading`}>
      {/* Two or three lines, not four: inner pages close firmly without competing with the homepage's final CTA. */}
      <Reveal>
        <h2 id={`${id}-heading`} className="text-display relative max-w-[20ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.0] text-balance">
          {heading}
        </h2>
      </Reveal>
      <div className="relative mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-6">
        <p className="text-lead text-ink-muted lg:col-span-6">{body}</p>
        <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8 lg:items-end">
          {projectStartHref ? (
            <Button href={projectStartHref} arrow className="h-14 px-8 text-base">
              {cta}
            </Button>
          ) : null}
          {emailHref ? (
            <p className="text-body-sm text-ink-muted">
              Prefer email?{" "}
              <a href={emailHref} className="group inline-flex items-center gap-1.5 rounded-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                {site.contactEmail}
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
