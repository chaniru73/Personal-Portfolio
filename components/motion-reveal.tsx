"use client";

import {
  type CSSProperties,
  type ComponentType,
  type ElementType,
  type ReactNode,
  type Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, type HTMLMotionProps, useInView, useReducedMotion } from "motion/react";

import {
  type RevealVariant,
  motionEase,
  revealTransition,
  revealVariants,
} from "@/lib/motion-variants";

type MotionRevealElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li"
  | "ul"
  | "footer";

export type MotionRevealProps = Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "variants" | "transition" | "whileHover" | "whileTap"
> & {
  as?: MotionRevealElement;
  children: ReactNode;
  delay?: number;
  hover?: "card";
  variant?: RevealVariant;
};

const motionElements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  li: motion.li,
  ul: motion.ul,
  footer: motion.footer,
} satisfies Record<MotionRevealElement, ElementType>;

const maxRevealDelay = 1200;

export default function MotionReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  hover,
  style,
  variant = "fade-up",
  ...props
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.18,
    margin: "0px 0px -96px 0px",
  });
  const Component = motionElements[as] as ComponentType<
    Omit<HTMLMotionProps<"div">, "ref"> & { ref?: Ref<HTMLElement> }
  >;
  const shouldAnimate = mounted && !prefersReducedMotion;
  const animateState = !shouldAnimate || isInView ? "visible" : "hidden";
  const revealStyle = {
    ...style,
    transformOrigin: variant === "scale-in" ? "center" : undefined,
  } as CSSProperties;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={`motion-reveal ${className}`.trim()}
      initial={false}
      animate={animateState}
      variants={revealVariants[variant]}
      transition={{
        ...revealTransition,
        delay: shouldAnimate ? Math.min(Math.max(delay, 0), maxRevealDelay) / 1000 : 0,
      }}
      whileHover={
        hover === "card" && !prefersReducedMotion
          ? { y: -3, borderColor: "var(--color-accent)" }
          : undefined
      }
      whileTap={undefined}
      {...props}
      style={revealStyle}
    >
      {children}
    </Component>
  );
}

export const childStagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
      ease: motionEase,
    },
  },
};
