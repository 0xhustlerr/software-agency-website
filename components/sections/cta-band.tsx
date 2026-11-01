import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { emailHref, projectStartHref, site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

interface CtaBandProps {
  heading: string;
  body: string;
  cta?: string;
  id?: string;
}

/** Shared dark closing call to action for inner pages. */
export function CtaBand({ heading, body, cta = "Start a Project", id = "cta" }: CtaBandProps) {
  return (
    <Section id={id} theme="dark" spacing="lg" aria-labelledby={`${id}-heading`} className="relative overflow-hidden">
      {/* The studio's portal, glowing behind the closing line: your next step starts here. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 right-[-8%] size-[620px] -translate-y-1/2 rounded-full bg-mint-400/[0.12] blur-[110px]" />
        <div className="absolute bottom-[-30%] left-[15%] size-[460px] rounded-full bg-[#7c6cf0]/[0.10] blur-[110px]" />
        <div className="absolute top-1/2 right-[6%] hidden size-[380px] -translate-y-1/2 [perspective:900px] lg:block">
          <div className="relative size-full [transform-style:preserve-3d] [transform:rotateY(58deg)]">
            {[
              { inset: "0%", dur: "16s", dir: "normal", cls: "border-t-transparent border-l-transparent border-mint-400/70" },
              { inset: "13%", dur: "11s", dir: "reverse", cls: "border-b-transparent border-mint-400/50" },
              { inset: "26%", dur: "7s", dir: "normal", cls: "border-r-transparent border-[#3fa7c9]/70" },
            ].map((r) => (
              <div
                key={r.inset}
                className={`nm-spin absolute rounded-full border-[3px] shadow-[0_0_24px_rgb(109_225_210/0.35)] ${r.cls}`}
                style={{ inset: r.inset, "--dur": r.dur, "--dir": r.dir } as CSSProperties}
              />
            ))}
          </div>
          <div className="nm-core absolute inset-[38%] rounded-full blur-[10px]" style={{ background: "radial-gradient(circle, #ffffff, var(--accent) 40%, transparent 70%)" }} />
        </div>
      </div>
      {/* Two or three lines, not four: inner pages close firmly without competing with the homepage's final CTA. */}
      <Reveal>
        <h2 id={`${id}-heading`} className="text-display relative max-w-[18ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.0] text-balance">
          {heading}
        </h2>
      </Reveal>
      <div className="relative mt-10 grid grid-cols-1 gap-8 border-t border-mint-400/30 pt-8 lg:grid-cols-12 lg:gap-6">
        <p className="text-lead text-ink-muted lg:col-span-6">{body}</p>
        <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8 lg:items-end">
          {projectStartHref ? (
            <Button href={projectStartHref} arrow className="h-14 px-8 text-base">
              {cta}
            </Button>
          ) : null}
          {emailHref ? (
            <p className="text-body-sm text-ink-muted">
              Prefer email?{" "}
              <a href={emailHref} className="group inline-flex items-center gap-1.5 rounded-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                {site.contactEmail}
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
