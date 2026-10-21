import { ScaledCanvas } from "@/components/motion/scaled-canvas";
import { RelayDashboard, RelayPhone, RelayWorkflow } from "./relay-concept";
import { cn } from "@/lib/utils";

/** The Relay concept laid out on a blueprint stage: dashboard, workflow card and phone. Decorative. */
export function RelayComposition({ className, tone = "dark" }: { className?: string; tone?: "dark" | "muted" }) {
  return (
    <div
      data-theme="dark"
      className={cn(
        "relative overflow-hidden rounded-md",
        tone === "muted" ? "bg-surface-muted" : "bg-surface",
        "bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:40px_40px]",
        className,
      )}
    >
      <ScaledCanvas width={760} height={580}>
        <div aria-hidden className="absolute top-[64px] left-[88px] w-[560px]">
          <RelayDashboard />
        </div>
        <div aria-hidden className="absolute top-[24px] right-[28px] w-[210px]">
          <RelayWorkflow />
        </div>
        <div aria-hidden className="absolute bottom-[24px] left-[32px] w-[150px]">
          <RelayPhone />
        </div>
      </ScaledCanvas>
    </div>
  );
}
