import type { Metadata } from "next";
import { V2Content } from "@/app/v2/v2-content";

export const metadata: Metadata = {
  title: "Real Result: Workflow and Pipeline Screens",
  description:
    "Screens from live client systems AJ Bactad built: GoHighLevel workflows, pipelines and automations running in production.",
  alternates: { canonical: "/real-result" },
};

export default function RealResultPage() {
  return <V2Content initial={{ section: "screens", path: [] }} />;
}
