import type { Metadata } from "next";
import { isAuthenticated } from "./actions";
import { PlaybookGate } from "./playbook-gate";
import { PlaybookContent } from "./playbook-content";

export const metadata: Metadata = {
  title: "Client Playbook",
  description: "Private working notes. Restricted access.",
  robots: { index: false, follow: false },
};

// The auth check reads cookies, so this route must never be statically rendered.
export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  // Content is only constructed after the check passes, so a locked visitor
  // never receives the playbook markup.
  const authed = await isAuthenticated();
  if (!authed) return <PlaybookGate />;
  return <PlaybookContent />;
}
