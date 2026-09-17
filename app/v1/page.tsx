import type { Metadata } from "next";
import { V1Home } from "@/components/sections/v1-home";

export const metadata: Metadata = {
  title: "AJ Bactad — version 1",
  // Not indexed: it is the same content as "/" whenever v1 is the live version.
  robots: { index: false, follow: false },
};

export default function V1Page() {
  return <V1Home />;
}
