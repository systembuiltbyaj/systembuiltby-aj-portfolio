"use client";

import { useState } from "react";
import Image from "next/image";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

export type SystemBuild = {
  title: string;
  category: string;
  description: string;
  duration?: string;
  videoId?: string;
  vimeoId?: string;
  emoji: string;
  image?: string;
};

export const clientProjects: SystemBuild[] = [
  {
    title: "How I Present a Proposal to a Client",
    category: "Client Project",
    description:
      "How I present a real client proposal as a GoHighLevel and AI Automation Consultant. I turn the client's current problems into a clear process map, CRM structure, automation plan, and complete system — all before starting the actual build.",
    emoji: "🤝",
    image: "/system-builds/ghl-client-proposal.webp",
    videoId: "wxAqeT5mdhQ",
  },
  {
    title: "Complete GoHighLevel Client System Build | From Planning to Handover",
    category: "Client Project",
    description:
      "See how I approach a complete GoHighLevel client build from start to finish. This walkthrough covers how I plan, build, connect, test, and hand over a full system including funnels, pipelines, workflows, products, memberships, and lead nurture. It shows my process for turning a client's requirements into a clean, automated, and scalable GoHighLevel system.",
    emoji: "🏗️",
    image: "/system-builds/ghl-client-system-build.webp",
    videoId: "n3HtTo7JG6A",
    duration: "32:00",
  },
  {
    title: "AI Automation Course",
    category: "Course",
    description:
      "A complete AI Automation Course — step-by-step video lessons, real automation examples, and GHL + AI agent integrations, plus workflow blueprints and bonus templates. Everything to go from beginner to automation pro.",
    emoji: "🎓",
    image: "/system-builds/ai-automation-course.webp",
    videoId: "7XCfAifD378",
  },
  {
    title: "Course Order → Instant ClickUp Alert",
    category: "Client Automation",
    description:
      "The moment a customer buys a course on the site, a Zapier webhook fires an instant order notification into our ClickUp channel, every sale logged in real time, so the team never misses an order. Fully automated, zero manual checking.",
    emoji: "📋",
    image: "/system-builds/sb-ghl-clickup.webp",
    videoId: "cBkmitMksrk",
  },
  {
    title: "Migrating WooCommerce Products into GHL",
    category: "GHL Automation",
    description:
      "Bulk-migrate a WooCommerce store into GoHighLevel, an automation workflow that fetches products, maps fields (price, stock, etc.), creates/updates them in GHL, syncs media, and confirms completion. Category sync + inventory updates included.",
    emoji: "🛒",
    image: "/system-builds/migrating-woocommerce-ghl.webp",
    videoId: "SlZROJx4Obo",
  },
  {
    title: "Appointment Booking Automation",
    category: "GHL Workflow",
    description:
      "Calendar sync, multi-touch reminders, no-show recovery, and post-appointment follow-up, built from scratch for myoldretirement.com.",
    emoji: "📅",
    image: "/system-builds/appointment-booking.webp",
    videoId: "9FOymB9sZEs",
  },
];

export const ajTutorials: SystemBuild[] = [
  {
    title: "Create Snapshot, Subaccount & Load It to a Subaccount",
    category: "GHL Tutorial",
    description:
      "Step-by-step GHL workflow, capture a snapshot of an account, spin up a new subaccount, and load the snapshot in. Fast, easy, repeatable.",
    emoji: "📸",
    image: "/system-builds/snapshot-tutorial.webp",
    videoId: "OQXXNVjJfgE",
  },
  {
    title: "Build High-Converting Funnels in 1 Hour",
    category: "Funnel Tutorial",
    description:
      "Build a high-converting funnel from scratch, Attract · Engage · Convert · Retain. Built with HighLevel (built-in) or Vercel. Step-by-step, no experience needed.",
    emoji: "🎯",
    image: "/system-builds/funnel-tutorial.webp",
    videoId: "iIZPsP7MTYs",
  },
  {
    title: "How to Use GHL Using Claude",
    category: "AI Tutorial",
    description:
      "Connect Claude to GoHighLevel via the GHL MCP and run your account with AI, lead research, content creation, automations, and follow-ups. Step-by-step, beginner-friendly.",
    emoji: "🤖",
    image: "/system-builds/how-to-use-claude.webp",
    vimeoId: "1197634726",
  },
];

