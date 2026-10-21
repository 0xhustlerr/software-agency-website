import type { NavItem } from "./types";
import { approvedProjects } from "./projects";
import { publishedInsights } from "./insights";
import { faqs } from "./faqs";

/**
 * Only destinations with complete content are listed. Until the inner pages
 * exist, items point at homepage sections; swap to routes as pages ship.
 */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Approach", href: "/#approach" },
  ...(approvedProjects.length ? [{ label: "Work", href: "/work" }] : []),
  ...(publishedInsights.length ? [{ label: "Insights", href: "/insights" }] : []),
  ...(faqs.length ? [{ label: "FAQ", href: "/#faq" }] : []),
];
