import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "AI Stack: The Claude Code Skills AJ Builds With",
  description:
    "The Claude Code skills and frameworks AJ Bactad uses to ship automations, funnels and AI systems: Superpowers, Agent Skills, Claude Mem, HyperFrames, Playwright, Supabase, Stripe and more.",
  alternates: { canonical: "/ai-stack" },
};

export default function AiStackPage() {
  return <V2Content initial={{ section: "stack", path: [] }} />;
}
