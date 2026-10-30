import type { Project } from "./types";

/**
 * Case studies. Add a project with status "draft" while it is being written;
 * switch to "approved" only with client sign-off (clientApproved: true) and
 * verified outcomes. Images go in public/case-studies/<slug>/ (not public/work/:
 * proxy.ts answers 404 for any /work/... path that isn't a case study). Approved projects appear
 * on the homepage, /work, related service pages and /work/<slug>.
 */
export const projects: Project[] = [];

export const approvedProjects = projects.filter((p) => p.status === "approved" && p.clientApproved);
