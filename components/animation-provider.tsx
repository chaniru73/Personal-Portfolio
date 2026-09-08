"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

import { microTransition } from "@/lib/motion-variants";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

export default function AnimationProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={microTransition}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
