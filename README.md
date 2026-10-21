# nexusmorrow.com

The website for Nexus Morrow, a product engineering studio for startup founders.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict), Tailwind CSS 4, Motion for React, Lucide icons, Radix primitives, zod, and Resend for email delivery.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node.js 20.9 or newer.

## Pages

| Route | State |
| --- | --- |
| `/` | Published |
| `/services` and `/services/{mvp-development,custom-software,saas-development,ai-development}` | Published |
| `/work` | Published (concept work, labelled as such) |
| `/work/[slug]` | 404 until a case study is approved with client sign-off |
| `/about` | Published (team section hidden until profiles are approved) |
| `/contact` | Published; the form is disabled until email delivery is configured |
| `/insights`, `/insights/[slug]` | 404 until the first article is approved |
| `/privacy` | 404 until the policy is approved |

## Where things live

- **Design rules:** [`docs/design-system.md`](docs/design-system.md). Tokens are in `app/globals.css`.
- **Copy and data:** `content/`. Edit text there, not in components. Inner-page copy is in `content/pages/` and `content/service-details.ts`.
- **Sections:** `components/sections/`. The homepage order is in `app/page.tsx`.

## Contact form (launch blocker)

The form posts to a server action (`app/contact/actions.ts`), which validates input with zod, checks a hidden honeypot field, applies a rate limit, and sends the inquiry through the [Resend](https://resend.com) API. It reports success only when Resend accepts the message. Answers are kept on every error.

Set these server-side environment variables (never prefix them with `NEXT_PUBLIC_`):

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from Resend |
| `CONTACT_TO_EMAIL` | The inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `Nexus Morrow <hello@your-verified-domain>` |

If any of them is missing, the form renders disabled with a notice, and the server action refuses to accept submissions. Nothing is silently discarded.

The rate limiter (5 messages per 10 minutes per IP) is in memory. That works on a single server. On serverless or multi-instance hosting, each instance keeps its own count, so swap `lib/contact/rate-limit.ts` for a shared store (for example Upstash Redis) before relying on it.

## Insights

Articles are Markdown files in `content/insights/`. Copy `_template.md`, fill in the front matter, and write the body. A post is published only when `status: approved`; drafts never render in production. See `content/insights/README.md`.

Insights appears in the navigation, footer and sitemap automatically once one article is approved.

## Privacy policy

The draft is in `app/privacy/page.tsx`, with its variables in `content/legal.ts`. It needs legal review. Fill in the entity, jurisdiction, address, privacy email, hosting provider and retention period, then set `approved: true` and `approvedAt`. The page and footer link appear after that.

## Content rules

Nexus Morrow does not publish evidence it doesn't have. Client logos, testimonials, metrics, team profiles and case studies stay empty in `content/` until they are real and approved.

During development, missing content appears as dashed "awaiting content" slots, and draft pages (Insights, Privacy) can be previewed. Production builds hide all of that. To show it on a preview deployment, set `NEXT_PUBLIC_SHOW_PENDING=true`.

A page or nav item is only published once its content is complete:

- **Service detail pages:** `detailPublished: true` in `content/services.ts`
- **Case studies:** `status: "approved"` plus `clientApproved: true` in `content/projects.ts`
- **Insights:** `status: approved` in the article's front matter
- **Team:** entries in `team` in `content/pages/about.ts`
- **Privacy:** `approved: true` in `content/legal.ts`
