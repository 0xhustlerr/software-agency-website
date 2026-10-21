"use server";

import { headers } from "next/headers";
import { inquirySchema, type InquiryField, type InquiryState } from "@/lib/contact/schema";
import { contactConfig } from "@/lib/contact/config";
import { allowRequest } from "@/lib/contact/rate-limit";
import { deliverInquiry } from "@/lib/contact/deliver";

const FIELDS = ["name", "email", "company", "stage", "service", "budget", "start", "description"] as const;

/**
 * Handles a contact form submission. Reports success only after Resend has
 * accepted the message; every other outcome keeps the visitor's input so
 * nothing they typed is lost.
 */
export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")]));

  // Honeypot: a hidden field people never see. Bots that fill it get a plain failure.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "failed", values };
  }

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<InquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "invalid", errors, values };
  }

  if (!contactConfig().configured) return { status: "not-configured", values };

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "unknown").trim();
  if (!allowRequest(ip, Date.now())) return { status: "rate-limited", values };

  const ok = await deliverInquiry(parsed.data);
  return ok ? { status: "sent" } : { status: "failed", values };
}
