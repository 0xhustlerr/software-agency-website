import "server-only";

/**
 * Email delivery configuration (server-only — never exposed to the browser).
 *   RESEND_API_KEY      API key from resend.com
 *   CONTACT_TO_EMAIL    verified business inbox that receives inquiries
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend, e.g. "Nexus Morrow <hello@nexusmorrow.com>"
 */
export function contactConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? "";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const missing = [!apiKey && "RESEND_API_KEY", !to && "CONTACT_TO_EMAIL", !from && "CONTACT_FROM_EMAIL"].filter(Boolean) as string[];
  return { configured: missing.length === 0, missing, apiKey, to, from };
}
