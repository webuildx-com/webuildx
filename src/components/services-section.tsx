"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ServiceFeaturedVisual } from "@/components/service-featured-visual";
import { useLenis } from "@/components/scroll-context";
import { EASE, pickMotion } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const steps = [
  {
    id: "design",
    title: "Design",
    items: [
      "Brand identity design",
      "Product UI design",
      "Marketing websites",
      "Mobile app design",
      "UX & user flows",
    ],
  },
  {
    id: "build",
    title: "Build",
    items: [
      "Web applications",
      "Mobile applications",
      "Fintech & payment software",
      "Backend & integrations",
      "AI-powered products",
      "Admin & ops tools",
    ],
  },
  {
    id: "scale",
    title: "Scale",
    items: [
      "Cloud infrastructure",
      "Production deployments",
      "Monitoring & alerting",
      "Performance optimization",
      "Security hardening",
      "Retained engineering",
    ],
  },
] as const;

type StepId = (typeof steps)[number]["id"];

const HEADER_OFFSET = 72;
/** ~1.3 screens of scroll per service chapter */
const STEP_SCROLL_HEIGHT = "h-[130svh]";

const slideFromLeft = {
  initial: { opacity: 0, x: -56 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.35, ease: EASE },
  },
};

const slideFromRight = {
  initial: { opacity: 0, x: 56 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.35, ease: EASE },
  },
};

function getScrollAnchor() {
  return HEADER_OFFSET + (window.innerHeight - HEADER_OFFSET) * 0.38;
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop;
}

export function ServicesSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [activeId, setActiveId] = useState<StepId>("design");
  const sectionRef = useRef<HTMLElement>(null);

  const activeStep =
    steps.find((step) => step.id === activeId) ?? steps[0];
  const activeIndex = steps.findIndex((step) => step.id === activeId);

  const updateActiveStep = useCallback(() => {
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

    setActiveId(steps[index].id);
  }, [lenis]);

  useLayoutEffect(() => {
    updateActiveStep();

    if (lenis) {
      lenis.on("scroll", updateActiveStep);
      return () => lenis.off("scroll", updateActiveStep);
    }

    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [lenis, updateActiveStep]);

  const scrollToStep = (id: StepId) => {
    const section = sectionRef.current;
    if (!section) return;

    const stepIndex = steps.findIndex((step) => step.id === id);
    if (stepIndex < 0) return;

    const scrollY = lenis?.scroll ?? getScrollY();
    const sectionTop = scrollY + section.getBoundingClientRect().top;
    const stepHeight = section.offsetHeight / steps.length;
    const target = sectionTop - getScrollAnchor() + stepHeight * stepIndex + stepHeight * 0.2;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }

    setActiveId(id);
  };

  const textMotion = pickMotion(reduced, slideFromLeft);
  const visualMotion = pickMotion(reduced, slideFromRight);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative border-t border-border bg-sea-salt"
      aria-labelledby="services-heading"
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
          <div className="sticky top-[72px] flex h-[calc(100svh-72px)] flex-col pointer-events-auto">
            <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 py-10 lg:px-10 lg:py-14">
              <ScrollReveal className="mb-8 max-w-2xl shrink-0 lg:mb-10">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                  What we do
                </p>
                <h2
                  id="services-heading"
                  className="text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.1rem] lg:text-[2.35rem]"
                >
                  One studio for product, design, and technology
                  <span className="text-brand">.</span>
                </h2>
              </ScrollReveal>

              <div className="flex min-h-0 flex-1 flex-col justify-center">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
                  <div className="min-h-[240px] overflow-hidden lg:min-h-[320px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeStep.id}
                        initial={textMotion.initial}
                        animate={textMotion.animate}
                        exit={textMotion.exit}
                        className="max-w-lg"
                      >
                        <h3 className="text-[2rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.75rem]">
                          {activeStep.title}
                        </h3>
                        <ul className="mt-6 grid gap-x-10 gap-y-2.5 sm:grid-cols-2 lg:mt-7">
                          {activeStep.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-baseline gap-3 text-[15px] leading-snug text-ink sm:text-[16px]"
                            >
                              <span
                                className="mt-[0.55em] h-px w-3 shrink-0 bg-brand"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-[320px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeStep.id}
                        initial={visualMotion.initial}
                        animate={visualMotion.animate}
                        exit={visualMotion.exit}
                        className="h-full"
                      >
                        <ServiceFeaturedVisual id={activeStep.id} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <nav
                className="mt-8 shrink-0 border-t border-border pt-6 lg:mt-10"
                aria-label="Services"
              >
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {steps.map((step) => {
                    const isActive = activeId === step.id;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => scrollToStep(step.id)}
                          className={`group flex items-center gap-3 text-left transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-muted hover:text-ink"
                          }`}
                        >
                          <span className="text-[14px] font-semibold tracking-tight">
                            {step.title}
                          </span>
                          <span
                            className={`hidden h-px w-8 origin-left transition-transform duration-500 sm:block ${
                              isActive
                                ? "scale-x-100 bg-brand"
                                : "scale-x-0 bg-border group-hover:scale-x-100 group-hover:bg-border"
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div
                  className="mt-5 h-px w-full bg-border"
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full origin-left bg-brand"
                    animate={{
                      scaleX: (activeIndex + 1) / steps.length,
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ width: "100%" }}
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
