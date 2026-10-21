import { positioning } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** Editorial split: heading in columns 1–7, copy in 8–12. */
export function Positioning() {
  return (
    <Section id="approach" aria-labelledby="approach-heading">
      <div className="grid-site gap-y-8">
        <Reveal className="col-span-full lg:col-span-7">
          <Eyebrow className="mb-3">{positioning.eyebrow}</Eyebrow>
          <h2 id="approach-heading" className="text-h2 max-w-[18ch]">
            {positioning.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="col-span-full grid gap-6 lg:col-span-5 lg:col-start-8 lg:pt-10">
          {positioning.body.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lead text-ink" : "text-body text-ink-muted"}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
