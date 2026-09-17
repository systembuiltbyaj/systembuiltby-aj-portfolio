/**
 * Which portfolio design "/" serves.
 *
 * Set NEXT_PUBLIC_SITE_VERSION in Vercel (Project > Settings > Environment
 * Variables) to "v1" or "v2" and redeploy. Defaults to v2.
 *
 * /v1 and /v2 always serve their own version regardless of this value, so both
 * stay available for comparison.
 */
export type SiteVersion = "v1" | "v2";

export const SITE_VERSION: SiteVersion =
  process.env.NEXT_PUBLIC_SITE_VERSION === "v1" ? "v1" : "v2";

export function isV2Live() {
  return SITE_VERSION === "v2";
}
