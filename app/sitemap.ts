import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { approvedProjects } from "@/content/projects";
import { publishedInsights } from "@/content/insights";

/** Lists published routes only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...services.filter((s) => s.detailPublished).map((s) => ({ url: url(`/services/${s.slug}`) })),
    ...approvedProjects.map((p) => ({ url: url(`/work/${p.slug}`) })),
    ...publishedInsights.map((i) => ({ url: url(`/insights/${i.slug}`), lastModified: i.publishedAt })),
  ];
}
