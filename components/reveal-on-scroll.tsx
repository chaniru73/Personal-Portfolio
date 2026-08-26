"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  delay?: number;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale-in";
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  variant = "fade-up",
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;

    if (!node || !("IntersectionObserver" in window)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      node.dataset.revealVisible = "true";
      return;
    }

    const { bottom, top } = node.getBoundingClientRect();

    if (top < window.innerHeight * 0.9 && bottom > 0) {
      node.dataset.revealReady = "true";
      node.dataset.revealVisible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.revealVisible = "true";
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    const frameId = window.requestAnimationFrame(() => {
      node.dataset.revealReady = "true";
      observer.observe(node);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="reveal-on-scroll"
      data-reveal-variant={variant}
      style={{ "--reveal-delay": `${delay}ms` } as RevealStyle}
    >
      {children}
    </div>
  );
}
