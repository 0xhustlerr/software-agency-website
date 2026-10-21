/**
 * Route registry. Every link to an inner page goes through `href()`.
 * While a page is unpublished, links fall back to the matching homepage
 * section, so navigation never leads to an empty or missing page. When a
 * page ships, flip `published` to true — every nav item, CTA and footer link
 * updates at once.
 */
export const routes = {
  services: { path: "/services", fallback: "/#services", published: false },
  work: { path: "/work", fallback: "/#work", published: false },
  about: { path: "/about", fallback: "/#approach", published: false },
  insights: { path: "/insights", fallback: null, published: false },
  contact: { path: "/contact", fallback: "/#contact", published: false },
  privacy: { path: "/privacy", fallback: null, published: false },
} as const satisfies Record<string, { path: string; fallback: string | null; published: boolean }>;

export type RouteKey = keyof typeof routes;

/** The live destination for a page, or null when it has neither a page nor a fallback section. */
export function href(key: RouteKey): string | null {
  const r = routes[key];
  return r.published ? r.path : r.fallback;
}
