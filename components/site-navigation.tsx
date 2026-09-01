"use client";

import { useEffect, useRef, useState } from "react";

import { MenuIcon } from "@/components/icons";

type SectionHref =
  | "#home"
  | "#about"
  | "#skills"
  | "#projects"
  | "#education"
  | "#contact";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly { label: string; href: SectionHref }[];

const sectionIds = navLinks.map((link) => link.href.slice(1));

function getHashHref(): SectionHref {
  const hash = window.location.hash as SectionHref;
  return navLinks.some((link) => link.href === hash) ? hash : "#home";
}

export default function SiteNavigation() {
  const [activeHref, setActiveHref] = useState<SectionHref>("#home");
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const updateFromHash = () => {
      setActiveHref(getHashHref());
    };

    updateFromHash();

    const observers: IntersectionObserver[] = [];
    const intersectionRatios = new Map<string, number>();

    const createObserver = () => {
      observers.forEach((observer) => observer.disconnect());
      observers.length = 0;
      intersectionRatios.clear();

      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersectionRatios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          });

          let nextId = "home";
          let strongestRatio = 0;

          sectionIds.forEach((id) => {
            const ratio = intersectionRatios.get(id) ?? 0;

            if (ratio > strongestRatio) {
              strongestRatio = ratio;
              nextId = id;
            }
          });

          if (strongestRatio > 0) {
            setActiveHref(`#${nextId}` as SectionHref);
          }
        },
        {
          rootMargin: `-${headerHeight + 24}px 0px -42% 0px`,
          threshold: [0, 0.12, 0.28, 0.5, 0.72],
        },
      );

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          observer.observe(section);
        }
      });

      observers.push(observer);
    };

    createObserver();
    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("resize", createObserver);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("hashchange", updateFromHash);
      window.removeEventListener("resize", createObserver);
    };
  }, []);

  const closeMobileMenu = () => {
    mobileMenuRef.current?.removeAttribute("open");
  };

  const renderLink = (
    link: (typeof navLinks)[number],
    mode: "mobile" | "desktop",
  ) => {
    const isActive = activeHref === link.href;

    return (
      <a
        href={link.href}
        aria-label={link.label}
        aria-current={isActive ? "location" : undefined}
        onClick={() => {
          if (mode === "mobile") {
            closeMobileMenu();
          }
        }}
        className={`nav-link focus-ring rounded-lg px-3 py-2 transition ${
          mode === "mobile" ? "block" : ""
        } ${isActive ? "is-active" : ""}`}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8"
    >
      <a
        href="#home"
        aria-label="CW home"
        onClick={() => {
          closeMobileMenu();
        }}
        className="brand-mark focus-ring flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold tracking-wide transition"
      >
        <span>C</span>
        <span>W</span>
      </a>

      <details ref={mobileMenuRef} className="relative md:hidden">
        <summary
          aria-label="Open navigation menu"
          className="mobile-menu-button focus-ring flex min-h-11 cursor-pointer list-none items-center justify-center rounded-xl px-3 py-2 transition"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </summary>
        <ul className="mobile-menu-panel absolute right-0 top-full z-50 mt-3 grid w-52 max-w-[calc(100vw-2.5rem)] gap-1 rounded-lg p-2 text-sm font-medium backdrop-blur">
          {navLinks.map((link) => (
            <li key={link.label}>{renderLink(link, "mobile")}</li>
          ))}
        </ul>
      </details>

      <ul className="hidden flex-wrap items-center justify-end gap-2 text-sm font-medium md:flex md:gap-3">
        {navLinks.map((link) => (
          <li key={link.label}>{renderLink(link, "desktop")}</li>
        ))}
      </ul>
    </nav>
  );
}
