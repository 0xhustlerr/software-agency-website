import { presentation } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IllustrativeFrame } from "@/components/ui/illustrative-frame";
import { Reveal } from "@/components/motion/reveal";

const columns = [
  { stage: "Discover", items: ["Problem interviews", "Core user journey"] },
  { stage: "Build", items: ["Accounts and roles", "Billing", "Admin dashboard"] },
  { stage: "Launch", items: ["Analytics events", "First-user onboarding"] },
];

/** Image-led feature: wide interface concept (cols 1–8) with notes (cols 10–12). */
export function ProductPresentation() {
  return (
    <Section aria-labelledby="presentation-heading">
      <Reveal>
        <Eyebrow className="mb-3">{presentation.eyebrow}</Eyebrow>
        <h2 id="presentation-heading" className="text-h2 max-w-[22ch]">
          {presentation.heading}
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-8">
          <IllustrativeFrame title="release-plan · first version" caption="Concept: how a first-version scope is organised into stages.">
            <div aria-hidden className="grid grid-cols-1 gap-4 bg-surface-muted p-4 sm:grid-cols-3 sm:p-6">
              {columns.map((col) => (
                <div key={col.stage} className="grid content-start gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-ink-muted">{col.stage}</span>
                    <span className="font-mono text-xs text-ink-muted">{col.items.length}</span>
                  </div>
                  {col.items.map((item, i) => (
                    <div key={item} className="rounded-sm border border-line bg-surface px-3 py-2.5">
                      <p className="text-[0.8125rem] leading-[1.125rem] font-medium text-ink">{item}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={i === 0 && col.stage === "Discover" ? "size-1.5 rounded-full bg-accent" : "size-1.5 rounded-full bg-line-strong"} />
                        <span className="h-1 flex-1 rounded-full bg-line" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </IllustrativeFrame>
        </Reveal>
        <ul className="grid content-start gap-8 lg:col-span-3 lg:col-start-10">
          {presentation.notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.07} className="border-t border-line pt-5">
              <h3 className="text-h4 mb-2">{n.title}</h3>
              <p className="text-body-sm text-ink-muted">{n.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
