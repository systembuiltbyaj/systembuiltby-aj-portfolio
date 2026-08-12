"use client";

import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

type Tool = {
  href: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  badge: string | null;
};

const revenueTools: Tool[] = [
  {
    href: "/tools/revenue-audit",
    icon: "📊",
    title: "Revenue Audit",
    description:
      "Three-part audit, calculate your revenue leak, see typical ROI multipliers, and benchmark against the most common audit findings.",
    cta: "Run Revenue Audit",
    badge: null,
  },
  {
    href: "/tools/email-health",
    icon: "📧",
    title: "Email Health Tools",
    description:
      "Free curated tools to check your domain health, sender reputation, and deliverability score before launching any email campaign.",
    cta: "Check Email Health",
    badge: null,
  },
  {
    href: "/tools/process-map",
    icon: "🗺️",
    title: "Process Map",
    description:
      "Paste Mermaid code (from Pedro V3 or any source) and render an interactive workflow diagram of your GHL automation in seconds.",
    cta: "Open Process Map",
    badge: null,
  },
];

const buildLearnTools: Tool[] = [
  {
    href: "https://funnel-section-builder.vercel.app/",
    icon: "🧩",
    title: "Funnel Builder",
    description:
      "A full-stack app I built — turn the 10P framework into copy-ready AI prompts for every funnel section. Sign up and try it.",
    cta: "Open Builder",
    badge: "LIVE APP",
  },
  {
    href: "https://ai-specialist-learning-hub.vercel.app/",
    icon: "🎓",
    title: "AI Learning Hub",
    description:
      "My personal learning hub for mastering AI-specialist skills, lessons, references, and resources.",
    cta: "Open Learning Hub",
    badge: "LIVE",
  },
  {
    href: "/tools/playbook",
    icon: "📓",
    title: "Client Playbook",
    description:
      "My process for taking a client from first message to retainer, the call checklist I run live, and the prompts I paste before every build.",
    cta: "Open Playbook",
    badge: "PRIVATE",
  },
];

// The Claude Code skills & frameworks I build with (links open on GitHub)
const aiStack = [
  {
    name: "Superpowers",
    author: "obra",
    tag: "Agentic Framework",
    icon: "⚡",
    description:
      "Brainstorm → plan → TDD → review. The skill methodology behind how I ship, structured, test-driven, and reviewed before merge.",
    href: "https://github.com/obra/superpowers",
  },
  {
    name: "GSD, Get Shit Done",
    author: "gsd-build",
    tag: "Workflow",
    icon: "🎯",
    description:
      "A plan / execute / verify coding workflow with atomic commits, cross-session memory, and drift-detection safeguards.",
    href: "https://github.com/gsd-build/get-shit-done",
  },
  {
    name: "GStack",
    author: "Garry Tan",
    tag: "Dev Team",
    icon: "🧱",
    description:
      "23 opinionated tools that turn Claude into a full engineering team, from CEO and designer down to QA and release.",
    href: "https://github.com/garrytan/gstack",
  },
  {
    name: "Context7",
    author: "Upstash",
    tag: "Live Docs",
    icon: "📚",
    description:
      "Version-accurate library documentation injected straight into context, no stale APIs, no hallucinated code.",
    href: "https://github.com/upstash/context7",
  },
  {
    name: "Claude Mem",
    author: "thedotmack",
    tag: "Memory",
    icon: "🧠",
    description:
      "Persistent memory across sessions, captures the work, compresses it, and re-injects the relevant context next time.",
    href: "https://github.com/thedotmack/claude-mem",
  },
  {
    name: "Frontend Design",
    author: "Anthropic",
    tag: "Design Skill",
    icon: "🎨",
    description:
      "Anthropic's own skill for distinctive, intentional UI, the anti-template design layer behind my funnels and sites.",
    href: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
  },
];

