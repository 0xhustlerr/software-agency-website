import type { ProductConcept } from "./types";

/**
 * Original product concepts, shown on the homepage only while no client case
 * study is approved. Each is labelled as a concept; none is client work, and
 * the product names are invented for illustration.
 */
export const productConcepts: ProductConcept[] = [
  {
    slug: "relay",
    name: "Relay",
    category: "Operations SaaS",
    challenge:
      "Growing teams lose track of who owns which customer request once work spreads across email, chat, and spreadsheets.",
    built:
      "A multi-tenant workspace with request intake, routing rules, an automated triage assistant, and a live operations dashboard — with a companion mobile view for people on the move.",
    tags: ["SaaS platform", "Workflow automation", "AI triage", "Next.js", "PostgreSQL"],
  },
];
