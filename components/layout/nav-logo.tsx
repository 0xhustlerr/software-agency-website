import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * The navigation-bar logo: the brand's own artwork, all white (the M with its
 * orbit, and "Nexus Morrow" beside it), from public/brand/nexus-morrow-logo.png.
 * The file is 1169 × 209; width and height below keep that ratio at 40px tall.
 */
export function NavLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Nexus Morrow, home" className={cn("-my-1 inline-flex items-center rounded-xs py-1", className)}>
      <Image
        src="/brand/nexus-morrow-logo.png"
        alt=""
        width={224}
        height={40}
        // In the header on every page, so load it straight away rather than lazily.
        loading="eager"
        className="h-8.5 w-auto lg:h-10"
      />
    </Link>
  );
}
