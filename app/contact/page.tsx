import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call with AJ Bactad to map which of your business processes are worth automating, or message him on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <V2Content initial={{ section: "contact", path: [] }} />;
}
