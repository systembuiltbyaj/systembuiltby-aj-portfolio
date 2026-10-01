# System Built by AJ — Portfolio (workwithaj.ajautomate.co)

Personal portfolio / lead-gen site for an automation builder. Dark by default: v1 and the
other pages are dark-only, but v2 (the live site) also has a light-mode toggle, so style
v2 work for both themes.

## Update workflow (read this first)
When updating a section, I'll usually share a reference site or screenshot to copy the
DESIGN/LAYOUT from.
- Replicate the reference's layout, spacing, and structure — design only.
- KEEP our brand fixed: colors, typography, and existing copy. Never adopt the reference's
  brand, fonts, or text.
- Brainstorm the approach before building (superpowers:brainstorming), then verify on the
  dev server before committing.

## Brand invariants — never change without being asked
- Violet `#5e17eb` (persian), gold `#f6cb1f` (yellow), near-black bg `#08060e`.
- Font: **Inter** for headings + body, loaded via next/font in app/layout.tsx. One approved
  exception: Dancing Script for the "Hello, I'm" accent (`hero.tsx`, v2 `HomeSection`). No others.
- Signature effects: `.glow-border` (violet→gold), `.cta-glow`. Radius base 0.625rem.
- Tokens live in `tailwind.config.ts` + `app/globals.css` (`@theme inline` + `:root`/`.dark`).

## Tech stack
Next.js 16 (App Router, root-level `app/` — no `src/`), React 19, Tailwind v4, shadcn/ui,
TypeScript, framer-motion, lucide-react. Deploy: Vercel.

## Commands
`npm run dev` · `npm run build` · `npm run lint`
No test suite, by design: changes are verified by typecheck + lint on changed files + build +
a dev-server check. This overrides the global "unit test every service function" rule here.

## Where things live
- `app/[route]/page.tsx` → delegates to a co-located `*-content.tsx` client component
  (v2 routes render `V2Content` instead; see below)
- `components/sections/` → page sections   ·   `components/ui/` → shadcn primitives
- `components/layout/` → navbar, footer   ·   `components/motion/` → framer helpers
- `components/interactive/` → embedded tools (ROI/revenue/audit widgets)   ·   `components/chat/` → chat bubble   ·   `components/intro/` → name-reveal intro
- Page copy is INLINED in `*-content.tsx` and section files (no `content/` folder)
- `lib/` → site-version flag, SEO data (`structured-data.ts`), utils   ·   `components/seo/` → JSON-LD tag
- `scripts/` → Playwright capture + image-optimize tools   ·   `docs/superpowers/` → specs and plans
- `audits/` → dated os-audit reports   ·   `Pictures/` → source PNGs, not served
- `public/_originals/` → gitignored, local-only source images and archived assets

## Homepage sections (order) — components/sections/
Hero → TechStack → IntroVideo → Vault → Philosophy → FeaturedBuilds → ClientFunnels
→ Testimonials → WorkflowScreens → AutomationFlows → Services → FAQ → FinalCTA
(That's v1, served at /v1. "/" serves v2 by default — see `lib/site-version.ts`.)

## v2 routes
Each v2 rail section is a real, server-rendered route: / /live-system/[[...path]]
/real-result /services /credentials /testimonials /about /contact. Each page.tsx
renders `<V2Content initial=… />` with its own metadata; in-app navigation swaps
panels via pushState (no reload). Section URLs live in `SECTIONS` (app/v2/v2-shell.tsx).
Old `/#section` links are upgraded client-side.
Other pages (v1 design): /packages /system-builds /projects /portfolio /mentors /real-apps
/consult /tools/*  (plus noindexed dev-only previews: /preview /intro-preview /pulse-preview /slides-preview)

## AEO/GEO (AI search visibility)
Canonical origin is `SITE_URL` in `lib/structured-data.ts` (also holds the JSON-LD).
When adding or removing a public route, update `app/sitemap.ts` and `public/llms.txt`.
The certification count (43) is hand-typed in `app/credentials/page.tsx`, `public/llms.txt`
and the About stats in `app/v2/v2-sections.tsx`; the badge data in
`components/sections/certificates-explorer.tsx` is the source of truth, so update all three with it.

## Related app (separate repo)
The Funnel Section Builder was extracted out of this portfolio into its own
full-stack app (repo `funnel-section-builder`, deployed at
funnel-section-builder.vercel.app; Next.js + Supabase auth/DB). The portfolio
only links to it now (nav "MVP" + /tools cards). There is no `/tools/private`
route or `public/private/` here anymore.

## Deploy
Commit + push to `master`; AJ verifies on Vercel. Verify on the dev server before committing.

## Deeper build discipline
For non-trivial builds, read `docs/build-discipline.md` (on-demand, not loaded every session).
