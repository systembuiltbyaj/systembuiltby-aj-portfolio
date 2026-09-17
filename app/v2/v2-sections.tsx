"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dancing_Script } from "next/font/google";
import type { SectionId } from "./v2-shell";
import { coachingFunnels } from "@/app/projects/projects-content";
import {
  clientProjects, ajTutorials, claudeProjects, zapierTutorials, n8nProjects,
} from "@/app/system-builds/system-builds-content";

// Every recorded build, not just the client ones — same five arrays the
// /system-builds page renders, so the count here matches what is actually there.
const allBuilds = [
  ...clientProjects, ...ajTutorials, ...claudeProjects, ...zapierTutorials, ...n8nProjects,
];
import { services } from "@/app/services/services-content";
import { testimonials } from "@/components/sections/testimonials";
import { techStack } from "@/components/sections/certificates-explorer";
import { screens } from "@/components/sections/workflow-screens";

// Script face is used for the single "Hello, I'm" line only, matching v1.
const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"] });

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

/** Card surface. One constant so light and dark stay in step everywhere. */
const CARD =
  "rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_14px_-6px_rgba(20,16,31,0.16)] dark:border-white/[0.09] dark:bg-[#120e20] dark:shadow-none";

const MUTED = "text-black/55 dark:text-white/55";
const FAINT = "text-black/40 dark:text-white/40";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-persian dark:text-persian-light">
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2.5 max-w-[22ch] text-[clamp(1.6rem,3.1vw,2.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#14101f] dark:text-white">
      {children}
    </h2>
  );
}

/**
 * Sections are one viewport tall, so a long list scrolls inside its own grid
 * rather than behind next/next arrows. Everything is reachable in one place.
 */
function ScrollGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="-mx-1 mt-7 max-h-[calc(100dvh-19rem)] overflow-y-auto overscroll-contain px-1 pb-1">
      <div className={className}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1 · Home                                                           */
/* ------------------------------------------------------------------ */

