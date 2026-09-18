"use client";

/* ------------------------------------------------------------------ */
/*  Dev-only: pick a CTA treatment.                                     */
/*  Four candidates side by side, in both themes. Nothing here ships    */
/*  with the site; once AJ picks one, that class goes on the real CTAs  */
/*  and the other three come out of globals.css.                        */
/* ------------------------------------------------------------------ */

import { useEffect, useState } from "react";

type Option = {
  n: number;
  cls: string;
  name: string;
  what: string;
  cost: string;
};

const OPTIONS: Option[] = [
  {
    n: 1,
    cls: "cta-lift",
    name: "Magnetic lift",
    what: "The button rises off the page on hover and its shadow spreads underneath, like it is being picked up.",
    cost: "Quietest of the four. Reads as expensive rather than loud, and it will never compete with the headline next to it.",
  },
  {
    n: 2,
    cls: "cta-sweep",
    name: "Signal sweep",
    what: "A gold pass crosses the button, the same signal that now runs across the service cards on hover.",
    cost: "The only one that matches motion already on the site, so the whole page reads as one system rather than separate effects.",
  },
  {
    n: 3,
    cls: "cta-ring",
    name: "Pulse ring",
    what: "A violet ring breathes outward on its own, then tightens when you hover.",
    cost: "The only candidate that moves without being touched, so it pulls the eye from anywhere on screen. That is the point, and also the risk.",
  },
  {
    n: 4,
    cls: "cta-wipe",
    name: "Fill wipe",
    what: "Violet wipes across to gold and the label flips to near-black.",
    cost: "The loudest. Strong on a single hero CTA, too much if every button on the page does it.",
  },
];

