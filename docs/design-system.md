# Nexus Morrow — design specification

The full system (tokens, brand book, component guidelines, live previews) lives in the Nexus Morrow Design System artifact. This file is the in-repo summary and maps it to code. If the two disagree, update both.

## Creative direction

**Concept: connected to the future.** *Nexus* is connection and collaboration; *Morrow* is tomorrow and forward movement. The site is a hybrid of enterprise clarity and editorial confidence: large, tightly tracked headlines, an architectural 12-column grid, generous whitespace, and a single mint accent used sparingly.

The reaction to earn: *"This company understands startups, has strong technical taste, and looks like a serious engineering partner."*

**Avoid:** glowing gradients, glassmorphism, robots/AI brains/3D cubes, stock photos, grids of icon cards, carousels, crowded heroes, unexplained superlatives.

## Messaging

One line, used everywhere:

- Eyebrow: *From first idea to first users*
- Headline: *Your idea deserves great engineering.*
- Lead: *We partner with ambitious founders to design, build, and launch software products that are ready for the real world.*
- CTAs: **Discuss Your Product** (primary) · **Explore Our Expertise** (secondary)

Voice: professional but approachable, concrete, "we" and "you". Every claim is followed by how. Banned: *innovative, cutting-edge, revolutionary, synergy, world-class, seamless*, exclamation marks, emoji.

## Trust rules

Nexus Morrow is new. Never render client logos, testimonials, results, awards, headcounts, years in business, certifications, team photos or launches that have not been supplied and approved.

- Interface visuals go inside `IllustrativeFrame`, which always shows **Illustrative concept**.
- Missing evidence is a `PendingContent` slot — visible in development, removed in production (`lib/flags.ts`).
- Evidence lists in `content/site.ts → trust` start empty. A route without approved content is omitted from navigation (`content/navigation.ts`) and the sitemap.

## Colour

