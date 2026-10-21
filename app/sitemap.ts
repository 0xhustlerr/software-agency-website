import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { approvedProjects } from "@/content/projects";
import { publishedInsights } from "@/lib/insights";
import { routes } from "@/content/routes";

/** Lists published routes only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const pages = Object.values(routes)
    .filter((r) => r.published)
    .map((r) => ({ url: url(r.path), changeFrequency: "monthly" as const, priority: r.path === "/contact" ? 0.9 : 0.8 }));
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...pages,
    ...services.filter((s) => s.detailPublished).map((s) => ({ url: url(`/services/${s.slug}`), priority: 0.8 })),
    ...approvedProjects.map((p) => ({ url: url(`/work/${p.slug}`), priority: 0.7 })),
    ...publishedInsights.map((i) => ({ url: url(`/insights/${i.slug}`), lastModified: i.updatedAt ?? i.publishedAt, priority: 0.6 })),
  ];
}
