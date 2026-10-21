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

`NodeGrid`: faint grid, one orthogonal connector moving right and down, ending in a filled mint node. Once per viewport, decorative only.

Motion (Motion for React, `components/motion/reveal.tsx`): 14px rise + fade, 550ms, `cubic-bezier(0.2, 0.7, 0.2, 1)`, 60–80ms stagger, once. Hover moves arrows 3px. No parallax, loops or carousels. `prefers-reduced-motion` shows the end state.

Focus: `focus-ring` (2px ground-colour gap + 2px `accent-ink`) on every interactive element.

## Page architecture

| Route | Status |
| --- | --- |
| `/` | Built — full homepage |
| `/services`, `/services/[slug]` | Next. Until published, links fall back to `/#services` |
| `/work`, `/work/[slug]` | Until a case study is approved (with client sign-off), links fall back to `/#work` |
| `/about` | Until published, links fall back to `/#approach` |
| `/insights`, `/insights/[slug]` | Hidden from navigation until the first article is approved |
| `/contact` | Until published, links fall back to `/#contact` (final CTA) |
| `/privacy` | Footer link appears once the policy is written and the page is published |

All inner-page links go through `content/routes.ts`; flip `published` when a page ships.

Homepage order: Header (sticky, dark) → Hero (dark, product concept composition) → Positioning (white) → Services (off-white, interactive rows) → Selected work (white; labelled concept + "taking shape" until real work is approved) → Journey (off-white, scroll-linked timeline) → Engineering (dark) → How we work together (white) → FAQ (off-white) → Final CTA (dark) → Footer (white).

## Code structure

```
app/                 routes, layout, fonts, globals.css (tokens), sitemap, robots
components/layout/   SiteHeader, MobileNav, SiteFooter, Section, Container, Wordmark
components/sections/ page sections (home/…)
components/ui/       Button, Eyebrow, SectionHeading, ServiceRow, ProcessRail, Accordion,
                     IllustrativeFrame, PendingContent, TextField, NodeGrid, Tag
components/illustrations/  DOM/SVG product concepts (Relay), service vignettes,
                     architecture diagram, collaboration board — all labelled
components/motion/   Reveal, ScaledCanvas, MotionProvider (reduced motion)
hooks/               usePrefersReducedMotion (hydration-safe)
content/             typed copy and data (types.ts, routes, site, navigation, services,
                     process, home, concepts, projects, faqs, insights)
lib/                 cn(), flags
```

Server Components by default; client components only for the header (scroll state, active section), mobile menu (Radix Dialog), services showcase, hero pointer motion, journey progress, FAQ accordion and scroll reveals.
