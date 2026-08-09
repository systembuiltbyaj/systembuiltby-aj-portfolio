# Mobile menu redesign — Design

**Date:** 2026-08-09
**Status:** Approved

## Goal

Replace the flat four-item mobile menu with a grouped, icon-led panel modelled
on the reference sidebar AJ supplied. The current menu reads as plain because
it is an undifferentiated list with no icons, no grouping, and no footer.

## Scope

1. Rewrite `components/layout/mobile-menu.tsx` — grouped nav data, icons,
   group headings, a NEW badge, and a profile footer.
2. `app/about/about-content.tsx` — open the Badge & Certificates tab when the
   URL hash is `#badges`.
3. `components/layout/navbar.tsx` — rename the "Real Apps" dropdown label to
   "MVP".

Out of scope: the desktop dropdown structure, the open/close animation, the
backdrop, the body-scroll lock, and the route-change auto-close. All work and
are untouched.

---

## 1. Why the menu data is not shared with the desktop nav

`mobile-menu.tsx` already keeps its own item list, independent of the desktop
dropdowns. That stays.

The two navs genuinely differ. Desktop groups items into three dropdowns by
topic, each item carrying a one-line description. Mobile groups by visitor
intent, carries an icon per item, and includes a Certificates entry the
desktop nav does not have. A shared config would need conditionals to serve
both, which is more coupling than duplication costs here. Two focused files
beat one config with modes.

## 2. Nav data

```ts
import type { LucideIcon } from "lucide-react";

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
```

Three groups, using `lucide-react` (already a project dependency):

| Group | Label | href | Icon | Badge |
|---|---|---|---|---|
| MENU | Home | `/` | `Home` | |
| MENU | About | `/about` | `User` | |
| MENU | System Builds | `/system-builds` | `Clapperboard` | |
| MENU | Web Showcase | `/projects` | `Globe` | |
| MENU | MVP | `/real-apps` | `LayoutGrid` | |
| MENU | Certificates & Badges | `/about#badges` | `Award` | |
| WORK WITH ME | Services | `/services` | `Layers` | |
| WORK WITH ME | Packages | `/packages` | `Package` | |
| WORK WITH ME | Mentors | `/mentors` | `Users` | |
| TOOLS | All Tools | `/tools` | `Wrench` | |
| TOOLS | GHL Audit | `/tools/ghl-audit` | `Activity` | `NEW` |
| TOOLS | Revenue Tools | `/tools/revenue-audit` | `BarChart3` | |

## 3. Layout

```
┌─────────────────────────────┐
│ ▣ SYSTEM BUILT BY AJ     ✕  │  fixed header
├─────────────────────────────┤
│ MENU                        │  ┐
│   ⌂  Home                   │  │
│   ◎  About                  │  │
│   ▶  System Builds          │  │
│   ⊞  Web Showcase           │  │
│   ◈  MVP                    │  │
│   ✦  Certificates & Badges  │  │ scrollable
│                             │  │
│ WORK WITH ME                │  │
│   ▤  Services               │  │
│   ▫  Packages               │  │
│   ☺  Mentors                │  │
│                             │  │
│ TOOLS                       │  │
│   ⚙  All Tools              │  │
│   ◑  GHL Audit       [NEW]  │  │
│   ◔  Revenue Tools          │  ┘
├─────────────────────────────┤
│   [ Free Consultation ]     │  ┐ fixed footer
│ ─────────────────────────── │  │
│   ●  AJ Bactad          ›   │  │
│      Automation Builder     │  ┘
└─────────────────────────────┘
```

The panel is a flex column: header `shrink-0`, group area `flex-1
overflow-y-auto`, footer `shrink-0`. Without this the profile card is
unreachable on a short viewport, since the twelve items exceed the height of
a small phone.

## 4. Visual treatment

- **Title**: `System Built By AJ`, existing logo mark to its left. Replaces
  the current stacked "AJ / SYSTEM-BUILT BY AJ".
