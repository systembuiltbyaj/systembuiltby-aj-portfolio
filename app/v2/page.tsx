import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { V2Content } from "./v2-content";
import { isV2Live } from "@/lib/site-version";

export const metadata: Metadata = {
  title: "AJ Bactad — v2 preview",
  robots: { index: false, follow: false },
};

/** v2's home is "/" once it is the live version; /v2 only matters as a preview. */
export default function V2Page() {
  if (isV2Live()) permanentRedirect("/");
  return <V2Content />;
}
