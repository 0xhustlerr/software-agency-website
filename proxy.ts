import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/content/services";
import { approvedProjects } from "@/content/projects";

/**
 * Returns a real 404 for dynamic routes whose slug doesn't exist. Without it,
 * Partial Prerendering streams the not-found UI with a 200 status.
 * Insights slugs come from next.config.ts (read at build time), because
 * articles live on the filesystem, which Proxy should not depend on.
 */
const slugs: Record<string, Set<string>> = {
  services: new Set(services.filter((s) => s.detailPublished).map((s) => s.slug as string)),
  work: new Set(approvedProjects.map((p) => p.slug)),
  insights: new Set((process.env.NM_INSIGHT_SLUGS ?? "").split(",").filter(Boolean)),
};

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  if (extra === undefined && slugs[section]?.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/missing", request.url));
}

export const config = {
  matcher: ["/services/:slug+", "/work/:slug+", "/insights/:slug+"],
};
