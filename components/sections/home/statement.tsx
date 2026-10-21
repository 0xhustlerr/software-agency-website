import { statement } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** Dark statement section. */
export function Statement() {
  return (
    <Section theme="dark" spacing="lg" aria-labelledby="statement-heading">
      <Reveal>
        <Eyebrow className="mb-6">{statement.eyebrow}</Eyebrow>
        <h2 id="statement-heading" className="text-h1 max-w-[16ch]">
          {statement.heading}
        </h2>
      </Reveal>
      <ul className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-24">
        {statement.principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.07} className="border-t border-line pt-6">
            <span className="text-mono mb-4 block text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-h4 mb-2">{p.title}</h3>
            <p className="text-body-sm text-ink-muted">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
