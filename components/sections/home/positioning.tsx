import { positioning } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { FeatureTile } from "@/components/ui/tile-3d";
import { Compass, Layers, Users } from "lucide-react";

/** One icon per pillar: product direction, a foundation that grows, one team. */
const icons = [Compass, Layers, Users];

/**
 * Section 3 — editorial statement: heading left, argument right on the same
 * row (no dead quadrant), then three pillars as raised tiles.
 */
export function Positioning() {
  return (
    <Section id="approach" spacing="lg" aria-labelledby="approach-heading">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <Reveal className="lg:col-span-6">
          <Eyebrow className="mb-4">{positioning.eyebrow}</Eyebrow>
          <h2 id="approach-heading" className="text-h1 max-w-[13ch] text-balance">
            {positioning.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="max-w-[46ch] lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lead text-ink-muted">{positioning.body}</p>
        </Reveal>
      </div>
      <ol className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-24 lg:gap-6">
        {positioning.pillars.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.07}>
            <FeatureTile mark={String(i + 1).padStart(2, "0")} icon={icons[i]} title={p.title} body={p.body} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
