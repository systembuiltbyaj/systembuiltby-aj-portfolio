"use client";

import { useRef, useState } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Parallax } from "@/components/motion/parallax";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

type TextTestimonial = {
  type: "text";
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

type VideoTestimonial = {
  type: "video";
  name: string;
  role: string;
  videoId: string;
  poster?: string; // custom poster (e.g. a clean vertical frame for a Short)
  vertical?: boolean; // vertical/Short: blurred backdrop + contained frame so it fills the card
};

type Testimonial = TextTestimonial | VideoTestimonial;

export const testimonials: Testimonial[] = [
  {
    type: "video",
    name: "Coach Lish Aquino",
    role: "Amaze OPC · Coaching Business",
    videoId: "TK_K5MhsfFs",
    poster: "/testimonials/lish-aquino.webp",
    vertical: true,
  },
  {
    type: "text",
    name: "Patricia Villanueva",
    role: "COO · Brightpath Solutions",
    avatar: "/avatars/patricia.webp",
    quote:
      "AJ didn’t just ‘set up’ our HighLevel. He rebuilt the entire logic behind how our leads move. Before him, we had automations but no structure. Now everything flows perfectly.",
  },
  {
    type: "video",
    name: "Josh Broach",
    role: "Retirement Consultant for Teachers",
    videoId: "VAuLfl_P5ms",
  },
  {
    type: "text",
    name: "Daniel Reyes",
    role: "Founder & CEO · Northgate Consulting",
    avatar: "/avatars/daniel.webp",
    quote:
      "We hired AJ to fix broken workflows. What we got was a fully engineered sales infrastructure. He mapped the pipeline, corrected trigger logic, and eliminated every bottleneck.",
  },
];

const Stars = () => (
  <p className="mb-4 text-xs tracking-[3px] text-yellow/80">
    &#9733; &#9733; &#9733; &#9733; &#9733;
  </p>
);

function TextCard({ t }: { t: TextTestimonial }) {
  return (
    <div className="flex h-full flex-col p-6 rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:-translate-y-[2px] hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      <Stars />
      <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="h-px bg-white/[0.06] mb-4" />
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-2 ring-white/[0.08]"
        />
        <div>
          <p className="text-sm font-bold text-persian-light">{t.name}</p>
          <p className="text-xs text-white/30">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ t }: { t: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);
  const poster = t.poster ?? `https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`;

  return (
    <div className="group relative h-full min-h-[340px] overflow-hidden rounded-xl border border-white/[0.07] bg-black/40 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
          title={`${t.name} testimonial`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play ${t.name} video testimonial`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Poster — vertical Shorts get a blurred backdrop + contained frame so
              the card fills edge-to-edge instead of showing black bars. */}
          {t.vertical ? (
            <>
              <img
                src={poster}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
              />
              <img
                src={poster}
                alt={`${t.name} video testimonial`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </>
          ) : (
            <img
              src={poster}
              alt={`${t.name} video testimonial`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/55 transition-colors group-hover:from-black/45 group-hover:to-black/45" />

          {/* Name label */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.12] text-xs font-bold text-white ring-2 ring-white/20 backdrop-blur-sm">
              {t.name.charAt(0)}
            </span>
            <div className="text-left">
              <p className="text-sm font-bold leading-tight text-white drop-shadow">
                {t.name}
              </p>
              <p className="text-[11px] leading-tight text-white/70 drop-shadow">
                {t.role}
              </p>
            </div>
          </div>

          {/* Star rating */}
          <span className="absolute left-4 bottom-4 text-xs tracking-[3px] text-yellow drop-shadow">
            &#9733; &#9733; &#9733; &#9733; &#9733;
          </span>

          {/* Red YouTube play button */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#FF0000] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByPage = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 lg:py-32">
      <Parallax className="pointer-events-none absolute inset-0" speed={65}>
        <div className="absolute right-[-6%] top-1/3 h-[400px] w-[400px] rounded-full bg-persian/10 blur-[130px]" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading, centered */}
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-persian-light">
              System Feedback
            </p>
            <h2 className="text-5xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              What Clients Say
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/55">
              Real results from the people I&rsquo;ve engineered systems for, in their words.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials — horizontal scroll row with prev/next controls (swipe on mobile too) */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="-mx-6 snap-x snap-mandatory overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <StaggerChildren className="flex w-max gap-5">
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="w-[300px] shrink-0 snap-start sm:w-[350px]">
                  {t.type === "video" ? <VideoCard t={t} /> : <TextCard t={t} />}
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          {/* Scroll controls — visible on mobile + desktop */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 transition hover:border-persian/50 hover:bg-white/[0.10] hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-persian/60 bg-persian text-white transition hover:bg-persian-dark hover:shadow-[0_0_20px_rgba(94,23,235,0.4)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
