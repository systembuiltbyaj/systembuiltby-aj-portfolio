import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

/**
 * Every public, indexable route. Add new pages here (and to public/llms.txt).
 * Preview routes, /v1, /v2 and the gated playbook are deliberately absent.
 */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/live-system", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/consult", priority: 0.8 },
  { path: "/credentials", priority: 0.7 },
  { path: "/real-result", priority: 0.7 },
  { path: "/testimonials", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/system-builds", priority: 0.7 },
  { path: "/real-apps", priority: 0.7 },
  { path: "/projects", priority: 0.6 },
  { path: "/portfolio", priority: 0.6 },
  { path: "/packages", priority: 0.6 },
  { path: "/mentors", priority: 0.4 },
  { path: "/tools", priority: 0.5 },
  { path: "/tools/ghl-audit", priority: 0.5 },
  { path: "/tools/revenue-audit", priority: 0.5 },
  { path: "/tools/email-health", priority: 0.5 },
  { path: "/tools/process-map", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
