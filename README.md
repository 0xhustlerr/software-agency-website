# nexusmorrow.com

The website for Nexus Morrow, a product engineering studio for startup founders.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict), Tailwind CSS 4, Motion for React, Lucide icons and Radix primitives.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node.js 20.9 or newer.

## Where things live

- **Design rules:** [`docs/design-system.md`](docs/design-system.md). Tokens are in `app/globals.css`.
- **Copy and data:** `content/`. Edit text there, not in components.
- **Sections:** `components/sections/home/`. The homepage order is in `app/page.tsx`.

## Content rules

Nexus Morrow does not publish evidence it doesn't have. Client logos, testimonials, metrics and case studies stay empty in `content/` until they are real and approved.

During development, missing content appears as dashed "awaiting content" slots. Production builds hide those slots. To show them on a preview deployment, set `NEXT_PUBLIC_SHOW_PENDING=true`.

A page or nav item is only published once its content is complete:

- **Service detail pages:** `detailPublished: true` in `content/services.ts`
- **Case studies:** `status: "approved"` plus `clientApproved: true` in `content/projects.ts`
- **Insights:** `status: "approved"` in `content/insights.ts`
