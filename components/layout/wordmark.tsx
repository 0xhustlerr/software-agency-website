import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The name, linking home. `icon` adds the supplied NM logo icon before it (navigation bar only). */
export function Wordmark({ className, icon }: { className?: string; icon?: boolean }) {
  return (
    <Link
      href="/"
      // Vertical padding (cancelled by negative margin) gives a ≥24px touch target without moving the layout.
      className={cn("-my-2 inline-flex items-center gap-2.5 py-2 font-display text-[1.25rem] leading-none font-bold tracking-[-0.03em] text-ink rounded-xs", className)}
    >
      {icon ? <Image src="/brand/nm-icon.png" alt="" width={40} height={40} priority className="size-10 shrink-0" /> : null}
      Nexus Morrow
    </Link>
  );
}
