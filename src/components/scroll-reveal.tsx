"use client";

import { useLenis } from "@/components/scroll-context";
import { fadeUpScroll, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Fires when ~20% of the element is in view — works with Lenis smooth scroll */
function useScrollInView(enabled = true) {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(reduced === true);

  const check = useCallback(() => {
    if (!enabled || inView || reduced) return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    const topMargin = vh * 0.1;
    const bottomMargin = vh * 0.1;

    const visibleTop = Math.max(rect.top, topMargin);
    const visibleBottom = Math.min(rect.bottom, vh - bottomMargin);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

    if (
      rect.top < vh * 0.92 &&
      rect.bottom > vh * 0.08 &&
      ratio >= 0.18
    ) {
      setInView(true);
    }
  }, [enabled, inView, reduced]);

  useLayoutEffect(() => {
    if (!enabled || reduced) return;

    check();

    if (lenis) {
      lenis.on("scroll", check);
      return () => lenis.off("scroll", check);
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [lenis, check, enabled, reduced]);

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
