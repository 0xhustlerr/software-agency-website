/**
 * Privacy-conscious event tracking. Events go to Plausible (cookieless) only
 * when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set at build time; otherwise every call
 * is a no-op and nothing leaves the browser.
 *
 * Never pass form contents, emails, names or free text typed by a visitor.
 */
export type AnalyticsEvent =
  /** A link to the contact page (every "Let's Talk" / "Discuss Your Product" / "Start a Project"). */
  | "cta_click"
  /** A link to a service detail page. */
  | "service_click"
  /** An FAQ question opened. */
  | "faq_open"
  /** The inquiry form was submitted (before validation). */
  | "inquiry_submit"
  /** The server confirmed the inquiry was delivered. */
  | "inquiry_sent"
  /** Submission did not go through; `reason` is the outcome status only. */
  | "inquiry_error";

type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Props }) => void) & { q?: unknown[] };
  }
}

export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);

export function track(event: AnalyticsEvent, props?: Props) {
  if (!analyticsEnabled || typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
