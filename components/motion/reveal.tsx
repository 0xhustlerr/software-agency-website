"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds. Use 0.06–0.08 steps when staggering siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * Rise-and-fade on first scroll into view. Same markup on server and client;
 * under reduced motion MotionProvider drops the rise and keeps a short fade.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Tag = as === "li" ? m.li : m.div;
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
