import type { Project } from "./types";

/**
 * Case studies. Add a project with status "draft" while it is being written;
 * switch to "approved" only with client sign-off (clientApproved: true) and
 * verified outcomes. Images go in public/work/<slug>/. Approved projects appear
 * on the homepage, /work, related service pages and /work/<slug>.
 */
export const projects: Project[] = [];

export const approvedProjects = projects.filter((p) => p.status === "approved" && p.clientApproved);
