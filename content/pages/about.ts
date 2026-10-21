/** /about copy, as approved on the design canvas. No invented history, people, locations or team size. */

export const aboutHero = {
  eyebrow: "About",
  title: "Great products are built through great partnerships.",
  lead: "Nexus Morrow is a product engineering studio for founders — thoughtful about the product, serious about the engineering, and clear in how we communicate.",
};

export const mission = {
  statement: "Help founders turn ambitious ideas into thoughtfully designed, reliable software —",
  muted: "and make the path from idea to product clearer along the way.",
};

export const whyWeExist = [
  "Choosing an engineering partner is one of the hardest early decisions a founder makes. Too often the options are developers who build exactly what’s asked without questioning it, or agencies where decisions disappear behind layers of process.",
  "We believe founders deserve better: a partner that thinks about the product as carefully as the code, explains trade-offs in plain language, and builds foundations that last beyond the first version. That is the studio we are building.",
];

export const philosophy = [
  { title: "Start with the problem", body: "Users, constraints and the outcome that matters come before features and technology." },
  { title: "Small, deliberate first versions", body: "The smallest product that tests the riskiest assumption — then grow from evidence." },
  { title: "Evidence over opinion", body: "Prototypes, user feedback and usage data settle debates faster than meetings." },
  { title: "Foundations that outlast version one", body: "Speed now should never mean a rewrite later." },
];

export const engineeringValues = [
  { title: "Clarity over cleverness", body: "Code and architecture any good engineer can understand and change." },
  { title: "Secure by default", body: "Authentication, permissions and data protection designed in, not bolted on." },
  { title: "Tested and observable", body: "Automated tests and monitoring, so problems are caught before users find them." },
  { title: "Decisions written down", body: "Why something was built a certain way is never lost when people change." },
  { title: "Sensible technology choices", body: "Chosen for your product goals and your future team, not for fashion." },
  { title: "Built to be handed over", body: "Your product should never depend on us alone." },
];

export const collaborationWays = [
  { title: "Direct access", body: "You work with the people designing and building your product — no layers in between." },
  { title: "Shared priorities", body: "One backlog, ordered together against what matters most to your business." },
  { title: "Working software at every review", body: "Regular reviews of real progress, so feedback changes the product early." },
  { title: "Honest trade-offs", body: "When time, scope and quality pull against each other, you hear about it — with options." },
];

export interface TeamMember {
  name: string;
  role: string;
  /** Genuine photograph only, in public/team/. */
  photo: { src: string; alt: string; width: number; height: number };
  bio?: string;
  approved: boolean;
}

/** TODO(content): add real profiles with genuine photography. The section is hidden while this is empty. */
export const team: TeamMember[] = [];
