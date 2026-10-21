import type { Insight } from "./types";

/** /insights stays out of navigation until the first article is approved. */
export const insights: Insight[] = [];

export const publishedInsights = insights.filter((i) => i.status === "approved");
