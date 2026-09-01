"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import EducationSection from "@/components/education-section";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import SiteNavigation from "@/components/site-navigation";
import SkillsSection from "@/components/skills-section";

const panels = [
  { id: "home", label: "Home", component: HomeSection },
  { id: "about", label: "About", component: AboutSection },
  { id: "skills", label: "Skills", component: SkillsSection },
  { id: "projects", label: "Projects", component: ProjectsSection },
  { id: "education", label: "Education", component: EducationSection },
  { id: "contact", label: "Contact", component: ContactSection },
] as const;

export type PanelHref = `#${(typeof panels)[number]["id"]}`;

const navLinks = panels.map((panel) => ({
  label: panel.label,
  href: `#${panel.id}` as PanelHref,
}));

function getInitialHref(): PanelHref {
  if (typeof window === "undefined") {
    return "#home";
  }

  const hash = window.location.hash as PanelHref;
  return navLinks.some((link) => link.href === hash) ? hash : "#home";
}

export default function PortfolioPanelController() {
  const [activeHref, setActiveHref] = useState<PanelHref>(() =>
    getInitialHref(),
  );

  useEffect(() => {
    const syncFromLocation = () => {
      setActiveHref(getInitialHref());
    };

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);

    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  const navigateToPanel = useCallback((href: PanelHref) => {
    setActiveHref(href);

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
  }, []);

  const activePanel = useMemo(
    () => panels.find((panel) => `#${panel.id}` === activeHref) ?? panels[0],
    [activeHref],
  );
  const SelectedPanel = activePanel.component;

  return (
    <div className="page-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <header className="site-header fixed inset-x-0 top-0 z-[100]">
        <SiteNavigation activeHref={activeHref} onNavigate={navigateToPanel} />
      </header>

      <main className="main-stack relative z-10 flex flex-1 flex-col">
        <div key={activePanel.id} className="selected-panel">
          <SelectedPanel />
        </div>
      </main>
    </div>
  );
}
