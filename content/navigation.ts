import type { NavItem } from "./types";
import { href } from "./routes";
import { services } from "./services";
import { faqs } from "./faqs";
import { projectStartHref, emailHref } from "./site";

function item(label: string, to: string | null, sectionId?: string): NavItem[] {
  return to ? [{ label, href: to, sectionId }] : [];
}

/** Header links. Items without a page or a homepage section are left out (Insights until the first article). */
export const mainNav: NavItem[] = [
  ...item("Services", href("services"), "services"),
  ...item("Work", href("work"), "work"),
  ...item("About", href("about"), "approach"),
  ...item("Insights", href("insights")),
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      ...item("About", href("about")),
      ...item("Work", href("work")),
      ...item("How we work", "/#collaboration"),
      ...item("Contact", href("contact")),
    ],
  },
  {
    title: "Services",
    items: services
      .filter((s) => s.tier === "core")
      .map((s) => ({ label: s.title, href: s.detailPublished ? `/services/${s.slug}` : "/#services" })),
  },
  {
    title: "Resources",
    items: [
      ...item("Insights", href("insights")),
      ...item("Engagement stages", "/services#stages"),
      ...(faqs.length ? item("FAQ", "/#faq") : []),
    ],
  },
  {
    title: "Contact",
    items: [
      ...item("Start a project", projectStartHref ?? href("contact")),
      ...item("Email us", emailHref),
    ],
  },
];

/** Legal links only; Contact already sits in the Company column. */
export const legalNav: NavItem[] = [...item("Privacy Policy", href("privacy"))];
