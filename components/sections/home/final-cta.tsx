import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/home";
import { emailHref, projectStartHref, site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { PendingContent } from "@/components/ui/pending-content";
import { MintStop } from "@/components/ui/mint-stop";
import { Reveal } from "@/components/motion/reveal";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Section 10 — the closing statement. From lg, the connected-node path leaves
 * the headline, crosses the rule and lands on the primary action (its filled
 * destination node): the motif makes the section's argument instead of
 * decorating a corner. It draws once when the section is revealed.
 */
export function FinalCta() {
  return (
    <Section id="contact" theme="dark" spacing="none" aria-labelledby="contact-heading" className="pt-24 pb-24 lg:pt-40 lg:pb-36">
      <Reveal className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
        <h2
          id="contact-heading"
          className="text-display -ml-[0.04em] leading-[0.95] [font-size:clamp(2.75rem,11.5vw,5.5rem)] lg:col-span-9 lg:[font-size:clamp(5rem,8.4vw,8.5rem)]"
        >
          {finalCta.headingLines.map((line, i) => (
            <span key={line} className="nm-line-view" style={delay(i * 80)}>
              <span>
                <MintStop>{line}</MintStop>{" "}
              </span>
            </span>
          ))}
        </h2>

        {/*
          Connector (lg+), anchored to the body row so it always sits in the gap between the
          headline and the rule: hollow node → across → down → filled node on the button.
        */}
        <div aria-hidden className="pointer-events-none relative hidden lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:block">
          <span className="nm-connector-h absolute top-8 right-24 left-0 h-px bg-accent-ink" />
          <span className="absolute top-8 left-0 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.25px] border-accent-ink bg-surface" />
          <span className="absolute top-8 right-24 size-[9px] translate-x-1/2 -translate-y-1/2 rounded-full border-[1.25px] border-accent-ink bg-surface" />
          <span className="nm-connector-drop absolute top-8 right-24 h-[3.8rem] w-px translate-x-1/2 bg-accent-ink" />
          <span className="nm-connector-end absolute top-[6.1rem] right-24 size-[11px] translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-line pt-10 lg:col-span-12 lg:col-start-1 lg:row-start-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <p className="text-lead text-ink-muted lg:col-span-6">{finalCta.body}</p>
          <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8 lg:items-end">
            {projectStartHref ? (
              <Button href={projectStartHref} className="h-14 w-full justify-center px-8 text-base min-[420px]:w-auto" arrow>
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
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
