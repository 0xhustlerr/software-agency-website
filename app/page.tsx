import { Hero } from "@/components/sections/home/hero";
import { Positioning } from "@/components/sections/home/positioning";
import { ServicesList } from "@/components/sections/home/services-list";
import { ProductPresentation } from "@/components/sections/home/product-presentation";
import { Process } from "@/components/sections/home/process";
import { Statement } from "@/components/sections/home/statement";
import { Engineering } from "@/components/sections/home/engineering";
import { WorkPreview } from "@/components/sections/home/work-preview";
import { Faq } from "@/components/sections/home/faq";
import { FinalCta } from "@/components/sections/home/final-cta";

/** Section order: docs/design-system.md → Homepage. Dark: hero, statement, final CTA. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesList />
      <ProductPresentation />
      <Process />
      <Statement />
      <Engineering />
      <WorkPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
