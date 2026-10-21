"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page,
 * including ones streamed in later (Suspense) or rendered after navigation.
 * Marks <html> as ready so the CSS failsafe stands down.
 */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    const scan = (node: ParentNode) => {
      node.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    };
    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches("[data-reveal]:not([data-revealed])")) io.observe(el);
          scan(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    root.classList.add("reveal-ready");
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
