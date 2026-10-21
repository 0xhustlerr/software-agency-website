import Image from "next/image";
import { aboutHero, collaborationWays, engineeringValues, mission, philosophy, team, whyWeExist } from "@/content/pages/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NodeGrid } from "@/components/ui/node-grid";
import { Reveal } from "@/components/motion/reveal";
import { RuledList, Split } from "@/components/sections/pages/split";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Nexus Morrow is a product engineering studio for founders — thoughtful about the product, serious about the engineering, and clear in how we communicate.",
  path: "/about",
});

export default function AboutPage() {
  const members = team.filter((m) => m.approved);
  return (
    <>
      <PageHero
        size="display"
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lead={aboutHero.lead}
        aside={
          <div aria-hidden className="opacity-90">
            <NodeGrid cols={6} rows={5} pitch={72} path={[[0, 1], [2, 1], [2, 3], [4, 3], [4, 4], [6, 4]]} animate />
          </div>
        }
      />

      {/* 1 · Mission + why we exist */}
      <Section spacing="lg" aria-labelledby="mission-h">
        <Reveal>
          <Eyebrow>Mission</Eyebrow>
          <h2 id="mission-h" className="font-display mt-6 max-w-[26ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
            {mission.statement} <span className="text-ink-muted">{mission.muted}</span>
          </h2>
        </Reveal>
        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Eyebrow as="h3">Why we exist</Eyebrow>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <p className="text-lead">{whyWeExist[0]}</p>
            <p className="text-body mt-5 text-ink-muted">{whyWeExist[1]}</p>
          </Reveal>
        </div>
      </Section>

      {/* geometry composition */}
      <div aria-hidden className="bg-surface">
        <Container>
          <div data-theme="dark" className="rounded-md bg-surface px-6 py-8 sm:px-12 sm:py-10">
            <NodeGrid cols={14} rows={3} pitch={72} path={[[0, 2], [3, 2], [3, 1], [7, 1], [7, 2], [10, 2], [10, 0], [14, 0]]} />
          </div>
        </Container>
      </div>

      {/* 2 · Philosophy */}
      <Section aria-labelledby="phil-h">
        <Reveal className="mb-12 lg:mb-18">
          <Eyebrow>Product development philosophy</Eyebrow>
          <h2 id="phil-h" className="text-h2 mt-4">
            Build the right thing, then build it right.
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="border-t border-ink pt-6">
              <p className="text-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-h3 mt-6">{p.title}</h3>
              <p className="text-body-sm mt-2.5 text-ink-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 3 · Engineering values */}
      <Section theme="dark" aria-labelledby="val-h">
        <Split id="val-h" eyebrow="Engineering values" heading="What we hold ourselves to.">
          <RuledList items={engineeringValues} />
        </Split>
      </Section>

      {/* 4 · Collaboration */}
      <Section tone="muted" aria-labelledby="col-h">
        <Split id="col-h" eyebrow="How we collaborate with founders" heading="Built with you, in the open.">
          <ul className="border-b border-line">
            {collaborationWays.map((c) => (
              <li key={c.title} className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-6">
                <h3 className="font-display text-[1.25rem] leading-[1.25] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="text-body text-ink-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      {/* 5 · Team — only with real profiles and genuine photography */}
      {members.length ? (
        <Section aria-labelledby="team-h">
          <Reveal className="mb-12 lg:mb-18">
            <Eyebrow>The team</Eyebrow>
            <h2 id="team-h" className="text-h2 mt-4">
              The people you’ll work with.
            </h2>
          </Reveal>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <li key={m.name}>
                <Image src={m.photo.src} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5] h-auto w-full rounded-md object-cover" />
                <h3 className="font-display mt-3.5 text-[1.125rem] font-semibold">{m.name}</h3>
                <p className="text-body-sm text-ink-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand
        heading="Let’s build something worth using."
        body="Tell us what you’re working on and where you’d like help. We’ll be straightforward about how we can — and can’t — help."
      />
    </>
  );
}