export const claudeProjects: SystemBuild[] = [
  {
    title: "Weekly AI Research: Find the Best Resorts & Restaurants Automatically",
    category: "Claude Test Project",
    description:
      "Every Sunday at 8:00 AM, Claude researches top-rated resorts and restaurants across Zambales, gathers key business details, including names, locations, websites, ratings, phone numbers, and emails, and organizes everything in ClickUp. Fully automated with Trigger.dev, so your database stays fresh without manual research. 🚀",
    emoji: "🤖",
    image: "/system-builds/claude-test-project.webp",
    videoId: "M3OK_1BNEco",
  },
  {
    title: "LinkedIn Outreach Automation",
    category: "Claude Test Project",
    description:
      "An AI agent that researches, writes, and publishes your LinkedIn and Instagram content every week, 100% hands-off. Claude drafts each post and its image, Trigger.dev schedules and runs the automation, and it auto-publishes to both platforms. Set it once and your feed stays active with zero manual work. 🚀",
    emoji: "💼",
    image: "/system-builds/linkedin-content-automation.webp",
    videoId: "_zWVgnQzDuI",
  },
  {
    title: "Slack AI Agent",
    category: "Claude Test Project",
    description:
      "A Slack-native AI agent powered by Claude, ask it a question or drop a task in any channel and it reasons, responds, and takes action without ever leaving Slack. A hands-on Claude test project for real-time team automation. 🚀",
    emoji: "💬",
    image: "/system-builds/slack-agent.webp",
    vimeoId: "1210062752",
  },
  {
    title: "RAG Knowledge Bot",
    category: "Claude Test Project",
    description:
      "Chat with your own documents right inside Slack. This retrieval-augmented (RAG) knowledge bot ingests PDFs, DOCX, and YouTube into a Supabase vector database, then answers questions instantly with cited sources, so it never makes anything up. Built with Trigger.dev and a Slack /ask command. 🚀",
    emoji: "📚",
    image: "/system-builds/rag-knowledge-bot.webp",
    videoId: "USSYFHZg5Xo",
  },
  {
    title: "Team Knowledge Dashboard",
    category: "Claude Test Project",
    description:
      "A secure dashboard where your whole team logs into one place and sees the same company knowledge your AI reads from. One login, one source of truth, locked down with real database-level (row-level) security so people only see what they're allowed to. Built with Supabase auth, Trigger.dev, and deployed on Vercel. 🚀",
    emoji: "📊",
    image: "/system-builds/team-knowledge-dashboard.webp",
    videoId: "VpT3w4yZpl4",
  },
  {
    title: "Subscription Paywall",
    category: "Claude Test Project",
    description:
      "Lock your app behind a Stripe subscription, the owner pays once, the whole team gets in, and a webhook keeps your database in sync so access flips the moment a payment does. No pay, no access. Built with Stripe, Next.js, and Supabase, deployed on Vercel. 🚀",
    emoji: "🔒",
    image: "/system-builds/subscription-paywall.webp",
    vimeoId: "1211124288",
  },
];

