/**
 * Pending-content slots (case studies, testimonials, unwritten sections) render
 * only outside production, so editors can see what is missing without it ever
 * reaching visitors. Set NEXT_PUBLIC_SHOW_PENDING=true to show them in a
 * production preview deployment.
 */
export const showPending =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_SHOW_PENDING === "true";
