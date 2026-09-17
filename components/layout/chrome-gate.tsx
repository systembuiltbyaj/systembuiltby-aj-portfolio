"use client";

import { usePathname } from "next/navigation";

/**
 * v2 ships its own rail, footer and CTA, so the global navbar, footer and chat
 * bubble are suppressed there. Every other route renders unchanged.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/v2")) return null;
  return <>{children}</>;
}

/** v2 needs the full viewport with no navbar offset. */
export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <main className={pathname?.startsWith("/v2") ? "" : "pt-20"}>{children}</main>;
}
