import { Hero } from "@/components/sections/home/hero";
import { Positioning } from "@/components/sections/home/positioning";
import { ServicesList } from "@/components/sections/home/services-list";
import { Work } from "@/components/sections/home/work";
import { Journey } from "@/components/sections/home/journey";
import { Engineering } from "@/components/sections/home/engineering";
import { Collaboration } from "@/components/sections/home/collaboration";
import { Faq } from "@/components/sections/home/faq";
import { FinalCta } from "@/components/sections/home/final-cta";

/** Homepage narrative. Header (1) and footer (11) come from the root layout. */
export default function HomePage() {
  return (
    <>
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
