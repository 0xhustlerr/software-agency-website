import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "./container";
import { Wordmark } from "./wordmark";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:/.test(href);
  // Phones: 10px vertical padding brings each link to a 44px touch target; the list gap shrinks to match.
  const cls = "text-body-sm -my-2.5 inline-block rounded-xs py-2.5 text-ink-muted transition-colors duration-200 hover:text-ink sm:my-0 sm:py-0";
  if (href.startsWith("mailto:")) return <a href={href} className={cls}>{children}</a>;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Section 11 — multi-column footer. Only working links; social and legal links appear once they exist. */
export function SiteFooter() {
  const columns = footerNav.filter((c) => c.items.length > 0);
  return (
    <footer data-theme="light" className="bg-surface">
      <Container className="grid grid-cols-1 gap-12 pt-16 pb-12 lg:grid-cols-12 lg:gap-6 lg:pt-24">
        <div className="lg:col-span-4">
          <Wordmark className="text-[1.5rem]" />
          <p className="text-body-sm mt-5 max-w-[34ch] text-ink-muted">{site.positioning}</p>
          {site.social.length ? (
            <ul className="mt-6 flex gap-4">
              {site.social.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-eyebrow mb-4 text-ink">{col.title}</h2>
              <ul className="grid gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      {/* The rule sits on an inner element so it aligns with the content edge, not the gutters. */}
      <Container>
        <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-muted">
            © <CopyrightYear /> {site.legalName}. Interface visuals on this site are illustrative concepts.
          </p>
          {legalNav.length ? (
            <ul className="flex gap-5">
              {legalNav.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
