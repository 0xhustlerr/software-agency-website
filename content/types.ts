/**
 * Typed content structures. Copy lives in content/*.ts so it can change
 * without touching components. Anything that is evidence (clients, results,
 * quotes, metrics) is empty until supplied and approved — never fabricated.
 */

export type ServiceTier = "core" | "complementary";

export type ServiceSlug =
  | "mvp-development"
  | "custom-software"
  | "saas-development"
  | "ai-development"
  | "product-design"
  | "product-scaling";

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: string;
  tier: ServiceTier;
  /** One or two sentences: what the founder receives. */
  summary: string;
  /** One-sentence benefit used on the homepage. */
  benefit: string;
  /** Short scope tags (3–4). */
  tags: string[];
  /**
   * True once /services/[slug] has complete, approved copy. Rows only link to
   * a detail page that is published.
   */
  detailPublished: boolean;
}

export interface ProcessStep {
  title: string;
  body: string;
  /** What the founder has at the end of the stage. Shown under a rule as "You leave with". */
  outcome?: string;
}

export interface Pillar {
  title: string;
  body: string;
}

/**
 * A product concept used to show capability. Never client work: always
 * rendered with a visible concept label and no case-study link.
 */
export interface ProductConcept {
  slug: string;
  name: string;
  category: string;
  /** Short headline shown above the name. */
  tagline: string;
  /** The problem the concept explores. */
  problem: string;
  /** Product approach: how the concept answers the problem. */
  approach: string;
  /** What the concept demonstrates we can build. */
  demonstrates: string;
  tags: string[];
  /** Concept visual in public/concepts/. */
  image: ProjectMedia;
}

export type PublishStatus = "draft" | "approved";

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectOutcome {
  /** The verified value, e.g. "38%". */
  value: string;
  /** What it measures. */
  label: string;
  /** How it was verified (kept for review; shown as a source line). */
  source: string;
}

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  /** Only "approved" projects with client sign-off render or appear in navigation. */
  status: PublishStatus;
  /** Client sign-off is required before status can be "approved". */
  clientApproved: boolean;
  /** Date the client approved publication (ISO). */
  approvedAt?: string;
  client: string;
  title: string;
  /** One line on what was built and for whom. */
  summary: string;
  services: ServiceSlug[];
  industry: string;
  /** Initial challenge, in a sentence or two. */
  challenge: string;
  /** What was built (homepage card). */
  built: string;
  /** Product approach: decisions and insights. */
  approach: { title: string; body: string }[];
  /** Engineering contribution. */
  engineering: { title: string; body: string }[];
  stack: string[];
  /** Capability tags for cards. */
  tags: string[];
  /** Verified outcomes only — leave empty rather than estimate. */
  outcomes: ProjectOutcome[];
  credits: ProjectCredit[];
  cover: ProjectMedia;
  screenshots: (ProjectMedia & { caption?: string })[];
  timeline?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export const insightCategories = [
  "Startup Engineering",
  "MVP Development",
  "Product Strategy",
  "SaaS Architecture",
  "Applied AI",
  "Engineering Practices",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

/** Front matter of a Markdown/MDX file in content/insights/. */
export interface InsightMeta {
  slug: string;
  /** Only "approved" articles are published. */
  status: PublishStatus;
  title: string;
  description: string;
  category: InsightCategory;
  author: string;
  authorRole?: string;
  /** ISO date. */
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  image?: ProjectMedia;
  readingMinutes: number;
}

export interface Insight extends InsightMeta {
  /** Rendered HTML from the approved Markdown body. */
  html: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Written permission to publish is required. */
  approved: boolean;
}

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  approved: boolean;
}

export interface Metric {
  label: string;
  value: string;
  /** Where the number comes from, for internal verification. */
  source: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Homepage section this item points at, for the scroll-position indicator. */
  sectionId?: string;
}
