"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Motion setup for the whole site:
 * - LazyMotion + `m` components (from "motion/react-m"); the DOM animation
 *   features load asynchronously after first paint.
 * - Reduced motion follows the OS setting: transforms are skipped, fades stay.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
