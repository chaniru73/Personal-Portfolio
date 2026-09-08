"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, type MotionStyle } from "motion/react";

export default function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue("72%");
  const y = useMotionValue("18%");

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(finePointer.matches && !prefersReducedMotion);

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      x.set(`${(event.clientX / window.innerWidth) * 100}%`);
      y.set(`${(event.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [enabled, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="ambient-glow"
      data-enabled={enabled ? "true" : "false"}
      style={{ "--cursor-x": x, "--cursor-y": y } as MotionStyle}
    />
  );
}
