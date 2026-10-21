import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/types";
import { cn } from "@/lib/utils";
import { Tag } from "./tag";

interface ServiceRowProps {
  service: Service;
  href?: string;
  headingLevel?: "h3" | "h4";
}

/** One line of the horizontal service list. Links only when its detail page is published. */
export function ServiceRow({ service, href, headingLevel: H = "h3" }: ServiceRowProps) {
  const complementary = service.tier === "complementary";
  const inner = (
    <>
      <span className={cn("text-mono text-ink-muted", complementary ? "pt-0.5" : "pt-2")}>{service.index}</span>
      <H
        className={cn(
          "transition-colors duration-200",
          complementary ? "text-h4" : "text-h3",
          href && "group-hover:text-accent-ink",
        )}
      >
        {service.title}
      </H>
      <div className="col-start-2 mt-3 sm:col-start-3 sm:row-start-1 sm:mt-0">
        <p className={cn("text-ink-muted", complementary ? "text-body-sm" : "text-body")}>{service.summary}</p>
        {service.tags.length && !complementary ? (
          <ul aria-label="Includes" className="mt-4 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <span aria-hidden className={cn("hidden justify-self-end sm:col-start-4 sm:row-start-1 sm:block", complementary ? "pt-1" : "pt-2")}>
        {href ? <ArrowRight className="size-4 transition-transform duration-200 ease-studio group-hover:translate-x-[3px]" strokeWidth={1.75} /> : null}
      </span>
    </>
  );
  const cls = cn(
    "group grid items-start gap-x-4 border-t border-line sm:gap-x-6",
    "grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,6fr)_1.5rem]",
    complementary ? "py-6" : "py-8",
  );
  return href ? (
    <Link href={href} className={cn(cls, "rounded-xs")}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
