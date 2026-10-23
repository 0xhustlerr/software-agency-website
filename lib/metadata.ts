import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * The site-wide card from app/opengraph-image.tsx. A page that sets its own
 * `openGraph` replaces the inherited one, so pages must list it explicitly.
 */
export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — product engineering for startup founders` };

/**
 * Unique title, description and canonical URL for a page. `title` is the
 * descriptive page title (the root template appends the site name).
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: "website", locale: "en_US", images: [socialImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage] },
  };
}
