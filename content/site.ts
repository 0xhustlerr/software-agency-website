import type { ClientLogo, Metric, Testimonial } from "./types";
import { href } from "./routes";

export const site = {
  name: "Nexus Morrow",
  url: "https://nexusmorrow.com",
  /** Default meta description (homepage, social cards, Organization structured data). */
  description:
    "Nexus Morrow is a product engineering studio for startup founders. We design, build and launch MVPs, SaaS platforms, AI products and custom software.",
  /** Short positioning line for the footer. */
  positioning: "A product engineering studio helping founders turn ambitious ideas into thoughtfully designed, reliable software.",
  /**
   * TODO(content): the verified business inbox. While empty, the
   * "Prefer email?" link stays hidden and no address is shown anywhere.
   */
  contactEmail: "",
  /** Verified profiles only, e.g. { label: "LinkedIn", href: "https://…" }. */
  social: [] as { label: string; href: string }[],
  /** TODO(content): confirm the legal entity name. */
  legalName: "Nexus Morrow",
} as const;

/** Trust evidence. Empty until real and approved; components render nothing for an empty list. */
export const trust: { clientLogos: ClientLogo[]; testimonials: Testimonial[]; metrics: Metric[] } = {
  clientLogos: [],
  testimonials: [],
  metrics: [],
};

export const emailHref = site.contactEmail
  ? `mailto:${site.contactEmail}?subject=${encodeURIComponent("New product conversation")}`
  : null;

/**
 * Where "Start a Project" goes: the /contact page once published, otherwise
 * the email address. Null means there is no working destination yet — the
 * final CTA then shows a pending notice in development and no button in
 * production (a launch blocker, see docs).
 */
export const projectStartHref: string | null = (() => {
  const contact = href("contact");
  if (contact && !contact.startsWith("/#")) return contact;
  return emailHref;
})();

/** Header "Let's Talk" and hero "Discuss Your Product" go to the contact page, or the final CTA section until it exists. */
export const talkHref = href("contact") ?? "/#contact";

export const primaryCta = { label: "Discuss Your Product", href: talkHref };
export const secondaryCta = { label: "Explore Our Expertise", href: href("services") ?? "/#services" };
