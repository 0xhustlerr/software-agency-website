import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { getInsight, publishedInsights, relatedInsights } from "@/lib/insights";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/sections/insights/post-card";
import { CtaBand } from "@/components/sections/cta-band";

/** Placeholder keeps the build valid while no article is approved (Cache Components needs one param). */
const PLACEHOLDER = "__no-published-articles__";

export function generateStaticParams() {
  return publishedInsights.length ? publishedInsights.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    authors: [{ name: a.author }],
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url: `/insights/${a.slug}`,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      authors: [a.author],
      section: a.category,
      images: a.image ? [{ url: a.image.src, width: a.image.width, height: a.image.height, alt: a.image.alt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description },
  };
}

export default function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  // Read params inside Suspense so Partial Prefetching can serve the App Shell.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArticlePageContent params={params} />
    </Suspense>
  );
}

async function ArticlePageContent({ params }: { params: PageProps<"/insights/[slug]">["params"] }) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();
  const related = relatedInsights(a);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { "@type": "Person", name: a.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
    ...(a.image ? { image: `${site.url}${a.image.src}` } : {}),
  };

  return (
    <>
      <article aria-labelledby="article-title">
        <header data-theme="dark" className="bg-surface pt-10 lg:pt-14">
          <Container>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.category }]} />
            <div className="mx-auto max-w-[720px] pb-12">
              <p className="font-mono text-[0.8125rem] text-accent-ink">{a.category}</p>
              <h1 id="article-title" className="text-h1 mt-4 text-[clamp(2.5rem,4.4vw,4rem)]">
                {a.title}
              </h1>
              <p className="text-lead mt-5 text-ink-muted">{a.description}</p>
              <p className="mt-8 text-[0.875rem] text-ink-muted">
                <span className="font-medium text-ink">{a.author}</span>
                {a.authorRole ? <> · {a.authorRole}</> : null} · <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time> · {a.readingMinutes} min read
                {a.updatedAt ? (
                  <>
                    {" "}· Updated <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
                  </>
                ) : null}
              </p>
            </div>
            {a.image ? (
              <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} priority sizes="(min-width: 1392px) 1280px, 100vw" className="aspect-[16/7] h-auto w-full rounded-t-md object-cover" />
            ) : null}
          </Container>
        </header>
        <Section className="lg:pt-20">
          <div className="prose-nm mx-auto max-w-[720px]" dangerouslySetInnerHTML={{ __html: a.html }} />
          <p className="mx-auto mt-16 max-w-[720px] border-t border-line pt-6 text-[0.875rem] text-ink-muted">
            Written by <span className="font-medium text-ink">{a.author}</span>
            {a.authorRole ? `, ${a.authorRole}` : ""}.
          </p>
        </Section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {related.length ? (
        <Section tone="muted" aria-labelledby="rel-h">
          <h2 id="rel-h" className="text-h3 mb-8">
            Related articles
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <PostCard post={r} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand heading="Building something like this?" body="Tell us what you’re working on. We’ll explore your goals, challenges, and the best way to move forward." />
    </>
  );
}