const tools = [
  { name: "GoHighLevel", src: "/logos/gohighlevel.png" },
  { name: "n8n", src: "/logos/n8n.svg" },
  { name: "Zapier", src: "/logos/zapier.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Trigger.dev", src: "/logos/trigger.svg" },
  { name: "ClickUp", src: "/logos/clickup.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
];

/**
 * Tools strip as a continuous marquee. The track holds the list twice so the
 * loop is seamless, it pauses on hover, and prefers-reduced-motion stops it
 * outright rather than slowing it down.
 */
function ToolsMarquee() {
  const doubled = [...tools, ...tools];
  return (
    <div className="mt-9 max-w-[560px] overflow-hidden rounded-2xl lg:mt-14 border border-black/[0.07] bg-black/[0.02] py-4 backdrop-blur-sm dark:border-white/[0.07] dark:bg-white/[0.03]">
      <p className={`mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.16em] ${FAINT}`}>
        Tools I use daily
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f6f5fa] to-transparent dark:from-[#0d0a18]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f6f5fa] to-transparent dark:from-[#0d0a18]" />
        <ul className="marquee-scroll flex w-max gap-2.5 motion-reduce:[animation:none]">
          {doubled.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= tools.length}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 py-2 dark:border-white/[0.08] dark:bg-white/[0.05]"
            >
              <Image src={t.src} alt="" width={17} height={17} className="h-[17px] w-[17px] object-contain" />
              <span className="whitespace-nowrap text-[13px] font-medium text-black/75 dark:text-white/80">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const heroStats = [
  { n: "5+", l: "Years experience" },
  { n: "10+", l: "Projects completed" },
  { n: "5+", l: "Happy clients" },
];

const heroSocials = [
  { name: "Facebook", href: "https://www.facebook.com/Ajbactad29/", icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ajbactad29/", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  { name: "WhatsApp", href: "https://wa.me/639100809837", icon: <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.743-.981z" /> },
  { name: "GitHub", href: "https://github.com/systembuiltbyaj", icon: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /> },
];

export function HomeSection({ go }: { go: (id: SectionId) => void }) {
  return (
    <div className="relative mx-auto min-h-full max-w-[1340px]">
      {/* Oversized wordmark, same device as v1. Sits behind everything and is
          hidden from assistive tech — it is texture, not content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-6 select-none text-[clamp(5rem,17vw,14rem)] font-black leading-none tracking-[-0.05em] text-persian/[0.13] dark:text-persian/[0.22]"
      >
        PORTFOLIO
      </span>

      {/* Portrait sits between the two columns like v1. Decorative, and hidden
          below lg where there is no room for it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -top-24 hidden w-[46%] -translate-x-[14%] dark:lg:block xl:-top-28"
      >
        <Image
          src="/aj-hero-cutout.webp"
          alt=""
          fill
          priority
          sizes="600px"
          className="object-contain object-bottom opacity-95"
        />
      </div>

      <div className="relative grid min-h-full content-start gap-8 lg:h-full lg:grid-cols-[1.22fr_0.78fr] lg:content-center lg:gap-10">
        {/* ---- left: the pitch ---- */}
        <div className="relative z-10 flex min-w-0 flex-col lg:h-full lg:justify-center lg:py-4">
          <span className="inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full border border-black/10 bg-black/[0.04] px-3.5 py-1.5 text-[12.5px] font-semibold text-black/70 backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.06] dark:text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Available Nationwide
          </span>

          <p className={`${script.className} mt-5 text-[clamp(1.7rem,3.6vw,2.9rem)] leading-none text-black/70 dark:text-white/80`}>
            Hello, I&apos;m
          </p>
          <h1 className="mt-1.5 text-[clamp(2.6rem,7.2vw,5.8rem)] font-black leading-[0.92] tracking-[-0.045em] text-[#14101f] dark:text-white">
            AJ BACTAD
          </h1>
          <p className="mt-3 text-[clamp(0.85rem,1.55vw,1.15rem)] font-bold uppercase tracking-[0.13em] text-persian dark:text-yellow">
            GHL Certified &amp; AI Automation Specialist
          </p>

          <p className={`mt-5 max-w-[52ch] text-[clamp(0.95rem,1.15vw,1.15rem)] leading-relaxed ${MUTED}`}>
            I don&apos;t just connect tools, I engineer the system behind your growth. CRM, funnels,
            automations, and AI, wired into one operating system that runs the busywork so you can
            scale without the chaos.
          </p>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link
              href="/consult"
              className="inline-flex h-[3.4rem] items-center gap-2 rounded-full bg-persian px-8 text-[15.5px] font-bold text-white shadow-[0_12px_34px_-12px_rgba(94,23,235,0.9)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
            >
              Book Free Consultation →
            </Link>
            <button
              type="button"
              onClick={() => go("builds")}
              className="inline-flex h-[3.4rem] items-center rounded-full border border-black/12 bg-black/[0.03] px-8 text-[15.5px] font-bold text-[#14101f] transition-colors hover:bg-black/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.09]"
            >
              Check My System Build
            </button>
          </div>

          <ToolsMarquee />
        </div>

        {/* ---- right: proof column ---- */}
        <div className="relative z-10 flex min-w-0 flex-col gap-6 lg:h-full lg:items-end lg:justify-center lg:gap-10 lg:pt-14">
          <div className="flex flex-row justify-between gap-5 lg:flex-col lg:items-end lg:gap-8">
            {heroStats.map((st) => (
              <div key={st.l} className="lg:text-right">
                <p className="text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-none text-persian dark:text-yellow">
                  {st.n}
                </p>
                <p className={`mt-1.5 text-[clamp(0.68rem,0.85vw,0.8rem)] font-medium uppercase tracking-wider ${FAINT}`}>{st.l}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go("credentials")}
            className="inline-flex h-[3.1rem] items-center gap-2 rounded-full bg-persian px-6 text-[14.5px] font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-3 11.5 3 1.8 3-1.8V22l-3-1.8L9 22z" />
            </svg>
            Certificates &amp; Badges
          </button>

          <div className="flex flex-wrap gap-2.5 lg:justify-end">
            {heroSocials.map((so) => (
              <a
                key={so.name}
                href={so.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={so.name}
                title={so.name}
                className="flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-xl border border-black/10 bg-white text-black/50 transition-colors hover:border-persian/50 hover:text-persian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/45 dark:hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{so.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · System builds — Funnels | Automations                          */
/* ------------------------------------------------------------------ */

type BuildTab = "funnels" | "automations";

export function BuildsSection() {
  const [tab, setTab] = useState<BuildTab | null>(null);
  if (!tab) return <BuildsChooser onPick={setTab} />;
  return tab === "funnels"
    ? <FunnelsPanel onBack={() => setTab(null)} />
    : <AutomationsPanel onBack={() => setTab(null)} />;
}

function BuildsChooser({ onPick }: { onPick: (t: BuildTab) => void }) {
  const options: {
    id: BuildTab; title: string; blurb: string; count: string; art: string; icon: React.ReactNode;
  }[] = [
    {
      id: "funnels",
      title: "Funnels",
      blurb: "What your client sees. Opt-ins, webinars and core offers, every one of them live and still taking bookings today.",
      count: `${coachingFunnels.length} live builds`,
      art: coachingFunnels[0]?.thumbnail ?? "",
      icon: <path d="M3 5h18l-7 8v6l-4 2v-8z" />,
    },
    {
      id: "automations",
      title: "Automations",
      blurb: "What they never see. The workflows chasing leads at 2am, recorded end to end with nothing edited out.",
      count: `${allBuilds.length} walkthroughs`,
      art: clientProjects[0]?.image ?? "",
      icon: <path d="M4 5h16v14H4zM10 9l5 3-5 3z" />,
    },
  ];

  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>System builds</Eyebrow>
      <Title>Two ways to see the work.</Title>
      <p className={`mt-3 max-w-[58ch] text-[14.5px] leading-relaxed ${MUTED}`}>
        The funnels are what a client sees. The automations are what runs underneath. Pick either.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={`group overflow-hidden text-left transition-all hover:-translate-y-[3px] hover:border-persian/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian ${CARD}`}
          >
            <span className="relative block aspect-[16/8] overflow-hidden bg-black/5 dark:bg-black/40">
              {o.art && <Image src={o.art} alt="" fill sizes="620px" className="object-cover opacity-85 transition-opacity group-hover:opacity-100" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-persian text-white">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{o.icon}</svg>
                </span>
                <span className="text-[20px] font-black tracking-[-0.02em] text-white">{o.title}</span>
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {o.count}
              </span>
            </span>
            <span className="flex items-center justify-between gap-4 p-5">
              <span className={`text-[13.5px] leading-relaxed ${MUTED}`}>{o.blurb}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/12 text-black/50 transition-colors group-hover:bg-persian group-hover:text-white dark:border-white/15 dark:text-white/60">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackBar({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-4 inline-flex h-11 items-center gap-2 self-start rounded-full border border-black/10 bg-black/[0.03] pl-3 pr-4 text-[13px] font-bold text-[#14101f] transition-colors hover:bg-black/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.09]"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      System builds
    </button>
  );
}

function FunnelsPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <BackBar onBack={onBack} />
      <Eyebrow>Funnels</Eyebrow>
      <Title>Funnels and websites built to solve real problems.</Title>

      <ScrollGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coachingFunnels.map((f) => (
          <a
            key={`${f.title}-${f.subtitle}`}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group overflow-hidden transition-all hover:-translate-y-[3px] hover:border-persian/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian ${CARD}`}
          >
            <span className="relative block aspect-[16/10] overflow-hidden" style={{ background: `linear-gradient(135deg, ${f.gradientFrom}, ${f.gradientTo})` }}>
              {f.thumbnail && <Image src={f.thumbnail} alt="" fill sizes="420px" className="object-cover" />}
              <span className="absolute left-3 top-3 rounded-full bg-persian px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-lg">
                GoHighLevel build
              </span>
            </span>
            <span className="flex items-center justify-between gap-3 p-4">
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-bold text-[#14101f] dark:text-white">{f.title}</span>
                <span className={`mt-0.5 block truncate text-[12.5px] ${MUTED}`}>{f.subtitle}</span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/12 text-black/50 transition-colors group-hover:bg-persian group-hover:text-white dark:border-white/15 dark:text-white/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
              </span>
            </span>
          </a>
        ))}
      </ScrollGrid>
      <p className={`mt-3 text-center text-[12.5px] ${FAINT}`}>
        All {coachingFunnels.length} live client funnels
      </p>
    </div>
  );
}

function AutomationsPanel({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <BackBar onBack={onBack} />
      <Eyebrow>Automations</Eyebrow>
      <Title>Watch the actual build, not a highlight reel.</Title>

      <ScrollGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allBuilds.map((b) => (
          <div key={b.title} className={`overflow-hidden ${CARD}`}>
            <div className="relative aspect-[16/9] bg-black/10 dark:bg-black/40">
              {playing === b.title && b.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${b.videoId}?autoplay=1`}
                  title={b.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <>
                  {b.image && <Image src={b.image} alt="" fill sizes="420px" className="object-cover" />}
                  {b.videoId && (
                    <button
                      type="button"
                      onClick={() => setPlaying(b.title)}
                      aria-label={`Play ${b.title}`}
                      className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition-colors group-hover:bg-persian">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-white"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </button>
                  )}
                  {b.duration && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{b.duration}</span>
                  )}
                </>
              )}
            </div>
            <div className="p-4">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-persian dark:text-persian-light">{b.category}</span>
              <p className="mt-1.5 text-[14.5px] font-bold leading-snug text-[#14101f] dark:text-white">{b.title}</p>
              <p className={`mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed ${MUTED}`}>{b.description}</p>
            </div>
          </div>
        ))}
      </ScrollGrid>
      <p className={`mt-3 text-center text-[12.5px] ${FAINT}`}>
        All {allBuilds.length} recorded walkthroughs
      </p>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  Under the hood — real screens                                      */
/* ------------------------------------------------------------------ */

export function ScreensSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Under the hood</Eyebrow>
      <Title>The real screens, not a mockup of one.</Title>
      <p className={`mt-3 max-w-[58ch] text-[14.5px] leading-relaxed ${MUTED}`}>
        Straight out of the accounts these systems run in. Dashboards, routers and workflow
        libraries, exactly as a client finds them on a Monday morning.
      </p>

      <ScrollGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {screens.map((sc) => (
          <figure key={sc.label} className={`overflow-hidden ${CARD}`}>
            <span className="relative block aspect-[16/10] overflow-hidden bg-black/5 dark:bg-black/40">
              {sc.image && (
                <Image
                  src={sc.image}
                  alt={sc.label}
                  fill
                  sizes="420px"
                  className={sc.pos === "center" ? "object-cover object-center" : "object-cover object-top"}
                />
              )}
            </span>
            <figcaption className="p-4">
              <p className="text-[14px] font-bold text-[#14101f] dark:text-white">{sc.label}</p>
              <p className={`mt-1 truncate font-mono text-[11.5px] ${FAINT}`}>{sc.url}</p>
            </figcaption>
          </figure>
        ))}
      </ScrollGrid>
      <p className={`mt-3 text-center text-[12.5px] ${FAINT}`}>All {screens.length} screens</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                       */
/* ------------------------------------------------------------------ */

export function ServicesSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Services</Eyebrow>
      <Title>What I build for coaches and agencies.</Title>

      <ScrollGrid className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className={`p-5 ${CARD}`}>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.03] text-xl dark:border-white/10 dark:bg-white/[0.06]">
                {s.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-[#14101f] dark:text-white">{s.title}</p>
                <p className={`mt-1 text-[13px] leading-relaxed ${MUTED}`}>{s.subtitle}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-black/[0.07] pt-3.5 dark:border-white/[0.06]">
              {s.items.slice(0, 3).map((it: string) => (
                <li key={it} className={`flex gap-2.5 text-[12.5px] leading-relaxed ${MUTED}`}>
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-persian dark:bg-yellow" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ScrollGrid>
      <p className={`mt-3 text-center text-[12.5px] ${FAINT}`}>
        All {services.length} service categories
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · Credentials                                                    */
/* ------------------------------------------------------------------ */

export function CredentialsSection() {
  const total = techStack.reduce((n, t) => n + t.badges.length, 0);
  const [tool, setTool] = useState(techStack[0]);

  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Credentials &amp; recognition</Eyebrow>
      <Title>Certified across the stack I actually build on.</Title>

      <div className="mt-8 grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-2.5">
          {techStack.map((t) => {
            const on = t.id === tool.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian ${
                  on
                    ? "border-persian/60 bg-persian/10 dark:bg-persian/15"
                    : "border-black/[0.08] bg-white hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:bg-white/[0.07]"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white dark:border-0">
                  <Image src={t.logo} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold text-[#14101f] dark:text-white">{t.name}</span>
                  <span className={`block text-[12px] ${MUTED}`}>{t.badges.length} credentials</span>
                </span>
                {on && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-persian dark:bg-yellow" />}
              </button>
            );
          })}
          <p className={`pt-1 text-center text-[12.5px] ${FAINT}`}>
            <span className="font-bold text-persian dark:text-yellow">{total}</span> verified in total
          </p>
        </div>

        <div className={`p-5 ${CARD}`}>
          <div className="grid max-h-[46vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
            {tool.badges.map((b) => (
              <div key={b.src} className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-2.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <span className="relative block aspect-square">
                  <Image src={b.src} alt={b.label} fill sizes="150px" className="object-contain" />
                </span>
                <p className={`mt-2 line-clamp-2 text-center text-[10.5px] leading-snug ${FAINT}`}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5 · Testimonials                                                   */
/* ------------------------------------------------------------------ */

const HIDDEN_TESTIMONIALS = ["Patricia Villanueva", "Daniel Reyes"];

export function TestimonialsSection() {
  const shown = testimonials.filter((t) => !HIDDEN_TESTIMONIALS.includes(t.name));
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Testimonials</Eyebrow>
      <Title>What the people I built for say about the work.</Title>

      <ScrollGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <div key={t.name} className={`flex flex-col p-5 ${CARD}`}>
            {t.type === "video" ? (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-black/10 dark:bg-black/40">
                {playing === t.name ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
                    title={`${t.name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <>
                    {/* Verticals are Shorts: blur a copy behind so the frame fills without cropping faces. */}
                    {t.poster && t.vertical && (
                      <Image src={t.poster} alt="" fill sizes="380px" className="scale-110 object-cover blur-xl" />
                    )}
                    {t.poster && (
                      <Image
                        src={t.poster}
                        alt=""
                        fill
                        sizes="380px"
                        className={t.vertical ? "object-contain" : "object-cover"}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setPlaying(t.name)}
                      aria-label={`Play ${t.name}'s testimonial`}
                      className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/55 backdrop-blur-sm transition-colors group-hover:bg-persian">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-white"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className={`mb-4 flex-1 text-[13.5px] leading-relaxed ${MUTED}`}>&ldquo;{t.quote}&rdquo;</p>
            )}
            <div className="mt-auto flex items-center gap-3">
              {t.type === "text" && t.avatar && (
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt="" fill sizes="36px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-bold text-[#14101f] dark:text-white">{t.name}</span>
                <span className={`block truncate text-[12px] ${MUTED}`}>{t.role}</span>
              </span>
            </div>
          </div>
        ))}
      </ScrollGrid>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6 · About                                                          */
/* ------------------------------------------------------------------ */

const stats = [
  { n: "5+", l: "Years experience" },
  { n: "10+", l: "Projects completed" },
  { n: "43", l: "Certifications" },
  { n: "5+", l: "Happy clients" },
];

export function AboutSection() {
  return (
    <div className="mx-auto grid min-h-full max-w-[1340px] content-start gap-10 lg:content-center lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.09]">
        <Image src="/aj-about.webp" alt="AJ Bactad" fill sizes="340px" className="object-cover object-top" />
      </div>

      <div className="min-w-0">
        <Eyebrow>About</Eyebrow>
        <Title>From Amazon operations to building the systems businesses run on.</Title>

        <div className={`mt-5 space-y-3.5 text-[14.5px] leading-relaxed ${MUTED}`}>
          <p>
            Five years running eCommerce operations, ending as Head of Operations. SOPs, KPIs,
            team management, and the daily work of finding where a process quietly breaks.
          </p>
          <p>
            Last November I barely knew any of this. GoHighLevel, n8n, Zapier, Trigger.dev,
            Claude. Ten months later I build real systems with the same stack, and the operations
            background is the reason they hold up. I ask where the bottleneck is and who owns the
            next action, not just which tool to connect.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-xl border border-black/[0.08] bg-white px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.035]">
              <p className="text-2xl font-black leading-none text-persian dark:text-yellow">{s.n}</p>
              <p className={`mt-1.5 text-[11.5px] leading-snug ${MUTED}`}>{s.l}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7 · Contact                                                        */
/* ------------------------------------------------------------------ */

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/systembuiltbyaj",
    icon: <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Ajbactad29/",
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ajbactad29/",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
];

export function ContactSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[860px] flex-col items-center justify-start text-center lg:justify-center">
      <Eyebrow>Contact</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-black leading-[1.03] tracking-[-0.035em] text-[#14101f] dark:text-white">
        Tell me what keeps breaking.
        <br />
        <span className="text-persian dark:text-yellow">I&apos;ll map the fix.</span>
      </h2>
      <p className={`mt-5 max-w-[52ch] text-[15px] leading-relaxed ${MUTED}`}>
        A free 30-minute call. Bring the process that eats the most time and we will work out
        whether it is worth automating, before anyone talks about building anything.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/consult"
          className="inline-flex h-12 items-center rounded-full bg-persian px-7 text-[14.5px] font-bold text-white transition-transform hover:scale-[1.02] dark:bg-yellow dark:text-[#08060e]"
        >
          Book a free consult
        </Link>
        <a
          href="https://wa.me/639100809837"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center rounded-full border border-black/12 bg-black/[0.03] px-7 text-[14.5px] font-bold text-[#14101f] transition-colors hover:bg-black/[0.07] dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.09]"
        >
          Message on WhatsApp
        </a>
      </div>

      <div className="mt-9 flex items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            title={s.name}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white text-black/55 transition-colors hover:border-persian/50 hover:text-persian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian dark:border-white/12 dark:bg-white/[0.05] dark:text-white/60 dark:hover:text-white"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{s.icon}</svg>
          </a>
        ))}
      </div>
    </div>
  );
}
