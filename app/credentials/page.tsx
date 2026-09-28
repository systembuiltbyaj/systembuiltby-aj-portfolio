import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "Credentials: HighLevel Certified Admin and 43 Certifications",
  description:
    "AJ Bactad's 43 verified certifications across GoHighLevel, n8n, Claude and Zapier, including HighLevel Certified Admin (Tier 3) and Automation Builder.",
  alternates: { canonical: "/credentials" },
};

export default function CredentialsPage() {
  return <V2Content initial={{ section: "credentials", path: [] }} />;
}
