"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";

import { microTransition } from "@/lib/motion-variants";

type MotionLinkProps = Omit<
  HTMLMotionProps<"a">,
  "children" | "transition" | "whileHover" | "whileTap"
> & {
  children: ReactNode;
  interaction?: "button" | "icon" | "nav" | "subtle";
};

const hoverByInteraction = {
  button: { y: -2 },
  icon: { y: -2, scale: 1.03 },
  nav: { y: -1 },
  subtle: { y: -1 },
} as const;

const tapByInteraction = {
  button: { scale: 0.985, y: 0 },
  icon: { scale: 0.96, y: 0 },
  nav: { scale: 0.985, y: 0 },
  subtle: { scale: 0.99, y: 0 },
} as const;

export default function MotionLink({
  children,
  interaction = "subtle",
  ...props
}: MotionLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      whileHover={prefersReducedMotion ? undefined : hoverByInteraction[interaction]}
      whileTap={prefersReducedMotion ? undefined : tapByInteraction[interaction]}
      transition={microTransition}
      {...props}
    >
      {children}
    </motion.a>
  );
}
