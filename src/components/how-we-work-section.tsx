"use client";

import { ArrowRightIcon } from "@/components/icons";
import { useLenis } from "@/components/scroll-context";
import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { EASE, fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const steps = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    description:
      "We understand the business, users, product goal, and technical constraints.",
  },
  {
    id: "shape",
    index: "02",
    title: "Shape",
    description:
      "We define the scope, user flows, architecture, and delivery plan.",
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    description:
      "We design, engineer, test, and launch with a focused team.",
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    description:
      "We improve performance, reliability, infrastructure, and product growth.",
  },
] as const;

const STICKY_TOP = 128;
/** ~half a screen of scroll per process step */
const STEP_SCROLL_HEIGHT = "h-[55svh]";

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop;
}

function getScrollAnchor() {
  return STICKY_TOP + (window.innerHeight - STICKY_TOP) * 0.38;
}

export function HowWeWorkSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const updateScrollState = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollY = lenis?.scroll ?? getScrollY();
    const sectionTop = scrollY + section.getBoundingClientRect().top;
    const stepHeight = section.offsetHeight / steps.length;
    const relative = scrollY + getScrollAnchor() - sectionTop;
    const index = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(relative / stepHeight)),
    );

    setActiveIndex(index);
  }, [lenis]);

  useLayoutEffect(() => {
    updateScrollState();

    if (lenis) {
      lenis.on("scroll", updateScrollState);
      return () => lenis.off("scroll", updateScrollState);
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [lenis, updateScrollState]);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const stepHeight = section.offsetHeight / steps.length;
    const scrollY = lenis?.scroll ?? getScrollY();
    const sectionTop = scrollY + section.getBoundingClientRect().top;
    const target =
      sectionTop - getScrollAnchor() + stepHeight * index + stepHeight * 0.2;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }

    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="my-6 border-t border-border bg-sea-salt lg:my-10"
      aria-labelledby="how-we-work-heading"
    >
      <div className="relative">
        {steps.map((step) => (
          <div
            key={step.id}
            data-step-id={step.id}
            className={STEP_SCROLL_HEIGHT}
            aria-hidden="true"
          />
        ))}

        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto sticky top-32">
            <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-0">
                <ScrollReveal className="lg:col-span-5 lg:pr-12 xl:pr-16">
            <span
              className="mb-4 block h-0.5 w-10 bg-brand"
              aria-hidden="true"
            />
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              How we work
            </p>
            <h2
              id="how-we-work-heading"
              className="max-w-md text-[2rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.35rem]"
            >
              A clear process from idea to launch
              <span className="text-brand">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted lg:text-[16px]">
              A focused, end-to-end approach that turns strategy into a product
              that delivers real impact.
            </p>

            <Link
              href="/start-a-project"
              className="group relative mt-8 inline-flex items-center gap-3 py-1 pl-4 lg:mt-10"
            >
              <span
                className="absolute bottom-0 left-0 top-0 w-0.5 origin-center scale-y-75 bg-brand/30 transition-all duration-300 group-hover:scale-y-100 group-hover:bg-brand"
                aria-hidden="true"
              />
              <span className="text-[16px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
                Start a project
              </span>
              <ArrowRightIcon className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          </ScrollReveal>

          <ScrollRevealStagger className="lg:col-span-7 lg:pl-12 xl:pl-16">
            <div className="relative">
              <span
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-border"
                aria-hidden="true"
              />

              {steps.map((step, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.article
                    key={step.id}
                    data-step-id={step.id}
                    variants={pickMotion(reduced, fadeUpSafe)}
                    onClick={() => scrollToStep(index)}
                    animate={{
                      opacity: isActive ? 1 : 0.34,
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="relative grid cursor-pointer grid-cols-[minmax(3.5rem,5rem)_1px_1fr] items-start gap-x-6 border-b border-border py-8 pl-5 first:pt-0 last:border-b-0 lg:gap-x-8 lg:py-10 lg:pl-6"
                  >
                    <span
                      className={`absolute bottom-0 left-0 top-0 w-0.5 bg-brand transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />

                    <motion.p
                      aria-hidden="true"
                      animate={{ opacity: isActive ? 1 : 0.85 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`pt-0.5 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-ink"
                          : "text-transparent [-webkit-text-stroke:2px_rgb(11_30_28/0.18)]"
                      }`}
                    >
                      {step.index}
                    </motion.p>

                    <span
                      className="self-stretch bg-border"
                      aria-hidden="true"
                    />

                    <div className="min-w-0 pt-1">
                      <motion.h3
                        animate={{
                          color: isActive
                            ? "rgb(11 30 28)"
                            : "rgb(79 92 90)",
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="text-[17px] font-semibold tracking-tight lg:text-[18px]"
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        animate={{
                          opacity: isActive ? 1 : 0.65,
                          filter: isActive ? "blur(0px)" : "blur(0.4px)",
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="mt-2 max-w-md text-[14px] leading-relaxed text-muted lg:text-[15px]"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </ScrollRevealStagger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
