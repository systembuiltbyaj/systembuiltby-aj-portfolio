"use client";

import { usePathname } from "next/navigation";
import { isV2Live } from "@/lib/site-version";

/**
 * v2 ships its own rail, footer and CTA, so the global navbar, footer and chat
 * bubble are suppressed wherever v2 renders — /v2 always, and "/" when v2 is
 * the live version. Every other route is untouched.
 */
function showsV2(pathname: string | null) {
  if (pathname?.startsWith("/v2")) return true;
  return pathname === "/" && isV2Live();
}

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (showsV2(pathname)) return null;
  return <>{children}</>;
}

/** v2 needs the full viewport with no navbar offset. */
export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <main className={showsV2(pathname) ? "" : "pt-20"}>{children}</main>;
}
