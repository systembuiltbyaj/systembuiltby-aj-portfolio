/**
 * Service catalogue, shared by the v2 Services panel and the /services
 * structured data. Plain data so server components can read it too.
 */
export interface Service {
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