export const zapierTutorials: SystemBuild[] = [
  {
    title: "Instant Form Intake: Notify Everywhere, Log Automatically",
    category: "Zapier Automation",
    description:
      "The second a form is submitted, the lead is broadcast to Discord and Slack, emailed to you via Gmail, and logged in Google Sheets, so nothing slips through. One submission, four destinations, zero manual work.",
    emoji: "📝",
    image: "/system-builds/sb-form-intake.webp",
    videoId: "gComGEuriOA",
  },
  {
    title: "Gmail to Slack: Route Applications the Moment They Land",
    category: "Zapier Automation",
    description:
      "Watches your Gmail for new application emails and instantly posts the details into Slack, so your team sees every applicant without digging through an inbox. Real-time triage, completely hands-free.",
    emoji: "📧",
    image: "/system-builds/sb-gmail-slack.webp",
    videoId: "v2kWQ-ECuZw",
  },
  {
    title: "Deal Won: Auto-Celebrate Across Discord & Slack",
    category: "GHL Automation",
    description:
      "When a deal is marked Won in GoHighLevel, your team gets an instant win alert in both Discord and Slack. Keep momentum high and everyone in the loop the moment money hits the table.",
    emoji: "🏆",
    image: "/system-builds/sb-deal-won.webp",
    videoId: "6WpbbpRR1ZQ",
  },
  {
    title: "New Lead: Auto-Nurture + Instant Team Alert",
    category: "GHL Automation",
    description:
      "Every new GoHighLevel lead is automatically enrolled in your nurture sequence and fires a real-time alert to your team. Follow-up starts the instant a lead arrives, no one left waiting.",
    emoji: "🌱",
    image: "/system-builds/sb-lead-nurture.webp",
    vimeoId: "1201263468",
  },
  {
    title: "Smart Lead Router: Qualify & Route by Budget Automatically",
    category: "GHL Automation",
    description:
      "Incoming leads are scored by budget and sent down the right path: hot leads fast-tracked to sales, cold leads dropped into nurture, with Discord alerts and Google Sheets logging along the way. Your pipeline sorts itself.",
    emoji: "🧭",
    image: "/system-builds/sb-smart-lead-router.webp",
    vimeoId: "1201263467",
  },
  {
    title: "AI Proposal Generator: Custom Proposals in Seconds",
    category: "AI Automation",
    description:
      "Feed in the lead's details and AI drafts a tailored proposal automatically, no blank page, no copy-paste. Turn an inquiry into a ready-to-send proposal before the lead goes cold.",
    emoji: "🤖",
    image: "/system-builds/sb-ai-proposal.webp",
    videoId: "CSpwLbB38uw",
  },
  {
    title: "AI Lead Qualifier: Score Every Lead Instantly",
    category: "AI Automation",
    description:
      "AI reads each incoming lead and scores how qualified they are, so your team knows exactly who to chase first. Smarter prioritization with zero guesswork.",
    emoji: "🎯",
    image: "/system-builds/sb-ai-lead-qualifier.webp",
    videoId: "2NBUg-8YkTw",
  },
];

export const n8nProjects: SystemBuild[] = [
  {
    title: "Self-Hosted n8n Workflow",
    category: "n8n Automation",
    description:
      "Building automations on self-hosted n8n, webhooks, scheduled jobs, and API chains running on my own infrastructure instead of a SaaS plan. Walkthrough recording in progress.",
    emoji: "🔗",
  },
];

