import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/content/services";
import { approvedProjects } from "@/content/projects";

/**
 * Returns a real 404 for dynamic routes whose slug doesn't exist. Without it,
 * Partial Prerendering streams the not-found UI with a 200 status.
 * Insights slugs are validated in the page (noindex) because articles are
 * read from the filesystem, which Proxy should not depend on.
 */
const serviceSlugs = new Set(services.filter((s) => s.detailPublished).map((s) => s.slug as string));
const workSlugs = new Set(approvedProjects.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  const known =
    extra === undefined &&
    ((section === "services" && serviceSlugs.has(slug)) || (section === "work" && workSlugs.has(slug)));
  if (known) return NextResponse.next();
  return NextResponse.rewrite(new URL("/missing", request.url));
}

export const config = {
  matcher: ["/services/:slug+", "/work/:slug+"],
};
