"use client";

import { useState } from "react";
import { V2Shell, type SectionId } from "./v2-shell";
import {
  HomeSection, BuildsSection, ScreensSection, ServicesSection,
  CredentialsSection, TestimonialsSection, AboutSection, ContactSection,
} from "./v2-sections";

export function V2Content() {
  const [active, setActive] = useState<SectionId>("home");

  const panels: Record<SectionId, React.ReactNode> = {
    home: <HomeSection go={setActive} />,
    builds: <BuildsSection />,
    screens: <ScreensSection />,
    services: <ServicesSection />,
    credentials: <CredentialsSection />,
    testimonials: <TestimonialsSection />,
    about: <AboutSection />,
    contact: <ContactSection />,
  };

  return (
    <V2Shell active={active} onNavigate={setActive}>
      {panels[active]}
    </V2Shell>
  );
}
