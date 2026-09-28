"use client";

import { useCallback, useEffect, useState } from "react";
import { V2Shell, SECTIONS, type SectionId } from "./v2-shell";
import {
  HomeSection, BuildsSection, ScreensSection, ServicesSection,
  CredentialsSection, TestimonialsSection, AboutSection, ContactSection,
} from "./v2-sections";
import { cleanSegments, type V2Route } from "./v2-route";

// Every view is a real URL so the server can render it for crawlers. Moving
// between views swaps panels client-side via pushState, with no reload.
const HOME: V2Route = { section: "home", path: [] };
const HOME_HREF = SECTIONS[0].href;

function routeFromPath(rawPath: string): V2Route {
  let pathname: string;
  try {
    pathname = decodeURIComponent(rawPath).toLowerCase();
  } catch {
    return HOME;
  }
  const section = SECTIONS.find(
    (s) => s.id !== "home" && (pathname === s.href || pathname.startsWith(`${s.href}/`)),
  );
  if (!section) return HOME;
  // Only Live System has views below the section itself.
  const path = section.id === "builds" ? cleanSegments(pathname.slice(section.href.length).split("/")) : [];
  return { section: section.id, path };
}

function toUrl({ section, path }: V2Route) {
  const href = SECTIONS.find((s) => s.id === section)?.href ?? HOME_HREF;
  return path.length ? `${href}/${path.join("/")}` : href;
}

export function V2Content({ initial = HOME }: { initial?: V2Route }) {
  const [route, setRoute] = useState<V2Route>(initial);

  useEffect(() => {
    // Links shared before sections had their own URLs look like /#live-system/funnels.
    // The server never sees the hash, so upgrade them here.
    const { pathname, hash } = window.location;
    if (hash.length > 1 && pathname === HOME_HREF) {
      const legacy = routeFromPath(`/${hash.slice(1)}`);
      if (legacy.section !== "home") {
        window.history.replaceState(null, "", toUrl(legacy));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRoute(legacy);
      }
    }

    const sync = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = useCallback((next: V2Route) => {
    setRoute(next);
    const url = toUrl(next);
    if (url === window.location.pathname) return;
    window.history.pushState(null, "", url);
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
