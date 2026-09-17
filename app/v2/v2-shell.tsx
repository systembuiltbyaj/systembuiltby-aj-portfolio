"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type SectionId =
  | "home"
  | "projects"
  | "builds"
  | "services"
  | "credentials"
  | "testimonials"
  | "about"
  | "contact";

export const SECTIONS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <path d="M3 10.5 12 3l9 7.5V21H3z" /> },
  { id: "projects", label: "Projects", icon: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  { id: "builds", label: "System builds", icon: <path d="M4 5h16v14H4zM10 9l5 3-5 3z" /> },
  { id: "services", label: "Services", icon: <path d="M12 3 3 8l9 5 9-5zM3 14l9 5 9-5" /> },
  { id: "credentials", label: "Credentials", icon: <path d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.4 9.3l6-.7z" /> },
  { id: "testimonials", label: "Testimonials", icon: <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 0 1 8-8h2a8 8 0 0 1 8 3z" /> },
  { id: "about", label: "About", icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" /> },
  { id: "contact", label: "Contact", icon: <path d="M3 6h18v12H3zM3 7l9 6 9-6" /> },
];

/**
 * Digital globe backdrop. Muted/looping video, held well back with a scrim so
 * it never competes with the copy. Reduced-motion viewers get the poster frame
 * instead of a moving image, and the poster also covers the pre-load paint.
 */
function GlobeBackdrop({ still }: { still: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {still ? (
        <Image src="/v2/globe-poster.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.38]" />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.38]"
          src="/v2/globe.mp4"
          poster="/v2/globe-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {/* scrim: keeps text contrast constant wherever the globe happens to be bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08060e] via-[#08060e]/80 to-[#08060e]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-transparent to-[#08060e]/70" />
    </div>
  );
}

export function V2Shell({
  active,
  onNavigate,
  children,
}: {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [railOpen, setRailOpen] = useState(false);

  // Sections swap rather than scroll, so arrow keys stand in for the scrollbar.
  const step = useCallback(
    (delta: number) => {
      const i = SECTIONS.findIndex((s) => s.id === active);
      const next = SECTIONS[(i + delta + SECTIONS.length) % SECTIONS.length];
      onNavigate(next.id);
    },
    [active, onNavigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && /input|textarea/i.test(el.tagName)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); step(-1); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#08060e] text-[#ece9f4]">
      <GlobeBackdrop still={Boolean(reduce)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-22%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-persian/[0.15] blur-[170px]"
      />

      {/* ------------------------------------------------ rail */}
      <aside
        className={`absolute inset-y-0 left-0 z-40 flex w-[74px] flex-col items-center border-r border-white/[0.07] bg-[#0b0814]/85 py-5 backdrop-blur-xl transition-transform duration-300 max-lg:w-[68px] ${
          railOpen ? "translate-x-0" : "max-md:-translate-x-full"
        }`}
      >
        <Link href="/" aria-label="Back to the live site" className="shrink-0">
          <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-persian/70">
            <Image src="/aj-profile.webp" alt="AJ Bactad" fill sizes="40px" className="object-cover" />
          </span>
        </Link>

        <nav className="mt-7 flex flex-1 flex-col items-center gap-1.5">
          {SECTIONS.map((s) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => { onNavigate(s.id); setRailOpen(false); }}
                aria-label={s.label}
                aria-current={on ? "page" : undefined}
                title={s.label}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian ${
                  on ? "bg-persian text-white" : "text-white/40 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
                <span className="pointer-events-none absolute left-[calc(100%+10px)] z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#141024] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 max-md:hidden">
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        <p className="mt-4 shrink-0 text-center text-[10px] leading-[1.5] text-white/25">
          © 2026
          <br />
          AJ
        </p>
      </aside>

      {/* rail toggle, small screens only */}
      <button
        type="button"
        onClick={() => setRailOpen((v) => !v)}
        aria-label={railOpen ? "Close menu" : "Open menu"}
        aria-expanded={railOpen}
        className="absolute left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#0b0814]/90 text-white backdrop-blur-xl md:hidden"
      >
        <svg width="20" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {railOpen ? <><line x1="3" y1="3" x2="19" y2="13" /><line x1="19" y1="3" x2="3" y2="13" /></>
                    : <><line x1="1" y1="1" x2="21" y2="1" /><line x1="1" y1="8" x2="21" y2="8" /><line x1="1" y1="15" x2="21" y2="15" /></>}
        </svg>
      </button>

      {/* ------------------------------------------------ floating CTA */}
      <Link
        href="/consult"
        className="absolute right-5 top-5 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-persian px-5 text-sm font-bold text-white shadow-[0_10px_34px_-8px_rgba(94,23,235,0.85)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian max-sm:right-4 max-sm:h-10 max-sm:px-4 max-sm:text-[13px]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
        Get in touch
      </Link>

      {/* ------------------------------------------------ stage */}
      <main className="absolute inset-y-0 right-0 left-0 md:left-[74px] max-lg:md:left-[68px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full overflow-y-auto overscroll-contain px-5 pb-10 pt-24 sm:px-8 md:pt-16 lg:px-14"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* section position, doubles as the hint that arrows work */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
        {SECTIONS.map((s) => (
          <span
            key={s.id}
            className={`h-1 rounded-full transition-all ${
              s.id === active ? "w-6 bg-yellow" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
