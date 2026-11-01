import { engineering } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { EngineeringArt } from "@/components/illustrations/architecture";
import { ClipboardCheck, Cloud, Plug, ShieldCheck, TrendingUp, Wrench, type LucideIcon } from "lucide-react";

/** One icon per engineering theme, in the order of content/home.ts. */
const themeIcons: LucideIcon[] = [Wrench, ShieldCheck, Plug, Cloud, TrendingUp, ClipboardCheck];

/** Section 7 — engineering, explained for everyone: a building on strong foundations beside six plain promises. */
export function Engineering() {
  return (
    <Section id="engineering" theme="dark" spacing="lg" aria-labelledby="engineering-heading">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow className="mb-4">{engineering.eyebrow}</Eyebrow>
            <h2 id="engineering-heading" className="text-h2 max-w-[16ch]">
              {engineering.heading}
            </h2>
            <p className="text-lead mt-4 max-w-[44ch] text-ink-muted">{engineering.supporting}</p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {engineering.themes.map((t, i) => {
              const Icon = themeIcons[i % themeIcons.length];
              return (
                <Reveal as="li" key={t.title} delay={(i % 2) * 0.06} className="flex items-start gap-3.5">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900 shadow-[0_0_18px_-4px_rgb(109_225_210/0.8)]">
                    <Icon className="size-5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.0625rem] leading-tight font-semibold">{t.title}</h3>
                    <p className="text-small mt-1 text-ink-muted">{t.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.1} className="lg:col-span-6">
          <EngineeringArt />
        </Reveal>
      </div>
    </Section>
  );
}
