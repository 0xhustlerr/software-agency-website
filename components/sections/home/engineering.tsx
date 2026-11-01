import { engineering } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { EngineeringArt } from "@/components/illustrations/architecture";
import { FeatureTile } from "@/components/ui/tile-3d";
import { Bot, Cloud, Code2, FileCode2, Layers, Monitor, Plug, Server, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";

/** One icon per engineering theme, in the order of content/home.ts. */
const themeIcons: LucideIcon[] = [FileCode2, ShieldCheck, Plug, Cloud, Layers, Workflow];
/** One icon and colour per stack layer: frontend, backend, cloud, AI, integrations. */
const layers: { icon: LucideIcon; accent: string }[] = [
  { icon: Monitor, accent: "#6de1d2" },
  { icon: Server, accent: "#6ea8ff" },
  { icon: Cloud, accent: "#8fb3ff" },
  { icon: Bot, accent: "#b794f6" },
  { icon: Code2, accent: "#f6b26b" },
];

/** Section 7 — dark engineering capabilities, explained for founders. */
export function Engineering() {
  return (
    <Section id="engineering" theme="dark" spacing="lg" aria-labelledby="engineering-heading">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="mb-4">{engineering.eyebrow}</Eyebrow>
          <h2 id="engineering-heading" className="text-h1 max-w-[13ch]">
            {engineering.heading}
          </h2>
          <p className="text-lead mt-8 max-w-[36ch] text-ink-muted">{engineering.supporting}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <EngineeringArt />
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-6">
        {engineering.themes.map((t, i) => (
          <Reveal as="li" key={t.title} delay={(i % 3) * 0.06}>
            <FeatureTile mark={String(i + 1).padStart(2, "0")} icon={themeIcons[i % themeIcons.length]} title={t.title} body={t.body} lift />
          </Reveal>
        ))}
      </ul>

      {/* The stack, as a cloud of chips grouped by layer. */}
      <div className="mt-20 lg:mt-24">
        <h3 className="text-eyebrow mb-6 text-ink-muted">Capabilities</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {engineering.capabilities.map((c, i) => {
            const { icon: Icon, accent } = layers[i % layers.length];
            return (
              <Reveal key={c.category} delay={i * 0.05}>
                <div className="h-full rounded-[14px] border-[1.5px] bg-surface-muted p-4" style={{ borderColor: `${accent}66`, boxShadow: `0 0 30px -14px ${accent}` }}>
                  <p className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-[9px]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}>
                      <Icon aria-hidden className="size-4 text-[#0b1220]" strokeWidth={2.5} />
                    </span>
                    <span className="text-h4 text-[1.0625rem]">{c.category}</span>
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {c.items.map((it) => (
                      <li key={it} className="rounded-full border px-2.5 py-1 font-mono text-[12px] text-ink" style={{ borderColor: `${accent}55`, background: `${accent}14` }}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
