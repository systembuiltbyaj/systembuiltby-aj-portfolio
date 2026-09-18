"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type SectionId =
  | "home"
  | "builds"
  | "screens"
  | "services"
  | "credentials"
  | "testimonials"
  | "about"
  | "contact";

export const SECTIONS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <path d="M3 10.5 12 3l9 7.5V21H3z" /> },
  { id: "builds", label: "System builds", icon: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  { id: "screens", label: "Under the hood", icon: <path d="M3 4h18v12H3zM8 20h8M12 16v4" /> },
  { id: "services", label: "Services", icon: <path d="M12 3 3 8l9 5 9-5zM3 14l9 5 9-5" /> },
  { id: "credentials", label: "Credentials", icon: <path d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.4 9.3l6-.7z" /> },
  { id: "testimonials", label: "Testimonials", icon: <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 0 1 8-8h2a8 8 0 0 1 8 3z" /> },
  { id: "about", label: "About", icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" /> },
  { id: "contact", label: "Contact", icon: <path d="M3 6h18v12H3zM3 7l9 6 9-6" /> },
];

/**
 * Digital globe backdrop. Held well back behind a scrim so copy contrast stays
 * constant wherever the globe happens to be bright. Reduced-motion viewers get
 * the poster instead of a moving image, and it also covers the pre-load paint.
 * The video only suits the dark theme; light mode gets a soft wash instead.
 */
function GlobeBackdrop({ still, dark }: { still: boolean; dark: boolean }) {
  const src = dark ? "/v2/globe.mp4" : "/v2/globe-light.mp4";
  const poster = dark ? "/v2/globe-poster.webp" : "/v2/globe-light-poster.webp";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {still ? (
        <Image
          key={poster}
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={dark ? "object-cover opacity-[0.38]" : "object-cover"}
        />
      ) : (
        <video
          key={src}
          className={`absolute inset-0 h-full w-full object-cover ${dark ? "opacity-[0.38]" : ""}`}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {/* Scrim keeps copy contrast constant wherever the clip happens to be bright. */}
      {dark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#08060e] via-[#08060e]/80 to-[#08060e]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-transparent to-[#08060e]/70" />
        </>
      ) : (
        <>
          {/* Only enough veil to hold text contrast over the left column — the
              pattern stays visible everywhere else. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f6f5fa]/92 via-[#f6f5fa]/45 to-transparent" />
        </>
      )}
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
  const [dark, setDark] = useState(true);

  // Read once on mount. Reading during render instead would desync the server
  // HTML from the client's stored preference and blow up hydration.
  useEffect(() => {
    const saved = window.localStorage.getItem("v2-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setDark(saved === "dark");
  }, []);

  // The site hard-sets `dark` on <html>, so a wrapper class can only ever ADD
  // dark — never remove it. Drive the root class directly while v2 is mounted
  // and restore whatever was there on the way out, so the live pages (dark-only
  // by brand) are unaffected.
  useEffect(() => {
    const root = document.documentElement;
    const had = root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    return () => { root.classList.toggle("dark", had); };
  }, [dark]);
  const toggleTheme = () => {
    setDark((d) => {
      window.localStorage.setItem("v2-theme", d ? "light" : "dark");
      return !d;
    });
  };

  // Sections swap rather than scroll, so arrow keys stand in for the scrollbar.
  const step = useCallback(
    (delta: number) => {
      const i = SECTIONS.findIndex((s) => s.id === active);
      onNavigate(SECTIONS[(i + delta + SECTIONS.length) % SECTIONS.length].id);
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
    <div>
      <div className="relative h-[100dvh] w-full overflow-hidden bg-[#f6f5fa] text-[#14101f] transition-colors duration-300 dark:bg-[#08060e] dark:text-[#ece9f4]">
        <GlobeBackdrop still={Boolean(reduce)} dark={dark} />

        {/* ------------------------------------------------ rail */}
        <aside
          className={`absolute inset-y-0 left-0 z-40 flex w-[74px] flex-col items-center border-r border-black/[0.07] bg-white/80 py-5 backdrop-blur-xl transition-transform duration-300 dark:border-white/[0.07] dark:bg-[#0b0814]/85 max-lg:w-[68px] ${
            railOpen ? "translate-x-0" : "max-md:-translate-x-full"
          }`}
        >
          <Link
            href="/"
            aria-label="System Built by AJ — open the main site"
            title="Open the main site"
            className="group shrink-0"
          >
            <span className="relative block h-14 w-14 transition-transform group-hover:scale-105">
              <Image
                src={dark ? "/aj-mark-dark.webp" : "/aj-mark-light.webp"}
                alt=""
                fill
                sizes="56px"
                className="object-contain"
              />
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
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian ${
                    on
                      ? "bg-persian text-white"
                      : "text-black/40 hover:bg-black/[0.06] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.07] dark:hover:text-white"
                  }`}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                  <span className="pointer-events-none absolute left-[calc(100%+10px)] z-50 whitespace-nowrap rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-xs font-medium text-[#14101f] opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:border-white/10 dark:bg-[#141024] dark:text-white max-md:hidden">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="mt-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-black/45 transition-colors hover:bg-black/[0.06] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian dark:text-white/45 dark:hover:bg-white/[0.07] dark:hover:text-white"
          >
            {dark ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
              </svg>
            )}
          </button>

          <div className="mt-2 flex shrink-0 flex-col items-center gap-1.5">
            <span className="relative flex h-2 w-2" title="Available for work">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow" />
            </span>
            <p className="text-center text-[9px] font-bold uppercase leading-[1.4] tracking-[0.08em] text-persian dark:text-yellow">
              Open
              <br />
              for work
            </p>
          </div>
        </aside>

        {/* rail toggle, small screens only */}
        <button
          type="button"
          onClick={() => setRailOpen((v) => !v)}
          aria-label={railOpen ? "Close menu" : "Open menu"}
          aria-expanded={railOpen}
          className="absolute left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-[#14101f] backdrop-blur-xl dark:border-white/15 dark:bg-[#0b0814]/90 dark:text-white md:hidden"
        >
          <svg width="20" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {railOpen ? <><line x1="3" y1="3" x2="19" y2="13" /><line x1="19" y1="3" x2="3" y2="13" /></>
                      : <><line x1="1" y1="1" x2="21" y2="1" /><line x1="1" y1="8" x2="21" y2="8" /><line x1="1" y1="15" x2="21" y2="15" /></>}
          </svg>
        </button>

        {/* ------------------------------------------------ floating CTA */}
        <Link
          href="/consult"
          className="absolute right-5 top-5 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-persian px-5 text-sm font-bold text-white shadow-[0_10px_34px_-8px_rgba(94,23,235,0.55)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian max-sm:right-4 max-sm:h-10 max-sm:px-4 max-sm:text-[13px]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
          Get in touch
        </Link>

        {/* ------------------------------------------------ stage */}
        <div className="absolute inset-y-0 right-0 left-0 md:left-[74px] max-lg:md:left-[68px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full w-full overflow-y-auto overscroll-contain px-5 pb-10 pt-24 sm:px-8 md:pt-14 lg:px-9"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
          {SECTIONS.map((s) => (
            <span
              key={s.id}
              className={`h-1 rounded-full transition-all ${
                s.id === active ? "w-6 bg-persian dark:bg-yellow" : "w-1.5 bg-black/15 dark:bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
