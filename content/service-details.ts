import type { Faq, ServiceSlug } from "./types";

type Item = { title: string; body: string };

export interface ServiceDetail {
  /** Canonical service name (page eyebrow, breadcrumb). */
  name: string;
  /** Short form used in sentences ("most MVP projects"). */
  short: string;
  headline: string;
  lead: string;
  whoTitle: string;
  who: Item[];
  problemsTitle: string;
  problems: Item[];
  deliverables: Item[];
  process: Item[];
  techTitle: string;
  technical: Item[];
  faqs: Faq[];
  cta: { heading: string; body: string };
}

/**
 * Detail page copy for the four core services, as approved on the design
 * canvas. Avoid unsupported guarantees: describe approach, never promise results.
 */
export const serviceDetails: Partial<Record<ServiceSlug, ServiceDetail>> = {
  "mvp-development": {
    "name": "MVP Development",
    "short": "MVP",
    "headline": "Launch the smallest product that proves your idea.",
    "lead": "We help you decide what to build first, validate it with real people, and ship a focused first version your early users can rely on.",
    "whoTitle": "Founders at the start.",
    "who": [
      {
        "title": "Non-technical founders",
        "body": "You understand the problem and the market, and need a partner to design, build and explain the technical decisions."
      },
      {
        "title": "Technical founders short on time",
        "body": "You could build it, but need capacity and product design to reach users sooner."
      },
      {
        "title": "Teams preparing to raise or test demand",
        "body": "You need a working product in front of real users to learn, not a slide deck."
      }
    ],
    "problemsTitle": "From too many ideas to one focused first version.",
    "problems": [
      {
        "title": "Everything feels like a must-have",
        "body": "We run feature prioritization with you — must, next, later — so version one tests your riskiest assumption and nothing more."
      },
      {
        "title": "Unsure people will actually use it",
        "body": "Clickable prototypes and early user sessions validate direction before the expensive part of the build."
      },
      {
        "title": "Worried the MVP will need rewriting",
        "body": "We keep the scope small but the foundations sound, so the first version can grow instead of being thrown away."
      },
      {
        "title": "No plan for the first users",
        "body": "Launch planning, onboarding and analytics are part of the build, so you learn from the first week of real usage."
      }
    ],
    "deliverables": [
      {
        "title": "Prioritized scope",
        "body": "A must / next / later feature map agreed before building."
      },
      {
        "title": "Clickable prototype",
        "body": "Core flows you can put in front of users to validate direction."
      },
      {
        "title": "Production web application",
        "body": "The first version, built and deployed to production."
      },
      {
        "title": "Analytics and feedback loop",
        "body": "Instrumentation to learn what early users actually do."
      },
      {
        "title": "Launch checklist",
        "body": "Onboarding, monitoring and support basics for first users."
      },
      {
        "title": "Handover documentation",
        "body": "Architecture notes and setup so the product is never a black box."
      }
    ],
    "process": [
      {
        "title": "Scope and prioritize",
        "body": "Agree the problem, the users and the smallest version worth launching."
      },
      {
        "title": "Prototype and validate",
        "body": "Test the core flows with real people and adjust direction."
      },
      {
        "title": "Build in iterations",
        "body": "Working software in short cycles, reviewed with you as it grows."
      },
      {
        "title": "Launch to early users",
        "body": "Release, measure, and plan the next iteration from real usage."
      }
    ],
    "techTitle": "Small scope, sound foundations.",
    "technical": [
      {
        "title": "A dependable, well-supported stack",
        "body": "Proven tools that are easy to hire for, not experiments."
      },
      {
        "title": "A data model that can grow",
        "body": "Accounts, permissions and core entities designed with the next stage in mind."
      },
      {
        "title": "Instrumentation from day one",
        "body": "Events and error monitoring so decisions come from evidence."
      },
      {
        "title": "No premature scaling",
        "body": "Infrastructure sized for early users, with a clear path when usage grows."
      }
    ],
    "faqs": [
      {
        "question": "How small should an MVP be?",
        "answer": "Small enough to test your riskiest assumption with real users, complete enough that they can get real value from it. We define that line together during scoping."
      },
      {
        "question": "Can the scope change during the build?",
        "answer": "Yes. Priorities change as you learn. We revisit the backlog with you at each review and agree trade-offs openly."
      },
      {
        "question": "What happens after the MVP launches?",
        "answer": "We can keep iterating based on what users do, strengthen foundations as usage grows, or hand over to your own team with documentation."
      }
    ],
    "cta": {
      "heading": "Ready to scope your first version?",
      "body": "Tell us about the idea and who it is for. We will suggest the smallest version worth building first."
    }
  },
  "custom-software": {
    "name": "Custom Software Development",
    "short": "custom software",
    "headline": "Software shaped around how your business actually works.",
    "lead": "When off-the-shelf tools and spreadsheets stop fitting, we design and build web applications and platforms around your real workflows.",
    "whoTitle": "Teams outgrowing their tools.",
    "who": [
      {
        "title": "Operations-heavy startups",
        "body": "Your edge is in how you operate, and generic tools force workarounds."
      },
      {
        "title": "Businesses moving off spreadsheets and no-code",
        "body": "What got you here is now slow, fragile or impossible to audit."
      },
      {
        "title": "Companies with unique workflows",
        "body": "You need software that reflects your process, roles and data."
      }
    ],
    "problemsTitle": "Replace workarounds with tools your team relies on.",
    "problems": [
      {
        "title": "Work spread across too many tools",
        "body": "We map how work really flows and bring the critical steps into one system."
      },
      {
        "title": "Off-the-shelf software almost fits",
        "body": "We build the parts that make you different and integrate with the tools that already work."
      },
      {
        "title": "Data scattered and hard to trust",
        "body": "A clear data model with roles, permissions and an audit trail."
      },
      {
        "title": "Manual steps that slow everyone down",
        "body": "Automation for repetitive work, with people kept in control of decisions."
      }
    ],
    "deliverables": [
      {
        "title": "Workflow map",
        "body": "How work moves today, and how it should move."
      },
      {
        "title": "System design",
        "body": "Architecture, data model and integration plan."
      },
      {
        "title": "Web application",
        "body": "The application your team uses every day."
      },
      {
        "title": "Integrations",
        "body": "Connections to the systems you already depend on."
      },
      {
        "title": "Admin and reporting tools",
        "body": "Visibility and control for the people running the operation."
      },
      {
        "title": "Documentation and handover",
        "body": "So your team can operate and extend it."
      }
    ],
    "process": [
      {
        "title": "Map workflows",
        "body": "Understand the process, the people and the edge cases."
      },
      {
        "title": "Design the system",
        "body": "Agree the data model, integrations and the first release."
      },
      {
        "title": "Build and integrate",
        "body": "Iterative releases connected to your existing tools."
      },
      {
        "title": "Roll out and support",
        "body": "Migrate data, train users and improve from feedback."
      }
    ],
    "techTitle": "Built to fit what you already run.",
    "technical": [
      {
        "title": "Integration first",
        "body": "APIs and webhooks for the systems you keep."
      },
      {
        "title": "Careful data migration",
        "body": "Moving from spreadsheets and legacy tools without losing history."
      },
      {
        "title": "Roles and permissions",
        "body": "The right access for each team, with an audit trail."
      },
      {
        "title": "Maintainable by your team",
        "body": "Readable code and documentation, not a black box."
      }
    ],
    "faqs": [
      {
        "question": "Should we build or buy?",
        "answer": "Often both. We help you decide which parts are worth building and which existing tools to integrate."
      },
      {
        "question": "Can you work with our existing systems?",
        "answer": "Yes. Integrating with the tools you already use is usually part of the work."
      },
      {
        "question": "Who maintains the software afterwards?",
        "answer": "Either we continue to support it, or we hand over to your team with documentation. That is agreed with you."
      }
    ],
    "cta": {
      "heading": "Tell us how your team works today.",
      "body": "Share the workflows that slow you down. We will explain how we would approach them."
    }
  },
  "saas-development": {
    "name": "SaaS Product Development",
    "short": "SaaS",
    "headline": "A SaaS product ready for customers — and for growth.",
    "lead": "Authentication, billing, dashboards and a data architecture that scales: the foundations a multi-user product depends on, built properly from the start.",
    "whoTitle": "Founders building a subscription product.",
    "who": [
      {
        "title": "Early-stage SaaS companies",
        "body": "You need a product customers can sign up for, pay for and rely on."
      },
      {
        "title": "Founders turning a service into a product",
        "body": "You know the problem deeply and want software that serves many customers."
      },
      {
        "title": "Teams preparing for growth",
        "body": "Your first version works, but accounts, billing or data will not scale."
      }
    ],
    "problemsTitle": "The foundations every SaaS product needs.",
    "problems": [
      {
        "title": "Sign-up, teams and roles",
        "body": "Secure authentication, team invitations and role-based access, with SSO where your customers need it."
      },
      {
        "title": "Charging customers reliably",
        "body": "Subscription billing, plans, trials and upgrades integrated with a proven payments provider."
      },
      {
        "title": "Customers sharing one system safely",
        "body": "A multi-tenant data model where needed, so each customer only ever sees their own data."
      },
      {
        "title": "Growth that strains the product",
        "body": "Background jobs, caching and monitoring so performance holds as usage grows."
      }
    ],
    "deliverables": [
      {
        "title": "Accounts and authentication",
        "body": "Sign-up, login, teams, roles and optional SSO."
      },
      {
        "title": "Subscription billing",
        "body": "Plans, trials, upgrades and invoices through a payments provider."
      },
      {
        "title": "Customer dashboards",
        "body": "The product experience your customers use every day."
      },
      {
        "title": "Admin console",
        "body": "Tools for your team to support customers and manage accounts."
      },
      {
        "title": "APIs and integrations",
        "body": "Webhooks and APIs your customers and partners can build on."
      },
      {
        "title": "Usage analytics",
        "body": "Insight into activation, retention and feature usage."
      }
    ],
    "process": [
      {
        "title": "Define the product",
        "body": "Customers, plans, roles and the core workflow."
      },
      {
        "title": "Design the experience",
        "body": "Onboarding, dashboards and the paths to value."
      },
      {
        "title": "Build the platform",
        "body": "Accounts, billing and the product, released iteratively."
      },
      {
        "title": "Launch and iterate",
        "body": "Release to customers and improve from real usage."
      }
    ],
    "techTitle": "Scalable where it matters.",
    "technical": [
      {
        "title": "Tenant isolation",
        "body": "Data separation designed into the model where multi-tenancy is needed."
      },
      {
        "title": "Billing integration",
        "body": "A proven payments provider rather than custom payment logic."
      },
      {
        "title": "Role-based access",
        "body": "Permissions that match how your customers organize their teams."
      },
      {
        "title": "Background processing",
        "body": "Queues for slow work so the product stays responsive."
      },
      {
        "title": "Observability",
        "body": "Logging, metrics and alerts to catch problems early."
      }
    ],
    "faqs": [
      {
        "question": "Do we need multi-tenancy from day one?",
        "answer": "Not always. We design the data model so separation is clear, and choose the right level of isolation for your customers and stage."
      },
      {
        "question": "Which payments provider do you use?",
        "answer": "We integrate established providers and recommend one based on your markets, pricing model and customers."
      },
      {
        "question": "Can you add SSO for enterprise customers?",
        "answer": "Yes, when your customers need it. We plan for it in the authentication design."
      }
    ],
    "cta": {
      "heading": "Building a SaaS product?",
      "body": "Tell us about your customers and pricing model. We will explain the foundations we would build first."
    }
  },
  "ai-development": {
    "name": "AI Product Development",
    "short": "AI",
    "headline": "Practical AI features your users can rely on.",
    "lead": "We help you find where AI genuinely helps, integrate the right models, measure quality, and keep people in control — with data privacy and cost in view from the start.",
    "whoTitle": "Products where AI should earn its place.",
    "who": [
      {
        "title": "Founders exploring an AI-first idea",
        "body": "You need to know what is feasible and reliable before building around it."
      },
      {
        "title": "Products adding AI features",
        "body": "You want automation or assistance that users trust, not a novelty."
      },
      {
        "title": "Teams with valuable data and workflows",
        "body": "You want to put your own knowledge to work safely."
      }
    ],
    "problemsTitle": "From promising demo to dependable feature.",
    "problems": [
      {
        "title": "Not sure where AI actually helps",
        "body": "We assess practical use cases against your users, data and risk, and recommend where not to use AI too."
      },
      {
        "title": "Demos that fall apart in real use",
        "body": "Evaluation datasets and quality checks measure behaviour before and after launch."
      },
      {
        "title": "Concerns about data and privacy",
        "body": "Data handling designed with privacy in mind: what is sent, what is stored, and under which vendor terms."
      },
      {
        "title": "Unpredictable cost",
        "body": "Model choice by task, caching and usage limits keep cost visible and controlled."
      }
    ],
    "deliverables": [
      {
        "title": "Use-case assessment",
        "body": "Where AI helps, where it does not, and the risks of each."
      },
      {
        "title": "Prototype with evaluation",
        "body": "A working prototype measured against a test set you agree."
      },
      {
        "title": "Production integration",
        "body": "Model calls, retrieval over your data and product UX."
      },
      {
        "title": "Human oversight flows",
        "body": "Review, approval and override where decisions matter."
      },
      {
        "title": "Monitoring",
        "body": "Quality, latency and cost tracked over time."
      },
      {
        "title": "Data handling notes",
        "body": "What data flows where, documented for your privacy review."
      }
    ],
    "process": [
      {
        "title": "Assess use cases",
        "body": "Agree the problem, the data and what good looks like."
      },
      {
        "title": "Prototype and evaluate",
        "body": "Build quickly and measure against real examples."
      },
      {
        "title": "Integrate and guard",
        "body": "Production integration with oversight, limits and fallbacks."
      },
      {
        "title": "Monitor and improve",
        "body": "Watch quality and cost, and refine with real usage."
      }
    ],
    "techTitle": "Reliable, private, and in budget.",
    "technical": [
      {
        "title": "Model integration",
        "body": "The right model for each task, behind an interface you can change later."
      },
      {
        "title": "Retrieval over your data",
        "body": "Grounding answers in your own content, with sources shown."
      },
      {
        "title": "Evaluation",
        "body": "Test sets and checks so quality is measured, not assumed."
      },
      {
        "title": "Data privacy",
        "body": "Minimizing personal data, and reviewing vendor data terms with you."
      },
      {
        "title": "Cost control",
        "body": "Caching, limits and model choice to keep spend predictable."
      },
      {
        "title": "Human oversight",
        "body": "People review and approve where the stakes are high."
      }
    ],
    "faqs": [
      {
        "question": "Will the AI feature always be right?",
        "answer": "No AI system is right every time. We measure quality, design for mistakes, and keep people in the loop where it matters."
      },
      {
        "question": "Is our data used to train models?",
        "answer": "That depends on the providers and settings chosen. We review data handling and vendor terms with you before anything is sent."
      },
      {
        "question": "How do you keep costs under control?",
        "answer": "By choosing models per task, caching where possible, and setting usage limits and monitoring from the start."
      }
    ],
    "cta": {
      "heading": "Wondering where AI fits in your product?",
      "body": "Tell us about your users and data. We will give you an honest view of where AI helps — and where it does not."
    }
  }
};
