import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftTopics } from "@/content/insight-topics";
import { publishedInsights } from "@/lib/insights";
import { showPending } from "@/lib/flags";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/sections/insights/post-card";
import { InsightBrowser } from "@/components/sections/insights/insight-browser";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical notes for founders on scoping MVPs, SaaS architecture, applied AI and the engineering decisions that matter early.",
  path: "/insights",
});

export default function InsightsPage() {
  const hasPosts = publishedInsights.length > 0;
  // No approved articles: the page does not exist in production (and is not in navigation).
  if (!hasPosts && !showPending) notFound();

  const featured = hasPosts ? publishedInsights.find((p) => p.featured) ?? publishedInsights[0] : null;
  const rest = hasPosts ? publishedInsights.filter((p) => p !== featured) : [];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on building software products."
        lead="Notes for founders on scoping, architecture, applied AI and the engineering decisions that matter early."
        leadAside
      />

      <Section aria-label="Articles" className="lg:pt-20">
        {!hasPosts ? (
          <>
            <div role="note" className="mb-12 flex flex-col gap-2 rounded-sm border border-dashed border-line-strong bg-surface-muted px-4 py-3.5 text-sm sm:flex-row sm:gap-4">
              <span className="shrink-0 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">Development preview</span>
              <span>
                These are suggested topics awaiting original writing. Nothing is published — and Insights stays out of navigation — until an article in{" "}
                <code className="font-mono text-xs">content/insights/</code> is approved.
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {draftTopics.map((t) => (
                <li key={t.title}>
                  <PostCard
                    draft
                    post={{ slug: "", title: t.title, description: "[Excerpt — written with the article.]", category: t.category, author: "[Author]", publishedAt: "", readingMinutes: 0 }}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {featured ? (
              <article aria-labelledby="featured-title" className="mb-24 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
                <Link href={`/insights/${featured.slug}`} tabIndex={-1} aria-hidden className="lg:col-span-7">
                  {featured.image ? (
                    <Image src={featured.image.src} alt={featured.image.alt} width={featured.image.width} height={featured.image.height} sizes="(min-width: 1024px) 58vw, 100vw" priority className="aspect-[16/10] h-auto w-full rounded-md object-cover" />
                  ) : (
                    <div className="aspect-[16/10] rounded-md border border-line bg-surface-muted bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  )}
                </Link>
                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="font-mono text-xs text-accent-ink">Featured · {featured.category}</p>
                  <h2 id="featured-title" className="text-h2 mt-4">
                    <Link href={`/insights/${featured.slug}`} className="rounded-xs hover:text-accent-ink">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="text-body mt-4 text-ink-muted">{featured.description}</p>
                  <p className="mt-5 flex flex-wrap gap-x-4 text-[0.8125rem] text-ink-muted">
                    <span>{featured.author}</span>
                    <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                    <span>{featured.readingMinutes} min read</span>
                  </p>
                  <Button href={`/insights/${featured.slug}`} variant="ghost" className="mt-6">
                    Read article
                  </Button>
                </div>
              </article>
            ) : null}
            {rest.length ? (
              <>
                <h2 className="text-eyebrow mb-6 text-ink-muted">Latest</h2>
                <InsightBrowser items={rest.map((p) => ({ key: p.slug, category: p.category, node: <PostCard post={p} /> }))} />
              </>
            ) : null}
          </>
        )}
      </Section>

      <CtaBand heading="Have a question we should write about?" body="Or a product you’d like to talk through? Tell us what you’re building." />
    </>
  );
}
