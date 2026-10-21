import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    body: "Understand the idea, users, goals, and constraints.",
    outcome: "A prioritized scope, key risks and a realistic plan.",
  },
  {
    title: "Design",
    body: "Define the experience, prioritize features, and validate direction.",
    outcome: "Validated flows and a clickable prototype to test with users.",
  },
  {
    title: "Develop",
    body: "Build the product in focused, collaborative iterations.",
    outcome: "Working software, reviewed with you at the end of every iteration.",
  },
  {
    title: "Launch & Evolve",
    body: "Release, learn from users, and improve the product.",
    outcome: "A live product, with usage feeding the next priorities.",
  },
];
