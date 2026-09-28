"use client";

import { usePathname } from "next/navigation";
import { isV2Path } from "@/app/v2/v2-shell";

/**
 * v2 ships its own rail, footer and CTA, so the global navbar, footer and chat
 * bubble are suppressed on every route v2 renders (its sections each have their
 * own URL). Every other route is untouched.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isV2Path(pathname)) return null;
  return <>{children}</>;
}

/** v2 needs the full viewport with no navbar offset. */
export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <main className={isV2Path(pathname) ? "" : "pt-20"}>{children}</main>;
}
