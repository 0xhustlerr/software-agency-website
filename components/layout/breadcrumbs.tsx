import Link from "next/link";
import { site } from "@/content/site";

export interface Crumb {
  label: string;
  href?: string;
}

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-muted">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link href={c.href} className="rounded-xs underline decoration-line-strong underline-offset-[3px] hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last ? <span aria-hidden>/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
