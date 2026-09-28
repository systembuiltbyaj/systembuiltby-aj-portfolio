import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { V2Content } from "@/app/v2/v2-content";
import { cleanSegments } from "@/app/v2/v2-route";

type Props = { params: Promise<{ path?: string[] }> };

/** Rejects anything cleanSegments would drop, so junk URLs 404 instead of duplicating a view. */
async function resolvePath(params: Props["params"]) {
  const { path = [] } = await params;
  const clean = cleanSegments(path);
  if (clean.length !== path.length || clean.some((p, i) => p !== path[i])) notFound();
  return clean;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = await resolvePath(params);
  return {
    title: "Live System: GoHighLevel, n8n and AI Automation Builds",
    description:
      "Working systems AJ Bactad has built: GoHighLevel funnels and websites, n8n and Zapier automations, AI agents and full-stack apps, each with a walkthrough video.",
    alternates: { canonical: ["/live-system", ...path].join("/") },
  };
}

export default async function LiveSystemPage({ params }: Props) {
  const path = await resolvePath(params);
  return <V2Content initial={{ section: "builds", path }} />;
}
