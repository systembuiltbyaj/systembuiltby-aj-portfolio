# Three Live Apps on /real-apps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Next App In Build" placeholder with the Onboarding Client Hub, add a tech stack row to every card, and swap the section heading for a hook.

**Architecture:** Two tasks. The asset conversion stands alone. The `AppCard` type change and the card data must land together — making `image`, `href`, and `cta` required breaks `real-apps-content.tsx` until its data is updated in the same commit, so splitting them would leave the build red between tasks.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, framer-motion, sharp 0.34.5 (already installed).

**Spec:** `docs/superpowers/specs/2026-08-09-real-apps-three-live-apps-design.md`

## Global Constraints

- **No new dependencies.** `sharp` 0.34.5 is already present via Next.js. Do not install anything.
- **Brand invariants:** violet `#5e17eb` (`persian`), gold `#f6cb1f` (`yellow`), bg `#08060e`. Inter only. Do not introduce new colors or fonts.
- **No test suite exists and none may be added** (a test framework would be a new dependency). Verification per task: `npm run build` passes, `npm run lint` shows no NEW problems, plus a visual check.
- **Lint baseline is exactly 18 problems (8 errors, 10 warnings)**, all pre-existing. A task is done only if the count is still 18. Do not fix the pre-existing 18.
- **Tech stack strings are exactly as specified.** Do not add Tailwind to any card — it was never verified, and this list is meant to survive a client asking about it.
- **The glass styling on `cardCls` and the sheen overlay must survive unchanged.** They were added deliberately and are not part of this change.
- **The video frame's "Coming Soon" pill stays.** Only the *card's* Coming Soon branch is removed.
- Card thumbnails render at `aspect-[3/2]`. Assets are `.webp`.
- ES modules, 2-space indent. Commit after each task. Do not push; AJ pushes.

---

### Task 1: Convert the Onboarding Client Hub screenshot

**Files:**
- Create: `scripts/convert-onboarding-thumb.mjs` (temporary, deleted in this task)
- Create: `public/real-apps/onboarding-client-hub.webp`

**Interfaces:**
- Consumes: nothing.
- Produces: the image path `/real-apps/onboarding-client-hub.webp` at 1200×800, used by Task 2.

**Source:** `~/Desktop/Onboarding Client.png`, 979×631. A light/white sign-in card floating in a large empty margin. The card occupies roughly x 250–640, y 210–475.

- [ ] **Step 1: Write the conversion script**

Create `scripts/convert-onboarding-thumb.mjs`:

```js
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const desktop = path.join(os.homedir(), "Desktop");
const outDir = "public/real-apps";
await mkdir(outDir, { recursive: true });

// Cut at exactly 3:2 so the result fills the card frame with no letterboxing.
// 480x320 centred on the sign-in card (which sits around x 250-640, y 210-475).
await sharp(path.join(desktop, "Onboarding Client.png"))
  .extract({ left: 205, top: 182, width: 480, height: 320 })
  .resize(1200, 800, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .webp({ quality: 82 })
  .toFile(path.join(outDir, "onboarding-client-hub.webp"));

console.log("done");
```

The background is white, not the site's `#08060e`, because this app is genuinely light-themed. Any rounding gap should blend into the screenshot, not frame it in black.

- [ ] **Step 2: Run the script**

Run: `node scripts/convert-onboarding-thumb.mjs`
Expected: prints `done`, no errors.

- [ ] **Step 3: Verify dimensions**

Run: `node -e "const s=require('sharp'),f=require('fs');const p='public/real-apps/onboarding-client-hub.webp';s(p).metadata().then(m=>console.log(m.width+'x'+m.height,m.format,Math.round(f.statSync(p).size/1024)+'KB'))"`

Expected: `1200x800 webp` and a size under 200KB.

- [ ] **Step 4: Visually verify the crop**

Open `public/real-apps/onboarding-client-hub.webp` with the Read tool. The whole sign-in card must be visible — the `CLIENT PORTAL` label, the `Sign in` heading, the email field, the black `Email me a sign-in link` button, and the helper text below it. Nothing clipped at any edge, and no wide empty margin.

If it is wrong, adjust the `extract` values and re-run Step 2. Keep width/height at a 3:2 ratio (e.g. 540×360, 600×400) so no letterboxing is reintroduced. Move `left`/`top` to recentre; enlarge width/height to include more surrounding area.

- [ ] **Step 5: Delete the temporary script**

```bash
rm scripts/convert-onboarding-thumb.mjs
```

Conversion is one-off, not a build step. The project keeps no dead code.

- [ ] **Step 6: Commit**

```bash
git add public/real-apps/onboarding-client-hub.webp
git commit -m "feat(real-apps): add Onboarding Client Hub screenshot asset"
```

---

### Task 2: Three live apps, tech stack chips, new hook

**Files:**
- Modify: `app/real-apps/app-card.tsx` — type, stack row, removal of the Coming Soon branch
- Modify: `app/real-apps/real-apps-content.tsx` — card data and section heading

**Interfaces:**
- Consumes: `/real-apps/onboarding-client-hub.webp` from Task 1.
- Produces: nothing consumed by later tasks.

**Why one task:** making `image`, `href`, and `cta` required in `App` breaks `real-apps-content.tsx` immediately. Both files must change in the same commit or the build is red in between.

- [ ] **Step 1: Replace app-card.tsx entirely**

Overwrite `app/real-apps/app-card.tsx` with:

