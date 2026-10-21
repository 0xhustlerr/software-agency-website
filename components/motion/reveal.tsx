"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds. Use 0.06–0.08 steps when staggering siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Rise-and-fade on first scroll into view. Reduced motion renders the end state. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </Tag>
  );
}
