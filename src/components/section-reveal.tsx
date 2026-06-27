"use client";

import { useLenis } from "@/components/scroll-context";
import { EASE } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** White scroll runway before the next section enters view */
export function SectionBreak() {
  return (
    <div
      className="h-[min(10vh,72px)] sm:h-[min(14vh,100px)] lg:h-[min(20vh,160px)]"
      aria-hidden="true"
    />
  );
}

type RevealBlockProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fade-in for blocks without sticky descendants.
 * Uses Lenis scroll events so reveal actually fires with smooth scroll.
 */
export function RevealBlock({ children, className }: RevealBlockProps) {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(reduced === true);

  const check = useCallback(() => {
    if (revealed) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.08;

    if (inView) setRevealed(true);
  }, [revealed]);

  useLayoutEffect(() => {
    if (reduced) return;

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
  }, [lenis, check, reduced]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
