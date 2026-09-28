import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesGraph } from "@/lib/structured-data";
import { services } from "./services-content";

export const metadata: Metadata = {
  title: "Services: CRM, Automation and AI Systems",
  description:
    "What AJ Bactad builds: GoHighLevel funnels and CRM pipelines, booking systems, A2P 10DLC, n8n and Zapier automation, AI agents, RAG knowledge bots, and custom Next.js apps.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesGraph(services)} />
      <V2Content initial={{ section: "services", path: [] }} />
    </>
  );
}
