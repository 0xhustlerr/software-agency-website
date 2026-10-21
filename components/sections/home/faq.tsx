import { faqs } from "@/content/faqs";
import { faqIntro } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

/** Section 9 — FAQ. Hidden if the list is empty. */
export function Faq() {
  if (faqs.length === 0) return null;
  return (
    <Section id="faq" tone="muted" aria-labelledby="faq-heading">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-4">
          <Eyebrow className="mb-4">{faqIntro.eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="text-h2 max-w-[12ch]">
            {faqIntro.heading}
          </h2>
          <p className="text-body-sm mt-6 max-w-[32ch] text-ink-muted">{faqIntro.note}</p>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
