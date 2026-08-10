# /real-apps — three live apps, tech stacks, new hook — Design

**Date:** 2026-08-09
**Status:** Approved

## Goal

Replace the "Next App In Build" placeholder with a third real app, add a
per-card tech stack, and swap the section heading for a hook that invites
clicking rather than restating the H1.

## Scope

1. `app/real-apps/app-card.tsx` — add a tech stack row; delete the
   Coming Soon branch and the emoji fallback it depended on.
2. `app/real-apps/real-apps-content.tsx` — three real apps in a new order,
   new descriptions, new section heading, `Section 01` label removed.
3. New asset `public/real-apps/onboarding-client-hub.webp`.

Out of scope: the page H1, the video frame (its Coming Soon pill stays — that
walkthrough is still pending), the nav, and every other page.

---

## 1. Card order and content

Order is deliberate, set by AJ:

| # | Title | Category | CTA | href |
|---|---|---|---|---|
| 1 | AI Learning Hub | Live App | Open Learning Hub | `https://ai-specialist-learning-hub.vercel.app/` |
| 2 | Onboarding Client Hub | Live App | Open Client Portal | `https://onboarding-client-hub.vercel.app/login` |
| 3 | Funnel Builder | Live App | Open Builder | `https://funnel-section-builder.vercel.app/` |

Descriptions:

- **AI Learning Hub** — "A plain-English reference for AI terminology, RAG,
  MCP, tokens, A2A. The vocabulary and the tools under the surface, explained
  the way I wish someone had explained them to me."
- **Onboarding Client Hub** — "A client portal for project onboarding.
  Invited clients sign in with a magic link, no passwords to manage, and
  track their project from one place."
- **Funnel Builder** — "Turn the 10P framework into copy-ready AI prompts for
  every funnel section. Pick your sections and walk away with prompts that
  build the whole page."

## 2. Tech stacks

| App | Stack |
|---|---|
| AI Learning Hub | Next.js, Supabase, Vercel |
| Onboarding Client Hub | Next.js, Supabase, Resend, Vercel |
| Funnel Builder | Next.js, Supabase, Resend, Vercel |

How these were established, so nothing on the page is invented:

- **Verified** by inspecting the deployed sites: all three are Next.js on
  Vercel. Funnel Builder's bundle carries Supabase and Resend references.
  Onboarding Client Hub's carries lucide-react and shows magic-link sign-in.
- **Confirmed by AJ**, since server-only dependencies leave no client trace:
  Onboarding Client Hub uses Supabase + Resend; AI Learning Hub uses Supabase.

**Tailwind is deliberately omitted** from all three. It is very likely present
but was never verified, and the point of this section is that a visitor asking
about the stack gets a true answer. Add it only once confirmed.

## 3. AppCard changes

**Added** — an optional stack row between the description and the CTA:

```tsx
{app.stack.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-1.5">
    {app.stack.map((tech) => (
      <span
        key={tech}
        className="rounded-md border border-white/[0.10] bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/55"
      >
        {tech}
      </span>
    ))}
  </div>
)}
```

Muted on purpose: the stack is supporting evidence, not the headline. It must
not compete with the title or the yellow CTA.

**Removed** — the Coming Soon branch. With every card now linking somewhere,
that branch is dead code. Deleting it cascades:

- the `!app.href` conditional and its Coming Soon pill go
- the emoji fallback goes, since it existed only for that imageless state
- `image`, `href`, and `cta` stop being optional
- the component no longer needs the `<div>` variant; every card is an `<a>`

The type becomes:

```ts
export type App = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  stack: string[];
};
```

Every field required. A card that cannot be opened is no longer representable,
which is the correct constraint now that the placeholder is gone.

## 4. Section heading

`Section 01` is deleted. The heading and subcopy become:

> **Go Try Them Yourself** — with `Yourself` in `text-yellow`
>
> Three apps running in production right now. Real auth, real databases, real
> users. No demos, no mockups, sign up and break something.

The H1 already states that AJ built and runs these, so the section's job is to
convert attention into a click rather than repeat the claim.

## 5. Asset

`~/Desktop/Onboarding Client.png` (979×631) is mostly empty margin around a
centred sign-in card. Crop tight to that card at exactly 3:2, then export:

| Source | Treatment | Output |
|---|---|---|
| `~/Desktop/Onboarding Client.png` | `extract` 480×320 at left 205, top 182, then resize to 1200×800, quality 82 | `public/real-apps/onboarding-client-hub.webp` |

Target 1200×800, matching the two existing card images so the grid stays even.

The extract window is cut at exactly 3:2 so the result fills the card frame
with no letterbox bars — the same mistake caught and fixed on the first two
images. Those coordinates are a starting estimate centred on the sign-in card
(which occupies roughly x 250–640, y 210–475); verify the output visually and
adjust if the card is clipped or still swimming in margin.

The image stays light. The app genuinely is light-themed, and against two dark
violet siblings the contrast reads as a distinct product rather than an error.
Dimming it would misrepresent the app.

## 6. Verification

- `npm run build` passes.
- `npm run lint` reports no new problems against the 18-problem baseline.
- `/real-apps` shows three cards in the order Learning Hub, Onboarding, Funnel
  Builder; each opens its live app in a new tab.
- Each card shows its stack chips; no card shows a Coming Soon badge.
- The video frame above still shows its Coming Soon pill.
- `Section 01` appears nowhere on the page.
- The onboarding image fills its frame with no letterboxing.
