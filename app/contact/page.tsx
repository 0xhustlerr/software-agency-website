import { contactHero, formPrivacyNotice, nextSteps } from "@/content/pages/contact";
import { site } from "@/content/site";
import { href } from "@/content/routes";
import { contactConfig } from "@/lib/contact/config";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Tell us what you’re building. Whether you have an early idea, a prototype, or an existing product, we’d love to understand what you’re working on.",
  path: "/contact",
});

export default function ContactPage() {
  const cfg = contactConfig();
  const isDev = process.env.NODE_ENV !== "production";
  if (!cfg.configured) {
    // Launch blocker: inquiries cannot be delivered. Logged at build/render so it is never silent.
    console.warn(`[contact] Form disabled — missing ${cfg.missing.join(", ")}. See README → Contact form.`);
  }
  const privacyHref = href("privacy");

  return (
    <>
      <PageHero size="display" eyebrow={contactHero.eyebrow} title={contactHero.title} lead={contactHero.lead} className="pb-14 lg:pb-16" />
      <Section tone="muted" aria-label="Contact form" className="lg:pt-16">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <ContactForm
              enabled={cfg.configured}
              devNotice={
                !cfg.configured && isDev
                  ? `Development: email delivery isn’t configured. Set ${cfg.missing.join(", ")} in .env.local (see README). This is a launch blocker.`
                  : undefined
              }
              email={site.contactEmail || undefined}
              privacyHref={privacyHref}
            />
          </div>
          <aside aria-labelledby="next-h" className="lg:col-span-4 lg:col-start-9">
            <h2 id="next-h" className="text-h4">
              What happens next
            </h2>
            <ol className="mt-4">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="relative border-t border-line py-4 pl-12">
                  <span aria-hidden className="text-mono absolute top-[18px] left-0 text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body-sm">
                    <b className="font-semibold">{s.title}</b> <span className="text-ink-muted">{s.body}</span>
                  </p>
                </li>
              ))}
            </ol>
            {site.contactEmail ? (
              <div className="mt-10 border-t border-line pt-6">
                <p className="text-label">Prefer email?</p>
                <a href={`mailto:${site.contactEmail}`} className="text-body-sm mt-1.5 inline-block underline underline-offset-4">
                  {site.contactEmail}
                </a>
              </div>
            ) : null}
            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-label">Your information</h3>
              <p className="text-small mt-1.5 text-ink-muted">{formPrivacyNotice}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
