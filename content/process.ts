import type { ProcessStep } from "./types";

/** TODO(content): confirm each stage matches how engagements actually run. */
export const processSteps: ProcessStep[] = [
  { title: "Discover", body: "We pressure-test the idea, the users, and the first version worth building." },
  { title: "Design", body: "Flows, wireframes, and an interactive prototype you can show to users." },
  { title: "Build", body: "Working software in short cycles, on foundations chosen to scale." },
  { title: "Launch", body: "Production setup, analytics, and a plan for your first users." },
  { title: "Iterate", body: "Learn from real usage, then decide together what comes next." },
];
