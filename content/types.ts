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
}

export interface Pillar {
  title: string;
  body: string;
}

/**
 * An original product concept used to show capability. Never client work:
 * always rendered with a visible concept label and no case-study link.
 */
export interface ProductConcept {
  slug: string;
  name: string;
  category: string;
  /** The problem the concept explores. */
  challenge: string;
  /** What the concept demonstrates we can build. */
  built: string;
  tags: string[];
}

export type PublishStatus = "draft" | "approved";

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  /** Only "approved" projects render or appear in navigation. */
  status: PublishStatus;
  client: string;
  /** Client sign-off is required before status can be "approved". */
  clientApproved: boolean;
  title: string;
  summary: string;
  services: ServiceSlug[];
  industry: string;
  /** The business challenge, in a sentence or two. */
  challenge: string;
  /** What was built. */
  built: string;
  tags: string[];
  /** Real, verifiable outcomes only. */
  outcomes: { label: string; value: string }[];
  cover: ProjectMedia;
  year?: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Insight {
  slug: string;
  status: PublishStatus;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  author: string;
  tags: string[];
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
