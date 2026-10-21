import Link from "next/link";
import { cn } from "@/lib/utils";

/** Plain-type wordmark until a supplied logo exists. Do not draw a symbol. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em] text-ink rounded-xs", className)}
    >
      Nexus Morrow
    </Link>
  );
}
