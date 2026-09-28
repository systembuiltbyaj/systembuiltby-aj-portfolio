import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about working with AJ Bactad on GoHighLevel, automation and AI system builds.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return <V2Content initial={{ section: "testimonials", path: [] }} />;
}
