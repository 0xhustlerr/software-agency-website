"use client";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Root error boundary: keeps the header and footer, and offers a retry instead of a blank page. */
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <Section theme="dark" spacing="lg">
      <Eyebrow className="mb-6">Error</Eyebrow>
      <h1 className="text-h1 max-w-[16ch]">Something went wrong on our side.</h1>
      <p className="text-lead mt-6 max-w-(--measure) text-ink-muted">Please try again. If it keeps happening, come back in a few minutes.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to the homepage
        </Button>
      </div>
    </Section>
  );
}
