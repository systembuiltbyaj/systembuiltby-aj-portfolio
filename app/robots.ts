import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

/**
 * AI search and answer engines are named explicitly: being cited by them is
 * the point, and some hosts block unknown crawlers unless robots.txt opts in.
 * Preview routes are kept out of indexes with noindex (next.config headers and
 * route metadata), not here, because a blocked page can't show its noindex.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
