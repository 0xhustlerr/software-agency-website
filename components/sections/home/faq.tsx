import { Plus } from "lucide-react";
import { faqs } from "@/content/faqs";
import { showPending } from "@/lib/flags";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PendingContent } from "@/components/ui/pending-content";

export function Faq() {
  if (faqs.length === 0) {
    if (!showPending) return null;
    return (
      <Section id="faq" aria-label="FAQ (pending)">
        <PendingContent kind="FAQ" title="Questions founders ask" field="content/faqs.ts">
          Add real answers on engagement models, code and IP ownership, how pricing is set, and support after launch.
        </PendingContent>
      </Section>
    );
  }
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <SectionHeading id="faq-heading" className="lg:col-span-4" eyebrow="FAQ" heading="Questions founders ask." />
        <div className="border-b border-line lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.question} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-xs py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-h4">{f.question}</h3>
                <Plus aria-hidden className="mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="text-body max-w-(--measure) pb-6 text-ink-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
