import { journey } from "@/content/home";
import { processSteps } from "@/content/process";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { JourneyTimeline } from "./journey-timeline";

/** Section 6 — the startup journey. */
export function Journey() {
  return (
    <Section id="process" tone="muted" aria-labelledby="process-heading">
      <Reveal className="mb-14 lg:mb-20">
        <Eyebrow className="mb-4">{journey.eyebrow}</Eyebrow>
        <h2 id="process-heading" className="text-h2 max-w-[18ch]">
          {journey.heading}
        </h2>
      </Reveal>
      <JourneyTimeline steps={processSteps} />
    </Section>
  );
}
