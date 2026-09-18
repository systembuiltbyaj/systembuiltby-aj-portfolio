"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

interface Service {
  rank: string;
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
  isNew?: boolean;
  heat?: number;
  accent: string;
}

export const services: Service[] = [
  {
    rank: "🥇",
    icon: "🔥",
    title: "Funnel & Website Systems",
    subtitle: "Convert traffic into leads with engineered landing experiences.",
    items: [
      "GHL funnel builds (opt-in, VSL, webinar, tripwire)",
      "Landing page design & copywriting structure",
      "Conversion rate optimization & A/B testing",
      "Mobile-first responsive design",
      "Custom CSS overrides & branding",
    ],
    accent: "from-yellow/20 to-yellow/5",
  },
  {
    rank: "🥈",
    icon: "🔥",
    title: "CRM & Pipeline Systems",
    subtitle:
      "Track every lead from first touch to closed deal with zero manual effort.",
    items: [
      "Multi-stage pipeline architecture",
      "Lead tracking & status automation",
      "Contact segmentation & tagging strategy",
      "Deal value tracking & forecasting",
      "Custom fields & smart lists",
    ],
    accent: "from-persian/20 to-persian/5",
  },
  {
    rank: "🥉",
    icon: "🔥",
    title: "Automation & Workflows",
    subtitle: "Automated sequences that nurture, follow up, and close.",
    items: [
      "Email + SMS drip sequences",
      "Lead nurturing workflows (5-30+ steps)",
      "Cold lead re-engagement campaigns",
      "Conditional branching & if/else logic",
      "Trigger-based automation (form, tag, stage)",
    ],
    accent: "from-persian/20 to-persian/5",
  },
  {
    rank: "04",
    icon: "📅",
    title: "Booking Systems",
    subtitle: "Fill your calendar without lifting a finger.",
    items: [
      "Calendar setup & round-robin routing",
      "Automated 48h/24h/2h reminders (SMS + email)",
      "No-show recovery workflows",
      "Cancellation handling & rebooking",
      "Calendar sync (Google, Outlook, iCal)",
    ],
    accent: "from-blue-500/15 to-blue-500/5",
  },
  {
    rank: "05",
    icon: "📲",
    title: "A2P 10DLC Setup",
    subtitle: "Stay compliant. Reach inboxes. Maximize deliverability.",
    items: [
      "Brand registration (TCR)",
      "Campaign use-case registration",
      "Compliance documentation",
      "Deliverability optimization",
      "Carrier approval management",
    ],
    isNew: true,
    heat: 1,
    accent: "from-green-500/15 to-green-500/5",
  },
  {
    rank: "06",
    icon: "🤖",
    title: "AI Chatbot Systems",
    subtitle: "Intelligent bots that qualify, book, and convert 24/7.",
    items: [
      "AI conversation flow design",
      "Lead qualification bots",
      "Automated booking bots",
      "AI + GHL workflow integration",
      "Custom training on your offer/FAQ",
      "Handoff to human when needed",
    ],
    isNew: true,
    heat: 2,
    accent: "from-purple-500/15 to-purple-500/5",
  },
  {
    rank: "07",
    icon: "🌐",
    title: "Custom Frontend (Vibe Coding)",
    subtitle:
      "When GHL templates aren't enough, custom-coded, high-performance pages.",
    items: [
      "High-performance landing pages (Next.js, React)",
      "Custom UI/UX design & development",
      "GHL integration via forms & webhooks",
      "Speed-optimized builds (90+ Lighthouse)",
      "Responsive, mobile-first design",
    ],
    accent: "from-cyan-500/15 to-cyan-500/5",
  },
  {
    rank: "08",
    icon: "⚙️",
    title: "Advanced Integrations",
    subtitle:
      "Connect every tool in your stack into one seamless revenue machine.",
    items: [
      "API & webhook connections",
      "Third-party tool orchestration (Stripe, Zapier, Make)",
      "Backend system architecture",
      "Data sync between platforms",
      "Custom automation logic",
    ],
    accent: "from-orange-500/15 to-orange-500/5",
  },
  {
    rank: "\u{1F947}",
    icon: "\u{1F916}",
    title: "AI Agent Systems",
    subtitle: "Agents that qualify, answer, and escalate without you in the loop.",
    items: [
      "Lead qualification agents with scoring rules",
      "Knowledge-base agents that answer from your own docs",
      "Human handoff on low confidence or high value",
      "Conversation logging & escalation rules",
      "Guardrails, fallbacks & retry handling",
    ],
    isNew: true,
    accent: "from-persian/20 to-persian/5",
  },
  {
    rank: "\u{1F947}",
    icon: "\u{1F9E0}",
    title: "AI Content & Research Systems",
    subtitle: "Weekly research and content that publishes itself.",
    items: [
      "Scheduled research agents into a live database",
      "Draft-and-publish pipelines for social & email",
      "RAG knowledge bots with cited sources",
      "Document ingestion (PDF, DOCX, transcripts)",
      "Brand-voice prompting & review gates",
    ],
    isNew: true,
    accent: "from-persian/20 to-persian/5",
  },
  {
    rank: "\u{1F947}",
    icon: "\u{1F517}",
    title: "AI + GHL Integrations",
    subtitle: "Wire AI into the CRM so it acts, not just answers.",
    items: [
      "GHL MCP so AI can operate the account directly",
      "AI-drafted follow-up pushed into workflows",
      "Call & conversation summaries onto the contact",
      "Smart routing from AI intent detection",
      "Custom-field writeback from AI output",
    ],
    isNew: true,
    accent: "from-persian/20 to-persian/5",
  },
  {
    rank: "\u{1F947}",
    icon: "\u{269B}\uFE0F",
    title: "Automation Infrastructure",
    subtitle: "The plumbing that keeps automations running when volume grows.",
    items: [
      "n8n & Trigger.dev orchestration",
      "Webhook handling, retries & idempotency",
      "Error logging with human escalation",
      "Supabase-backed state & audit trails",
      "Monitoring so a silent failure is not silent",
    ],
    isNew: true,
    accent: "from-persian/20 to-persian/5",
  },
];

function ServiceDetailCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const isMedal = index < 3;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden group hover:border-persian/30 transition-colors duration-300"
    >
      {/* Top gradient accent bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${service.accent}`}
      />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Rank */}
          <div className="shrink-0 mt-0.5">
            {isMedal ? (
              <span className="text-2xl">{service.rank}</span>
            ) : (
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-bold text-white/40">
                {service.rank}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xl">{service.icon}</span>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                {service.title}
              </h3>
              {service.isNew && (
                <span className="shrink-0 rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                  NEW {"🔥".repeat(service.heat ?? 1)}
                </span>
              )}
            </div>
            <p className="text-[0.78rem] text-white/40 leading-relaxed">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] my-4" />

        {/* Items list */}
        <ul className="space-y-2.5">
          {service.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-start gap-2.5 text-[0.82rem] text-white/55 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-persian mt-[7px] shrink-0 group-hover:bg-yellow transition-colors duration-300" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ServicesContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="bg-persian/20 backdrop-blur-xl py-16 pb-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <ScrollReveal>
            <div className="text-xs font-extrabold tracking-[0.14em] uppercase text-white/50 mb-2">
              Services
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black tracking-[-0.03em] text-white mb-2.5">
              HighLevel Setup &amp; Optimization
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base text-white/60 leading-relaxed max-w-[560px]">
              8 core service areas engineered to build, automate, and scale your
              entire sales operation, from first click to closed deal.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-md">
        <div className="max-w-[1100px] mx-auto px-8 py-5">
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {[
                { val: "8", label: "Service Areas" },
                { val: "100%", label: "GHL Native" },
                { val: "48h", label: "Avg. Setup Start" },
                { val: "24/7", label: "System Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-lg font-black text-yellow tracking-tight">
                    {stat.val}
                  </div>
                  <div className="text-[0.65rem] text-white/35 font-semibold uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-[1100px] mx-auto px-8 py-16">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <StaggerItem key={service.title}>
              <ServiceDetailCard service={service} index={i} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-12 py-10">
              <h3 className="text-lg font-extrabold text-white">
                Not sure which service you need?
              </h3>
              <p className="text-sm text-white/45 max-w-[400px] leading-relaxed">
                Book a free 30-minute audit. I&apos;ll review your current setup
                and tell you exactly where to start.
              </p>
              <Link
                href="/consult"
                className="inline-flex items-center gap-2 px-7 py-3 bg-yellow text-black rounded-[9px] text-sm font-extrabold hover:bg-yellow-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(246,203,31,0.35)] transition-all duration-200"
              >
                Book Free Consultation →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
