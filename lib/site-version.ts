/**
 * Which portfolio design "/" serves.
 *
 * Set NEXT_PUBLIC_SITE_VERSION in Vercel (Project > Settings > Environment
 * Variables) to "v1" or "v2" and redeploy. Defaults to v2.
 *
 * It only decides "/". /v1 always serves v1, and v2's other sections
 * (/live-system, /services, /about, ...) always have their own routes. While
 * v1 is live, v2's home is previewed at /v2.
 */
export type SiteVersion = "v1" | "v2";

export const SITE_VERSION: SiteVersion =
  process.env.NEXT_PUBLIC_SITE_VERSION === "v1" ? "v1" : "v2";

export function isV2Live() {
  return SITE_VERSION === "v2";
}
