# System Built by AJ — Portfolio (systembuiltbyaj.com)

Personal portfolio / lead-gen site for an automation builder. Dark-mode only.

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
- Font: **Inter only** (headings + body), loaded via next/font in app/layout.tsx.
- Signature effects: `.glow-border` (violet→gold), `.cta-glow`. Radius base 0.625rem.
- Tokens live in `tailwind.config.ts` + `app/globals.css` (`@theme inline` + `:root`/`.dark`).

## Tech stack
Next.js 16 (App Router, root-level `app/` — no `src/`), React 19, Tailwind v4, shadcn/ui,
TypeScript, framer-motion, lucide-react. Deploy: Vercel.

## Commands
`npm run dev` · `npm run build` · `npm run lint`   (no test suite)

## Where things live
- `app/[route]/page.tsx` → delegates to a co-located `*-content.tsx` client component
- `components/sections/` → page sections   ·   `components/ui/` → shadcn primitives
- `components/layout/` → navbar, footer   ·   `components/motion/` → framer helpers
- `components/interactive/` → embedded tools (ROI/revenue/audit widgets)   ·   `components/chat/` → chat bubble   ·   `components/intro/` → name-reveal intro
- Page copy is INLINED in `*-content.tsx` and section files (no `content/` folder)

## Homepage sections (order) — components/sections/
Hero → TechStack → IntroVideo → Vault → Philosophy → FeaturedBuilds → Testimonials
→ WorkflowScreens → AutomationFlows → Services → FAQ → FinalCTA
Other pages: /about /services /packages /system-builds /projects /portfolio /mentors
/consult /tools/*  (plus dev-only preview routes: /preview /intro-preview /pulse-preview /slides-preview)

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