~70% light, ~30% dark. The hero and final CTA are always dark; one dark statement may sit mid-page.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface` | #FFFFFF | #101827 | Section ground |
| `surface-muted` | #F5F7FA | #172133 | Alternate light sections |
| `surface-raised` | #FFFFFF | #25344B | Cards, frames, inputs |
| `surface-inverse` | #101827 | #F5F7FA | Opposite-coloured block |
| `line` | #E4E9F0 | #2E3E57 | Hairlines (decorative) |
| `line-strong` | #7A879B | #7586A0 | Control borders (≥3:1) |
| `ink` | #101827 | #F5F7FA | Headings, body |
| `ink-muted` | #586579 | #CBD5E1 | Supporting copy |
| `accent` | #6DE1D2 | #6DE1D2 | Mint fills and lines only |
| `accent-ink` | #0A7266 | #6DE1D2 | Mint as text: eyebrows, links, focus |
| `action` / `on-action` | #101827 / #FFF | #6DE1D2 / #101827 | Primary button |
| `danger` | #B42318 | #FDA29B | Validation, with a written message |

Mint on white is 1.6:1, so it is never text on light grounds — use `accent-ink`.

**Implementation:** tokens are CSS custom properties in `app/globals.css`, exposed to Tailwind via `@theme inline` (`bg-surface`, `text-ink-muted`, `border-line`, `bg-action`…). Dark sections set `data-theme="dark"` (`<Section theme="dark">`) and every token flips; never hard-code navy.

## Typography

Space Grotesk (display, headings, eyebrow) and Inter (reading), self-hosted variable fonts via `next/font/local` in `app/fonts.ts`; system monospace for index numbers and tags.

| Utility | Size (desktop) | Leading | Tracking |
| --- | --- | --- | --- |
| `text-display` | clamp(3.5rem, 6.5vw, 7rem) | 1.0 | −0.045em |
| `text-h1` | clamp(2.75rem, 5vw, 4.5rem) | 1.02 | −0.04em |
| `text-h2` | clamp(2.25rem, 3.6vw, 3rem) | 1.05 | −0.035em |
| `text-h3` | 28px | 1.15 | −0.02em |
| `text-h4` | 20px | 1.25 | −0.01em |
| `text-eyebrow` | 12px uppercase | 16px | +0.14em |
| `text-lead` | 21px (18px mobile) | 32px | −0.01em |
| `text-body` | 17px (16px mobile) | 28px | — |
| `text-body-sm` · `text-label` · `text-small` · `text-mono` | 15 · 14 · 13 · 13px | | |

`text-display` is for the homepage hero only. Running text stops at `max-w-(--measure)` (68ch).

## Layout

- `container-site`: 1280px content, gutters 20 / 40 / 56px.
- `grid-site`: 4 / 8 / 12 columns, 24px gap.
- `section-y`: 72 / 88 / 128px; `section-y-lg` (hero, statements, final CTA): 80 / 96 / 144px.
- Asymmetry by default (heading 1–7, copy 8–12). Don't repeat a layout in consecutive sections. Rules over boxes.
- Radii: 2px tags, 4px buttons/inputs, 8px cards/frames; round only for nodes. One shadow: `shadow-frame`.

## Motif and motion

The motif is thin orthogonal lines joining small nodes, moving right and down, with the destination node filled mint. It does a job wherever it appears: the hero's blueprint grid running under the transparent header, connectors inside the hero composition, the process rail, the current-page marker in the nav (a short line arriving at a 4px node), and the final CTA path that lands on "Start a Project". `NodeGrid` remains for other pages. Once per viewport, never as filler pattern.

Motion is CSS first; content never waits for JavaScript.

| Kind | Where | Timing |
| --- | --- | --- |
| Entrance (`Reveal mode="enter"`, `.nm-enter`, `.nm-line`) | Hero, inner-page headings | Pure CSS at first paint. Hero: eyebrow 0 → headline lines 120/200/280 → lead 460 → actions 580 → capabilities 680; composition 360–740, connectors draw at 1000ms |
| Scroll reveal (`Reveal`, `[data-reveal]`) | Everything below the fold | 600ms rise (14px, 8px on phones) + fade, 60–80ms stagger, once. Hidden only after `html.js` is set; `RevealController` (one IntersectionObserver) reveals in view |
| Scroll-linked | Process rail | Fill and stage state follow page position; never pins or captures scrolling |
| Hover | Rows, buttons, frames | 150–300ms colour/background; arrows +3–4px; row divider draws 450ms; project images 1.02 inside a fixed clip |

Only `transform` and `opacity` animate (plus paint-only colours). The header never changes height. No parallax stacks, loops, carousels or autoplay video.

Fallbacks: without JavaScript nothing is hidden; if the app fails to start, the inline script in `app/layout.tsx` removes `html.js` after 3s so every reveal shows; `prefers-reduced-motion` and print render the final state.

Header: sticky, one fixed height (`--header-h`, 64/72px). Over a page that opens on a dark section it starts transparent (the section slides under it via `:has()` in `globals.css`) and turns solid navy at 94% with blur, hairline and shadow after 8px of scroll.

Focus: `focus-ring` (2px ground-colour gap + 2px `accent-ink`) on every interactive element.

## Page architecture

| Route | Status |
| --- | --- |
| `/` | Published — full homepage |
| `/services` | Published — overview, additional capabilities, engagement stages, FAQ |
| `/services/[slug]` | Published for the four core services (`detailPublished` in `content/services.ts`); other slugs 404 |
| `/work` | Published — concept work clearly labelled, "taking shape" until an approved case study exists |
| `/work/[slug]` | Renders only approved case studies with client sign-off; returns 404 until then |
| `/about` | Published — mission, philosophy, values, collaboration. Team section hidden while `team` is empty |
| `/insights`, `/insights/[slug]` | Hidden (404 in production, absent from nav and sitemap) until the first article is approved |
| `/contact` | Published — Resend-backed inquiry form; renders disabled until email delivery is configured |
| `/privacy` | Draft. 404 and absent from the footer until `privacyPolicy.approved` is true in `content/legal.ts` |

All inner-page links go through `content/routes.ts` (`href()`, `isPublished()`). `proxy.ts` rewrites unknown `/services/*` and `/work/*` slugs to a real 404.

Homepage order: Header (sticky, dark) → Hero (dark, product concept composition) → Positioning (white) → Services (off-white, interactive rows) → Selected work (white; labelled concept + "taking shape" until real work is approved) → Journey (off-white, scroll-linked timeline) → Engineering (dark) → How we work together (white) → FAQ (off-white) → Final CTA (dark) → Footer (white).

## Code structure

```
app/                 routes, layout, fonts, globals.css (tokens), sitemap, robots
components/layout/   SiteHeader, MobileNav, SiteFooter, Section, Container, Wordmark,
                     PageHero, Breadcrumbs (with JSON-LD), PageSkeleton
components/sections/ page sections (home/…, pages/…, insights/…), CtaBand
components/forms/    ContactForm (client; server action in app/contact/actions.ts)
components/ui/       Button, Eyebrow, SectionHeading, ServiceRow, ProcessRail, Accordion,
                     IllustrativeFrame, PendingContent, TextField, NodeGrid, Tag
components/illustrations/  DOM/SVG product concepts (Relay), service vignettes,
                     architecture diagram, collaboration board — all labelled
components/motion/   Reveal, ScaledCanvas, MotionProvider (reduced motion)
hooks/               usePrefersReducedMotion (hydration-safe)
content/             typed copy and data (types.ts, routes, site, navigation, services,
                     process, home, concepts, projects, faqs, legal, service-details,
                     pages/…); insights/*.md for articles
lib/                 cn(), flags, metadata, format, insights (Markdown loader),
                     contact/ (schema, config, rate limit, Resend delivery)
```

Server Components by default; client components only for the header (scroll state, active section), mobile menu (Radix Dialog), services showcase, hero pointer motion, journey progress, FAQ accordion, scroll reveals, work and insights filters, and the contact form.
