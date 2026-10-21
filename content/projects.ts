import type { Project } from "./types";

/**
 * Case studies. Add a project with status "draft" while it is being written;
 * switch to "approved" only with client sign-off and verifiable outcomes.
 * /work stays out of navigation until at least one project is approved.
 */
export const projects: Project[] = [];

export const approvedProjects = projects.filter((p) => p.status === "approved" && p.clientApproved);
