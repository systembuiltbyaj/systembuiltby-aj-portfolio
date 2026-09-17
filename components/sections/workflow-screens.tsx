"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Real screens from workflows/dashboards I've built (PII-safe, no client contact data shown)
export const screens: { label: string; url: string; image?: string; pos?: string }[] = [
  { label: "Monthly Revenue Report", url: "app.gohighlevel.com/reporting", image: "/workflow-screens/revenue-report.webp" },
  { label: "Sales Command Center", url: "app.gohighlevel.com/dashboard", image: "/workflow-screens/sales-dashboard.webp" },
  { label: "Post-Purchase Router", url: "app.gohighlevel.com/workflows", image: "/workflow-screens/post-purchase-router.webp", pos: "center" },
  { label: "Multi-Path Lead Router", url: "zapier.com/app/editor", image: "/workflow-screens/zapier-paths.webp" },
  { label: "Funnel Analytics", url: "app.gohighlevel.com/dashboard", image: "/workflow-screens/funnel-analytics.webp" },
  { label: "Scheduled Content Tasks", url: "cloud.trigger.dev", image: "/workflow-screens/trigger-tasks.webp" },
  { label: "Course-Access Automation", url: "app.gohighlevel.com/workflows", image: "/workflow-screens/course-access.webp" },
  { label: "Revenue Dashboard", url: "app.gohighlevel.com/dashboard", image: "/workflow-screens/revenue-dashboard.webp" },
  { label: "Form → Sheet Sync Suite", url: "zapier.com/app/zaps", image: "/workflow-screens/zapier-zaps.webp" },
  { label: "Workflow Library", url: "app.gohighlevel.com/workflows", image: "/workflow-screens/workflow-library.webp" },
  { label: "High-Ticket Funnel", url: "funnels.ajautomate.co", image: "/workflow-screens/va-ladder-funnel.webp", pos: "center" },
];

function WorkflowPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* mini workflow motif */}
      <svg width="120" height="96" viewBox="0 0 120 96" fill="none" className="opacity-70">
        <rect x="40" y="4" width="40" height="18" rx="5" fill="#5e17eb" fillOpacity="0.25" stroke="#7c3aed" strokeOpacity="0.6" />
        <line x1="60" y1="22" x2="60" y2="38" stroke="#7c3aed" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="34" y="38" width="52" height="18" rx="5" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.12" />
        <line x1="60" y1="56" x2="60" y2="66" stroke="#7c3aed" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="34" y1="74" x2="86" y2="74" stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="1.5" />
        <rect x="14" y="74" width="34" height="16" rx="5" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.10" />
        <rect x="72" y="74" width="34" height="16" rx="5" fill="#f6cb1f" fillOpacity="0.12" stroke="#f6cb1f" strokeOpacity="0.35" />
      </svg>
      <span className="text-sm font-semibold text-white/60">{label}</span>
      <span className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/30">
        Screenshot coming soon
      </span>
    </div>
  );
}

function BrowserCard({ label, url, image, pos }: { label: string; url: string; image?: string; pos?: string }) {
  return (
    <div className="w-[300px] shrink-0 overflow-hidden rounded-xl border border-white/[0.10] bg-[#0d0b12] shadow-[0_16px_50px_rgba(0,0,0,0.5)] sm:w-[440px]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-[10px] text-white/35">
          {url}
        </span>
      </div>
      {/* canvas */}
      <div className="relative aspect-[16/10] w-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={label}
            className="h-full w-full object-cover"
            style={{ objectPosition: pos === "center" ? "center" : "left top" }}
            loading="lazy"
          />
        ) : (
          <WorkflowPlaceholder label={label} />
        )}
      </div>
    </div>
  );
}

export function WorkflowScreens() {
  const tripled = [...screens, ...screens, ...screens];

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <ScrollReveal>
        <div className="mx-auto mb-12 max-w-2xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-persian-light">
            Under The Hood
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
            Real screens from the workflows I build
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[#08060e] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[#08060e] to-transparent sm:w-40" />

        <div className="marquee-scroll flex w-max gap-6">
          {tripled.map((s, i) => (
            <BrowserCard key={`${s.label}-${i}`} label={s.label} url={s.url} image={s.image} pos={s.pos} />
          ))}
        </div>
      </div>
    </section>
  );
}
