import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { privacyPolicy as p } from "@/content/legal";
import { showPending } from "@/lib/flags";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export const metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description: "What personal information Nexus Morrow collects through this website, why, and the choices you have.",
    path: "/privacy",
  }),
  // Never index the unapproved draft.
  robots: p.approved ? undefined : { index: false, follow: false },
};

/** A value from content/legal.ts, or a clearly marked field to complete. */
function F({ v, label }: { v: string; label: string }) {
  return v ? (
    <>{v}</>
  ) : (
    <span className="rounded-xs border border-dashed border-line-strong bg-surface-muted px-1.5 font-mono text-[0.875em] text-ink-muted">[{label}]</span>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="font-display mt-12 text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.02em]">{children}</h2>;
}

/**
 * Privacy policy implementation draft. Unpublished until the text is
 * completed and reviewed: 404 in production while privacyPolicy.approved is false.
 */
export default function PrivacyPage() {
  if (!p.approved && !showPending) notFound();
  const entity = <F v={p.legalEntity} label="LEGAL ENTITY NAME" />;
  const email = <F v={p.privacyEmail} label="PRIVACY CONTACT EMAIL" />;

  return (
    <>
      {!p.approved ? (
        <div role="note" className="border-b border-dashed border-line-strong bg-surface-muted">
          <Container className="flex flex-wrap items-center justify-between gap-2 py-3 text-[0.8125rem]">
            <span>
              <b>Draft — not published.</b> Implementation draft for legal review. Bracketed fields must be completed; nothing here is final legal language.
            </span>
            <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">Requires approval</span>
          </Container>
        </div>
      ) : null}
      <PageHero eyebrow="Legal" title="Privacy Policy" className="pb-14 lg:pb-16">
        <p className="text-body mt-5 text-ink-muted">
          Last updated: {p.approvedAt ? <time dateTime={p.approvedAt}>{formatDate(p.approvedAt)}</time> : <F v="" label="DATE OF APPROVAL" />}
        </p>
      </PageHero>
      <Section className="lg:pt-16">
        <div className="text-body max-w-[760px] [&_li]:mt-2 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          <p className="text-lead">
            This policy explains what personal information {entity} (“Nexus Morrow”, “we”) collects through nexusmorrow.com, why, and the choices you have.
          </p>
          <H>1. Who we are</H>
          <p>
            The website is operated by {entity}, registered in <F v={p.jurisdiction} label="JURISDICTION" />, at <F v={p.registeredAddress} label="REGISTERED BUSINESS ADDRESS" />. For privacy questions, contact {email}.
          </p>
          <H>2. Information we collect</H>
          <p>We collect only what you choose to send us through the contact form:</p>
          <ul>
            <li>Required: your full name, work email address, and a description of your project.</li>
            <li>Optional: company or startup name, project stage, the service you’re interested in, a budget range, and a desired start timeframe.</li>
          </ul>
          <p>
            We ask you not to include passwords or sensitive personal data in your message. <F v="" label="CONFIRM: no analytics or advertising cookies are used — or list the tools and cookies here" />
          </p>
          <p>
            Our hosting provider, <F v={p.hostingProvider} label="HOSTING PROVIDER" />, processes technical data such as IP addresses to deliver and secure the site. The contact form uses your IP address briefly, in memory, to limit repeated submissions and prevent spam.
          </p>
          <H>3. How we use it</H>
          <ul>
            <li>To read and respond to your inquiry, and to discuss a potential project with you.</li>
            <li>To protect the form against spam and abuse.</li>
          </ul>
          <p>
            We do not sell your information, and we do not add you to a mailing list. <F v="" label="LEGAL BASIS FOR UK/EU VISITORS — to be confirmed by counsel" />
          </p>
          <H>4. Who we share it with</H>
          <p>
            Form submissions are delivered to our inbox by our email provider, Resend, acting on our behalf. Our site is hosted by <F v={p.hostingProvider} label="HOSTING PROVIDER" />. We share information with other parties only where required by law. <F v="" label="LIST ANY OTHER PROCESSORS" />
          </p>
          <H>5. International transfers</H>
          <p>
            <F v="" label="DESCRIBE WHERE DATA IS PROCESSED AND THE TRANSFER SAFEGUARDS RELIED ON — to be confirmed by counsel" />
          </p>
          <H>6. How long we keep it</H>
          <p>
            We keep inquiries for <F v={p.retentionPeriod} label="RETENTION PERIOD" /> after our last contact with you, unless we enter into a project together, in which case our project agreement applies.
          </p>
          <H>7. Your rights</H>
          <p>
            Depending on where you live, you may have the right to access, correct, delete or object to the use of your personal information. To make a request, contact {email}.{" "}
            <F v="" label="REVIEW WITH COUNSEL: UK GDPR, Canada (PIPEDA and provincial law), and applicable US state laws such as California’s CCPA/CPRA" />
          </p>
          <H>8. Security</H>
          <p>We use reasonable technical and organizational measures to protect the information you send us, including encrypted connections. No method of transmission over the internet is completely secure.</p>
          <H>9. Changes to this policy</H>
          <p>We will post any changes on this page and update the date above.</p>
          <H>10. Contact</H>
          <p>
            {entity} · {email}
          </p>
        </div>
      </Section>
    </>
  );
}
