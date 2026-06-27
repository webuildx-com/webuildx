export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Opaque enter — avoids blank page if hydration is slow */
export const fadeUpSafe = {
  hidden: { opacity: 1, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Lightweight scroll reveal — no blur, minimal travel */
export const fadeUpScroll = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const fadeDownSafe = {
  hidden: { opacity: 1, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const lineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const lineDrawSafe = {
  hidden: { opacity: 1, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeInSafe = {
  hidden: { opacity: 1, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerDelayed = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.65 },
  },
};

export const staggerScroll = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

export const SCROLL_VIEWPORT = {
  once: true,
  margin: "-10% 0px",
  amount: 0.2,
} as const;

export const instant = {
  hidden: { opacity: 1, y: 0, scaleX: 1 },
  visible: { opacity: 1, y: 0, scaleX: 1 },
};

export function pickMotion<T extends Record<string, unknown>>(
  reduced: boolean | null,
  variants: T,
): T {
  return reduced ? (instant as unknown as T) : variants;
}