function BuildCard({ build, accent = "text-persian-light" }: { build: SystemBuild; accent?: string }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(build.videoId || build.vimeoId);
  const embedSrc = build.vimeoId
    ? `https://player.vimeo.com/video/${build.vimeoId}?autoplay=1`
    : `https://www.youtube.com/embed/${build.videoId}?autoplay=1`;

  return (
    <StaggerItem>
      <div className="group flex h-full flex-col rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
        {/* Video / thumbnail area */}
        <div className="relative aspect-[3/2] bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-[#2a0f6a]/30 flex items-center justify-center overflow-hidden">
          {playing && hasVideo ? (
            <iframe
              src={embedSrc}
              title={build.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <>
              {build.image ? (
                <>
                  <Image
                    src={build.image}
                    alt={build.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </>
              ) : (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.18)_0%,transparent_70%)]" />
                  <span className="relative text-5xl opacity-60 group-hover:opacity-90 transition-opacity">
                    {build.emoji}
                  </span>
                </>
              )}

              {hasVideo ? (
                <button
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${build.title}`}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <span className="w-16 h-16 rounded-full bg-white/[0.12] border border-white/[0.25] backdrop-blur-sm flex items-center justify-center group-hover:bg-yellow group-hover:border-yellow transition-all duration-300">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1 group-hover:fill-black transition-colors"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              ) : (
                <span className="absolute top-3 right-3 rounded-full bg-yellow/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow border border-yellow/25 backdrop-blur-sm">
                  Coming Soon
                </span>
              )}

              {hasVideo && build.duration && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  {build.duration}
                </span>
              )}
            </>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-5">
          <p className={`mb-2 text-[10px] font-semibold uppercase tracking-widest ${accent}`}>
            {build.category}
          </p>
          <h3 className="mb-2 text-base font-bold leading-snug text-white">
            {build.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-white/55">
            {build.description}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export function SystemBuildsContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-persian/20 backdrop-blur-xl py-14 md:py-20 px-6 text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
              System Builds &amp; Walkthroughs
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
              See How I <span className="text-yellow">Engineer</span> Every System
            </h1>
            <p className="text-white/70 text-[15px] md:text-lg max-w-xl mx-auto leading-relaxed">
              Raw screen-recorded walkthroughs of the workflows, pipelines, and
              automations I build for clients. No fluff, just the actual
              logic, decisions, and configuration behind each system.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-14 md:py-20 px-5 sm:px-6">
        <div className="pointer-events-none absolute top-1/3 left-[15%] w-[400px] h-[400px] bg-persian/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto space-y-16 md:space-y-20">
          {/* Section 1, Clients Project */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-yellow text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 01
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  Clients <span className="text-yellow">Real Project</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Real systems I built for real clients, pipelines, automations, funnels.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clientProjects.map((build) => (
                <BuildCard key={build.title} build={build} />
              ))}
            </StaggerChildren>
          </div>

          {/* Section 2, GHL Tutorial (blue) */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-[#5B9DF9] text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 02
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  GHL <span className="text-[#5B9DF9]">Tutorial</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Step-by-step GoHighLevel how-tos. The exact moves I make, recorded raw.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ajTutorials.map((build) => (
                <BuildCard key={build.title} build={build} accent="text-[#5B9DF9]" />
              ))}
            </StaggerChildren>
          </div>

          {/* Section 3, Claude Test Project (terracotta) */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-[#D97757] text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 03
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  Claude <span className="text-[#D97757]">Test Project</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Real builds powered by Claude, AI reasoning wired straight into working systems.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {claudeProjects.map((build) => (
                <BuildCard key={build.title} build={build} accent="text-[#D97757]" />
              ))}
            </StaggerChildren>
          </div>

          {/* Section 4, Zapier Test Project (orange) */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-[#FF8A3D] text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 04
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  Zapier <span className="text-[#FF8A3D]">Test Project</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Automation walkthroughs, Zapier, GHL &amp; AI workflows that run the busywork for you.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {zapierTutorials.map((build) => (
                <BuildCard key={build.title} build={build} accent="text-[#FF8A3D]" />
              ))}
            </StaggerChildren>
          </div>

          {/* Section 5, n8n Test Project (n8n pink-red) */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-[#EA4B71] text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 05
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  n8n <span className="text-[#EA4B71]">Test Project</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Self-hosted n8n builds, running on my own infrastructure.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {n8nProjects.map((build) => (
                <BuildCard key={build.title} build={build} accent="text-[#EA4B71]" />
              ))}
            </StaggerChildren>
          </div>

          {/* Footnote */}
          <ScrollReveal>
            <div className="flex flex-col items-center gap-5 px-4">
              <p className="text-center text-sm text-white/40">
                New walkthroughs added regularly. Want a custom build recorded?
              </p>
              <a
                href="/consult"
                className="inline-flex items-center gap-2 px-7 py-3 bg-yellow text-black rounded-[9px] text-sm font-extrabold hover:bg-yellow-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(246,203,31,0.35)] transition-all duration-200"
              >
                Book a Free Consultation →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
