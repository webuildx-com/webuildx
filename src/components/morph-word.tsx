"use client";

import { EASE } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const MORPH_WORDS = ["design", "build", "scale"] as const;
export const MORPH_WORD_INTERVAL_MS = 2800;

const wordMorph = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.3, ease: EASE },
  },
};

const wordMorphBlock = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: EASE },
  },
};

export function useMorphWord() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) return;

    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % MORPH_WORDS.length);
    }, MORPH_WORD_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [mounted, reduced]);

  return {
    word: MORPH_WORDS[wordIndex],
    reduced: mounted ? reduced : false,
    mounted,
  };
}

export function MorphWordInline({
  word,
  reduced,
  mounted = true,
}: {
  word: string;
  reduced: boolean | null;
  mounted?: boolean;
}) {
  if (!mounted || reduced) {
    return (
      <span className="inline-block whitespace-nowrap text-ink" aria-live="polite">
        {word}
      </span>
    );
  }

  return (
    <motion.span
      className="inline-flex overflow-hidden align-baseline text-ink"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className="inline-block whitespace-nowrap"
          variants={wordMorph}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

export function MorphWordBlock({
  word,
  reduced,
}: {
  word: string;
  reduced: boolean | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced) {
    return (
      <span
        className="relative mt-1 block min-h-[2.5rem] text-brand sm:mt-1.5 sm:min-h-[3rem] lg:min-h-[3.65rem]"
        aria-live="polite"
      >
        {word}
      </span>
    );
  }

  return (
    <span
      className="relative mt-1 block min-h-[2.5rem] overflow-hidden sm:mt-1.5 sm:min-h-[3rem] lg:min-h-[3.65rem]"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className="absolute left-0 top-0 block text-brand"
          variants={wordMorphBlock}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
