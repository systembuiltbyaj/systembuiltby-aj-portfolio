/**
 * The Claude Code skills & frameworks AJ has installed and actually uses,
 * ordered by GitHub stars. Rendered by the v2 /ai-stack section and /tools,
 * so both pages stay in sync. Star counts were read from GitHub on 2026-10-15
 * and rounded; they are a sense of scale, not a live counter.
 */
export type AiStackItem = {
  name: string;
  author: string;
  tag: string;
  icon: string;
  stars: string;
  description: string;
  href: string;
};

export const aiStack: AiStackItem[] = [
  {
    name: "Superpowers",
    author: "obra",
    tag: "Agentic Framework",
    icon: "⚡",
    stars: "300k",
    description:
      "Brainstorm → plan → TDD → review. The skill methodology behind how I ship: structured, test-driven, and reviewed before merge.",
    href: "https://github.com/obra/superpowers",
  },
  {
    name: "Karpathy Skills",
    author: "multica-ai",
    tag: "Coding Taste",
    icon: "🧭",
    stars: "220k",
    description:
      "Andrej Karpathy's engineering principles as a rules file. The taste layer that keeps generated code simple, readable, and boring in the right places.",
    href: "https://github.com/multica-ai/andrej-karpathy-skills",
  },
  {
    name: "Agent Skills",
    author: "Anthropic",
    tag: "Official Skills",
    icon: "🎨",
    stars: "181k",
    description:
      "Anthropic's own skill library. Frontend Design lives here, the anti-template design layer behind my funnels and sites.",
    href: "https://github.com/anthropics/skills",
  },
  {
    name: "Claude Mem",
    author: "thedotmack",
    tag: "Memory",
    icon: "🧠",
    stars: "101k",
    description:
      "Persistent memory across sessions. It captures the work, compresses it, and re-injects the relevant context next time.",
    href: "https://github.com/thedotmack/claude-mem",
  },
  {
    name: "HyperFrames",
    author: "HeyGen",
    tag: "Video Engine",
    icon: "🎬",
    stars: "64k",
    description:
      "Write HTML, render video. The engine behind my motion case-study films, built in code from real screen captures of the working sites.",
    href: "https://github.com/heygen-com/hyperframes",
  },
  {
    name: "Humanizer",
    author: "blader",
    tag: "Writing",
    icon: "✍️",
    stars: "57k",
    description:
      "Removes the tells of AI-generated writing, built on Wikipedia's \"Signs of AI writing\". Merged into my own editing skill so proposals still sound like me.",
    href: "https://github.com/blader/humanizer",
  },
  {
    name: "Claude Plugins Official",
    author: "Anthropic",
    tag: "Official Plugins",
    icon: "🧩",
    stars: "38k",
    description:
      "Anthropic's curated plugin directory. Where my code review, security guidance, and TypeScript tooling come from, the checks a build passes before it ships.",
    href: "https://github.com/anthropics/claude-plugins-official",
  },
  {
    name: "Playwright",
    author: "Microsoft",
    tag: "Browser Testing",
    icon: "🎭",
    stars: "38k",
    description:
      "Drives a real browser to click through flows, take screenshots, and catch console errors. How I verify sites and funnels work before a client sees them.",
    href: "https://github.com/microsoft/playwright-mcp",
  },
  {
    name: "Vercel Agent Skills",
    author: "Vercel",
    tag: "Deployment",
    icon: "▲",
    stars: "32k",
    description:
      "Vercel's own React and Next.js performance rules. The guardrails for the Next.js apps I deploy on Vercel, from rendering to caching.",
    href: "https://github.com/vercel-labs/agent-skills",
  },
  {
    name: "Context Mode",
    author: "mksglu",
    tag: "Context",
    icon: "🪟",
    stars: "30k",
    description:
      "Sandboxes tool output so a huge log, page snapshot, or API response never floods the context window mid-build.",
    href: "https://github.com/mksglu/context-mode",
  },
  {
    name: "Scroll Craft",
    author: "nateherkai",
    tag: "Web Design",
    icon: "🌀",
    stars: "3.5k",
    description:
      "Plans and builds premium scroll-driven pages: layered heroes, a mapped visitor journey, and motion that stays restrained. My start when a page should feel like an experience.",
    href: "https://github.com/nateherkai/scroll-craft",
  },
  {
    name: "Supabase Agent Skills",
    author: "Supabase",
    tag: "Database",
    icon: "🗄️",
    stars: "2.8k",
    description:
      "Supabase's official skills for schema, auth, and row-level security, the same layer that keeps each team's data separate in my multi-tenant client dashboard.",
    href: "https://github.com/supabase/agent-skills",
  },
  {
    name: "Stripe AI",
    author: "Stripe",
    tag: "Payments",
    icon: "💳",
    stars: "1.9k",
    description:
      "Stripe's official skills and MCP for payments, billing, and webhooks, so checkout-to-webhook billing flows follow Stripe's current patterns.",
    href: "https://github.com/stripe/ai",
  },
  {
    name: "Obsidian CLI",
    author: "pablo-mano",
    tag: "Knowledge Base",
    icon: "🗂️",
    stars: "452",
    description:
      "Drives my Obsidian vault straight from the terminal, so build notes, client context, and process maps stay in one place I can query.",
    href: "https://github.com/pablo-mano/Obsidian-CLI-skill",
  },
];
