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

    if (prefersReducedMotion.matches) {
      element.classList.add("is-visible");
      return;
    }

    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      element.classList.add("is-visible");
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
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      observer.disconnect();
    };
  }, []);

  const revealStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
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
