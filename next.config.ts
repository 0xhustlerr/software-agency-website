import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NextConfig } from "next";

/**
 * Approved Insights slugs, read at build time and inlined for proxy.ts so it can
 * return a real 404 for unknown articles without touching the filesystem at
 * request time. Same rules as lib/insights.ts: *.md(x), not "_" or README, status: approved.
 */
function approvedInsightSlugs() {
  const dir = path.join(process.cwd(), "content", "insights");
  if (!fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .filter((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data.status === "approved")
    .map((f) => f.replace(/\.mdx?$/, ""))
    .join(",");
}

/*
 * Baseline security headers for every response. A Content-Security-Policy is
 * not set here: the inline bootstrap script, JSON-LD and Next's inline runtime
 * would need per-request nonces, which turns every static page dynamic.
 */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  env: { NM_INSIGHT_SLUGS: approvedInsightSlugs() },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