```tsx
"use client";

import Image from "next/image";
import { StaggerItem } from "@/components/motion/stagger-children";

export type App = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  stack: string[];
};

// Glass shell: translucent fill + heavy backdrop blur, a 1px inset highlight
// along the top edge for the "lit glass" read, and a violet lift on hover.
const cardCls =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] " +
  "bg-white/[0.06] backdrop-blur-2xl " +
  "shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.10)] " +
  "transition-all duration-300 hover:-translate-y-[3px] hover:border-white/[0.20] hover:bg-white/[0.09] " +
  "hover:shadow-[0_16px_48px_rgba(94,23,235,0.28),inset_0_1px_0_rgba(255,255,255,0.16)]";

export function AppCard({ app }: { app: App }) {
  return (
    <StaggerItem>
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={cardCls}>
        <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-[#2a0f6a]/30">
          <Image
            src={app.image}
            alt={app.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-yellow">
            {app.category}
          </p>
          <h3 className="mb-2 text-base font-bold leading-snug text-white">
            {app.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-white/55">
            {app.description}
          </p>

          {/* Stack is supporting evidence, deliberately muted so it does not
              compete with the title or the CTA. */}
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

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-yellow transition-colors group-hover:text-yellow-dark">
            {app.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>

        {/* Sheen, brightest at the top edge, fading out by the midpoint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      </a>
    </StaggerItem>
  );
}
```

What changed and why:
- `emoji` and the optional markers are gone. Every card links somewhere and has an image, so a card that cannot be opened is no longer representable.
- The `inner` fragment is inlined. With only one branch left, the variable was indirection for nothing.
- The `<div>` fallback wrapper is gone; every card is an `<a>`.
- `cardCls` and the sheen overlay are byte-for-byte unchanged.

- [ ] **Step 2: Replace the apps array in real-apps-content.tsx**

In `app/real-apps/real-apps-content.tsx`, replace the entire `const apps: App[] = [...]` array with:

```tsx
const apps: App[] = [
  {
    title: "AI Learning Hub",
    category: "Live App",
    description:
      "A plain-English reference for AI terminology, RAG, MCP, tokens, A2A. The vocabulary and the tools under the surface, explained the way I wish someone had explained them to me.",
    image: "/real-apps/ai-learning-hub.webp",
    href: "https://ai-specialist-learning-hub.vercel.app/",
    cta: "Open Learning Hub",
    stack: ["Next.js", "Supabase", "Vercel"],
  },
  {
    title: "Onboarding Client Hub",
    category: "Live App",
    description:
      "A client portal for project onboarding. Invited clients sign in with a magic link, no passwords to manage, and track their project from one place.",
    image: "/real-apps/onboarding-client-hub.webp",
    href: "https://onboarding-client-hub.vercel.app/login",
    cta: "Open Client Portal",
    stack: ["Next.js", "Supabase", "Resend", "Vercel"],
  },
  {
    title: "Funnel Builder",
    category: "Live App",
    description:
      "Turn the 10P framework into copy-ready AI prompts for every funnel section. Pick your sections and walk away with prompts that build the whole page.",
    image: "/real-apps/funnel-builder.webp",
    href: "https://funnel-section-builder.vercel.app/",
    cta: "Open Builder",
    stack: ["Next.js", "Supabase", "Resend", "Vercel"],
  },
];
```

Order matters and was set by AJ: Learning Hub, Onboarding, Funnel Builder. Do not add Tailwind to any `stack` array.

- [ ] **Step 3: Replace the section heading**

In the same file, inside the `<ScrollReveal>` block of the apps section, replace the `Section 01` paragraph, the `<h2>`, and the subcopy paragraph with:

```tsx
            <div className="mb-8 md:mb-10">
              <h2 className="mb-2 text-2xl font-bold leading-tight text-white md:text-4xl">
                Go Try Them <span className="text-yellow">Yourself</span>
              </h2>
              <p className="max-w-xl text-[14px] leading-relaxed text-white/55 md:text-base">
                Three apps running in production right now. Real auth, real
                databases, real users. No demos, no mockups, sign up and break
                something.
              </p>
            </div>
```

The `Section 01` kicker paragraph is deleted entirely, not left empty.

- [ ] **Step 4: Verify no stale references remain**

Run: `grep -n "Section 01\|emoji\|Next App In Build\|Coming Soon" app/real-apps/*.tsx`

Expected: exactly TWO matches, both in `real-apps-content.tsx` and both inside
the video frame — the `Walkthrough Coming Soon` label above it, and the
`Coming Soon` pill inside it. Both are intentional and stay.

Any match for `Section 01`, `emoji`, or `Next App In Build` means a step above
was missed. A match for `Coming Soon` inside `app-card.tsx` means the card's
badge branch was not removed.

- [ ] **Step 5: Verify build and lint**

Run: `npm run build 2>&1 | grep -E "Compiled|error|Failed"`
Expected: `✓ Compiled successfully`.

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 6: Visual check**

Serve the build (`npm run start`) and open `http://localhost:3000/real-apps`. Confirm:

- Three cards, left to right: AI Learning Hub, Onboarding Client Hub, Funnel Builder
- The middle card's screenshot is light/white and fills its frame edge to edge
- Every card shows stack chips below its description, above the CTA
- No card shows a Coming Soon badge
- The video frame above still shows its Coming Soon pill
- The heading reads `Go Try Them Yourself` with `Yourself` in yellow, and no `SECTION 01` above it
- All three CTAs open their live apps in a new tab
- Card bottoms still align despite differing description lengths

- [ ] **Step 7: Commit**

```bash
git add app/real-apps
git commit -m "feat(real-apps): three live apps with tech stacks and a new hook"
```

---

## Final Verification

- [ ] `npm run build` passes
- [ ] `npm run lint` reports exactly 18 problems
- [ ] `git status` is clean and `scripts/convert-onboarding-thumb.mjs` no longer exists
- [ ] `/real-apps` shows three working cards in the specified order
- [ ] No `stack` array contains Tailwind
- [ ] Report to AJ for review before pushing. AJ pushes to master and verifies on Vercel.
