import type { ClientLogo, Metric, Testimonial } from "./types";

export const site = {
  name: "Nexus Morrow",
  url: "https://nexusmorrow.com",
  /** Default meta description. */
  description:
    "Nexus Morrow partners with startup founders to design, build, and launch software products that are ready for the real world.",
  /**
   * TODO(content): add the inbox for new product conversations. While empty,
   * "Discuss Your Product" links to the final call-to-action section.
   */
  contactEmail: "",
  /** TODO(content): add profiles once they exist, e.g. { label: "LinkedIn", href: "…" }. */
  social: [] as { label: string; href: string }[],
  /** Legal entity name for the footer. TODO(content): confirm. */
  legalName: "Nexus Morrow",
} as const;

/**
 * Trust evidence. Every list stays empty until the material is real and
 * approved for publication. Components render nothing for an empty list.
 */
export const trust: {
  clientLogos: ClientLogo[];
  testimonials: Testimonial[];
  metrics: Metric[];
} = {
  clientLogos: [],
  testimonials: [],
  metrics: [],
};

export const primaryCta = {
  label: "Discuss Your Product",
  href: site.contactEmail
    ? `mailto:${site.contactEmail}?subject=${encodeURIComponent("New product conversation")}`
    : "/#contact",
};

export const secondaryCta = {
  label: "Explore Our Expertise",
  href: "/#services",
};
