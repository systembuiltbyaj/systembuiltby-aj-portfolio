import type { SectionId } from "./v2-shell";

/**
 * Where the visitor is: a section plus an optional sub-path inside it, e.g.
 * /live-system/funnels/websites → { section: "builds", path: ["funnels", "websites"] }.
 * Plain module (no "use client") so server pages can validate URLs with it too.
 */
export type V2Route = { section: SectionId; path: string[] };

const SEGMENT = /^[a-z0-9-]{1,40}$/;

/** Only plain segments survive; anything else is ignored rather than trusted. */
export function cleanSegments(segments: string[]) {
  return segments.map((p) => p.toLowerCase()).filter((p) => SEGMENT.test(p));
}
