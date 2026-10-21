import { finalCta } from "@/content/home";
import { primaryCta, site } from "@/content/site";
import { showPending } from "@/lib/flags";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PendingContent } from "@/components/ui/pending-content";

/** Dark, centred closing call to action. Anchor target for "Discuss Your Product". */
export function FinalCta() {
  return (
    <Section id="contact" theme="dark" spacing="lg" aria-labelledby="contact-heading" containerClassName="flex flex-col items-center text-center">
      <Eyebrow className="mb-6">{finalCta.eyebrow}</Eyebrow>
      <h2 id="contact-heading" className="text-h1 max-w-[14ch]">
        {finalCta.heading}
      </h2>
      <p className="text-lead mt-6 max-w-[52ch] text-ink-muted">{finalCta.body}</p>
      {site.contactEmail ? (
        <Button href={primaryCta.href} className="mt-10">
          {primaryCta.label}
        </Button>
      ) : showPending ? (
        <PendingContent kind="Contact" className="mt-10 w-full max-w-xl text-left" field="content/site.ts → contactEmail">
          Add the inbox for new product conversations (or build the /contact form). The primary button appears once a destination exists.
        </PendingContent>
      ) : null}
    </Section>
  );
}
