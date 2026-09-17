"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SectionId } from "./v2-shell";
import { coachingFunnels } from "@/app/projects/projects-content";
import { clientProjects } from "@/app/system-builds/system-builds-content";
import { services } from "@/app/services/services-content";
import { testimonials } from "@/components/sections/testimonials";
import { techStack } from "@/components/sections/certificates-explorer";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-persian-light">{children}</p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2.5 max-w-[22ch] text-[clamp(1.6rem,3.1vw,2.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
      {children}
    </h2>
  );
}

/** Pager used by every section that holds more than one screen of cards. */
function Pager({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onChange((page - 1 + pages) % pages)}
        aria-label="Previous"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-label={`Page ${i + 1} of ${pages}`}
            aria-current={i === page ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all ${i === page ? "w-7 bg-yellow" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange((page + 1) % pages)}
        aria-label="Next"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-persian text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  );
}

function usePaged<T>(items: T[], per: number) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / per));
  const slice = items.slice(page * per, page * per + per);
  return { page, pages, slice, setPage };
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

export function HomeSection({ go }: { go: (id: SectionId) => void }) {
  const featured = clientProjects[0];
  const rest = clientProjects.slice(1, 3);

  return (
    <div className="mx-auto grid min-h-full max-w-[1340px] content-start gap-10 lg:content-center lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
      {/* left */}
      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[12.5px] font-semibold text-white/80 backdrop-blur-sm">
          <span className="text-yellow">✦</span>
          GHL Certified Admin &amp; AI Automation Specialist
        </span>

        <h1 className="mt-5 text-[clamp(2.1rem,5vw,3.9rem)] font-black leading-[0.98] tracking-[-0.04em] text-white">
          I don&apos;t chase growth.
          <br />
          <span className="text-yellow">I engineer the system</span>
          <br />
          behind it.
        </h1>

        <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-white/60">
          A missed lead never gets a second chance. I build CRM systems, funnels, and automations
          inside GoHighLevel that capture every enquiry, follow up on their own, and keep working
          long after the project ends.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => go("projects")}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-persian px-6 text-[14.5px] font-bold text-white shadow-[0_12px_34px_-10px_rgba(94,23,235,0.9)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
          >
            See my work
          </button>
          <Link
            href="/consult"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-[14.5px] font-bold text-white transition-colors hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
          >
            Start a project
          </Link>
        </div>

        {/* tools */}
        <div className="mt-9 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-sm">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
            Daily drivers · tools I build with
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {tools.map((t) => (
              <span
                key={t.name}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2"
              >
                <Image src={t.src} alt="" width={17} height={17} className="h-[17px] w-[17px] object-contain" />
                <span className="whitespace-nowrap text-[13px] font-medium text-white/80">{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* right — featured build + two compact rows */}
      <div className="min-w-0">
        <Eyebrow>Selected work</Eyebrow>
        <button
          type="button"
          onClick={() => go("builds")}
          className="group mt-3 block w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#120e20] text-left transition-colors hover:border-persian/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
        >
          {featured?.image && (
            <span className="relative block aspect-[16/9] overflow-hidden">
              <Image src={featured.image} alt="" fill sizes="520px" className="object-cover" />
            </span>
          )}
          <span className="block p-4">
            <span className="block text-[15px] font-bold leading-snug text-white">{featured?.title}</span>
            <span className="mt-1 block text-[13px] text-white/50">{featured?.category}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-persian-light transition-colors group-hover:text-yellow">
              View project
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </span>
        </button>

        <div className="mt-2.5 space-y-2.5">
          {rest.map((b) => (
            <button
              key={b.title}
              type="button"
              onClick={() => go("builds")}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-left transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
            >
              <span className="truncate text-[13.5px] font-semibold text-white/85">{b.title}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="shrink-0 text-white/40"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · Projects                                                       */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  const { page, pages, slice, setPage } = usePaged(coachingFunnels, 3);
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Projects</Eyebrow>
      <Title>Funnels and websites built to solve real problems.</Title>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((f) => (
          <a
            key={`${f.title}-${f.subtitle}`}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#120e20] transition-all hover:-translate-y-[3px] hover:border-yellow/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
          >
            <span className="relative block aspect-[16/10] overflow-hidden" style={{ background: `linear-gradient(135deg, ${f.gradientFrom}, ${f.gradientTo})` }}>
              {f.thumbnail && <Image src={f.thumbnail} alt="" fill sizes="420px" className="object-cover" />}
              <span className="absolute left-3 top-3 rounded-full bg-persian px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-lg">
                GoHighLevel build
              </span>
            </span>
            <span className="flex items-center justify-between gap-3 p-4">
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-bold text-white">{f.title}</span>
                <span className="mt-0.5 block truncate text-[12.5px] text-white/50">{f.subtitle}</span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors group-hover:bg-yellow group-hover:text-[#08060e]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
              </span>
            </span>
          </a>
        ))}
      </div>

      <Pager page={page} pages={pages} onChange={setPage} />
      <p className="mt-4 text-center text-[12.5px] text-white/35">
        {coachingFunnels.length} live client funnels ·{" "}
        <Link href="/projects" className="font-semibold text-persian-light hover:text-yellow">
          see the full showcase
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3 · System builds                                                  */
/* ------------------------------------------------------------------ */

export function BuildsSection() {
  const { page, pages, slice, setPage } = usePaged(clientProjects, 3);
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>System builds</Eyebrow>
      <Title>Watch the actual build, not a highlight reel.</Title>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((b) => (
          <div key={b.title} className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#120e20]">
            <div className="relative aspect-[16/9] bg-black/40">
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
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition-colors group-hover:bg-yellow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-white group-hover:text-[#08060e]"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </button>
                  )}
                  {b.duration && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {b.duration}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="p-4">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-persian-light">{b.category}</span>
              <p className="mt-1.5 text-[14.5px] font-bold leading-snug text-white">{b.title}</p>
              <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-white/50">{b.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Pager page={page} pages={pages} onChange={setPage} />
      <p className="mt-4 text-center text-[12.5px] text-white/35">
        <Link href="/system-builds" className="font-semibold text-persian-light hover:text-yellow">
          every recorded walkthrough →
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · Services                                                       */
/* ------------------------------------------------------------------ */

export function ServicesSection() {
  const { page, pages, slice, setPage } = usePaged(services, 4);
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Services</Eyebrow>
      <Title>What I build for coaches and agencies.</Title>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {slice.map((s) => (
          <div key={s.title} className="rounded-2xl border border-white/[0.09] bg-[#120e20] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl">
                {s.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-white">{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">{s.subtitle}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3.5">
              {s.items.slice(0, 3).map((it: string) => (
                <li key={it} className="flex gap-2.5 text-[12.5px] leading-relaxed text-white/60">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-yellow" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Pager page={page} pages={pages} onChange={setPage} />
      <p className="mt-4 text-center text-[12.5px] text-white/35">
        {services.length} service categories ·{" "}
        <Link href="/packages" className="font-semibold text-persian-light hover:text-yellow">
          see packages
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5 · Credentials                                                    */
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
                  on ? "border-persian/60 bg-persian/15" : "border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.07]"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Image src={t.logo} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold text-white">{t.name}</span>
                  <span className="block text-[12px] text-white/45">{t.badges.length} credentials</span>
                </span>
                {on && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />}
              </button>
            );
          })}
          <p className="pt-1 text-center text-[12.5px] text-white/35">
            <span className="font-bold text-yellow">{total}</span> verified in total
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.09] bg-[#120e20] p-5">
          <div className="grid max-h-[46vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
            {tool.badges.map((b) => (
              <div key={b.src} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
                <span className="relative block aspect-square">
                  <Image src={b.src} alt={b.label} fill sizes="150px" className="object-contain" />
                </span>
                <p className="mt-2 line-clamp-2 text-center text-[10.5px] leading-snug text-white/45">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[12.5px] text-white/35">
        <Link href="/credentials" className="font-semibold text-persian-light hover:text-yellow">
          open the full credentials page →
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6 · Testimonials                                                   */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  const { page, pages, slice, setPage } = usePaged(testimonials, 3);
  return (
    <div className="mx-auto flex min-h-full max-w-[1340px] flex-col justify-start lg:justify-center">
      <Eyebrow>Testimonials</Eyebrow>
      <Title>What the people I built for say about the work.</Title>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((t) => (
          <div key={t.name} className="flex flex-col rounded-2xl border border-white/[0.09] bg-[#120e20] p-5">
            {t.type === "video" ? (
              <span className="relative mb-4 block aspect-video overflow-hidden rounded-xl bg-black/40">
                {t.poster && <Image src={t.poster} alt="" fill sizes="380px" className="object-cover" />}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-white"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </span>
            ) : (
              <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>
            )}
            <div className="mt-auto flex items-center gap-3">
              {t.type === "text" && t.avatar && (
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt="" fill sizes="36px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-bold text-white">{t.name}</span>
                <span className="block truncate text-[12px] text-white/45">{t.role}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Pager page={page} pages={pages} onChange={setPage} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7 · About                                                          */
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
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/[0.09]">
        <Image src="/aj-about.webp" alt="AJ Bactad" fill sizes="340px" className="object-cover object-top" />
      </div>

      <div className="min-w-0">
        <Eyebrow>About</Eyebrow>
        <Title>From Amazon operations to building the systems businesses run on.</Title>

        <div className="mt-5 space-y-3.5 text-[14.5px] leading-relaxed text-white/60">
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
            <div key={s.l} className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
              <p className="text-2xl font-black leading-none text-yellow">{s.n}</p>
              <p className="mt-1.5 text-[11.5px] leading-snug text-white/45">{s.l}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-7 inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/[0.09]"
        >
          Read the full story
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8 · Contact                                                        */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[860px] flex-col items-center justify-start text-center lg:justify-center">
      <Eyebrow>Contact</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-black leading-[1.03] tracking-[-0.035em] text-white">
        Tell me what keeps breaking.
        <br />
        <span className="text-yellow">I&apos;ll map the fix.</span>
      </h2>
      <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/60">
        A free 30-minute call. Bring the process that eats the most time and we will work out
        whether it is worth automating, before anyone talks about building anything.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/consult"
          className="inline-flex h-12 items-center rounded-full bg-yellow px-7 text-[14.5px] font-bold text-[#08060e] transition-transform hover:scale-[1.02]"
        >
          Book a free consult
        </Link>
        <a
          href="https://wa.me/639100809837"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-[14.5px] font-bold text-white transition-colors hover:bg-white/[0.09]"
        >
          Message on WhatsApp
        </a>
      </div>

      <p className="mt-8 text-[13px] text-white/35">
        Or reach me on{" "}
        <a href="https://www.linkedin.com/in/ajbactad29/" target="_blank" rel="noopener noreferrer" className="font-semibold text-persian-light hover:text-yellow">LinkedIn</a>
        {" · "}
        <a href="https://directory.gohighlevel.com/philippines/san-antonio/certified-admins/allen-bactad" target="_blank" rel="noopener noreferrer" className="font-semibold text-persian-light hover:text-yellow">HighLevel Directory</a>
      </p>
    </div>
  );
}
