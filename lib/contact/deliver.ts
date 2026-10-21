import "server-only";
import type { Inquiry } from "./schema";
import { contactConfig } from "./config";

/** Sends the inquiry to the verified inbox via Resend. Resolves true only when Resend accepted the message. */
export async function deliverInquiry(inq: Inquiry): Promise<boolean> {
  const cfg = contactConfig();
  if (!cfg.configured) return false;
  const lines = [
    `Name: ${inq.name}`,
    `Email: ${inq.email}`,
    `Company: ${inq.company ?? "—"}`,
    `Project stage: ${inq.stage ?? "—"}`,
    `Interested service: ${inq.service ?? "—"}`,
    `Budget range: ${inq.budget ?? "—"}`,
    `Desired start: ${inq.start ?? "—"}`,
    "",
    "Project description:",
    inq.description,
  ];
  try {
    // RESEND_API_BASE exists only so tests can point at a local mock.
    const base = process.env.RESEND_API_BASE?.trim() || "https://api.resend.com";
    const res = await fetch(`${base}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: cfg.from,
        to: [cfg.to],
        reply_to: inq.email,
        subject: `New project inquiry — ${inq.name}${inq.company ? ` (${inq.company})` : ""}`,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      // Log status only — never the API key or the visitor's message.
      console.error(`[contact] Resend rejected the message: HTTP ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend request failed:", err instanceof Error ? err.name : "unknown error");
    return false;
  }
}
