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
  ".hero-role",
  ".hero-location",
  ".hero-socials",
  ".home-info-label",
  ".hero-introduction",
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
      const heroItems = homeRevealSelectors.map((selector) => root.querySelector<HTMLElement>(selector));
      const items = heroItems.filter(Boolean) as HTMLElement[];
      const visual = root.querySelector<HTMLElement>(".profile-orbit");
      const portraitFrame = root.querySelector<HTMLElement>(".profile-portrait-frame");
      const ring = root.querySelector<HTMLElement>(".orbit-ring");
      const diagonal = root.querySelector<HTMLElement>(".home-diagonal-light");
      const infoBand = root.querySelector<HTMLElement>(".home-info-band");
      const markers = gsap.utils.toArray<HTMLElement>(".orbit-marker, .orbit-node", root);
      const cards = gsap.utils.toArray<HTMLElement>(".hero-workflow-card", root);
      const visualTargets = [visual, ring].filter(Boolean) as HTMLElement[];
      const compositionTargets = [diagonal, infoBand].filter(Boolean) as HTMLElement[];
      const animatedTargets = [
        ...items,
        ...compositionTargets,
        ...visualTargets,
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
        if (portraitFrame) {
          gsap.set(portraitFrame, { clearProps: "boxShadow" });
        }
      };

      if (
        heroItems.some((element) => !element) ||
        !diagonal ||
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
        const [greeting, firstName, surname, role, location, socials, infoLabel, introduction] = items;

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
          .fromTo(diagonal, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 50% 0, 40% 100%, 0 100%)", duration: 0.64 }, 0)
          .fromTo(greeting, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.1)
          .fromTo(firstName, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.18)
          .fromTo(surname, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.26)
          .fromTo(role, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.36)
          .fromTo(location, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.46)
          .fromTo(socials, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, 0.54)
          .fromTo(visualTargets, { autoAlpha: 0, y: 18, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 }, 0.62)
          .fromTo(portraitFrame, { autoAlpha: 0, y: 8, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 }, 0.66)
          .fromTo(cards, { autoAlpha: 0, y: 16, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08 }, 0.78)
          .fromTo(infoBand, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.62 }, 0.92)
          .fromTo(infoLabel, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 1)
          .fromTo(introduction, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 1.08);

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

        cards.forEach((card) => {
          card.addEventListener("pointerenter", cardEnter);
          card.addEventListener("pointerleave", cardLeave);
        });
        listenersAttached = true;

        const finePointer = window.matchMedia("(pointer: fine)");

        if (finePointer.matches && visual) {
          const rotateX = gsap.quickTo(visual, "rotationX", { duration: 0.45, ease: "power2.out" });
          const rotateY = gsap.quickTo(visual, "rotationY", { duration: 0.45, ease: "power2.out" });
          const moveX = gsap.quickTo(visual, "x", { duration: 0.45, ease: "power2.out" });
          const moveY = gsap.quickTo(visual, "y", { duration: 0.45, ease: "power2.out" });

          const onPointerMove = (event: PointerEvent) => {
            const bounds = visual.getBoundingClientRect();
            const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
            rotateX(relY * -4);
            rotateY(relX * 5);
            moveX(relX * 5);
            moveY(relY * 5);
          };
          const resetPointer = () => {
            rotateX(0);
            rotateY(0);
            moveX(0);
            moveY(0);
          };

          visual.addEventListener("pointermove", onPointerMove);
          visual.addEventListener("pointerleave", resetPointer);
          pointerCleanup = () => {
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
