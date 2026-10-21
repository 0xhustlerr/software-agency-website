import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <Section theme="dark" spacing="lg">
      <Eyebrow className="mb-6">404</Eyebrow>
      <h1 className="text-h1 max-w-[14ch]">This page isn’t here.</h1>
      <p className="text-lead mt-6 max-w-(--measure) text-ink-muted">It may have moved, or it hasn’t been published yet.</p>
      <Button href="/" variant="secondary" className="mt-10">
        Back to the homepage
      </Button>
    </Section>
  );
}
