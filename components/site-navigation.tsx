"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { MenuIcon } from "@/components/icons";
import { microTransition } from "@/lib/motion-variants";

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

function isSectionHref(hash: string): hash is SectionHref {
  return navLinks.some((link) => link.href === hash);
}

export default function SiteNavigation() {
  const [activeHref, setActiveHref] = useState<SectionHref>("#home");
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const sections = sectionIds.flatMap((id) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let observer: IntersectionObserver | undefined;
    let pending: { href: SectionHref; started: number } | null = null;
    let settleTimer = 0;
    const headerBottom = () => header?.getBoundingClientRect().bottom ?? 0;

    const syncVisibleSection = () => {
      if (pending) return;
      const line = headerBottom() + 24;
      let href: SectionHref = "#home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          href = `#${section.id}` as SectionHref;
        }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        href = "#contact";
      }
      setActiveHref(href);
      const hash = window.location.hash;
      if ((!hash || isSectionHref(hash)) && hash !== href) {
        window.history.replaceState(window.history.state, "", href);
      }
    };

    const settleNavigation = () => {
      window.clearTimeout(settleTimer);
      if (pending) {
        const target = document.getElementById(pending.href.slice(1));
        const remaining = Math.abs((target?.getBoundingClientRect().top ?? 0) - headerBottom());
        const atBottom = pending.href === "#contact" && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        // Allow native smooth scrolling to finish, but never retain an abandoned target.
        if (remaining > 2 && !atBottom && performance.now() - pending.started < 1800) {
          settleTimer = window.setTimeout(settleNavigation, 180);
          return;
        }
      }
      pending = null;
      syncVisibleSection();
    };

    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleNavigation, 180);
    };
    const beginNavigation = (href: SectionHref) => {
      pending = { href, started: performance.now() };
      setActiveHref(href);
      scheduleSettle();
    };
    const updateFromHash = () => {
      if (isSectionHref(window.location.hash)) beginNavigation(window.location.hash);
      else {
        pending = null;
        scheduleSettle();
      }
    };
    const closeMenu = (restoreFocus = false) => {
      const menu = mobileMenuRef.current;
      if (!menu?.open) return;
      menu.open = false;
      if (restoreFocus) {
        const control = window.matchMedia("(min-width: 768px)").matches
          ? header?.querySelector<HTMLElement>(".brand-mark")
          : menu.querySelector<HTMLElement>("summary");
        control?.focus({ preventScroll: true });
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !isSectionHref(url.hash)) return;
      beginNavigation(url.hash);
      closeMenu(mobileMenuRef.current?.contains(document.activeElement));
      // Native anchors own scrolling and intentional history entries, including repeat clicks.
    };
    const interruptNavigation = () => {
      pending = null;
      scheduleSettle();
    };
    const onPointerDown = (event: PointerEvent) => {
      interruptNavigation();
      if (event.target instanceof Node && !mobileMenuRef.current?.contains(event.target)) {
        closeMenu(mobileMenuRef.current?.contains(document.activeElement));
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Tab"].includes(event.key)) interruptNavigation();
    };
    const createObserver = () => {
      observer?.disconnect();
      const top = Math.min(headerBottom(), Math.max(0, window.innerHeight - 1));
      const band = Math.min(96, window.innerHeight - top);
      const bottom = Math.max(0, window.innerHeight - top - band);
      observer = new IntersectionObserver(syncVisibleSection, {
        rootMargin: `-${top}px 0px -${bottom}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer?.observe(section));
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeMenu(mobileMenuRef.current?.contains(document.activeElement));
      }
      scheduleSettle();
    };

    updateFromHash();
    createObserver();
    const resizeObserver = new ResizeObserver(createObserver);
    if (header) resizeObserver.observe(header);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("wheel", interruptNavigation, { passive: true });
    window.addEventListener("touchstart", interruptNavigation, { passive: true });
    window.addEventListener("scroll", scheduleSettle, { passive: true });
    window.addEventListener("scrollend", settleNavigation);
    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("popstate", updateFromHash);
    window.addEventListener("resize", createObserver);
    return () => {
      observer?.disconnect();
      resizeObserver.disconnect();
      window.clearTimeout(settleTimer);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("wheel", interruptNavigation);
      window.removeEventListener("touchstart", interruptNavigation);
      window.removeEventListener("scroll", scheduleSettle);
      window.removeEventListener("scrollend", settleNavigation);
      window.removeEventListener("hashchange", updateFromHash);
      window.removeEventListener("popstate", updateFromHash);
      window.removeEventListener("resize", createObserver);
    };
  }, []);

  const renderLink = (
    link: (typeof navLinks)[number],
    mode: "mobile" | "desktop",
  ) => {
    const isActive = activeHref === link.href;
    const isContact = link.href === "#contact";

    return (
      <motion.a
        href={link.href}
        aria-label={link.label}
        aria-current={isActive ? "location" : undefined}
        className={`site-navigation-link focus-ring ${
          mode === "mobile" ? "block" : ""
        } ${isContact ? "site-navigation-contact" : ""} ${isActive ? "is-active" : ""}`}
        whileHover={prefersReducedMotion ? undefined : { y: -1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985, y: 0 }}
        transition={microTransition}
      >
        {isContact ? "Contact Me" : link.label}
      </motion.a>
    );
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="site-navigation content-container mx-auto flex w-full items-center justify-between px-5 sm:px-8"
    >
      <motion.a
        href="#home"
        aria-label="CW home"
        className="site-navigation-brand brand-mark focus-ring flex items-center justify-center text-sm font-bold tracking-wide transition"
        whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97, y: 0 }}
        transition={microTransition}
      >
        <span>C</span>
        <span>W</span>
      </motion.a>

      <details ref={mobileMenuRef} className="site-navigation-mobile relative md:hidden">
        <summary
          aria-label="Navigation menu"
          className="site-navigation-menu-button focus-ring flex cursor-pointer list-none items-center justify-center transition"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </summary>
        <motion.ul
          className="site-navigation-menu-panel absolute right-0 top-full z-50 grid w-52 max-w-[calc(100vw-2.5rem)] gap-1 p-2 text-sm font-medium"
          data-lenis-prevent
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={microTransition}
        >
          {navLinks.map((link) => (
            <li key={link.label}>{renderLink(link, "mobile")}</li>
          ))}
        </motion.ul>
      </details>

      <ul className="site-navigation-links hidden flex-wrap items-center justify-end text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <li key={link.label}>{renderLink(link, "desktop")}</li>
        ))}
      </ul>
    </nav>
  );
}
