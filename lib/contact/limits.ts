/** Field length limits, shared by the server schema and the form's maxLength attributes (kept free of zod for the client bundle). */
export const inquiryLimits = { name: 120, email: 254, company: 160, description: 5000 } as const;
