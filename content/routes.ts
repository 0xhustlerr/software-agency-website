import { publishedInsights } from "@/lib/insights";
import { privacyPolicy } from "./legal";

/**
 * Route registry. Every link to an inner page goes through `href()`.
 * A page that is not published falls back to its homepage section (or is
 * left out entirely), so navigation never exposes empty or unapproved pages.
 */
export const routes = {
  services: { path: "/services", fallback: "/#services", published: true },
  work: { path: "/work", fallback: "/#work", published: true },
  about: { path: "/about", fallback: "/#approach", published: true },
  insights: { path: "/insights", fallback: null, published: publishedInsights.length > 0 },
  contact: { path: "/contact", fallback: "/#contact", published: true },
  privacy: { path: "/privacy", fallback: null, published: privacyPolicy.approved },
} satisfies Record<string, { path: string; fallback: string | null; published: boolean }>;

export type RouteKey = keyof typeof routes;

/** The live destination for a page, or null when it has neither a page nor a fallback section. */
export function href(key: RouteKey): string | null {
  const r = routes[key];
  return r.published ? r.path : r.fallback;
}

export function isPublished(key: RouteKey): boolean {
  return routes[key].published;
}
