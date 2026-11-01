import Image from "next/image";
import { aboutHero, collaborationWays, engineeringValues, mission, philosophy, team, whyWeExist } from "@/content/pages/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { IconCard, tints } from "@/components/ui/icon-card";
import { SpecCards } from "@/components/sections/pages/service-sections";
import { FlaskConical, Layers, Lightbulb, ListOrdered, MessagesSquare, MonitorCheck, Quote, Scale, ShieldCheck, Sprout, Target } from "lucide-react";
import { AboutHeroArt } from "@/components/illustrations/page-hero-art";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Split } from "@/components/sections/pages/split";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "About our product engineering studio",
  description:
    "Nexus Morrow is a product engineering studio for founders — thoughtful about the product, serious about the engineering, and clear in how we communicate.",
  path: "/about",
});

/** Philosophy: problem, small first version, evidence, foundations. */
const philosophyLook = [
  { icon: Target, tint: tints.amber },
  { icon: Sprout, tint: tints.mint },
  { icon: FlaskConical, tint: tints.violet },
  { icon: Layers, tint: tints.blue },
];
/** Collaboration: direct access, shared priorities, working reviews, honest trade-offs. */
const collaborationIcons = [MessagesSquare, ListOrdered, MonitorCheck, Scale];

export default function AboutPage() {
  const members = team.filter((m) => m.approved);
  return (
    <>
      <PageHero
        full
        size="display"
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lead={aboutHero.lead}
        aside={<AboutHeroArt />}
      />

      {/* 1 · Mission + why we exist */}
      <Section spacing="lg" aria-labelledby="mission-h">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Mission</Eyebrow>
            <h2 id="mission-h" className="font-display mt-6 max-w-[26ch] text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
              {mission.statement} <span className="text-ink-muted">{mission.muted}</span>
            </h2>
          </Reveal>
          {/* A founder with a big idea: the person this studio exists for. Photo: Unsplash ylB9gcLv2I4. */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <figure className="relative m-0">
              <div aria-hidden className="relative aspect-[16/11] overflow-hidden rounded-[22px] border-[1.5px] border-mint-400/60 shadow-[0_0_70px_-20px_rgb(109_225_210/0.7),0_40px_70px_-34px_rgb(16_24_39/0.55)]">
                <Image src="/img/about/founder.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900/70 via-transparent to-transparent" />
              </div>
              <span className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-[14px] border-[1.5px] border-mint-400/60 bg-navy-900/90 py-2.5 pr-5 pl-2.5 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.6)] backdrop-blur-md">
                <span className="grid size-10 place-items-center rounded-[10px] bg-linear-to-br from-[#f6b26b] to-[#e8734a] shadow-[0_0_18px_rgb(246_178_107/0.6)]">
                  <Lightbulb aria-hidden className="size-5 text-navy-900" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="font-display block text-[17px] leading-tight font-semibold text-white">Your idea, taken seriously</span>
                  <span className="block text-[13px] font-medium text-mint-400">From first sketch to real users</span>
                </span>
              </span>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* 1b · Why we exist */}
      <Section tone="muted" aria-labelledby="why-h">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="why-h" className="text-h2 mt-4 max-w-[14ch]">Founders deserve a better partner.</h2>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            {/* A quote card: the founder's dilemma, then our answer. */}
            <figure className="relative m-0 overflow-hidden rounded-[20px] border border-line bg-surface p-7 shadow-[0_30px_60px_-36px_rgb(16_24_39/0.4)] sm:p-9">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-mint-400 via-[#6ea8ff] to-[#b794f6]" />
              <span aria-hidden className="absolute -top-20 -right-20 size-60 rounded-full bg-mint-400/20 blur-[50px]" />
              <Quote aria-hidden className="relative size-10 text-accent-ink" strokeWidth={2} />
              <p className="text-lead relative mt-4">{whyWeExist[0]}</p>
              <p className="text-body relative mt-5 border-t border-line pt-5 text-ink-muted">{whyWeExist[1]}</p>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* 2 · Philosophy */}
      <Section aria-labelledby="phil-h">
        <Reveal className="mb-8 lg:mb-10">
          <Eyebrow>Product development philosophy</Eyebrow>
          <h2 id="phil-h" className="text-h2 mt-4">
            Build the right thing, then build it right.
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {philosophy.map((p, i) => {
            const { icon, tint } = philosophyLook[i % philosophyLook.length];
            return <IconCard key={p.title} icon={icon} {...tint} mark={String(i + 1).padStart(2, "0")} title={p.title} body={p.body} delay={i * 0.06} />;
          })}
        </ol>
      </Section>

      {/* 3 · Engineering values */}
      <Section theme="dark" aria-labelledby="val-h">
        <Split id="val-h" eyebrow="Engineering values" heading="What we hold ourselves to.">
          <SpecCards items={engineeringValues} accent="#6de1d2" icon={ShieldCheck} />
        </Split>
      </Section>

      {/* 4 · Collaboration */}
      <Section tone="muted" aria-labelledby="col-h">
        <Split id="col-h" eyebrow="How we collaborate with founders" heading="Built with you, in the open.">
          <ul className="grid gap-3">
            {collaborationWays.map((c, i) => {
              const Icon = collaborationIcons[i % collaborationIcons.length];
              return (
                <Reveal as="li" key={c.title} delay={i * 0.06} className="flex items-start gap-4 rounded-[16px] border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent-ink/40 hover:shadow-[0_0_28px_-12px_var(--accent)]">
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900 shadow-[0_0_16px_-4px_rgb(109_225_210/0.8)]">
                    <Icon className="size-5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-body-sm mt-1 text-ink-muted">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Split>
      </Section>

      {/* 5 · Team — only with real profiles and genuine photography */}
      {members.length ? (
        <Section aria-labelledby="team-h">
          <Reveal className="mb-8 lg:mb-10">
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
