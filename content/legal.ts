/**
 * Privacy policy status. The /privacy page is an implementation draft: it is
 * visible only in development (and previews with NEXT_PUBLIC_SHOW_PENDING)
 * until the text is completed and approved, then set approved: true.
 */
export const privacyPolicy = {
  approved: false,
  /** ISO date of approval, shown as "Last updated". */
  approvedAt: "",
  legalEntity: "",
  jurisdiction: "",
  registeredAddress: "",
  privacyEmail: "",
  hostingProvider: "",
  retentionPeriod: "",
};
