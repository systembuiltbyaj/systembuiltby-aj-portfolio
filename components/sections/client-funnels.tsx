"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { coachingFunnels } from "@/app/projects/projects-content";

// Teaser for /projects. Reads the same array the Web Showcase renders, so a
// funnel added there shows up here without a second edit. Cards link straight
// to the live build; the mockup lightbox stays on /projects where there's room.
const featured = coachingFunnels.slice(0, 6);

export function ClientFunnels() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[20%] h-[320px] w-[320px] rounded-full bg-persian/[0.12] blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-persian-light">
                Live Client Funnels
              </p>
              <h2 className="text-3xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl">
                Built, launched,
                <br />
                <span className="bg-gradient-to-r from-persian-light via-persian to-yellow bg-clip-text text-transparent">
                  still running.
                </span>
              </h2>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-white/55">
                Every funnel here is a paid client build that is live right now. No concepts, no
                mockups made to fill space.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex h-11 shrink-0 items-center rounded-full border border-white/15 bg-white/[0.05] px-5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
            >
              See all builds
            </Link>
          </div>
        </ScrollReveal>

        <StaggerChildren className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((f) => (
            <StaggerItem key={`${f.title}-${f.subtitle}`}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.04] transition-all hover:-translate-y-[2px] hover:border-white/[0.16] hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${f.gradientFrom}, ${f.gradientTo})`,
                  }}
                >
                  {f.thumbnail && (
                    <Image
                      src={f.thumbnail}
                      alt={`${f.title} — ${f.subtitle}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover"
                    />
                  )}
                  {f.isLive && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Live
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between gap-1 p-4">
                  <div>
                    <p className="text-[15px] font-bold text-white">{f.title}</p>
                    <p className="mt-0.5 text-[13.5px] text-white/55">{f.subtitle}</p>
                  </div>
                  <span className="mt-3 text-[12.5px] font-semibold text-white/40 transition-colors group-hover:text-yellow">
                    Visit the live build
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
