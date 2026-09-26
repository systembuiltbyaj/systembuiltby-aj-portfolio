"use client";

import { useCallback, useEffect, useState } from "react";
import { V2Shell, SECTIONS, type SectionId } from "./v2-shell";
import {
  HomeSection, BuildsSection, ScreensSection, ServicesSection,
  CredentialsSection, TestimonialsSection, AboutSection, ContactSection,
} from "./v2-sections";

/**
 * Where the visitor is: a section plus an optional sub-path inside it, e.g.
 * #live-system/funnels/websites → { section: "builds", path: ["funnels", "websites"] }.
 * Kept in the URL hash so any view can be linked to and the back button works,
 * without a route per view (v2 is served from both "/" and "/v2").
 */
type V2Route = { section: SectionId; path: string[] };

const HOME: V2Route = { section: "home", path: [] };

function parseHash(hash: string): V2Route {
  const [slug = "", ...rest] = decodeURIComponent(hash.replace(/^#/, "")).split("/");
  const section = SECTIONS.find((s) => s.slug && s.slug === slug.toLowerCase());
  if (!section) return HOME;
  // Only plain segments survive; anything else is ignored rather than trusted.
  const path = rest.map((p) => p.toLowerCase()).filter((p) => /^[a-z0-9-]{1,40}$/.test(p));
  return { section: section.id, path };
}

function toHash({ section, path }: V2Route) {
  const slug = SECTIONS.find((s) => s.id === section)?.slug;
  return slug ? `#${[slug, ...path].join("/")}` : "";
}

export function V2Content() {
  const [route, setRoute] = useState<V2Route>(HOME);

  // Read the hash after mount (the server never sees it), then follow
  // back/forward and hand-edited hashes.
  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const navigate = useCallback((next: V2Route) => {
    setRoute(next);
    const hash = toHash(next);
    if (hash === window.location.hash) return;
    window.history.pushState(null, "", hash || window.location.pathname + window.location.search);
  }, []);

  const goSection = useCallback((id: SectionId) => navigate({ section: id, path: [] }), [navigate]);
  const setBuildsPath = useCallback((path: string[]) => navigate({ section: "builds", path }), [navigate]);

  const panels: Record<SectionId, React.ReactNode> = {
    home: <HomeSection go={goSection} />,
    builds: <BuildsSection path={route.section === "builds" ? route.path : []} onPath={setBuildsPath} />,
    screens: <ScreensSection />,
    services: <ServicesSection />,
    credentials: <CredentialsSection />,
    testimonials: <TestimonialsSection />,
    about: <AboutSection />,
    contact: <ContactSection />,
  };

  return (
    <V2Shell active={route.section} onNavigate={goSection}>
      {panels[route.section]}
    </V2Shell>
  );
}
