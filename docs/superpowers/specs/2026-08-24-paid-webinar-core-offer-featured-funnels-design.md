# Paid Webinar and Core Offer — Featured Funnel Cards

**Date:** 2026-08-24
**Status:** Approved

## Goal

Add the newly completed Paid Webinar and Core Offer funnels to the featured
Premium Client Funnels section on `/projects`, using the section's existing
card and preview-gallery behavior without changing its design.

## Content

| Card | Subtitle | Live URL |
|---|---|---|
| Paid Webinar | Amazon VA Breakthrough | `https://www.amaze.ph/02-asva` |
| Core Offer | ASVA Advanced Program | `https://www.amaze.ph/02-asva-core-offer` |

Both cards are live client builds and belong in `coachingFunnels`, which feeds
the highlighted Premium Client Funnels grid.

## Assets

Use the four supplied images in each Desktop folder:

- `C:\Users\AMD\Desktop\Paid Webinar\A. Paid Webinar.png` through `D. Paid Webinar.png`
- `C:\Users\AMD\Desktop\Core Offer\A. Core Offer.png` through `D. Core Offer.png`

Create optimized WebP copies in `public/mockups/`, following the existing
lowercase hyphenated naming convention. Preserve A → B → C → D gallery order.
Use each `D` image as the card thumbnail because it is already 16:9 and matches
the other featured-funnel composite thumbnails.

The Desktop originals must not be modified.

## Implementation

Extend the existing `coachingFunnels` data in
`app/projects/projects-content.tsx`. Do not introduce a new component, card
variant, dependency, or visual treatment. Each card uses the current
`FunnelCard`, opens the existing mockup gallery, and exposes the existing live
build action.

Keep the current responsive grid, spacing, violet/gold/near-black palette,
Inter typography, glow border, and motion behavior unchanged.

## Verification

- `/projects` shows both new cards inside Premium Client Funnels.
- Each card uses its D composite as the thumbnail.
- Each gallery shows A, B, C, and D in order.
- Each live-build action opens the supplied URL in a new tab.
- Existing funnel cards and the ordinary Types of Funnels section are unchanged.
- Type-check, lint, and production build are run and results reported.
- A local `/projects` preview is provided for AJ's approval before any commit.

## Commit policy

Do not commit the design, assets, or implementation until AJ approves the local
preview.
