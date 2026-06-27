"use client";

import { fadeUpScroll, pickMotion, SCROLL_VIEWPORT } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const variants = pickMotion(reduced, {
    hidden: fadeUpScroll.hidden,
    visible: {
      ...fadeUpScroll.visible,
      transition: {
        ...fadeUpScroll.visible.transition,
        delay,
      },
    },
  });

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealStaggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollRevealStagger({
  children,
  className,
}: ScrollRevealStaggerProps) {
  const reduced = useReducedMotion();
  const variants = pickMotion(reduced, {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.04 },
    },
  });

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
