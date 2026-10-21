import type { Faq, ServiceSlug } from "../types";

export const servicesHero = {
  eyebrow: "Services",
  title: "Everything you need to bring your product to life.",
  lead: "From early product decisions to production-ready engineering, we help founders build the right software at the right stage.",
};

/** Large features on /services, in order. Copy mirrors the approved canvas design. */
export const coreServiceFeatures: { slug: ServiceSlug; outcome: string; capabilities: string[]; linkLabel: string }[] = [
  {
    slug: "mvp-development",
    outcome: "A focused first version in front of real users — scoped to test what matters most, built on foundations you can grow.",
    capabilities: [
      "Feature prioritization and scope definition",
      "Clickable prototypes for early validation",
      "A production-ready web application",
      "Analytics and feedback loops from day one",
      "Launch support for your first users",
    ],
    linkLabel: "Explore MVP Development",
  },
  {
    slug: "custom-software",
    outcome: "Software shaped around how your business really operates, replacing workarounds with tools your team relies on.",
    capabilities: [
      "Workflow and process mapping",
      "Bespoke web applications and internal tools",
      "Integrations with the systems you already use",
      "Roles, permissions and audit trails",
      "Data migration from spreadsheets and legacy tools",
    ],
    linkLabel: "Explore Custom Software",
  },
  {
    slug: "saas-development",
    outcome: "A multi-user product ready for paying customers, with the account, billing and data foundations growth depends on.",
    capabilities: [
      "Authentication, teams and roles",
      "Subscription billing and plans",
      "Customer dashboards and admin consoles",
      "Multi-tenant data architecture where needed",
      "APIs, webhooks and integrations",
    ],
    linkLabel: "Explore SaaS Development",
  },
  {
    slug: "ai-development",
    outcome: "AI features that solve a specific problem reliably — evaluated, observable, and designed with people in the loop.",
    capabilities: [
      "Use-case assessment and feasibility",
      "Model integration and retrieval over your data",
      "Evaluation datasets and quality checks",
      "Privacy-aware data handling and cost controls",
      "Human review and override workflows",
    ],
    linkLabel: "Explore AI Development",
  },
];

export const additionalCapabilities = [
  {
    title: "UX/UI Design and Prototyping",
    body: "User flows, wireframes, interface design and interactive prototypes you can test before committing to a build.",
    tags: ["User flows", "Wireframes", "Design systems", "Prototypes"],
  },
  {
    title: "Cloud Infrastructure and Integrations",
    body: "Reproducible environments, deployment pipelines and dependable connections to the services your product relies on.",
    tags: ["AWS", "CI/CD", "Observability", "Third-party APIs"],
  },
  {
    title: "Product Scaling and Maintenance",
    body: "Performance, reliability and architecture improvements for growing products, plus ongoing iteration and support.",
    tags: ["Performance", "Refactoring", "Monitoring", "Iteration"],
  },
];

export const engagementStages = [
  {
    title: "Idea / Discovery",
    where: "A problem worth solving and early conviction, but no product yet.",
    focus: "Clarifying users, the core job and the smallest testable version.",
    leaveWith: "A prioritized scope, key risks and a realistic plan.",
    fit: "Discovery → MVP Development",
  },
  {
    title: "Prototype / MVP",
    where: "A defined idea that needs to reach real users.",
    focus: "Prototyping, validating direction and building the first production version.",
    leaveWith: "A working product your first users can rely on.",
    fit: "MVP Development · Product design",
  },
  {
    title: "Launch / Early Traction",
    where: "Early users, real feedback and a growing backlog.",
    focus: "Learning from usage, closing gaps and strengthening foundations.",
    leaveWith: "A product that improves in step with what users need.",
    fit: "SaaS Development · Iteration",
  },
  {
    title: "Growth / Scale",
    where: "Growing usage, more customers and a team to support.",
    focus: "Architecture, performance, integrations and engineering support.",
    leaveWith: "A platform ready for the next stage, documented for your team.",
    fit: "Custom Software · Scaling & maintenance",
  },
];

export const servicesFaqs: Faq[] = [
  {
    question: "Which service is right for my stage?",
    answer:
      "Start with where you are, not with a service name. With an idea and no product, discovery and an MVP are usually the right path. With users, the focus shifts to iteration and foundations. We will recommend a starting point in our first conversation.",
  },
  {
    question: "Can we start with discovery before committing to a full build?",
    answer:
      "Yes. Discovery can be a self-contained piece of work that ends with a prioritized scope, the key risks and a proposed approach. You decide what happens next.",
  },
  {
    question: "How are engagements structured and priced?",
    answer:
      "It depends on scope and stage. We explain the options once we understand what you are building; structure, ownership and commercial terms are set out in the project agreement.",
  },
  {
    question: "Can you work alongside our existing team?",
    answer:
      "Yes. We can add capacity, product design or specialist skills, or own a defined part of the product — adapting to your tools and review practices.",
  },
];
