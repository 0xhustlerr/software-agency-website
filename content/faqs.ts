import type { Faq } from "./types";

/**
 * Answers describe how we work, not contractual commitments. Ownership,
 * pricing and other commercial terms are set in each project agreement.
 * TODO(content): review with whoever signs the agreements.
 */
export const faqs: Faq[] = [
  {
    question: "Can you help if I only have an idea?",
    answer:
      "Yes. Many products start as a problem worth solving and a rough sense of who has it. We begin with discovery: clarifying the users, the core job the product must do, and the smallest version that would prove it is worth building. You leave that stage with a clear scope and direction.",
  },
  {
    question: "Do you build MVPs for non-technical founders?",
    answer:
      "Yes. You bring the understanding of the problem and the market; we handle product design, engineering, and the technical decisions — and explain each one in plain language so you stay in control of the product. You will always know what is being built, why, and what it means for cost and timing.",
  },
  {
    question: "How do you estimate the development timeline?",
    answer:
      "From scope, not guesswork. Once the first version is defined, we break it into features, estimate each one, and add the work around them — design, testing, infrastructure, and launch. You get a range with the assumptions behind it, and we revisit it openly as priorities change. We don't quote fixed timelines before the scope is clear.",
  },
  {
    question: "Can you continue developing the product after launch?",
    answer:
      "Yes. Launch is where real learning starts. We can keep iterating on the product based on how people use it, improve performance and reliability as usage grows, or support your own team as it takes over. The level of ongoing involvement is agreed with you.",
  },
  {
    question: "Do I own my software and source code?",
    answer:
      "Ownership of the software, source code, and related intellectual property is set out in your project agreement, and we discuss it with you before any work begins. We can work in repositories and accounts you own, so the code is never a black box.",
  },
  {
    question: "Can you collaborate with my existing technical team?",
    answer:
      "Yes. We can work alongside your engineers, add product design or specialist capability, or take ownership of a defined part of the product. We adapt to your tools and review practices, and keep decisions and code documented so your team can carry them forward.",
  },
];