- **Group headings**: `text-[10px]`, uppercase, `tracking-[0.2em]`,
  `font-semibold`, `text-white/35`, `mb-2`, `mt-6` between groups. This is
  the single change that does the most work — the current menu's flatness
  comes from having no grouping at all.
- **Icons**: 18px, `text-white/40`, becoming `text-yellow` on the active row.
- **Active row**: keeps the current treatment — yellow left bar plus a dark
  rounded pill. Already on-brand and consistent with the desktop nav, so
  there is no reason to redesign it.
- **Badge**: `NEW` in the yellow pill already used on the /tools page —
  `bg-yellow`, `text-black`, `text-[9px]`, `font-extrabold`, uppercase.
- **Profile footer**: `aj-profile.webp` at 40px round, name `AJ Bactad`,
  role `Automation Builder` in `text-white/45`, chevron at the right, whole
  card links to `/about`. Sits below a `border-white/[0.06]` hairline.

Brand invariants hold throughout: violet, gold, near-black, Inter only.

## 5. Certificates deep link

The About page renders its three panels from `useState`, not from routed
sections:

```ts
const [tab, setTab] = useState<"about" | "mentors" | "badges">("about");
```

The Badge & Certificates content is therefore absent from the DOM unless that
tab is active, so a plain `#certificates` anchor would scroll to nothing.

Fix: read the hash on mount and set the initial tab. A `Link` whose pathname
is unchanged and only the hash differs does not remount this component in the
App Router, so in-app navigation and back/forward between `/about` and
`/about#badges` also need a `hashchange` listener, not just the on-mount read.

```ts
useEffect(() => {
  const applyHash = () => {
    if (window.location.hash === "#badges") setTab("badges");
  };
  applyHash();
  window.addEventListener("hashchange", applyHash);
  return () => window.removeEventListener("hashchange", applyHash);
}, []);
```

The `setState` call is nested inside the `applyHash` helper rather than
called directly in the effect body, so it doesn't trip the
`react-hooks/set-state-in-effect` lint rule and needs no suppression comment.

A `useEffect` rather than `useSearchParams` deliberately — `useSearchParams`
would force a Suspense boundary around this statically rendered page. The
hash approach needs no boundary and degrades to the default tab if the hash
is absent or unrecognised.

## 6. MVP rename

In `components/layout/navbar.tsx`:

- `workDropdown.label`: `"Real Apps"` → `"MVP"`
- `routeToActiveNav["/real-apps"]`: `"Real Apps"` → `"MVP"`

Both must change together — the map's value is compared against the dropdown
label to decide the active state, so changing one alone silently breaks
highlighting.

In `components/layout/navbar.tsx`, the dropdown's first item also changes:

- `"All Real Apps"` → `"All MVPs"`

The page copy adopts MVP as well, in `app/real-apps/`:

| Location | From | To |
|---|---|---|
| `page.tsx` metadata title | `Real Apps` | `MVP` |
| `real-apps-content.tsx` kicker | `Real Apps, Not Demos` | `MVPs, Not Demos` |
| `real-apps-content.tsx` section h2 | `Live Apps` | `Live MVPs` |

The H1, `Products I Built, Shipped, And Actually Run.`, is unchanged. It
never said "Real Apps", so nothing there needs renaming.

The route stays `/real-apps`. It was pushed to production on 2026-08-08;
renaming it would 404 any existing link and require a redirect for no user
benefit. The `/tools` page's Build & Learn Hub cards are a separate section
and keep their current wording.

## 7. Verification

- `npm run build` passes.
- `npm run lint` reports no new problems against the 18-problem baseline.
- Mobile menu at 390px: three headed groups, icons, NEW badge on GHL Audit,
  profile card reachable, group area scrolls while header and footer stay put.
- Tapping Certificates & Badges opens /about with the Badge & Certificates
  tab already selected.
- Desktop nav reads MVP and still highlights when /real-apps is open.
