import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { approvedProjects } from "@/content/projects";
import { serviceDetails } from "@/content/service-details";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { RuledList, Split } from "@/components/sections/pages/split";
import { CtaBand } from "@/components/sections/cta-band";

/** Placeholder keeps the build valid while no case study is approved (Cache Components needs one param). */
const PLACEHOLDER = "__no-approved-case-studies__";

export function generateStaticParams() {
  return approvedProjects.length ? approvedProjects.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

const find = (slug: string) => approvedProjects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} — case study`, description: p.summary, path: `/work/${p.slug}` });
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  // Read params inside Suspense so Partial Prefetching can serve the App Shell.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CaseStudyPageContent params={params} />
    </Suspense>
  );
}

async function CaseStudyPageContent({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const i = approvedProjects.indexOf(p);
  const next = approvedProjects.length > 1 ? approvedProjects[(i + 1) % approvedProjects.length] : null;
  const serviceNames = p.services.map((s) => serviceDetails[s]?.name ?? s).join(", ");

  return (
    <>
      <PageHero
        id="cs-title"
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: p.title }]}
        eyebrow={p.industry}
        title={`${p.title} — ${p.summary}`}
        className="pb-0 lg:pb-0"
      >
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 lg:grid-cols-4">
          {[
            ["Client", p.client],
            ["Services", serviceNames],
            ["Timeline", p.timeline ?? "—"],
            ["Stack", p.stack.slice(0, 3).join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-small text-ink-muted">{k}</dt>
              <dd className="text-body mt-1">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-14 aspect-[16/8] overflow-hidden rounded-t-md bg-surface-muted">
          <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(min-width: 1392px) 1280px, 100vw" className="object-cover" />
        </div>
      </PageHero>

      <Section aria-labelledby="ch-h">
        <Split id="ch-h" eyebrow="01 · The challenge" heading="The problem worth solving">
          <p className="text-lead">{p.challenge}</p>
        </Split>
      </Section>

      {p.approach.length ? (
        <Section tone="muted" aria-labelledby="ap-h">
          <Split id="ap-h" eyebrow="02 · Product approach" heading="How we decided what to build">
            <RuledList items={p.approach} />
          </Split>
        </Section>
      ) : null}

      {p.screenshots.length ? (
        <Section theme="dark" aria-label="Product screenshots">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {p.screenshots.map((s, idx) => (
              <figure key={s.src} className={idx === 0 ? "m-0 lg:col-span-8" : "m-0 lg:col-span-4"}>
                <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full rounded-md" />
                {s.caption ? <figcaption className="text-small mt-3 text-ink-muted">{s.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {p.engineering.length ? (
        <Section aria-labelledby="en-h">
          <Split
            id="en-h"
            eyebrow="03 · Engineering contribution"
            heading="What we engineered"
            note={
              <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            }
          >
            <RuledList items={p.engineering} />
          </Split>
        </Section>
      ) : null}

      {p.outcomes.length ? (
        <Section theme="dark" aria-labelledby="out-h">
          <div className="mb-12">
            <Eyebrow>04 · Verified outcomes</Eyebrow>
            <h2 id="out-h" className="text-h2 mt-4">
              What changed
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
            {p.outcomes.map((o) => (
              <li key={o.label} className="border-t border-line pt-6">
                <p className="text-display text-[4rem]">{o.value}</p>
                <h3 className="text-h4 mt-4">{o.label}</h3>
                <p className="text-small mt-1 text-ink-muted">Source: {o.source}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section aria-labelledby="cr-h">
        <Split id="cr-h" eyebrow="05 · Credits and attribution" heading="Who made it">
          {p.credits.length ? <RuledList items={p.credits.map((c) => ({ title: c.role, body: c.name }))} /> : null}
          <p className="text-small mt-5 text-ink-muted">
            Published with the approval of {p.client}
            {p.approvedAt ? `, ${new Date(p.approvedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}` : ""}.
          </p>
          {next ? (
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
              <span className="text-small text-ink-muted">Next case study</span>
              <Button href={`/work/${next.slug}`} variant="ghost">
                {next.title}
              </Button>
            </div>
          ) : null}
        </Split>
      </Section>

      <CtaBand heading="Have a problem worth solving?" body="Tell us what you’re building. We’ll explore your goals, challenges, and the best way to move forward." />
    </>
  );
}
