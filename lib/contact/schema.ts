import { z } from "zod";
import { budgetRanges, interestedServices, projectStages, startTimeframes } from "@/content/pages/contact";

const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess((v) => (v === "" || v == null ? undefined : v), z.enum(values).optional());

/** The contact form's typed schema — the single source of validation, run on the server. */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120, "Keep your name under 120 characters."),
  email: z.string().trim().max(254).email("Enter a work email address, like you@company.com."),
  company: z.string().trim().max(160, "Keep this under 160 characters.").optional().transform((v) => v || undefined),
  stage: optionalChoice(projectStages),
  service: optionalChoice(interestedServices),
  budget: optionalChoice(budgetRanges),
  start: optionalChoice(startTimeframes),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little about what you’re building (at least 20 characters).")
    .max(5000, "Please keep the description under 5,000 characters."),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryField = keyof Inquiry;

export type InquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<InquiryField, string>>; values: Record<string, string> }
  | { status: "sent" }
  | { status: "failed"; values: Record<string, string> }
  | { status: "rate-limited"; values: Record<string, string> }
  | { status: "not-configured"; values: Record<string, string> };
