"use client";

import { type ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let scrollTriggerRegistered = false;

function getHeaderOffset() {
  return -(document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 0);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let lenis: Lenis | undefined;
    let unsubscribeScroll: (() => void) | undefined;
    let alignFrame = 0;
    let tickerActive = false;

    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    const startTicker = () => {
      if (tickerActive) return;
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      tickerActive = true;
    };
    const stopTicker = () => {
      if (!tickerActive) return;
      gsap.ticker.remove(tick);
      tickerActive = false;
    };
    const refresh = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };
    const destroyLenis = () => {
      window.cancelAnimationFrame(alignFrame);
      alignFrame = 0;
      unsubscribeScroll?.();
      unsubscribeScroll = undefined;
      lenis?.destroy();
      lenis = undefined;
      stopTicker();
    };
    const createLenis = () => {
      if (lenis) return;

      lenis = new Lenis({
        anchors: {
          offset: getHeaderOffset(),
          duration: 0.85,
          easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        },
        autoRaf: false,
        duration: 0.9,
        gestureOrientation: "vertical",
        infinite: false,
        orientation: "vertical",
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
        respectReducedMotion: true,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
      });

      unsubscribeScroll = lenis.on("scroll", updateScrollTrigger);
      startTicker();
      const hashTarget = window.location.hash;
      alignFrame = window.requestAnimationFrame(() => {
        if (hashTarget && document.querySelector(hashTarget)) {
          lenis?.scrollTo(hashTarget, {
            offset: getHeaderOffset(),
            immediate: true,
            force: true,
          });
        }
        refresh();
      });
    };
    const syncLenisMode = () => {
      if (prefersReducedMotion.matches || coarsePointer.matches) {
        destroyLenis();
        ScrollTrigger.refresh();
        return;
      }

      createLenis();
      refresh();
    };

    syncLenisMode();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    prefersReducedMotion.addEventListener("change", syncLenisMode);
    coarsePointer.addEventListener("change", syncLenisMode);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      prefersReducedMotion.removeEventListener("change", syncLenisMode);
      coarsePointer.removeEventListener("change", syncLenisMode);
      destroyLenis();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}
