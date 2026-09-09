import type { Metadata } from "next";
import { CredentialsContent } from "./credentials-content";

export const metadata: Metadata = {
  title: "Certificates & Badges | System Built by AJ",
  description:
    "43 verified certifications across GoHighLevel, Claude, n8n and Zapier — including HighLevel Certified Admin, Tier 3.",
};

export default function CredentialsPage() {
  return <CredentialsContent />;
}
