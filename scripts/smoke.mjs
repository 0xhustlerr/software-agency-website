// Post-deploy smoke test: route status codes, canonical URLs, social images,
// sitemap and robots. No dependencies.
//   npm run build && npm start   (in another terminal)
//   npm run smoke                 or   BASE_URL=https://nexusmorrow.com npm run smoke
import { routes } from "./smoke-routes.mjs";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const CANONICAL = "https://nexusmorrow.com";
let failed = 0;
const fail = (msg) => {
  failed++;
  console.log(`FAIL  ${msg}`);
};

for (const [path, expected] of Object.entries(routes)) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== expected) fail(`${path}: HTTP ${res.status}, expected ${expected}`);
  if (expected !== 200 || !res.headers.get("content-type")?.includes("text/html")) continue;
  const html = await res.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const want = path === "/" ? CANONICAL : CANONICAL + path;
  if (canonical !== want) fail(`${path}: canonical ${canonical}, expected ${want}`);
  if (!/<meta property="og:image" content="[^"]+"/.test(html)) fail(`${path}: missing og:image`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${path}: expected exactly one <h1>`);
  if (/name="robots" content="noindex/.test(html)) fail(`${path}: published page is noindex`);
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
for (const [path, expected] of Object.entries(routes)) {
  if (path === "/opengraph-image") continue;
  const listed = sitemap.includes(`<loc>${path === "/" ? `${CANONICAL}/` : CANONICAL + path}</loc>`);
  if (expected === 200 && !listed) fail(`sitemap: ${path} missing`);
  if (expected !== 200 && listed) fail(`sitemap: unpublished ${path} listed`);
}
const robots = await (await fetch(`${BASE}/robots.txt`)).text();
if (!robots.includes(`Sitemap: ${CANONICAL}/sitemap.xml`)) fail("robots.txt: sitemap line missing");

console.log(failed ? `\n${failed} check(s) failed` : "\nAll smoke checks passed");
process.exit(failed ? 1 : 0);
