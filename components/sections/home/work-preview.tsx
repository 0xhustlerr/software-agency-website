import { approvedProjects } from "@/content/projects";
import { showPending } from "@/lib/flags";
import { Section } from "@/components/layout/section";
import { PendingContent } from "@/components/ui/pending-content";

/** Renders only once a case study is approved. */
export function WorkPreview() {
  if (approvedProjects.length === 0) {
    if (!showPending) return null;
    return (
      <Section tone="muted" aria-label="Selected work (pending)">
        <PendingContent kind="Case study" title="Selected work" field='content/projects.ts → status: "approved"'>
          Add an approved case study with real outcomes and client sign-off. Until then this section and /work stay hidden.
        </PendingContent>
      </Section>
    );
  }
  // TODO(build): image-led case-study feature once the first project is approved.
  return null;
}
