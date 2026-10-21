"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Motion for React, used only where motion is driven by input: hero pointer
 * drift and the scroll-linked process rail. Entrances and reveals are CSS
 * (see Reveal), so content never waits on this bundle.
 * - LazyMotion + `m` components; DOM features load after first paint.
 * - Reduced motion follows the OS setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
