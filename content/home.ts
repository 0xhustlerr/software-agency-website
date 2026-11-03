import type { Pillar } from "./types";

/** Homepage copy, in narrative order. One messaging line: "You bring the idea. We deliver the product." */

export const hero = {
  eyebrow: "Product engineering studio for founders",
  headline: "You bring the idea. We deliver the product.",
  /** Art-directed line breaks, kept at every width (the type scales to fit). */
  headlineLines: ["You bring the idea.", "We deliver the product."],
  lead: "Strategy, design, development and launch, all under one roof. You stay focused on your vision and your customers; we turn it into a product people can use.",
  /** Only claims we can stand behind; replace with real numbers once they exist. */
  trust: ["One team from first idea to launch", "Work directly with the people building your product"],
};

export const positioning = {
  eyebrow: "A different kind of development partner",
  /** Says what the partnership does, instead of the category cliché ("more than developers"). */
  heading: "Decide what to build. Then build it properly.",
  body: "Building a startup takes more than writing code. We help you shape the right product, make smart technical decisions, and build a foundation that supports what comes next.",
  pillars: [
    {
      title: "Product\u2011first thinking",
      body: "We start with your users and the problem worth solving, then decide what to build — and what to leave out.",
    },
    {
      title: "Engineering that scales",
      body: "Clean architecture and sensible technology choices, so the first version can grow instead of being rewritten.",
    },
    {
      title: "Collaboration without the complexity",
      body: "One team, direct conversations, and decisions you can follow — no layers of account management.",
    },
  ] satisfies Pillar[],
};

export const servicesIntro = {
  eyebrow: "What we build",
  heading: "From first concept to full\u2011scale product.", // non-breaking hyphen: never "full- / scale"
  alsoLabel: "Also available",
};

export const work = {
  eyebrow: "Selected work",
  /** Claims no delivered impact: until a case study is approved, this sits above labelled concepts. */
  heading: "Products we design and engineer.",
  emptyState: {
    title: "Our work is taking shape.",
    body: "Nexus Morrow is a new studio. Case studies will appear here as our first client products launch and are approved for publication. Until then, the concepts above show the kind of product we design and engineer.",
    cta: "Be one of our first partners",
  },
};

export const journey = {
  eyebrow: "Your idea, our process",
  heading: "A clear path from idea to launch.",
};

export const engineering = {
  eyebrow: "Software you can rely on",
  heading: "Thoughtful architecture. Reliable execution.",
  supporting: "We choose technologies based on your product goals, not because they're fashionable.",
  themes: [
    { title: "Easy to change later", body: "Readable, reviewed, and documented, so any good engineer — including your future team — can pick it up." },
    { title: "Safe by design", body: "Authentication, permissions, and data protection designed in from the start, not added after launch." },
    { title: "Connects to your tools", body: "Clear interfaces that let your product connect to payments, CRMs, and the tools your customers already use." },
    { title: "Runs reliably online", body: "Environments you can reproduce, deploy with confidence, and scale when usage grows." },
    { title: "Grows with your users", body: "Simple where it can be, flexible where it needs to be — sized for the next stage, not a hypothetical one." },
    { title: "Checked before every release", body: "Automated tests and deployment pipelines that catch problems before your users do." },
  ] satisfies Pillar[],
};

export const collaboration = {
  eyebrow: "How we work together",
  heading: "Built with you. Not behind closed doors.",
  lead: "You stay close to the product at every stage — seeing progress, shaping priorities, and making the important calls with full context.",
  principles: [
    { title: "Direct communication", body: "You talk to the people designing and building your product." },
    { title: "Transparent milestones", body: "Clear goals for each stage, with progress you can see and test." },
    { title: "Shared product priorities", body: "One backlog, ordered together against what matters most to your business." },
    { title: "Practical feedback cycles", body: "Regular reviews of working software, so feedback changes the product early." },
    { title: "Long\u2011term maintainability", body: "Documentation and handover built in, so the product never depends on us alone." },
    { title: "Flexible collaboration", body: "Engagements shaped around your stage, team, and how you prefer to work." },
  ] satisfies Pillar[],
};

export const faqIntro = {
  eyebrow: "FAQ",
  heading: "Questions founders ask.",
  note: "Ownership and commercial terms are defined in each project agreement.",
};

export const finalCta = {
  heading: "Let's turn your idea into something real.",
  headingLines: ["Let\u2019s turn", "your idea into", "something real."],
  body: "Tell us what you're building. We'll explore your goals, challenges, and the best way to move forward.",
  primary: "Start a Project",
  emailPrompt: "Prefer email?",
};
