"use client";

import { fadeUpScroll, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Reveal when the element enters the viewport — IntersectionObserver works with Lenis */
function useScrollInView(enabled = true) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(reduced === true);

  useLayoutEffect(() => {
    if (!enabled || reduced || inView) return;

    const node = ref.current;
    if (!node) return;

    const reveal = () => setInView(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-5% 0px", threshold: 0.12 },
    );

    observer.observe(node);

    // Elements already in view on load (e.g. after refresh mid-page)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      reveal();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [enabled, reduced, inView]);

  return {
    ref,
    inView: !enabled || reduced === true || inView,
  };
}

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useScrollInView();
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
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealStaggerProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollRevealStagger({
  children,
  className,
}: ScrollRevealStaggerProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useScrollInView();
  const variants = pickMotion(reduced, {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.04 },
    },
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
