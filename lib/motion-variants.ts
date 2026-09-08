import type { Variants } from "motion/react";

export type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const revealDistance = 24;

export const revealVariants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: revealDistance },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -revealDistance },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: revealDistance },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, y: 16, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

export const revealTransition = {
  duration: 0.58,
  ease: motionEase,
};

export const microTransition = {
  duration: 0.18,
  ease: motionEase,
};
