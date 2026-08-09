# Mobile Menu Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat mobile menu with a grouped, icon-led panel that has a profile footer, and rename Real Apps to MVP across the navs and the page copy.

**Architecture:** `mobile-menu.tsx` keeps its own nav data rather than sharing a config with the desktop dropdowns — the two navs differ in shape, content, and grouping. The About page gains a hash-to-tab deep link so the menu can point at Certificates, whose content sits behind client-side tab state rather than a routed section.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, framer-motion, lucide-react 1.7.0.

**Spec:** `docs/superpowers/specs/2026-08-09-mobile-menu-redesign-design.md`

## Global Constraints

- **No new dependencies.** `lucide-react` 1.7.0 is already installed. All 14 icons used here were verified present: Home, User, Clapperboard, Globe, LayoutGrid, Award, Layers, Package, Users, Wrench, Activity, BarChart3, ChevronRight, X.
- **Brand invariants:** violet `#5e17eb` (`persian`), gold `#f6cb1f` (`yellow`), bg `#08060e`. Inter only. Do not introduce new colors or fonts.
- **No test suite exists.** Verification per task is: `npm run build` passes, `npm run lint` shows no NEW problems, and a 390px-viewport visual check.
- **Lint baseline is 18 problems (8 errors, 10 warnings)**, all pre-existing. A task is done only if the count is still 18.
- **The route stays `/real-apps`.** Only labels and copy change. Renaming the folder or route is out of scope.
- ES modules, `async/await`, 2-space indent.
- Commit after each task. Do not push; AJ pushes.

---

### Task 1: Rename Real Apps to MVP

**Files:**
- Modify: `components/layout/navbar.tsx` — `workDropdown.label`, its first item's label, and `routeToActiveNav["/real-apps"]`
- Modify: `app/real-apps/page.tsx` — metadata title
- Modify: `app/real-apps/real-apps-content.tsx` — kicker and section h2

**Interfaces:**
- Consumes: nothing.
- Produces: the label `"MVP"`, which Task 3's mobile menu reuses for the same destination.

- [ ] **Step 1: Rename the desktop dropdown label and its first item**

In `components/layout/navbar.tsx`, in the `workDropdown` object:

Change `label: "Real Apps",` to:

```js
  label: "MVP",
```

Change the first item's label from `"All Real Apps"` to:

```js
    { label: "All MVPs", emoji: "\u{1F5C2}", href: "/real-apps", description: "Every app I've shipped" },
```

Leave the Funnel Builder and AI Learning Hub items untouched.

- [ ] **Step 2: Update the active-nav map**

In the same file, in `routeToActiveNav`, change the `/real-apps` entry to:

```js
  "/real-apps": "MVP",
```

This value is compared against `workDropdown.label` to decide which nav item highlights. If Step 1 and Step 2 disagree, the nav silently stops highlighting on that page — they must match exactly.

- [ ] **Step 3: Update the page metadata title**

In `app/real-apps/page.tsx`, change the metadata title:

```tsx
export const metadata: Metadata = {
  title: "MVP",
  description:
    "Full-stack apps I built, shipped, and run, not automations or templates. Sign up and try them.",
};
```

- [ ] **Step 4: Update the page copy**

In `app/real-apps/real-apps-content.tsx`, change the kicker text from `Real Apps, Not Demos` to:

```tsx
              MVPs, Not Demos
```

And change the section heading from `Live <span className="text-yellow">Apps</span>` to:

```tsx
                Live <span className="text-yellow">MVPs</span>
```

Leave the H1 (`Products I Built, Shipped, And Actually Run.`) unchanged — it never said "Real Apps".

- [ ] **Step 5: Verify only the expected occurrence remains**

Run: `grep -rn "Real Apps" app components --include=*.tsx`

Expected: **exactly one match**, `components/layout/mobile-menu.tsx:22`. That
line is replaced wholesale in Task 3, so it is correct for it to still be
there at this point. Any other match was missed in Steps 1–4 and must be
fixed before committing.

Before this task there were six matches: two in `app/real-apps/`, three in
`navbar.tsx`, and the one in `mobile-menu.tsx`.

- [ ] **Step 6: Verify build and lint**

