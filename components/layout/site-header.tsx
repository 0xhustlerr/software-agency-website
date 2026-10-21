import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { primaryCta } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

/** Sits on the dark hero; the hero section continues directly beneath it. */
export function SiteHeader() {
  return (
    <header data-theme="dark" className="relative z-20 bg-surface">
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-22">
        <Wordmark />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-label rounded-xs text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button href={primaryCta.href} size="sm" variant="secondary" className="hidden sm:inline-flex">
            {primaryCta.label}
          </Button>
          <MobileNav items={mainNav} cta={primaryCta} />
        </div>
      </Container>
    </header>
  );
}
