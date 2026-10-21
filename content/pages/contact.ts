/** /contact copy and form options, as approved on the design canvas. */

export const contactHero = {
  eyebrow: "Contact",
  title: "Tell us what you’re building.",
  lead: "Whether you have an early idea, a prototype, or an existing product, we’d love to understand what you’re working on.",
};

export const projectStages = ["Idea", "Prototype", "MVP", "Launched Product"] as const;
export const interestedServices = ["MVP", "Custom Software", "SaaS", "AI", "Not Sure"] as const;
export const budgetRanges = ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K–$100K", "$100K+", "Prefer to discuss"] as const;
export const startTimeframes = ["As soon as possible", "Within a month", "In 1–3 months", "In 3+ months", "Not sure yet"] as const;

export const nextSteps = [
  { title: "A person reads it.", body: "Every inquiry goes to our team’s inbox, not an automated sequence." },
  { title: "We reply by email.", body: "Usually with a few questions, or a suggested next step." },
  { title: "A conversation, if it’s a fit.", body: "We’ll talk through goals, constraints and how we’d approach it." },
];

/** Privacy notice shown beside the form; matches what the form actually collects and where it goes. */
export const formPrivacyNotice =
  "We collect only what you enter here, use it to respond to your inquiry, and send it through our email provider. We don’t add you to a mailing list.";
