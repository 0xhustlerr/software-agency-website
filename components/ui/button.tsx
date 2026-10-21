import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center gap-2 whitespace-nowrap font-sans font-semibold tracking-[-0.005em] transition-colors duration-200 ease-studio disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "rounded-sm bg-action text-on-action hover:bg-action-hover",
  secondary: "rounded-sm border border-line-strong text-ink hover:border-ink",
  ghost:
    "rounded-xs px-0 text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] hover:decoration-ink",
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
