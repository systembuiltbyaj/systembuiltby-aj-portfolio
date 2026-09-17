"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroCertificates } from "@/components/sections/hero-certificates";

// Script font ONLY for the "Hello, I'm" eyebrow (matches the reference); rest stays Inter
const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"] });

// PLACEHOLDER stats, AJ to confirm real numbers
const stats = [
  { target: 5, suffix: "+", label: "Years Experience" },
  { target: 10, suffix: "+", label: "Projects Completed" },
  { target: 5, suffix: "+", label: "Happy Clients" },
];

/* Tools shown in the hero strip. Same set as the About page toolkit. */
const heroTools = [
  { name: "GoHighLevel", logo: "/logos/gohighlevel.png" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "ChatGPT", logo: "/logos/openai.svg" },
  { name: "Trigger.dev", logo: "/logos/trigger.svg" },
  { name: "ClickUp", logo: "/logos/clickup.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
  { name: "Canva", logo: "/logos/canva.svg" },
];

/**
 * Continuous tools strip. The track holds the list twice so the loop is
 * seamless; it pauses on hover and stops entirely under reduced motion.
 * The duplicate half is aria-hidden so screen readers read each tool once.
 */
function HeroTools() {
  const doubled = [...heroTools, ...heroTools];
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
        Tools I use daily
      </p>
      <div className="relative max-w-[560px] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#08060e] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#08060e] to-transparent" />
        <ul className="marquee-scroll flex w-max items-center gap-3 motion-reduce:[animation:none]">
          {doubled.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= heroTools.length}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.logo} alt="" className="h-4 w-4 object-contain" />
              </span>
              <span className="whitespace-nowrap text-[13px] font-medium text-white/75">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
      {/* ambient brand glows */}
      <div className="pointer-events-none absolute -top-[10%] right-[12%] h-[420px] w-[420px] rounded-full bg-persian/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[4%] h-[320px] w-[320px] rounded-full bg-yellow/8 blur-[110px]" />

      {/* Giant background wordmark (subtle scroll parallax) */}
      <motion.div style={{ y: wordY }} className="pointer-events-none absolute inset-x-0 top-1 z-0 flex justify-center lg:top-[10%]">
        <span className="select-none whitespace-nowrap bg-gradient-to-b from-[#8b4dff] via-persian to-persian/30 bg-clip-text text-[3.4rem] font-black leading-none tracking-tighter text-transparent sm:text-[6.5rem] md:text-[9rem] lg:text-[13rem] xl:text-[18rem]">
          PORTFOLIO
        </span>
      </motion.div>

      {/* Portrait cutout, center stage, bottom anchored */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center lg:flex"
      >
        <div className="relative aspect-[1089/1329] h-[58vh] max-h-[540px] w-auto lg:h-[80vh] lg:max-h-[760px] lg:translate-x-[6%]">
          <Image
            src="/aj-hero-cutout.webp"
            alt="Allen Bactad, GHL Expert & AI Specialist"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      {/* readability scrims (so text sits above the portrait) */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-r from-[#08060e] via-[#08060e]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-40 bg-gradient-to-t from-[#08060e] to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:py-20">
        {/* LEFT, name / role / copy */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>
              Available Nationwide
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${script.className} text-4xl leading-none text-white/80 sm:text-[2.75rem]`}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.6rem] font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            AJ BACTAD
          </motion.h1>

          {/* Mobile portrait, professional photo card below the name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/[0.10] shadow-[0_18px_50px_rgba(0,0,0,0.45)] lg:hidden"
          >
            <Image
              src="/aj-bactad-photo.webp"
              alt="AJ Bactad, GHL Certified & AI Automation Specialist"
              width={1122}
              height={1402}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-yellow"
          >
            GHL Certified &amp; AI Automation Specialist
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md text-base leading-relaxed text-white/55"
          >
            I don&apos;t just connect tools, I engineer the system behind your growth. CRM, funnels, automations, and AI, wired into one operating system that runs the busywork so you can scale without the chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <Magnetic>
              <Link
                href="/consult"
                className="inline-flex items-center rounded-xl border border-persian/60 bg-persian px-6 py-3 font-semibold text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_30px_rgba(94,23,235,0.35)]"
              >
                Book Free Consultation &rarr;
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/system-builds"
                className="inline-flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.07]"
              >
                Check My System Build
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="pt-5"
          >
            <HeroTools />
          </motion.div>
        </div>

        {/* RIGHT, stat column + certificates entry point */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-8 lg:col-span-3 lg:col-start-10 lg:justify-center"
        >
          <div className="flex flex-row justify-between gap-6 lg:flex-col lg:items-end lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col lg:items-end lg:text-right">
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  className="text-3xl font-extrabold text-yellow sm:text-4xl lg:text-5xl"
                />
                <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
                  {stat.label}
                </span>
                <span className="mt-3 hidden h-px w-16 bg-white/10 lg:block" />
              </div>
            ))}
          </div>

          <div className="flex lg:justify-end">
            <HeroCertificates />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