function Cta({ cls }: { cls: string }) {
  return (
    <button
      type="button"
      className={`${cls} inline-flex h-[3.4rem] items-center gap-2 rounded-full bg-persian px-8 text-[15.5px] font-bold text-white`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
      </svg>
      Get in touch
    </button>
  );
}

export default function MotionPreview() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const had = root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    return () => {
      root.classList.toggle("dark", had);
    };
  }, [dark]);

  return (
    <div className="min-h-dvh bg-[#f6f5fa] px-6 py-12 text-[#14101f] dark:bg-[#0d0a18] dark:text-white">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-persian dark:text-persian-light">
              Pick one
            </p>
            <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-black uppercase leading-[1.05] tracking-[-0.01em]">
              CTA motion
            </h1>
            <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-black/55 dark:text-white/55">
              Hover each button. Toggle the theme to check both. Tell me the number and I will
              put it on the real CTAs and delete the other three.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-[13px] font-bold transition-colors hover:bg-black/[0.04] dark:border-white/12 dark:bg-white/[0.06] dark:hover:bg-white/[0.11]"
          >
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {OPTIONS.map((o) => (
            <div
              key={o.n}
              className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_2px_14px_-6px_rgba(20,16,31,0.16)] dark:border-white/[0.09] dark:bg-[#120e20] dark:shadow-none"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-black tabular-nums text-persian dark:text-yellow">
                  {o.n}
                </span>
                <p className="text-[17px] font-bold">{o.name}</p>
              </div>

              <div className="my-7 flex justify-center">
                <Cta cls={o.cls} />
              </div>

              <p className="text-[13.5px] leading-relaxed text-black/60 dark:text-white/60">
                {o.what}
              </p>
              <p className="mt-2.5 border-t border-black/[0.07] pt-2.5 text-[12.5px] leading-relaxed text-black/40 dark:border-white/[0.06] dark:text-white/40">
                {o.cost}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-black/40 dark:text-white/40">
          You can also mix: one treatment on the hero CTA, a quieter one on the rest.
        </p>

        <LightModePicker />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Light mode: background tone + hero headline colour                  */
/* ------------------------------------------------------------------ */

/* Contrast against the smoke-grey ground, computed not guessed. Gold is
   the reason this picker exists: at 1.3:1 it cannot carry light-mode
   text, so any gold option here puts it on a dark chip instead. */
const GROUNDS = [
  { id: "a", name: "Current", hex: "#f6f5fa", note: "Where it is now. Bright enough to glare on a big screen." },
  { id: "b", name: "Smoke grey", hex: "#e9e7ee", note: "Same violet undertone as the brand, two steps darker. Kills the glare without going grey-blue." },
  { id: "c", name: "Dirty white", hex: "#efece5", note: "Warm, paper-like. Softest of the three, but the warmth pulls slightly against the violet." },
];

const HEADS = [
  {
    id: 1,
    name: "Violet name, muted subtitle",
    contrast: "6.2:1",
    name_cls: "text-persian",
    sub: <span className="text-black/45">GHL Certified &amp; AI Automation Specialist</span>,
    note: "Brand colour carries the name, the subtitle steps back. Cleanest hierarchy of the three.",
  },
  {
    id: 2,
    name: "Deep violet-ink name, violet subtitle",
    contrast: "13.4:1",
    name_cls: "text-[#231145]",
    sub: <span className="text-persian">GHL Certified &amp; AI Automation Specialist</span>,
    note: "Not black, but not loud either. Keeps today's violet subtitle intact.",
  },
  {
    id: 3,
    name: "Violet name, gold subtitle on a dark chip",
    contrast: "6.2:1 / 11.6:1",
    name_cls: "text-persian",
    sub: (
      <span className="inline-block rounded-full bg-[#14101f] px-3.5 py-1.5 text-yellow">
        GHL Certified &amp; AI Automation Specialist
      </span>
    ),
    note: "The only honest way to get gold into light mode. The dark chip gives it something to sit on, the same trick the Available Nationwide pill uses.",
  },
];

function LightModePicker() {
  const [ground, setGround] = useState(GROUNDS[1]);

  return (
    <div className="mt-20 border-t border-black/[0.08] pt-12 dark:border-white/[0.09]">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-persian dark:text-persian-light">
        Pick one of each
      </p>
      <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.3rem)] font-black uppercase leading-[1.05] tracking-[-0.01em]">
        Light mode
      </h2>
      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-black/55 dark:text-white/55">
        Gold sits at 1.3:1 on any of these grounds, so it cannot be the headline colour in light
        mode. Where you see gold below it is on a dark chip, which is the one place it stays
        readable. Every ratio quoted is against the ground you have selected.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        {GROUNDS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setGround(g)}
            className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] font-bold transition-colors ${
              ground.id === g.id
                ? "border-persian bg-persian/10 text-persian dark:text-persian-light"
                : "border-black/10 text-black/55 hover:bg-black/[0.04] dark:border-white/12 dark:text-white/55 dark:hover:bg-white/[0.07]"
            }`}
          >
            <span className="h-4 w-4 rounded-full border border-black/15" style={{ background: g.hex }} />
            {g.name}
            <span className="font-mono text-[11px] opacity-55">{g.hex}</span>
          </button>
        ))}
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-black/40 dark:text-white/40">{ground.note}</p>

      <div className="mt-7 space-y-5">
        {HEADS.map((h) => (
          <div key={h.id} className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.09]">
            <div className="px-6 py-9 sm:px-10" style={{ background: ground.hex }}>
              <p className="text-[clamp(2rem,5.5vw,4.2rem)] font-black leading-[0.9] tracking-[-0.05em]">
                <span className={h.name_cls}>AJ BACTAD</span>
              </p>
              <p className="mt-3.5 text-[clamp(0.8rem,1.5vw,1.1rem)] font-bold uppercase tracking-[0.12em]">
                {h.sub}
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5 bg-white px-6 py-4 dark:bg-[#120e20] sm:px-10">
              <p className="text-[14px] font-bold">
                <span className="mr-2.5 font-black tabular-nums text-persian dark:text-yellow">{h.id}</span>
                {h.name}
              </p>
              <p className="font-mono text-[11.5px] text-black/40 dark:text-white/40">{h.contrast}</p>
              <p className="w-full text-[12.5px] leading-relaxed text-black/45 dark:text-white/45">{h.note}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-[13px] text-black/40 dark:text-white/40">
        Tell me a ground and a headline, for example &ldquo;smoke grey + 1&rdquo;, and a CTA number.
      </p>
    </div>
  );
}
