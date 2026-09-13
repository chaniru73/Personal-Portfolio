"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const homeRevealSelectors = [
  ".hero-greeting",
  ".hero-first-name",
  ".hero-surname",
  ".hero-current",
  ".hero-direction",
  ".hero-statement",
  ".hero-location",
  ".hero-actions",
  ".hero-socials",
  ".home-info-label",
  ".hero-introduction",
  ".home-about-bridge",
] as const;

const clearRevealProps = "opacity,visibility,transform";

export default function HomeAnimation() {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current?.closest<HTMLElement>("[data-home-animation-root]");
      if (!root) return;
      const safe = contextSafe ?? (<T extends (...args: never[]) => unknown>(callback: T) => callback);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      const heroItems = homeRevealSelectors.map((selector) => root.querySelector<HTMLElement>(selector));
      const items = heroItems.filter(Boolean) as HTMLElement[];
      const visual = root.querySelector<HTMLElement>(".profile-orbit");
      const portraitFrame = root.querySelector<HTMLElement>(".profile-portrait-frame");
      const ring = root.querySelector<HTMLElement>(".orbit-ring");
      const diagonal = root.querySelector<HTMLElement>(".home-diagonal-light");
      const diagonalEdge = root.querySelector<HTMLElement>(".home-diagonal-edge");
      const infoBand = root.querySelector<HTMLElement>(".home-info-band");
      const markers = gsap.utils.toArray<HTMLElement>(".orbit-marker, .orbit-node", root);
      const cards = gsap.utils.toArray<HTMLElement>(".hero-workflow-card", root);
      const visualTargets = [visual].filter(Boolean) as HTMLElement[];
      const compositionTargets = [diagonal, diagonalEdge, infoBand].filter(Boolean) as HTMLElement[];
      const animatedTargets = [
        ...items,
        ...compositionTargets,
        ...visualTargets,
        ...(ring ? [ring] : []),
        ...(portraitFrame ? [portraitFrame] : []),
        ...markers,
        ...cards,
      ];
      const showHomeTargets = () => {
        gsap.killTweensOf(animatedTargets);
        gsap.set(animatedTargets, {
          autoAlpha: 1,
          clearProps: clearRevealProps,
        });
        if (diagonal) {
          gsap.set(diagonal, { clearProps: "clipPath,opacity,visibility,transform" });
        }
        if (diagonalEdge) {
          gsap.set(diagonalEdge, { clearProps: "opacity,visibility,transform" });
        }
        if (portraitFrame) {
          gsap.set(portraitFrame, { clearProps: "boxShadow" });
        }
      };

      if (
        heroItems.some((element) => !element) ||
        !diagonal ||
        !diagonalEdge ||
        !infoBand ||
        !portraitFrame ||
        prefersReducedMotion.matches
      ) {
        showHomeTargets();
        return;
      }

      let timeline: gsap.core.Timeline | undefined;
      let pointerCleanup: (() => void) | undefined;
      let listenersAttached = false;

      const cardEnter = safe((event: PointerEvent) => {
        gsap.to(event.currentTarget, {
          y: -3,
          borderColor: "var(--color-accent)",
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to((event.currentTarget as HTMLElement).querySelector(".icon-bubble"), {
          scale: 1.06,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      const cardLeave = safe((event: PointerEvent) => {
        gsap.to(event.currentTarget, {
          y: 0,
          borderColor: "var(--color-border)",
          duration: 0.24,
          ease: "power2.out",
        });
        gsap.to((event.currentTarget as HTMLElement).querySelector(".icon-bubble"), {
          scale: 1,
          duration: 0.24,
          ease: "power2.out",
        });
      });

      const cleanup = () => {
        timeline?.kill();
        cards.forEach((card) => {
          card.removeEventListener("pointerenter", cardEnter);
          card.removeEventListener("pointerleave", cardLeave);
        });
        pointerCleanup?.();
        showHomeTargets();
      };

      try {
        const [
          greeting,
          firstName,
          surname,
          current,
          direction,
          statement,
          location,
          actions,
          socials,
          infoLabel,
          introduction,
          aboutBridge,
        ] = items;

        timeline = gsap.timeline({
          defaults: { duration: 0.56, ease: "power3.out" },
          onComplete: () => {
            gsap.set(animatedTargets, {
              clearProps: clearRevealProps,
            });
            gsap.set(diagonal, { clearProps: "clipPath" });
          },
          onInterrupt: showHomeTargets,
        });

        timeline
          .fromTo(diagonal, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 63% 0, 51% 100%, 0 100%)", duration: 0.72 }, 0)
          .fromTo(diagonalEdge, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.16)
          .fromTo(greeting, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.08)
          .fromTo(firstName, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0 }, 0.16)
          .fromTo(surname, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0 }, 0.23)
          .fromTo(current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 0.32)
          .fromTo(direction, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 0.4)
          .fromTo(statement, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 0.48)
          .fromTo(location, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 0.56)
          .fromTo(actions, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 0.64)
          .fromTo(socials, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 0.7)
          .fromTo(visualTargets, { autoAlpha: 0, y: 16, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 }, 0.38)
          .fromTo(portraitFrame, { autoAlpha: 0, y: 8, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 }, 0.42)
          .fromTo(cards, { autoAlpha: 0, y: 12, scale: 0.99 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07 }, 0.64)
          .fromTo(infoBand, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.9)
          .fromTo(infoLabel, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, 0.98)
          .fromTo(introduction, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 1.05)
          .fromTo(aboutBridge, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, 1.12);

        if (ring) {
          gsap.to(ring, {
            rotate: 360,
            duration: 32,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });
        }

        gsap.to(markers, {
          y: -5,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.28,
        });

        if (portraitFrame) {
          gsap.to(portraitFrame, {
            boxShadow: "0 30px 70px rgba(0, 0, 0, 0.36), 0 0 62px var(--color-glow)",
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (hoverPointer.matches) {
          cards.forEach((card) => {
            card.addEventListener("pointerenter", cardEnter);
            card.addEventListener("pointerleave", cardLeave);
          });
          listenersAttached = true;
        }

        const finePointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)");

        if (finePointer.matches && visual) {
          const rotateX = gsap.quickTo(visual, "rotationX", { duration: 0.45, ease: "power2.out" });
          const rotateY = gsap.quickTo(visual, "rotationY", { duration: 0.45, ease: "power2.out" });
          const moveX = gsap.quickTo(visual, "x", { duration: 0.45, ease: "power2.out" });
          const moveY = gsap.quickTo(visual, "y", { duration: 0.45, ease: "power2.out" });
          let pointerFrame = 0;
          let latestPointer: PointerEvent | undefined;

          const updatePointer = () => {
            pointerFrame = 0;
            const event = latestPointer;
            if (!event) return;
            const bounds = visual.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
            rotateX(relY * -4);
            rotateY(relX * 5);
            moveX(relX * 5);
            moveY(relY * 5);
          };
          const onPointerMove = (event: PointerEvent) => {
            latestPointer = event;
            if (!pointerFrame) {
              pointerFrame = window.requestAnimationFrame(updatePointer);
            }
          };
          const resetPointer = () => {
            window.cancelAnimationFrame(pointerFrame);
            pointerFrame = 0;
            latestPointer = undefined;
            rotateX(0);
            rotateY(0);
            moveX(0);
            moveY(0);
          };

          visual.addEventListener("pointermove", onPointerMove);
          visual.addEventListener("pointerleave", resetPointer);
          pointerCleanup = () => {
            window.cancelAnimationFrame(pointerFrame);
            visual.removeEventListener("pointermove", onPointerMove);
            visual.removeEventListener("pointerleave", resetPointer);
          };
        }
      } catch {
        if (listenersAttached) {
          cards.forEach((card) => {
            card.removeEventListener("pointerenter", cardEnter);
            card.removeEventListener("pointerleave", cardLeave);
          });
        }
        pointerCleanup?.();
        showHomeTargets();
        return;
      }

      return cleanup;
    },
    { scope },
  );

  return <span ref={scope} aria-hidden="true" className="sr-only" />;
}