Run: `npm run build 2>&1 | grep -E "Compiled|error|Failed"`
Expected: `✓ Compiled successfully`.

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 7: Commit**

```bash
git add components/layout/navbar.tsx app/real-apps
git commit -m "refactor(nav): rename Real Apps to MVP across nav and page copy"
```

---

### Task 2: Deep-link the About page's Certificates tab

**Files:**
- Modify: `app/about/about-content.tsx:3` (react import), and the `AboutContent` component's state block

**Interfaces:**
- Consumes: nothing.
- Produces: the URL `/about#badges`, which Task 3's menu links to.

**Why this is needed:** `AboutContent` renders its three panels from `useState`, not from routed sections. The Badge & Certificates content is absent from the DOM unless `tab === "badges"`, so a plain anchor would scroll to nothing.

- [ ] **Step 1: Add useEffect to the react import**

`app/about/about-content.tsx` line 3 currently reads `import { useState } from "react";`. Change it to:

```tsx
import { useEffect, useState } from "react";
```

- [ ] **Step 2: Read the hash on mount**

In the `AboutContent` component, directly below the existing `const [tab, setTab] = useState<"about" | "mentors" | "badges">("about");` line, add:

```tsx
  // The panels are tab state, not routed sections, so a deep link has to
  // select the tab rather than scroll to an anchor.
  useEffect(() => {
    if (window.location.hash === "#badges") setTab("badges");
  }, []);
```

Use `useEffect` rather than `useSearchParams` deliberately: `useSearchParams` forces a Suspense boundary around this statically rendered page. Reading the hash needs no boundary, and falls back to the default `"about"` tab when the hash is absent or unrecognised.

- [ ] **Step 3: Verify build and lint**

Run: `npm run build 2>&1 | grep -E "Compiled|error|Failed"`
Expected: `✓ Compiled successfully`.

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 4: Verify the deep link works**

Start the server: `npm run start` (the build from Step 3 is current).

Open `http://localhost:3000/about#badges`. Expected: the page loads with the **Badge & Certificates** tab already selected and its content visible — not the About tab.

Open `http://localhost:3000/about`. Expected: the About tab is selected, unchanged from before.

- [ ] **Step 5: Commit**

```bash
git add app/about/about-content.tsx
git commit -m "feat(about): open the badges tab from the #badges hash"
```

---

### Task 3: Rebuild the mobile menu

**Files:**
- Modify: `components/layout/mobile-menu.tsx` — replace the `NavItem` type, the `navItems` array, and the nav/CTA markup

**Interfaces:**
- Consumes: the `"MVP"` label from Task 1 and the `/about#badges` deep link from Task 2.
- Produces: nothing consumed by later tasks.

**Unchanged:** the `MobileMenuProps` interface, the route-change auto-close effect, the body-scroll-lock effect, the backdrop, and the drawer's enter/exit animation. Do not touch them.

- [ ] **Step 1: Replace the imports**

Replace lines 1–8 of `components/layout/mobile-menu.tsx` with:

```tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  BarChart3,
  ChevronRight,
  Clapperboard,
  Globe,
  Home,
  Layers,
  LayoutGrid,
  Package,
  User,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
```

- [ ] **Step 2: Replace the nav data**

Replace the `type NavItem` declaration and the whole `navItems` array (lines 15–23) with:

```tsx
type MobileNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

type MobileNavGroup = {
  heading: string;
  items: MobileNavItem[];
};

const navGroups: MobileNavGroup[] = [
  {
    heading: "Menu",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "About", href: "/about", icon: User },
      { label: "System Builds", href: "/system-builds", icon: Clapperboard },
      { label: "Web Showcase", href: "/projects", icon: Globe },
      { label: "MVP", href: "/real-apps", icon: LayoutGrid },
      { label: "Certificates & Badges", href: "/about#badges", icon: Award },
    ],
  },
  {
    heading: "Work With Me",
    items: [
      { label: "Services", href: "/services", icon: Layers },
      { label: "Packages", href: "/packages", icon: Package },
      { label: "Mentors", href: "/mentors", icon: Users },
    ],
  },
  {
    heading: "Tools",
    items: [
      { label: "All Tools", href: "/tools", icon: Wrench },
      { label: "GHL Audit", href: "/tools/ghl-audit", icon: Activity, badge: "New" },
      { label: "Revenue Tools", href: "/tools/revenue-audit", icon: BarChart3 },
    ],
  },
];
```

