"use client";

import {
  HeaderVisibilityContext,
  LenisContext,
} from "@/components/scroll-context";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import "lenis/dist/lenis.css";

const SCROLL_DELTA = 2;
const TOP_ZONE = 72;
const IDLE_MS = 1200;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (reduced) {
      setLenis(null);
      setHeaderVisible(true);
      return;
    }

    const instance = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      autoRaf: true,
      anchors: true,
    });

    setLenis(instance);
    lastScrollY.current = instance.scroll;

    const scheduleIdleHide = (scroll: number) => {
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        if (scroll > TOP_ZONE) {
          setHeaderVisible(false);
        }
      }, IDLE_MS);
    };

    const onScroll = (lenisInstance: Lenis) => {
      const scroll = lenisInstance.scroll;
      const delta = scroll - lastScrollY.current;

      if (scroll <= TOP_ZONE) {
        setHeaderVisible(true);
      } else if (delta > SCROLL_DELTA) {
        setHeaderVisible(false);
      } else if (delta < -SCROLL_DELTA) {
        setHeaderVisible(true);
      }

      lastScrollY.current = scroll;
      scheduleIdleHide(scroll);
    };

    instance.on("scroll", onScroll);

    return () => {
      instance.off("scroll", onScroll);
      instance.destroy();
      setLenis(null);
      clearTimeout(idleTimer.current);
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>
      <HeaderVisibilityContext.Provider value={headerVisible}>
        {children}
      </HeaderVisibilityContext.Provider>
    </LenisContext.Provider>
  );
}
