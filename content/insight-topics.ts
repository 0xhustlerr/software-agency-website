import type { InsightCategory } from "./types";

/**
 * Suggested first articles, pending original writing. Shown only in
 * development previews of /insights, clearly marked as drafts — never
 * published.
 */
export const draftTopics: { title: string; category: InsightCategory; featured?: boolean }[] = [
  { title: "How to Scope an MVP Without Overbuilding", category: "MVP Development", featured: true },
  { title: "Choosing a Technology Stack for Your First SaaS Product", category: "SaaS Architecture" },
  { title: "What Startup Founders Should Know Before Hiring Developers", category: "Startup Engineering" },
  { title: "When Does AI Actually Belong in Your Product?", category: "Applied AI" },
  { title: "From Prototype to Production: Engineering Decisions That Matter", category: "Engineering Practices" },
];
