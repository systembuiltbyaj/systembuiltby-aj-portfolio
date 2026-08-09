"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MentorsContent } from "../mentors/mentors-content";
import {
  LayoutTemplate,
  GitBranch,
  Workflow,
  CalendarClock,
  MessageSquare,
  Bot,
  MonitorSmartphone,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CertificatesExplorer } from "@/components/sections/certificates-explorer";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

type Category = {
  Icon: LucideIcon;
  name: string;
  desc: string;
  isNew?: boolean;
  heat?: number;
};

const categories: Category[] = [
  { Icon: LayoutTemplate, name: "Funnel & Website Systems", desc: "High-converting landing pages and sales funnels" },
  { Icon: GitBranch, name: "CRM & Pipeline Systems", desc: "Structured lead tracking from first touch to close" },
  { Icon: Workflow, name: "Automation & Workflows", desc: "End-to-end GHL workflow automation" },
  { Icon: CalendarClock, name: "Booking Systems", desc: "Calendar integration with automated reminders" },
  { Icon: MessageSquare, name: "A2P 10DLC Setup", desc: "Compliant SMS registration and setup", isNew: true, heat: 1 },
  { Icon: Bot, name: "AI Chatbot Systems", desc: "Intelligent bots that qualify leads 24/7", isNew: true, heat: 2 },
  { Icon: MonitorSmartphone, name: "Custom Frontend", desc: "Tailored web interfaces and dashboards" },
  { Icon: Plug, name: "Advanced Integrations", desc: "API and webhook connections across your stack" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-yellow">
      {children}
    </p>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-white/65">{children}</p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white/90">{children}</strong>;
}

function EmphasisLine({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={`text-lg font-bold leading-snug ${accent ? "text-yellow" : "text-white"}`}
    >
      {children}
    </p>
  );
}

const positioningSlides = [
  {
    label: "What I Do",
    body: (
      <>
        <BodyText>
          I help businesses streamline their operations by building systems that
          reduce manual work, improve efficiency, and create better customer
          experiences.
        </BodyText>
        <BodyText>
          My primary platform is <Strong>GoHighLevel</Strong>, where I build
          websites, landing pages, sales funnels, CRM systems, pipeline
          automations, appointment booking systems, and AI-powered workflows.
        </BodyText>
        <BodyText>
          When projects require more advanced functionality, I integrate tools
          like <Strong>n8n</Strong>, <Strong>Claude</Strong>,{" "}
          <Strong>APIs</Strong>, and <Strong>AI agents</Strong> to connect
          multiple applications and automate business processes from end to end.
        </BodyText>
        <BodyText>Every solution I build is designed with one goal in mind:</BodyText>
        <EmphasisLine accent>
          Create systems that save time, simplify operations, and help businesses
          grow with confidence.
        </EmphasisLine>
      </>
    ),
  },
  {
    label: "My Approach",
    body: (
      <>
        <BodyText>
          I don&apos;t believe automation should make a business more complicated.
        </BodyText>
        <BodyText>
          Before I build anything, I take time to understand how the business
          operates, identify repetitive tasks, and find opportunities where
          automation can make the biggest impact.
        </BodyText>
        <BodyText>
          From there, I design systems that fit the business, not the other way
          around.
        </BodyText>
        <BodyText>
          Whether it&apos;s a website, CRM, funnel, AI automation, or backend
          workflow, I focus on creating solutions that are reliable, scalable, and
          easy for teams to use every day.
        </BodyText>
        <BodyText>
          Because technology should support your business, not slow it down.
        </BodyText>
      </>
    ),
  },
  {
    label: "Why Work With Me",
    body: (
      <>
        <BodyText>I don&apos;t just build automations.</BodyText>
        <BodyText>
          I look at the entire customer journey, from the moment someone visits
          your website to becoming a paying customer, and build systems that help
          every step work together.
        </BodyText>
        <BodyText>
          My background in operations allows me to think beyond the software. I
          focus on improving workflows, reducing bottlenecks, and building systems
          that make running a business easier.
        </BodyText>
        <BodyText>
          Whether you&apos;re a startup, local business, agency, or growing
          company, my goal is to create solutions that continue working long after
          they&apos;re launched.
        </BodyText>
      </>
    ),
  },
];

function PositioningSlideshow() {
  const [i, setI] = useState(0);
  const n = positioningSlides.length;
  const next = () => setI((p) => (p + 1) % n);
  const prev = () => setI((p) => (p - 1 + n) % n);
  const slide = positioningSlides[i];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <SectionLabel>{slide.label}</SectionLabel>
        <span className="text-xs font-semibold text-white/40">
          {i + 1} / {n}
        </span>
      </div>

      <div className="min-h-[320px] sm:min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-4"
          >
            {slide.body}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous section"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 transition-all hover:border-persian/50 hover:bg-white/[0.10] hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="flex flex-1 items-center gap-1.5">
          {positioningSlides.map((s, idx) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Go to ${s.label}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-yellow" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next section"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-persian/60 bg-persian text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_20px_rgba(94,23,235,0.4)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="bg-transparent">
      {/* Hero */}
        <section className="bg-persian/20 backdrop-blur-xl px-8 py-16 pb-12">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
              About
            </p>
            <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              About AJ
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
              Automation engineer building business systems with GoHighLevel, n8n, and AI, CRM automation, AI agents, and end-to-end workflows powered by Claude.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-14 px-8 py-16 pb-20 lg:grid-cols-[1fr_340px]">
          {/* Left column, Bio */}
          <div className="flex flex-col gap-10">
            {/* Title */}
            <ScrollReveal delay={0.05}>
              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white md:text-5xl">
                Engineering
                <br />
                Growth
                <br />
                Through
                <br />
                Structure
              </h1>
            </ScrollReveal>

            {/* My Story */}
            <ScrollReveal delay={0.05}>
              <SectionLabel>My Story</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <BodyText>
                My career didn&apos;t start in tech, it started in operations.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                From <Strong>2016 to 2020</Strong>, I worked as a{" "}
                <Strong>Branch Head Supervisor</Strong> in the financial industry.
                I managed branch operations, led a team, worked toward sales
                targets, and focused on improving the customer experience.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                Looking back, I realized I enjoyed solving problems, improving
                processes, and making work more efficient. But eventually, I felt
                there wasn&apos;t much room to grow anymore. I wanted more than just
                working to pay the bills, I wanted to build a career without limits.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>So after work, I started learning about freelancing.</BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                A fun fact about my journey: on <Strong>October 14, 2020</Strong>,
                I submitted my immediate resignation. Just two days later, on{" "}
                <Strong>October 16</Strong>, I got hired, and the very next day, I
                started freelancing as an{" "}
                <Strong>Amazon Product Researcher</Strong>.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                It was a completely different industry, and I had to learn
                everything from scratch. Through continuous learning and hands-on
                experience, I was promoted to <Strong>Head of Operations</Strong>{" "}
                after just six months.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                In that role, I managed a team of product researchers, oversaw
                purchasing operations, and helped improve business workflows.
                That&apos;s when I realized something about myself, I enjoyed fixing
                broken systems just as much as managing people.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                After nearly five years in eCommerce, I was ready for another
                challenge.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                In <Strong>November 2025</Strong>, I started learning{" "}
                <Strong>AI and automation</Strong>. I enrolled in{" "}
                <Strong>Coach Jaycee Tan&apos;s Automation Program</Strong> and
                immersed myself in GoHighLevel, APIs, workflows, and AI-powered
                business systems.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                The more I learned, the more I realized this was exactly what I
                wanted to do.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                By <Strong>February 2026</Strong>, I landed my first client as an{" "}
                <Strong>Automation Specialist</Strong>. Soon after, I worked with{" "}
                <Strong>Coach Lish Aquino</Strong>, founder of{" "}
                <Strong>Amazenation OPC</Strong>, helping improve and optimize
                backend operations through automation.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                Since then, I&apos;ve continued building websites, sales funnels,
                CRM systems, AI automations, and backend workflows for businesses
                across different industries.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                Technology continues to evolve, especially AI, and I believe
                learning never stops. That&apos;s why I&apos;m constantly expanding
                my skills beyond GoHighLevel, exploring tools like{" "}
                <Strong>n8n</Strong>, <Strong>AI agents</Strong>,{" "}
                <Strong>APIs</Strong>, and modern automation platforms to build
                even better solutions for my clients.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                One lesson has stayed with me throughout my journey:
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <blockquote className="border-l-[3px] border-yellow pl-5">
                <EmphasisLine>
                  Businesses don&apos;t grow because people work harder. They grow
                  because they build better systems.
                </EmphasisLine>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BodyText>
                Today, that&apos;s exactly what I help businesses do.
              </BodyText>
            </ScrollReveal>

            {/* What I Do / My Approach / Why Work With Me, slideshow */}
            <ScrollReveal delay={0.05}>
              <PositioningSlideshow />
            </ScrollReveal>

            {/* Let's Build Something Better, CTA */}
            <ScrollReveal delay={0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
                <SectionLabel>Let&apos;s Build Something Better</SectionLabel>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                  If you&apos;re looking for someone who understands both{" "}
                  <Strong>business operations</Strong> and{" "}
                  <Strong>AI automation</Strong>, I&apos;d love to help. Whether you
                  need a high-converting website, a complete GoHighLevel setup,
                  AI-powered workflows, or a fully connected backend system,
                  let&apos;s build something that helps your business run smarter, not
                  harder.
                </p>
                <p className="mt-5 text-base font-bold text-white">
                  Ready to automate and scale your business?
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/consult"
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-yellow/85 hover:shadow-[0_12px_40px_rgba(234,179,8,0.3)] hover:-translate-y-[2px]"
                  >
                    Book a Free Strategy Call →
                  </Link>
                  <Link
                    href="/system-builds"
                    className="inline-flex items-center gap-2 rounded-lg border border-persian/30 bg-persian/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-persian/40 hover:border-persian/50"
                  >
                    Explore My System Builds →
                  </Link>
                </div>
                <a
                  href="/aj-bactad-ghl-resume.pdf"
                  download="AJ Bactad - GHL.pdf"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow/80 transition-colors hover:text-yellow"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download My Resume
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column, Sticky sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex flex-col gap-6">
              {/* Photo placeholder */}
              <ScrollReveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
                  <Image
                    src="/aj-about.webp"
                    alt="Allen Bactad"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>

              {/* Category stack */}
              <StaggerChildren className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <StaggerItem key={cat.name}>
                    <div className="group flex items-center gap-3 rounded-[10px] border border-white/[0.08] border-l-2 border-l-transparent bg-white/[0.04] px-3.5 py-3 transition-all hover:border-persian/30 hover:border-l-yellow hover:bg-persian/[0.12]">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-persian/25 bg-persian/15 text-white/75 transition-colors group-hover:border-yellow/40 group-hover:text-yellow">
                        <cat.Icon size={16} strokeWidth={2} aria-hidden />
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white/70 transition-colors group-hover:text-white">{cat.name}</span>
                        <p className="text-[0.65rem] text-white/35 mt-0.5 leading-snug">{cat.desc}</p>
                      </div>
                      {cat.isNew && (
                        <span className="ml-auto shrink-0 rounded-full bg-yellow px-1.5 py-0.5 text-[0.55rem] font-extrabold text-black">
                          NEW {"🔥".repeat(cat.heat ?? 1)}
                        </span>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </div>
  );
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-gradient-to-r from-persian to-[#7b3ff2] text-white shadow-[0_4px_20px_rgba(94,23,235,0.45)]"
          : "border border-white/[0.08] bg-white/[0.05] text-white/60 hover:bg-white/[0.09] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function BadgesPanel() {
  // Same tech-stack picker -> coverflow flow as the hero popup (shared component),
  // rendered larger for the roomier page, with the homepage CTAs below.
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-16">
      <CertificatesExplorer large />

      <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/consult"
          className="inline-flex items-center rounded-xl border border-persian/60 bg-persian px-6 py-3 font-semibold text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_30px_rgba(94,23,235,0.35)]"
        >
          Book Free Consultation &rarr;
        </Link>
        <Link
          href="/system-builds"
          className="inline-flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.07]"
        >
          Check My System Build
        </Link>
      </div>
    </div>
  );
}

export function AboutContent() {
  const [tab, setTab] = useState<"about" | "mentors" | "badges">("about");

  // The panels are tab state, not routed sections, so a deep link has to
  // select the tab rather than scroll to an anchor. A Link whose pathname is
  // unchanged and only the hash differs doesn't remount this component, so we
  // also have to listen for hashchange to catch in-app navigation and back/forward.
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#badges") setTab("badges");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
        {/* Merged tab bar */}
        <div className="sticky top-20 z-30 border-b border-white/[0.06] bg-[#0c0a17]/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1100px] items-center gap-2 overflow-x-auto px-6 py-3">
            <TabPill active={tab === "about"} onClick={() => setTab("about")}>
              About
            </TabPill>
            <TabPill active={tab === "mentors"} onClick={() => setTab("mentors")}>
              Mentors
            </TabPill>
            <TabPill active={tab === "badges"} onClick={() => setTab("badges")}>
              Badge &amp; Certificates
            </TabPill>
          </div>
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {tab === "about" ? (
              <AboutPanel />
            ) : tab === "mentors" ? (
              <MentorsContent embedded />
            ) : (
              <BadgesPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
