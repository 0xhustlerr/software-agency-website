import { processSteps } from "@/content/process";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessRail } from "@/components/ui/process-rail";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  return (
    <Section id="process" tone="muted" aria-labelledby="process-heading">
      <SectionHeading
        id="process-heading"
        className="mb-12 lg:mb-20"
        eyebrow="From idea to launch"
        heading="Built for what comes next."
        lead="Five stages, each ending with something you can see, test, and decide on."
      />
      <Reveal>
        <ProcessRail steps={processSteps} />
      </Reveal>
    </Section>
  );
}
