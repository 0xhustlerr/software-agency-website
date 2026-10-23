"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analyticsEnabled, track } from "@/lib/analytics";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

/**
 * Loads Plausible and tracks link clicks by destination, so CTAs need no
 * per-button wiring: links to /contact are `cta_click`, links to a service
 * page are `service_click`. Renders nothing unless analytics is configured.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || a.origin !== window.location.origin) return;
      const label = (a.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
      const from = window.location.pathname;
      if (a.pathname === "/contact") track("cta_click", { label, from });
      else if (a.pathname.startsWith("/services/")) track("service_click", { service: a.pathname.slice(10), from });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!analyticsEnabled) return null;
  return (
    <>
      {/* Queue events fired before the script loads. */}
      <Script id="plausible-queue" strategy="afterInteractive">
        {"window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}"}
      </Script>
      <Script src={src} data-domain={domain} strategy="afterInteractive" />
    </>
  );
}
