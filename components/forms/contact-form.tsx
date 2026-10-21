"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useRef, type FormEvent } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import type { InquiryField, InquiryState } from "@/lib/contact/schema";
import { budgetRanges, interestedServices, projectStages, startTimeframes } from "@/content/pages/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  /** False when email delivery is not configured: the form renders disabled. */
  enabled: boolean;
  /** Development-only detail about what is missing. */
  devNotice?: string;
  /** Verified business email, if configured — offered when sending fails. */
  email?: string;
  privacyHref?: string | null;
}

const initial: InquiryState = { status: "idle" };

const inputCls =
  "w-full rounded-sm border border-line-strong bg-surface-raised px-4 font-sans text-base leading-6 text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 hover:border-ink-muted focus:border-ink focus-visible:focus-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60 aria-invalid:border-danger aria-invalid:shadow-[inset_3px_0_0_var(--danger)]";

export function ContactForm({ enabled, devNotice, email, privacyHref }: ContactFormProps) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const values = "values" in state ? state.values : {};

  // Submit through a transition instead of letting React reset the form after
  // the action: every answer (including selects and radios) stays exactly as
  // typed on errors or failures. Without JavaScript, the form still posts via `action`.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }
  const errors: Partial<Record<InquiryField, string>> = state.status === "invalid" ? state.errors : {};

  // Move focus to the outcome so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "sent") doneRef.current?.focus();
    else if (state.status === "invalid") {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      (first ?? summaryRef.current)?.focus();
    } else if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div role="status" className="nm-enter rounded-md border border-line bg-surface-raised p-6 shadow-frame sm:p-10">
        <span aria-hidden className="grid size-10 place-items-center rounded-full bg-accent text-on-accent">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className="nm-draw" style={{ ["--reveal-delay" as string]: "250ms" }} />
          </svg>
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="text-h2 mt-5 outline-none">
          Thanks — we’ve received your message.
        </h2>
        <p className="text-body mt-4 max-w-[46ch] text-ink-muted">
          It has reached our inbox. A member of the team will read it and reply by email to the address you gave us.
        </p>
        <Button href="/" variant="ghost" className="mt-6">
          Back to the homepage
        </Button>
      </div>
    );
  }

  const disabled = !enabled || pending;
  const errorCount = Object.keys(errors).length;

  const banner =
    !enabled ? (
      <div className="flex gap-3 rounded-sm border border-dashed border-line-strong bg-surface-muted px-4 py-3.5 text-sm leading-[1.4rem]">
        <div>
          <b className="block">The inquiry form isn’t available yet.</b>
          {devNotice ?? (email ? <>Please email us at <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a>.</> : "Please check back soon.")}
        </div>
      </div>
    ) : state.status === "invalid" ? (
      <div className="rounded-sm border border-danger px-4 py-3.5 text-sm leading-[1.4rem]">
        <b className="block">Please check {errorCount === 1 ? "1 field" : `${errorCount} fields`}.</b>Your other answers are kept.
      </div>
    ) : state.status === "failed" || state.status === "not-configured" ? (
      <div className="rounded-sm border border-danger px-4 py-3.5 text-sm leading-[1.4rem]">
        <b className="block">We couldn’t send your message.</b>
        Nothing you typed has been lost. Please try again{email ? <>, or email us at <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a></> : null}.
      </div>
    ) : state.status === "rate-limited" ? (
      <div className="rounded-sm border border-danger px-4 py-3.5 text-sm leading-[1.4rem]">
        <b className="block">Too many messages in a short time.</b>
        Please wait a few minutes and try again{email ? <>, or email us at <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a></> : null}. Your message is still here.
      </div>
    ) : null;

  const err = (f: InquiryField) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="text-small flex items-start gap-1.5 text-danger">
        <CircleAlert aria-hidden className="mt-[3px] size-3.5 shrink-0" strokeWidth={2} />
        <span>{errors[f]}</span>
      </p>
    ) : null;

  const choice = (name: "stage" | "service", legend: string, options: readonly string[]) => (
    <fieldset className="sm:col-span-2" disabled={disabled}>
      <legend className="text-label mb-2">
        {legend} <span className="font-normal text-ink-muted">(optional)</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="relative">
            <input type="radio" name={name} value={o} defaultChecked={values[name] === o} className="peer absolute inset-0 cursor-pointer opacity-0" />
            <span className="inline-flex h-10 items-center rounded-sm border border-line-strong px-3.5 text-sm font-medium text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-surface peer-focus-visible:focus-ring peer-disabled:opacity-60">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate aria-labelledby={id("title")} className="rounded-md border border-line bg-surface-raised p-6 shadow-frame sm:p-10">
      <h2 id={id("title")} className="text-h3">
        Project inquiry
      </h2>
      <p className="text-small mt-2 text-ink-muted">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required. Everything else is optional.
      </p>

      <div ref={summaryRef} tabIndex={-1} role={banner && enabled ? "alert" : "note"} className="mt-6 outline-none empty:hidden">
        {banner}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={id("name")} className="text-label">
            Full name <span aria-hidden className="font-normal text-ink-muted">*</span>
          </label>
          <input id={id("name")} name="name" type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" required defaultValue={values.name} disabled={disabled} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? id("name-err") : undefined} className={cn(inputCls, "h-12")} />
          {err("name")}
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("email")} className="text-label">
            Work email <span aria-hidden className="font-normal text-ink-muted">*</span>
          </label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" required placeholder="you@company.com" defaultValue={values.email} disabled={disabled} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? id("email-err") : undefined} className={cn(inputCls, "h-12")} />
          {err("email")}
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor={id("company")} className="text-label">
            Company or startup name <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input id={id("company")} name="company" type="text" autoComplete="organization" enterKeyHint="next" defaultValue={values.company} disabled={disabled} aria-invalid={errors.company ? true : undefined} className={cn(inputCls, "h-12")} />
          {err("company")}
        </div>
        {choice("stage", "Project stage", projectStages)}
        {choice("service", "Interested service", interestedServices)}
        <div className="grid gap-2">
          <label htmlFor={id("budget")} className="text-label">
            Budget range <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <select id={id("budget")} name="budget" defaultValue={values.budget ?? ""} disabled={disabled} aria-describedby={id("budget-hint")} className={cn(inputCls, "h-12 appearance-none")}>
            <option value="">Select a range</option>
            {budgetRanges.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <p id={id("budget-hint")} className="text-small text-ink-muted">
            A rough range helps us suggest the right scope.
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("start")} className="text-label">
            Desired start <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <select id={id("start")} name="start" defaultValue={values.start ?? ""} disabled={disabled} className={cn(inputCls, "h-12 appearance-none")}>
            <option value="">Select a timeframe</option>
            {startTimeframes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor={id("description")} className="text-label">
            Project description <span aria-hidden className="font-normal text-ink-muted">*</span>
          </label>
          <textarea
            id={id("description")}
            name="description"
            required
            rows={6}
            defaultValue={values.description}
            disabled={disabled}
            placeholder="What are you building, who is it for, and where is it today?"
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? id("description-err") : id("description-hint")}
            className={cn(inputCls, "min-h-37 resize-y py-3")}
          />
          {errors.description ? (
            err("description")
          ) : (
            <p id={id("description-hint")} className="text-small text-ink-muted">
              A few sentences is plenty. Please don’t include passwords or sensitive personal data.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-small max-w-[46ch] text-ink-muted">
          We use these details only to reply to your inquiry.
          {privacyHref ? (
            <>
              {" "}
              See our{" "}
              <Link href={privacyHref} className="text-ink underline underline-offset-[3px]">
                Privacy Policy
              </Link>
              .
            </>
          ) : null}
        </p>
        <button
          type="submit"
          disabled={disabled}
          aria-busy={pending || undefined}
          className={cn(
            "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-action px-6 text-[0.9375rem] font-semibold text-on-action transition-[background-color,transform,box-shadow] duration-200 ease-studio hover:bg-action-hover active:translate-y-px active:shadow-[inset_0_2px_0_rgb(0_0_0/0.12)] min-[420px]:w-auto",
            // Loading keeps full strength (it is working, not unavailable); only "not configured" fades.
            pending ? "cursor-progress" : "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          {pending ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send inquiry</span>
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" strokeWidth={1.75} />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {pending ? "Sending your message" : ""}
      </p>
    </form>
  );
}
