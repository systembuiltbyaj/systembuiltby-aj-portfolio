import type { Metadata } from "next";
import { V2Content } from "./v2-content";

export const metadata: Metadata = {
  title: "AJ Bactad — v2 preview",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return <V2Content />;
}
