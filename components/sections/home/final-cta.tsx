import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/home";
import { emailHref, projectStartHref, site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { NodeGrid } from "@/components/ui/node-grid";
import { PendingContent } from "@/components/ui/pending-content";
import { Reveal } from "@/components/motion/reveal";

/** Section 10 — the closing statement. Anchor target for "Let's Talk" until /contact exists. */
export function FinalCta() {
  return (
    <Section id="contact" theme="dark" spacing="none" aria-labelledby="contact-heading" className="pt-24 pb-24 lg:pt-40 lg:pb-36">
      <div aria-hidden className="pointer-events-none absolute -top-6 right-0 hidden w-[34%] max-w-[480px] opacity-70 lg:block">
        <NodeGrid cols={6} rows={4} pitch={72} grid={false} path={[[0, 1], [2, 1], [2, 3], [5, 3]]} />
      </div>
      <Reveal>
        <h2 id="contact-heading" className="text-display max-w-[12ch] text-[clamp(3.25rem,8.5vw,9rem)] leading-[0.95]">
          {finalCta.heading}
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-6">
        <Reveal delay={0.08} className="lg:col-span-6">
          <p className="text-lead text-ink-muted">{finalCta.body}</p>
        </Reveal>
        <Reveal delay={0.14} className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8 lg:items-end">
          {projectStartHref ? (
            <Button href={projectStartHref} className="h-14 px-8 text-base" arrow>
              {finalCta.primary}
            </Button>
          ) : (
            <PendingContent kind="Contact" className="w-full max-w-md text-left" field="content/routes.ts → contact · content/site.ts → contactEmail">
              “Start a Project” needs a destination: publish /contact or add the verified business email. The button appears automatically.
            </PendingContent>
          )}
          {emailHref ? (
            <p className="text-body-sm text-ink-muted">
              {finalCta.emailPrompt}{" "}
              <a href={emailHref} className="group inline-flex items-center gap-1.5 rounded-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                {site.contactEmail}
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
              </a>
            </p>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
