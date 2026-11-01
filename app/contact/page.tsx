import { contactHero, formPrivacyNotice, nextSteps } from "@/content/pages/contact";
import { site } from "@/content/site";
import { href } from "@/content/routes";
import { contactConfig } from "@/lib/contact/config";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Eye, LockKeyhole, MailCheck, MessagesSquare } from "lucide-react";
import { ContactHeroArt } from "@/components/illustrations/page-hero-art";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = pageMetadata({
  title: "Contact: start a project conversation",
  description: "Tell us what you’re building — an early idea, a prototype or a launched product. A person on our team reads every inquiry and replies by email.",
  path: "/contact",
});

/** A person reads it, we reply by email, a conversation if it's a fit. */
const nextIcons = [Eye, MailCheck, MessagesSquare];

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
      <PageHero full size="display" eyebrow={contactHero.eyebrow} title={contactHero.title} lead={contactHero.lead} aside={<ContactHeroArt />} className="pb-14 lg:pb-16" />
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
          {/* Not <aside>: a complementary landmark may not sit inside the section's region landmark. */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pl-6">
            {/* What happens next: a dark glass card with a glowing timeline, beside the light form. */}
            <div data-theme="dark" className="relative overflow-hidden rounded-[20px] border-[1.5px] border-mint-400/40 bg-linear-to-b from-[#1c2940] to-[#111a2a] p-6 shadow-[0_0_60px_-20px_rgb(109_225_210/0.6),0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-7">
              <span aria-hidden className="absolute -top-20 -right-20 size-60 rounded-full bg-mint-400/15 blur-[50px]" />
              <h2 id="next-h" className="text-h4 relative">
                What happens next
              </h2>
              <ol className="relative mt-6 grid gap-6">
                <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-[2px] bg-linear-to-b from-mint-400 to-[#b794f6]/40" />
                {nextSteps.map((s, i) => {
                  const Icon = nextIcons[i % nextIcons.length];
                  return (
                    <li key={s.title} className="relative flex items-start gap-4">
                      <span aria-hidden className="relative grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-mint-400 to-[#3fa7c9] text-navy-900 shadow-[0_0_0_5px_#152034,0_0_20px_rgb(109_225_210/0.6)]">
                        <Icon className="size-5" strokeWidth={2.25} />
                      </span>
                      <p className="text-body-sm pt-1">
                        <b className="block font-display text-[1.0625rem] font-semibold text-ink">{s.title}</b>
                        <span className="text-ink-muted">{s.body}</span>
                      </p>
                    </li>
                  );
                })}
              </ol>
              {site.contactEmail ? (
                <div className="relative mt-7 border-t border-white/10 pt-5">
                  <p className="text-label">Prefer email?</p>
                  <a href={`mailto:${site.contactEmail}`} className="text-body-sm mt-1.5 inline-block text-mint-400 underline underline-offset-4">
                    {site.contactEmail}
                  </a>
                </div>
              ) : null}
            </div>
            <div className="mt-4 flex items-start gap-3.5 rounded-[16px] border border-line bg-surface p-5">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent-soft text-accent-ink">
                <LockKeyhole className="size-[18px]" strokeWidth={2.25} />
              </span>
              <div>
                <h3 className="text-label">Your information</h3>
                <p className="text-small mt-1 text-ink-muted">{formPrivacyNotice}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
