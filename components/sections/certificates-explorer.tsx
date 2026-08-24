"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Orientation = "portrait" | "square" | "landscape";
type Badge = { src: string; label: string };
type Tool = {
  id: string;
  name: string;
  logo: string;
  orientation: Orientation;
  badges: Badge[];
  comingSoon?: boolean;
};

// One array drives the whole flow. First badge in each list is the MAIN.
// To add a tool's certs later, drop files in /public/badges/<tool>/ and list them.
const techStack: Tool[] = [
  {
    id: "ghl",
    name: "GoHighLevel",
    logo: "/logos/gohighlevel.png",
    orientation: "portrait",
    badges: [
      { src: "/badges/badges.webp", label: "HL Accelerator — Certified Admin, Tier 3" },
      { src: "/badges/hla-badge.webp", label: "HL Accelerator — Automation Builder" },
      { src: "/badges/certified-admin-badge.webp", label: "HighLevel Directory — Certified Admin" },
      { src: "/badges/certificate.webp", label: "Certification Letter" },
      { src: "/badges/certified-admin-passed.webp", label: "Certified Admin — Exam Passed" },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    logo: "/logos/n8n.svg",
    orientation: "landscape",
    badges: [
      { src: "/badges/n8n/n8n-quickstart.webp", label: "n8n Quickstart — Certificate" },
      { src: "/badges/n8n/in-practice.webp", label: "In Practice: AI, Testing & Best Practices — Badge" },
      { src: "/badges/n8n/quickstart-verified.webp", label: "n8n Quickstart — Verified Credential" },
      { src: "/badges/n8n/quickstart-skills.webp", label: "n8n Quickstart — Skills & Criteria" },
      { src: "/badges/n8n/quickstart-progress.webp", label: "n8n Quickstart — Course Progress" },
      { src: "/badges/n8n/quickstart-badge-email.webp", label: "n8n Quickstart — Badge Awarded" },
      { src: "/badges/n8n/in-practice-skills.webp", label: "In Practice — Skills & Criteria" },
      { src: "/badges/n8n/credentials-wallet.webp", label: "n8n Credentials Wallet" },
      { src: "/badges/n8n/in-practice-progress.webp", label: "In Practice — Course Progress" },
      { src: "/badges/n8n/in-practice-badge-email.webp", label: "In Practice — Badge Awarded" },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    logo: "/logos/claude.svg",
    orientation: "square",
    badges: [
      { src: "/badges/claude/main.webp", label: "Anthropic Academy — Completed Courses" },
      { src: "/badges/claude/claude-101.webp", label: "Claude 101" },
      { src: "/badges/claude/claude-code-101.webp", label: "Claude Code 101" },
      { src: "/badges/claude/claude-code-in-action.webp", label: "Claude Code in Action" },
      { src: "/badges/claude/claude-platform-101.webp", label: "Claude Platform 101" },
      { src: "/badges/claude/building-with-claude-api.webp", label: "Building with the Claude API" },
      { src: "/badges/claude/intro-mcp.webp", label: "Introduction to Model Context Protocol" },
      { src: "/badges/claude/mcp-advanced-topics.webp", label: "Model Context Protocol: Advanced Topics" },
      { src: "/badges/claude/intro-agent-skills.webp", label: "Introduction to Agent Skills" },
      { src: "/badges/claude/intro-subagents.webp", label: "Introduction to Subagents" },
      { src: "/badges/claude/intro-claude-cowork.webp", label: "Introduction to Claude Cowork" },
      { src: "/badges/claude/ai-fluency-smb.webp", label: "AI Fluency for Small Businesses" },
      { src: "/badges/claude/ai-capabilities-limitations.webp", label: "AI Capabilities & Limitations" },
    ],
  },
  {
    id: "zapier",
    name: "Zapier",
    logo: "/logos/zapier.svg",
    orientation: "landscape",
    badges: [
      { src: "/badges/zapier/building-intermediate-zaps.webp", label: "Building Intermediate Zaps" },
      { src: "/badges/zapier/zapier-1.webp", label: "Governing Zapier MCP" },
      { src: "/badges/zapier/zapier-2.webp", label: "Using Zapier MCP" },
      { src: "/badges/zapier/zapier-3.webp", label: "What is Zapier MCP?" },
      { src: "/badges/zapier/zapier-4.webp", label: "Building AI Agents" },
      { src: "/badges/zapier/zapier-6.webp", label: "Building Basic Zaps" },
      { src: "/badges/zapier/zapier-7.webp", label: "Account Setup" },
      { src: "/badges/zapier/zapier-8.webp", label: "Security and Governance" },
    ],
  },
];

// Card + stage sizing per cert orientation, with a larger variant for the
// full-width About page. Class strings are static so Tailwind keeps them.
const LAYOUT: Record<Orientation, { base: { stage: string; card: string }; large: { stage: string; card: string }; spread: number }> = {
  portrait: {
    base: { stage: "h-[360px] sm:h-[440px]", card: "w-[220px] sm:w-[300px]" },
    large: { stage: "h-[420px] sm:h-[560px]", card: "w-[260px] sm:w-[380px]" },
    spread: 56,
  },
  square: {
    base: { stage: "h-[340px] sm:h-[400px]", card: "w-[320px] sm:w-[380px]" },
    large: { stage: "h-[400px] sm:h-[520px]", card: "w-[380px] sm:w-[500px]" },
    spread: 52,
  },
  landscape: {
    base: { stage: "h-[240px] sm:h-[300px]", card: "w-[330px] sm:w-[470px]" },
    large: { stage: "h-[300px] sm:h-[400px]", card: "w-[420px] sm:w-[640px]" },
    spread: 46,
  },
};

/**
 * Two-step credentials browser: tech-stack picker -> per-tool badge coverflow.
 * Self-contained (holds its own step state) so it can be dropped into the hero
 * modal or rendered inline on the About "Badges & Certificates" tab unchanged.
 * `large` bumps the coverflow/card sizes for the roomier About page.
 */
export function CertificatesExplorer({ large = false }: { large?: boolean }) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  return activeTool ? (
    <BadgeCarousel tool={activeTool} large={large} onBack={() => setActiveTool(null)} />
  ) : (
    <ToolPicker large={large} onPick={setActiveTool} />
  );
}

function ToolPicker({ large, onPick }: { large: boolean; onPick: (tool: Tool) => void }) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-yellow">
        Credentials &amp; Recognition
      </p>
      <h2 className={`mt-2 text-center font-black text-white ${large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
        Certificates &amp; Badges
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-white/55">
        The tools I&apos;m certified in. Pick one to see its badges and certificates.
      </p>

      <div className={`mx-auto mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 ${large ? "max-w-[640px]" : "max-w-[520px]"}`}>
        {techStack.map((tool) => {
          const disabled = tool.comingSoon || tool.badges.length === 0;
          const n = tool.badges.length;
          return (
            <button
              key={tool.id}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onPick(tool)}
              aria-label={
                disabled
                  ? `${tool.name} — certificates coming soon`
                  : `View ${tool.name} certificates`
              }
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.05] px-3 pb-4 pt-5 text-center transition-all ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:-translate-y-[3px] hover:border-persian/80 hover:bg-persian/10"
              }`}
            >
              {disabled && (
                <span className="absolute -right-8 top-2.5 rotate-45 bg-white/15 px-8 py-[3px] text-[9px] font-bold uppercase tracking-wider text-white/75">
                  Soon
                </span>
              )}
              {/* White tile so every brand mark renders consistently (matches ToolkitMarquee) */}
              <div className={`mx-auto mb-3 flex items-center justify-center rounded-xl bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)] ${large ? "h-14 w-14" : "h-12 w-12"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className={large ? "h-8 w-8 object-contain" : "h-7 w-7 object-contain"}
                  loading="lazy"
                />
              </div>
              <div className="text-sm font-semibold text-white">{tool.name}</div>
              <div className="mt-1 text-[11px] text-white/50">
                {disabled ? "Coming soon" : `${n} credential${n > 1 ? "s" : ""}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BadgeCarousel({ tool, large, onBack }: { tool: Tool; large: boolean; onBack: () => void }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const n = tool.badges.length;
  const single = n <= 1;
  const go = (idx: number) => setI(((idx % n) + n) % n);

  const conf = LAYOUT[tool.orientation];
  const dims = large ? conf.large : conf.base;

  useEffect(() => {
    if (single) return;
    const onKey = (e: KeyboardEvent) => {
      if (zoom !== null) return;
      if (e.key === "ArrowRight") setI((p) => (p + 1) % n);
      else if (e.key === "ArrowLeft") setI((p) => (p - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, zoom, single]);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-white"
      >
        <span aria-hidden>←</span> Back
      </button>

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-yellow">
        {tool.name}
      </p>
      <h2 className={`mt-2 text-center font-black text-white ${large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
        {tool.name} Credentials
      </h2>

      {/* Coverflow */}
      <div
        className={`relative mt-8 flex items-center justify-center ${dims.stage}`}
        style={{ perspective: "1500px" }}
      >
        {tool.badges.map((b, idx) => {
          let rel = idx - i;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const isCenter = rel === 0;
          const abs = Math.abs(rel);
          const style: React.CSSProperties = {
            transform: `translateX(${rel * conf.spread}%) scale(${isCenter ? 1 : 0.78}) rotateY(${rel * -22}deg)`,
            zIndex: 30 - abs,
            opacity: abs > 1 ? 0 : isCenter ? 1 : 0.5,
            pointerEvents: abs > 1 ? "none" : "auto",
          };
          return (
            <button
              key={b.src}
              type="button"
              onClick={() => (isCenter ? setZoom(idx) : go(idx))}
              aria-label={isCenter ? `View ${b.label} full size` : `Show ${b.label}`}
              className={`absolute h-full transition-all duration-500 ease-out ${dims.card}`}
              style={style}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-2xl border bg-white/[0.05] backdrop-blur-sm ${
                  isCenter
                    ? "border-yellow/40 shadow-[0_20px_70px_rgba(94,23,235,0.35)]"
                    : "border-white/[0.08]"
                }`}
              >
                <Image src={b.src} alt={b.label} fill sizes="640px" className="object-contain p-4" />
              </div>
            </button>
          );
        })}

        {!single && (
          <>
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous"
              className="absolute left-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-black/50 text-white/80 backdrop-blur-sm transition hover:border-persian/50 hover:text-white sm:left-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next"
              className="absolute right-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-persian/60 bg-persian text-white transition hover:bg-persian-dark sm:right-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-white/60">{tool.badges[i].label}</p>

      {/* Dots */}
      {!single && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {tool.badges.map((b, idx) => (
            <button
              key={b.src}
              type="button"
              onClick={() => go(idx)}
              aria-label={`Go to ${b.label}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-yellow" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {zoom !== null && (
        <BadgeLightbox
          src={tool.badges[zoom].src}
          label={tool.badges[zoom].label}
          onClose={() => setZoom(null)}
        />
      )}
    </div>
  );
}

function BadgeLightbox({
  src,
  label,
  onClose,
}: {
  src: string;
  label: string;
  onClose: () => void;
}) {
  useEffect(() => {
    // Capture phase + stopImmediatePropagation so Escape closes only the
    // lightbox, not the modal underneath it (both listen on `document`).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/90 p-4 sm:p-8"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        >
          ✕
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="max-h-[85vh] w-auto rounded-xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}
