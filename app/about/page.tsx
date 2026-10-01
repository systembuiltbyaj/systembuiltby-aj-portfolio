import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "About AJ Bactad",
  description:
    "AJ Bactad spent five years in eCommerce operations, handling Team Lead and Purchasing Manager responsibilities, and now builds GoHighLevel, n8n and AI automation systems. Process first, tools second.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <V2Content initial={{ section: "about", path: [] }} />;
}
