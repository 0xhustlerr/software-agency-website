import type { Service } from "./types";

/** Order matters: the four core capabilities first, then the two complementary services. */
export const services: Service[] = [
  {
    slug: "mvp-development",
    index: "01",
    title: "MVP Development",
    tier: "core",
    benefit: "Turn your idea into a focused, testable first product.",
    summary:
      "Define, design, build, and launch a focused first version — scoped to test what matters most with real users.",
    tags: ["Scoping", "Product design", "Build", "Launch"],
    detailPublished: true,
  },
  {
    slug: "custom-software",
    index: "02",
    title: "Custom Software",
    tier: "core",
    benefit: "Build software around your workflows and business goals.",
    summary:
      "Bespoke web applications and software platforms shaped around how your business actually works.",
    tags: ["Web applications", "Platforms", "Integrations"],
    detailPublished: true,
  },
  {
    slug: "saas-development",
    index: "03",
    title: "SaaS Platforms",
    tier: "core",
    benefit: "Create scalable platforms designed for recurring users and growth.",
    summary:
      "Multi-user platforms with subscriptions, dashboards, and the integrations your customers expect.",
    tags: ["Accounts and roles", "Subscriptions", "Dashboards", "Integrations"],
    detailPublished: true,
  },
  {
    slug: "ai-development",
    index: "04",
    title: "AI-Powered Products",
    tier: "core",
    benefit: "Integrate intelligent capabilities into useful applications.",
    summary:
      "AI-powered applications, automation, and intelligent workflows built into products people already use.",
    tags: ["AI features", "Automation", "Workflows"],
    detailPublished: true,
  },
  {
    slug: "product-design",
    index: "05",
    title: "Product Design and Prototyping",
    tier: "complementary",
    benefit: "Shape the experience before it is built.",
    summary: "UX and UI, workflows, wireframes, and interactive prototypes you can put in front of users.",
    tags: [],
    detailPublished: false,
  },
  {
    slug: "product-scaling",
    index: "06",
    title: "Product Scaling and Engineering Support",
    tier: "complementary",
    benefit: "Keep a growing product fast, stable, and moving.",
    summary: "Architecture improvement, integrations, cloud infrastructure, and ongoing product iteration.",
    tags: [],
    detailPublished: false,
  },
];

export const coreServices = services.filter((s) => s.tier === "core");
export const complementaryServices = services.filter((s) => s.tier === "complementary");

export function serviceHref(service: Service): string | undefined {
  return service.detailPublished ? `/services/${service.slug}` : undefined;
}
