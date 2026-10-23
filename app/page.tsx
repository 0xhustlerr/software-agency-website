import type { Metadata } from "next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/home/hero";
import { Positioning } from "@/components/sections/home/positioning";
import { ServicesList } from "@/components/sections/home/services-list";
import { Work } from "@/components/sections/home/work";
import { Journey } from "@/components/sections/home/journey";
import { Engineering } from "@/components/sections/home/engineering";
import { Collaboration } from "@/components/sections/home/collaboration";
import { Faq } from "@/components/sections/home/faq";
import { FinalCta } from "@/components/sections/home/final-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Only facts the site states itself: no logo, address, ratings or founding
 * date until they exist. Profiles and email appear once set in content/site.ts.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      ...(site.contactEmail ? { email: site.contactEmail } : {}),
      ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

/** Homepage narrative. Header (1) and footer (11) come from the root layout. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <Positioning />
      <ServicesList />
      <Work />
      <Journey />
      <Engineering />
      <Collaboration />
      <Faq />
      <FinalCta />
    </>
  );
}
