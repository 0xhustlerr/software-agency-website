import { showPending } from "@/lib/flags";
import { Section } from "@/components/layout/section";
import { PendingContent } from "@/components/ui/pending-content";

/**
 * Dense technical showcase: stack, architecture choices and quality practices.
 * Pending until the studio confirms what it actually commits to.
 */
export function Engineering() {
  if (!showPending) return null;
  return (
    <Section aria-label="Engineering foundations (pending)">
      <PendingContent
        kind="Section"
        title="Engineering foundations"
        field="content/home.ts → engineering"
      >
        Confirm the default stack, architecture principles and quality practices (testing, code review, CI, security) the studio commits to on every project. Shown as mono tags plus short explanations.
      </PendingContent>
    </Section>
  );
}
