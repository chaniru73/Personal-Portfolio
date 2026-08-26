"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

const sectionIds = navLinks.map((link) => link.href.slice(1));

function getHashLink() {
  if (typeof window === "undefined") {
    return "#home";
  }

  return navLinks.some((link) => link.href === window.location.hash)
    ? window.location.hash
    : "#home";
}

export default function SiteNavigation() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setActiveHref(getHashLink());
    });

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const handleHashChange = () => {
      setActiveHref(getHashLink());
    };

    window.addEventListener("hashchange", handleHashChange);

    if (!("IntersectionObserver" in window) || sections.length === 0) {
      return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("hashchange", handleHashChange);
      };
    }

    const headerHeight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--header-height")
        .trim() || "76px";
    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        const [mostVisible] = Array.from(visibleSections.entries()).sort(
          (current, next) => next[1] - current[1],
        );

        if (mostVisible) {
          setActiveHref(`#${mostVisible[0]}`);
        }
      },
      {
        rootMargin: `-${headerHeight} 0px -42% 0px`,
        threshold: [0.16, 0.32, 0.48, 0.64, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
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
        onClick={mode === "mobile" ? closeMobileMenu : undefined}
        className={`nav-link focus-ring rounded-lg px-3 py-2 transition hover:bg-[var(--color-accent-soft)] ${
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
      className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
    >
      <a
        href="#home"
        aria-label="CW home"
        className="brand-mark focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold tracking-wide transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
      >
        CW
      </a>

      <details ref={mobileMenuRef} className="relative md:hidden">
        <summary className="mobile-menu-button focus-ring min-h-11 cursor-pointer rounded-lg px-3 py-2 text-sm font-bold transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]">
          Menu
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
