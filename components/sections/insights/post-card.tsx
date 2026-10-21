import Image from "next/image";
import Link from "next/link";
import type { InsightMeta } from "@/content/types";
import { formatDate } from "@/lib/format";

/** Article card for listings. `draft` renders a clearly marked, unlinked preview (development only). */
export function PostCard({ post, draft = false, headingLevel: H = "h3" }: { post: Pick<InsightMeta, "slug" | "title" | "description" | "category" | "author" | "publishedAt" | "readingMinutes" | "image">; draft?: boolean; headingLevel?: "h2" | "h3" }) {
  const image = post.image ? (
    <Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[16/10] h-auto w-full rounded-md object-cover" />
  ) : (
    <div aria-hidden className="grid aspect-[16/10] place-items-center rounded-md border border-line bg-surface-muted bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:32px_32px]">
      <span className="size-2 rounded-full bg-accent" />
    </div>
  );
  return (
    <article className="flex flex-col">
      {draft ? image : <Link href={`/insights/${post.slug}`} tabIndex={-1} aria-hidden>{image}</Link>}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-accent-ink">{post.category}</span>
        {draft ? <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">Draft topic</span> : null}
      </div>
      <H className="font-display mt-3 text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.02em]">
        {draft ? post.title : (
          <Link href={`/insights/${post.slug}`} className="rounded-xs hover:text-accent-ink">
            {post.title}
          </Link>
        )}
      </H>
      <p className="text-body-sm mt-2.5 text-ink-muted">{post.description}</p>
      <p className="mt-3.5 flex flex-wrap gap-x-4 text-[0.8125rem] text-ink-muted">
        <span>{post.author}</span>
        {draft ? <span>[Publish date]</span> : <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        {!draft ? <span>{post.readingMinutes} min read</span> : null}
      </p>
    </article>
  );
}
