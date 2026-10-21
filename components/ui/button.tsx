import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "contrast";
type Size = "md" | "sm";

/**
 * States: hover shifts colour (200ms) and nudges the arrow 3px; active presses
 * 1px; focus-visible gets the global ring; disabled drops to 40% and keeps its label.
 */
const base =
  "group inline-flex select-none items-center gap-2 whitespace-nowrap font-sans font-semibold tracking-[-0.005em] transition-[color,background-color,border-color,text-decoration-color,transform,box-shadow] duration-200 ease-studio active:translate-y-px disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "rounded-sm bg-action text-on-action hover:bg-action-hover active:shadow-[inset_0_2px_0_rgb(0_0_0/0.12)]",
  secondary: "rounded-sm border border-line-strong text-ink hover:border-ink hover:bg-ink/4 active:bg-ink/8",
  /** Ink fill — the header's "Let's Talk", so it never competes with a section's mint primary. */
  contrast: "rounded-sm bg-ink text-surface hover:bg-accent hover:text-on-accent",
  ghost:
    "rounded-xs px-0 text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] hover:decoration-ink active:translate-y-0",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow. Defaults to true for ghost buttons. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
  external?: never;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], variant === "ghost" ? "h-auto py-1 px-0" : sizes[size], className);
}

/** One primary per viewport. Labels are verb-first. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", arrow, className, children } = props;
  const showArrow = arrow ?? variant === "ghost";

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
    const Icon = external ? ArrowUpRight : ArrowRight;
    const content = (
      <>
        <span>{children}</span>
        {showArrow ? (
          <Icon aria-hidden className="size-4 shrink-0 transition-transform duration-200 ease-studio group-hover:translate-x-[3px]" strokeWidth={1.75} />
        ) : null}
      </>
    );
    const isInternal = href.startsWith("/") && !external;
    return isInternal ? (
      <Link href={href} className={classes(variant, size, className)} {...rest}>
        {content}
      </Link>
    ) : (
      <a
        href={href}
        className={classes(variant, size, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-200 ease-studio group-hover:translate-x-[3px]" strokeWidth={1.75} />
      ) : null}
    </button>
  );
}