- [ ] **Step 3: Widen the drawer**

The longest label, `Certificates & Badges`, now sits beside an icon. On the current 290px drawer it wraps to two lines. In the drawer `motion.div`, change `w-[290px]` to `w-[310px]`:

```tsx
            className="fixed top-0 left-0 bottom-0 z-50 flex w-[310px] flex-col bg-[#0c0a17]/97 backdrop-blur-xl border-r border-white/[0.08] md:hidden"
```

- [ ] **Step 4: Replace the header title**

In the header block, replace the two-line title span (currently `AJ` over `System-Built by AJ`) with a single line:

```tsx
                <span className="text-[13px] font-extrabold leading-tight text-white">
                  System Built <span className="text-yellow">By AJ</span>
                </span>
```

Leave the logo `<span>` with the `aj-logo.webp` Image and the close button exactly as they are.

- [ ] **Step 5: Replace the nav and CTA blocks**

Replace the entire `{/* Nav */}` block and the `{/* Free Consultation CTA, extra space above */}` block (lines 86–114 of the original file) with:

```tsx
            {/* Groups, scrollable so the footer stays reachable */}
            <nav className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {navGroups.map((group) => (
                <div key={group.heading} className="mb-6 last:mb-2">
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {group.heading}
                  </p>

                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      // Hash links share a pathname with their parent page, so
                      // matching on pathname alone would light up two rows.
                      const active = !item.href.includes("#") && pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-[15px] font-semibold transition-colors ${
                            active
                              ? "border-yellow bg-white/[0.07] text-white"
                              : "border-transparent text-white/70 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] shrink-0 ${active ? "text-yellow" : "text-white/40"}`}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-yellow px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer, pinned below the scroll area */}
            <div className="shrink-0">
              <div className="px-4 pb-3">
                <Link
                  href="/consult"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-lg bg-yellow px-4 py-3 text-base font-bold text-black transition-colors hover:bg-yellow-dark"
                >
                  Free Consultation
                </Link>
              </div>

              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/[0.12]">
                  <Image src="/aj-profile.webp" alt="AJ Bactad" fill className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[13px] font-bold text-white">AJ Bactad</span>
                  <span className="block truncate text-[11px] text-white/45">Automation Builder</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
              </Link>
            </div>
```

The drawer already has `flex flex-col`. With the header `shrink-0`, the nav `flex-1 overflow-y-auto`, and this footer `shrink-0`, the twelve rows scroll while the CTA and profile card stay pinned. Without this the profile card is unreachable on a short phone.

- [ ] **Step 6: Verify build and lint**

Run: `npm run build 2>&1 | grep -E "Compiled|error|Failed"`
Expected: `✓ Compiled successfully`.

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 7: Visual check at 390px**

Serve the build (`npm run start`) and open the site at a 390×844 viewport, then open the menu. Confirm:

- Header reads `System Built By AJ` on one line, with `By AJ` in yellow
- Three group headings: `MENU`, `WORK WITH ME`, `TOOLS`
- Every row has an icon; `Certificates & Badges` fits on one line without wrapping
- `GHL Audit` shows a yellow `NEW` pill
- The active row (open `/` and check Home) has a yellow left bar and a yellow icon
- On `/about`, only `About` is highlighted — not `Certificates & Badges`
- The profile card is visible at the bottom with AJ's photo, name, and role
- The group area scrolls while the CTA and profile card stay put
- Tapping `Certificates & Badges` lands on /about with the Badge & Certificates tab open

- [ ] **Step 8: Commit**

```bash
git add components/layout/mobile-menu.tsx
git commit -m "feat(nav): grouped icon-led mobile menu with profile footer"
```

---

## Final Verification

- [ ] `npm run build` passes
- [ ] `npm run lint` reports exactly 18 problems
- [ ] `git status` is clean
- [ ] `grep -rn "Real Apps" app components --include=*.tsx` returns nothing
- [ ] Desktop nav reads `MVP` and highlights when `/real-apps` is open
- [ ] Mobile menu matches the layout in the spec at 390px
- [ ] Report to AJ for review before pushing. AJ pushes to master and verifies on Vercel.
