"use client";

import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CertificatesExplorer } from "@/components/sections/certificates-explorer";

// Counts mirror the badge arrays in certificates-explorer. Kept here as plain
// numbers so the header reads as a claim rather than a live tally that quietly
// drifts if a badge is added and this list is not touched.
const stack = [
  { tool: "GoHighLevel", count: 12, note: "Certified Admin, Tier 3" },
  { tool: "Claude", count: 13, note: "Anthropic Academy" },
  { tool: "n8n", count: 10, note: "Quickstart + In Practice" },
  { tool: "Zapier", count: 8, note: "MCP, agents, governance" },
];

const total = stack.reduce((sum, s) => sum + s.count, 0);

export function CredentialsContent() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
        {/* ---- Hero ---- */}
        <section className="bg-persian/20 px-8 py-16 pb-12 backdrop-blur-xl">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
              Credentials &amp; Recognition
            </p>
            <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Certified Across the Stack.
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
              {total} verified certifications across the four tools I actually build on. Every one
              of them earned after breaking something in a real client account and having to work
              out why.
            </p>

            {/* per-tool summary, so the page says something before you click */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-4">
              {stack.map((s) => (
                <div
                  key={s.tool}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-2xl font-black leading-none text-yellow">{s.count}</p>
                  <p className="mt-1.5 text-[13px] font-semibold text-white">{s.tool}</p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-white/45">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Explorer ---- */}
        <div className="mx-auto max-w-[1100px] px-6 py-16">
          <CertificatesExplorer large />

          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
