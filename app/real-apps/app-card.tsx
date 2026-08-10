"use client";

import Image from "next/image";
import { StaggerItem } from "@/components/motion/stagger-children";

export type App = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  stack: string[];
};

// Glass shell: translucent fill + heavy backdrop blur, a 1px inset highlight
// along the top edge for the "lit glass" read, and a violet lift on hover.
const cardCls =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] " +
  "bg-white/[0.06] backdrop-blur-2xl " +
  "shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.10)] " +
  "transition-all duration-300 hover:-translate-y-[3px] hover:border-white/[0.20] hover:bg-white/[0.09] " +
  "hover:shadow-[0_16px_48px_rgba(94,23,235,0.28),inset_0_1px_0_rgba(255,255,255,0.16)]";

export function AppCard({ app }: { app: App }) {
  return (
    <StaggerItem>
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${app.cta} (opens in a new tab)`}
        className={cardCls}
      >
        <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-[#2a0f6a]/30">
          <Image
            src={app.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-yellow">
            {app.category}
          </p>
          <h3 className="mb-2 text-base font-bold leading-snug text-white">
            {app.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-white/55">
            {app.description}
          </p>

          {/* Stack is supporting evidence, deliberately muted so it does not
              compete with the title or the CTA. */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {app.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.10] bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/55"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-yellow transition-colors group-hover:text-yellow-dark">
            {app.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>

        {/* Sheen, brightest at the top edge, fading out by the midpoint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      </a>
    </StaggerItem>
  );
}
