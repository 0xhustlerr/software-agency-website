import type { ProductConcept } from "./types";

/**
 * Product concepts, shown on the homepage and /work only while no client case
 * study is approved. Each is labelled as a concept; none is client work.
 * Images go in public/concepts/.
 */
export const productConcepts: ProductConcept[] = [
  {
    slug: "adaline",
    name: "Adaline",
    category: "LLMOps platform",
    tagline: "Never stop learning",
    problem:
      "Teams building with LLMs scatter prompts across code, docs, and provider dashboards, so nobody knows which version is live or whether a change made it worse.",
    approach:
      "One workspace to iterate on prompts, test them against evaluations, deploy versions safely, and monitor how they behave in production.",
    demonstrates:
      "Provider-agnostic prompt management, automated evaluations, versioned deployments with rollbacks, and live monitoring for AI agents.",
    tags: ["LLMOps", "Prompt management", "AI evaluation", "Observability", "Python", "TypeScript", "LLM APIs"],
    image: {
      src: "/concepts/adaline.png",
      alt: "Adaline concept: a marketing page for a self-improving AI agent platform above a dark documentation view with an evaluation overview showing success rate, average improvement and recent agent activity.",
      width: 1536,
      height: 1024,
    },
  },
  {
    slug: "qovery",
    name: "Qovery",
    category: "Internal developer platform",
    tagline: "Build. Deploy. Scale. Without the complexity",
    problem: "Developers wait on DevOps to ship, while small teams can’t afford to build and run their own Kubernetes platform.",
    approach:
      "A self-service layer that provisions infrastructure and deploys apps in the team’s own cloud account, with a Heroku-like experience.",
    demonstrates:
      "Kubernetes abstraction across AWS, GCP, and Azure, ephemeral preview environments, built-in observability, and infrastructure AI agents can operate safely.",
    tags: ["Internal developer platform", "DevOps automation", "Kubernetes", "Ephemeral environments", "Go", "Terraform", "AWS"],
    image: {
      src: "/concepts/qovery.png",
      alt: "Qovery concept: a desktop landing page with a live infrastructure monitoring dashboard, beside a phone showing tiered pricing plans.",
      width: 1672,
      height: 940,
    },
  },
  {
    slug: "cofounder",
    name: "Cofounder",
    category: "AI business operations",
    tagline: "Run your company with AI",
    problem:
      "Solo and early-stage founders drown in operations like sales, marketing, and finance, leaving little time for the product itself.",
    approach:
      "An AI cofounder that sets priorities and dispatches specialized agents to handle each business function, while the founder keeps ownership.",
    demonstrates:
      "Multi-agent orchestration, task delegation across departments, and an “AI company operating system” for startups and small businesses.",
    tags: ["AI agents", "Agent orchestration", "Founder tools", "Business operations", "Next.js", "Node.js", "PostgreSQL"],
    image: {
      src: "/concepts/cofounder.png",
      alt: "Cofounder concept: a landing page for running a company with AI agents, with a task-progress panel and a single monthly pricing plan.",
      width: 1536,
      height: 1024,
    },
  },
];