function ToolCardList({ tools }: { tools: Tool[] }) {
  return (
    <StaggerChildren className="space-y-5">
      {tools.map((t) => {
        const isExternal = t.href.startsWith("http");
        const cardCls =
          "block group relative overflow-hidden rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/15 via-persian/[0.08] to-transparent p-6 sm:p-8 transition-all hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.25)] hover:-translate-y-[2px]";
        const inner = (
          <div className="flex items-start gap-4">
            <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow/20 border border-yellow/40 text-2xl">
              {t.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-xl font-black text-white">{t.title}</h3>
                {t.badge && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.55rem] font-extrabold text-white/70 uppercase tracking-wider border border-white/15">
                    {t.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/65 leading-relaxed mb-4">{t.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow group-hover:text-yellow-dark transition-colors">
                {t.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        );
        return (
          <StaggerItem key={t.href}>
            {isExternal ? (
              <a href={t.href} target="_blank" rel="noopener noreferrer" className={cardCls}>
                {inner}
              </a>
            ) : (
              <Link href={t.href} className={cardCls}>
                {inner}
              </Link>
            )}
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}

export function ToolsContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-persian/20 backdrop-blur-xl py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-yellow text-sm font-semibold uppercase tracking-widest mb-4">
              Tools
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Stack &amp; Tools I Build With
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              The AI dev stack behind my builds, plus free tools to audit your
              GoHighLevel systems, revenue, and deliverability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 1. My AI Dev Stack, Claude Code skills I build with */}
      <section id="ai-dev-stack" className="scroll-mt-24 py-14 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-persian-light/80">
            My AI Dev Stack
          </p>
          <h2 className="mb-2 text-2xl font-black text-white sm:text-3xl">
            The skills I build with
          </h2>
          <p className="mb-7 max-w-2xl text-sm leading-relaxed text-white/55">
            The Claude Code skills &amp; frameworks powering how I ship automations, funnels, and
            AI systems, fast, and production-grade. Tap any to view it on GitHub.
          </p>
          <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiStack.map((s) => (
              <StaggerItem key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-persian/25 bg-gradient-to-br from-persian/12 via-persian/[0.05] to-transparent p-6 transition-all hover:-translate-y-[2px] hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.22)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl">
                      {s.icon}
                    </span>
                    <span className="rounded-full border border-persian/30 bg-persian/15 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-persian-light">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{s.name}</h3>
                  <p className="mb-2 text-xs text-white/40">by {s.author}</p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/60">{s.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow transition-colors group-hover:text-yellow-dark">
                    View on GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* 2. Featured: GHL Audit */}
      <section id="ghl-full-audit" className="scroll-mt-24 py-12 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-yellow/80">
            GHL Full Audit
          </p>
          <ScrollReveal>
            <Link
              href="/tools/ghl-audit"
              className="block group relative overflow-hidden rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/15 via-persian/[0.08] to-transparent p-6 sm:p-8 transition-all hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.25)] hover:-translate-y-[2px]"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow/20 border border-yellow/40 text-yellow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl font-black text-white">GHL Sub-Account Audit</h2>
                    <span className="rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                      NEW 🔥
                    </span>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed mb-4">
                    Detect misconfigurations, missing automations, and optimization opportunities in any GHL sub-account.
                    Connect with your Location ID + Private Integration Token, get a full health scan in seconds.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow group-hover:text-yellow-dark transition-colors">
                    Run Health Scan
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Revenue Tools */}
      <section id="revenue-tools" className="scroll-mt-24 pb-20 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-persian-light/80">
            Revenue Tools
          </p>
          <ToolCardList tools={revenueTools} />
        </div>
      </section>

      {/* 4. Build & Learn Hub, passcode-gated builder + learning tools */}
      <section id="build-learn-hub" className="scroll-mt-24 pb-24 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-persian-light/80">
            Build &amp; Learn Hub
          </p>
          <ToolCardList tools={buildLearnTools} />
        </div>
      </section>
    </PageTransition>
  );
}
