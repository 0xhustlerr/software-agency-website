import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { insightCategories, type Insight, type InsightCategory, type InsightMeta } from "@/content/types";

/**
 * Insights content workflow
 * -------------------------
 * One Markdown file per article in content/insights/<slug>.md (files starting
 * with "_" are ignored — see _template.md). Front matter is validated here; an
 * article is published only when `status: approved`. Server-only: reads the
 * filesystem at build time.
 */
const DIR = path.join(process.cwd(), "content", "insights");

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 225));
}

function parseFile(file: string): Insight {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const req = (k: string) => {
    if (typeof data[k] !== "string" || !data[k].trim()) throw new Error(`content/insights/${file}: missing "${k}" in front matter`);
    return data[k].trim() as string;
  };
  const category = req("category") as InsightCategory;
  if (!insightCategories.includes(category)) {
    throw new Error(`content/insights/${file}: unknown category "${category}". Use one of: ${insightCategories.join(", ")}`);
  }
  const status = data.status === "approved" ? "approved" : "draft";
  const meta: InsightMeta = {
    slug,
    status,
    title: req("title"),
    description: req("description"),
    category,
    author: req("author"),
    authorRole: typeof data.authorRole === "string" ? data.authorRole : undefined,
    publishedAt: req("publishedAt"),
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    featured: data.featured === true,
    image: data.image && typeof data.image === "object" ? data.image : undefined,
    readingMinutes: readingMinutes(content),
  };
  // Content is authored by the team and reviewed before approval.
  const html = marked.parse(content, { async: false, gfm: true }) as string;
  return { ...meta, html };
}

function loadAll(): Insight[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .map(parseFile)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const all = loadAll();

/** Approved articles, newest first. */
export const publishedInsights: Insight[] = all.filter((a) => a.status === "approved");

export function getInsight(slug: string): Insight | undefined {
  return publishedInsights.find((a) => a.slug === slug);
}

export function relatedInsights(article: Insight, limit = 3): Insight[] {
  const same = publishedInsights.filter((a) => a.slug !== article.slug && a.category === article.category);
  const rest = publishedInsights.filter((a) => a.slug !== article.slug && a.category !== article.category);
  return [...same, ...rest].slice(0, limit);
}
