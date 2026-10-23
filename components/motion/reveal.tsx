import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Seconds. Use 0.06–0.08 steps when staggering siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
  /**
   * view  — rise and fade the first time it scrolls into view (default).
   * enter — plays once on first paint, for content above the fold (eyebrows, actions).
   * settle — like enter but never transparent, for the page's largest text (headline, lead),
   *          so Largest Contentful Paint isn't held back by the animation.
   */
  mode?: "view" | "enter" | "settle";
}

/**
 * Progressive-enhancement reveal. The markup is fully visible by default:
 * - "view" is hidden only once JavaScript has run (html.js), and RevealController
 *   reveals it on scroll. If the controller never starts, a CSS failsafe shows it.
 * - "enter" is a pure CSS animation, so it never depends on JavaScript.
 * Reduced motion and print show everything immediately. See globals.css → Reveal.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div", mode = "view" }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;
  return (
    <Tag className={cn(mode === "enter" ? "nm-enter" : mode === "settle" ? "nm-settle" : undefined, className)} data-reveal={mode === "view" ? "" : undefined} style={style}>
      {children}
    </Tag>
  );
}
