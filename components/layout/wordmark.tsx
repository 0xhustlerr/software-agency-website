import Link from "next/link";
import { cn } from "@/lib/utils";

/** The name in plain type, linking home (footer). The navigation bar uses NavLogo. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      // Vertical padding (cancelled by negative margin) gives a ≥24px touch target without moving the layout.
      className={cn("-my-2 inline-block py-2 font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em] text-ink rounded-xs", className)}
    >
      Nexus Morrow
    </Link>
  );
}
