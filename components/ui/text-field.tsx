import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "id" | "className">;
type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className">;

type TextFieldProps = {
  id: string;
  label: string;
  hint?: string;
  /** Replaces the hint and marks the field invalid. */
  error?: string;
  optional?: boolean;
  className?: string;
} & ({ multiline?: false } & InputProps | { multiline: true } & TextareaProps);

const control =
  "w-full rounded-sm border border-line-strong bg-surface-raised px-4 py-[11px] font-sans text-base leading-6 text-ink placeholder:text-ink-muted transition-colors duration-200 hover:border-ink-muted focus:border-ink focus-visible:focus-ring aria-invalid:border-danger";

/** Labelled input or textarea for the contact form. */
export function TextField(props: TextFieldProps) {
  const { id, label, hint, error, optional, className } = props;
  const hintId = hint || error ? `${id}-hint` : undefined;
  const shared = { id, "aria-invalid": error ? true : undefined, "aria-describedby": hintId };

  let field;
  if (props.multiline) {
    const { id: _i, label: _l, hint: _h, error: _e, optional: _o, className: _c, multiline: _m, ...rest } = props;
    field = <textarea {...shared} {...rest} className={cn(control, "min-h-33 resize-y")} />;
  } else {
    const { id: _i, label: _l, hint: _h, error: _e, optional: _o, className: _c, multiline: _m, ...rest } = props;
    field = <input {...shared} {...rest} className={control} />;
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-label text-ink">
        {label}
        {optional ? <span className="font-normal text-ink-muted"> (optional)</span> : null}
      </label>
      {field}
      {hintId ? (
        <p id={hintId} className={cn("text-small", error ? "text-danger" : "text-ink-muted")}>
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}
