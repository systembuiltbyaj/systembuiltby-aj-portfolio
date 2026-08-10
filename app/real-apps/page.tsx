import type { Metadata } from "next";
import { RealAppsContent } from "./real-apps-content";

export const metadata: Metadata = {
  title: "MVP",
  description:
    "Full-stack apps I built, shipped, and run, not automations or templates. Click through and try them.",
};

export default function RealAppsPage() {
  return <RealAppsContent />;
}
