import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { primaryCta, site } from "@/content/site";
import { Container } from "./container";
import { Wordmark } from "./wordmark";

/** Light footer beneath the dark final CTA. Lists only published destinations. */
export function SiteFooter() {
  const year = 2026; // TODO: derive at build once a copyright policy is set.
  return (
    <footer data-theme="light" className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-20">
        <div className="lg:col-span-5">
          <Wordmark />
          <p className="text-body-sm mt-4 max-w-sm text-ink-muted">
            A product engineering studio helping founders turn ideas into thoughtfully designed, reliable software.
          </p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <p className="text-h4 mb-4 text-[1rem]">Studio</p>
          <ul className="grid gap-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body-sm rounded-xs text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="text-h4 mb-4 text-[1rem]">Start</p>
          <ul className="grid gap-3">
            <li>
              <Link href={primaryCta.href} className="text-body-sm rounded-xs text-ink-muted hover:text-ink">
                {primaryCta.label}
              </Link>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-body-sm rounded-xs text-ink-muted hover:text-ink" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:justify-between">
        <p className="text-small text-ink-muted">
          © {year} {site.legalName}
        </p>
        <p className="text-small text-ink-muted">Interface images on this site are illustrative concepts.</p>
      </Container>
    </footer>
  );
}
