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
    let frame = 0;
    let pointerX = window.innerWidth * 0.72;
    let pointerY = window.innerHeight * 0.18;

    const updatePosition = () => {
      x.set(`${(pointerX / window.innerWidth) * 100}%`);
      y.set(`${(pointerY / window.innerHeight) * 100}%`);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [enabled, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="ambient-background"
      data-enabled={enabled ? "true" : "false"}
      style={{ "--cursor-x": x, "--cursor-y": y } as MotionStyle}
    >
      <span className="ambient-aurora" />
      <span className="ambient-grid" />
      <span className="ambient-stars" />
      <span className="ambient-horizon" />
      <span className="ambient-cursor-glow" />
    </motion.div>
  );
}
