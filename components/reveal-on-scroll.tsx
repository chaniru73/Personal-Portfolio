"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in";

type RevealOnScrollProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
};

export default function RevealOnScroll({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  style,
  variant = "fade-up",
  ...props
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("is-visible");
      return;
    }

    const readyFrame = window.requestAnimationFrame(() => {
      element.classList.add("is-reveal-ready");
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    const showImmediately = () => {
      if (prefersReducedMotion.matches || element.contains(document.activeElement)) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    };
    prefersReducedMotion.addEventListener("change", showImmediately);
    element.addEventListener("focusin", showImmediately);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      observer.disconnect();
      prefersReducedMotion.removeEventListener("change", showImmediately);
      element.removeEventListener("focusin", showImmediately);
    };
  }, []);

  const revealStyle = {
    ...style,
    "--reveal-delay": `${Math.min(Math.max(delay, 0) * 0.4, 320)}ms`,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={`reveal-on-scroll reveal-${variant} ${className}`.trim()}
      style={revealStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
