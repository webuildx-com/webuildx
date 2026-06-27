"use client";

import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    description: "We define the scope, user flows, architecture, and delivery plan.",
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    description: "We design, engineer, test, and launch with a focused team.",
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    description:
      "We improve performance, reliability, infrastructure, and product growth.",
  },
] as const;

/** Horizontal offset (from each column's left edge) where the node + connector sit. */
const ANCHOR = "3.25rem";
/** Width of one column inside the pl-[7%] grid (93% / 4 columns). */
const COL_W = 23.25;
const CYCLE_MS = 2400;

function TimelineNode({ active }: { active: boolean }) {
  return (
    <span
      className={`relative flex items-center justify-center rounded-full border bg-black transition-all duration-500 ease-out ${
        active ? "h-5 w-5 border-brand/50" : "h-[18px] w-[18px] border-white/25"
      }`}
    >
      {active && (
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/20" />
      )}
      <span
        className={`rounded-full transition-all duration-500 ease-out ${
          active ? "h-2.5 w-2.5 bg-brand" : "h-[5px] w-[5px] bg-white/45"
        }`}
      />
    </span>
  );
}

function GhostNumber({ value, active }: { value: string; active: boolean }) {
  return (
    <span
      className={`block text-[clamp(3.25rem,5.5vw,5.25rem)] font-extralight leading-none tracking-tight transition-colors duration-700 ease-out ${
        active ? "text-brand/90" : "text-white/[0.18]"
      }`}
    >
      {value}
    </span>
  );
}

export function ProcessTimelineSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  // Cycle through steps, then a final "launch" phase (index === steps.length).
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % (steps.length + 1)),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  const launched = active >= steps.length;

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a]"
      aria-labelledby="process-heading"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                How we work
              </p>
              <h2
                id="process-heading"
                className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white"
              >
                A clear process
                <br className="hidden sm:block" /> from idea to launch
                <span className="text-brand">.</span>
              </h2>
            </div>

            <div className="relative max-w-xs lg:pb-1 lg:pr-12">
              <p className="text-[13px] leading-relaxed text-white/55">
                A focused, transparent process that turns complexity into clarity
                and ideas into real-world impact.
              </p>
              <Link
                href="/start-a-project"
                className="group mt-5 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[14px] font-medium text-white transition-colors hover:border-brand"
              >
                Start a project
                <ArrowRightIcon className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-16 hidden lg:mt-20 lg:block">
          {/* Horizontal rail (node centers sit at 38px from top) */}
          <div
            className="pointer-events-none absolute inset-x-0"
            style={{ top: "38px" }}
            aria-hidden="true"
          >
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            <div
              className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                width: launched
                  ? "100%"
                  : `calc(7% + ${(active * COL_W).toFixed(2)}% + ${ANCHOR})`,
              }}
            />
            {/* START */}
            <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-brand" />
            <span
              className="absolute top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-medium uppercase tracking-[0.22em] text-white/40"
              style={{ left: "-2rem" }}
            >
              Start
            </span>
            {/* LAUNCH */}
            <span className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2 bg-[#0a0a0a] pl-3">
              <span
                className={`text-[9px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                  launched ? "text-brand" : "text-white/40"
                }`}
              >
                Launch
              </span>
              <svg
                width="22"
                height="8"
                viewBox="0 0 22 8"
                fill="none"
                className="text-brand"
              >
                <path
                  d="M0 4h20M17 1l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* Columns — inset from the left so the rail reads long, like the mockup */}
          <ScrollRevealStagger className="grid grid-cols-4 pl-[7%]">
            {steps.map((step, i) => (
              <motion.article
                key={step.id}
                variants={pickMotion(reduced, fadeUpSafe)}
                className="relative min-h-[300px] pt-[104px]"
              >
                {/* Column divider: starts below the rail, runs to the bottom */}
                {i > 0 && (
                  <span
                    className="absolute bottom-0 left-0 top-[70px] w-px bg-white/10"
                    aria-hidden="true"
                  />
                )}

                {/* Node group, anchored over the big number */}
                <div
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: ANCHOR }}
                >
                  <span
                    className={`mb-2.5 text-[12px] font-medium tracking-wide transition-colors duration-500 ${
                      i === active ? "text-brand" : "text-white/40"
                    }`}
                  >
                    {step.index}
                  </span>
                  <TimelineNode active={i === active} />
                  <span
                    className={`mt-2 block border-l border-dashed transition-colors duration-500 ${
                      i === active ? "border-brand/50" : "border-white/20"
                    }`}
                    style={{ height: "44px" }}
                    aria-hidden="true"
                  />
                </div>

                <div className="pr-6" style={{ paddingLeft: "1.5rem" }}>
                  <GhostNumber value={step.index} active={i === active} />
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[185px] text-[13px] leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </ScrollRevealStagger>

          {/* Bottom rule */}
          <div className="mt-14 h-px w-full bg-white/10" aria-hidden="true" />
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <ScrollRevealStagger className="mt-12 lg:hidden">
          <div className="relative">
            <span
              className="absolute bottom-2 left-[9px] top-2 w-px bg-white/15"
              aria-hidden="true"
            />
            <div className="space-y-9">
              {steps.map((step, i) => (
                <motion.article
                  key={step.id}
                  variants={pickMotion(reduced, fadeUpSafe)}
                  className="relative pl-10"
                >
                  <span className="absolute left-0 top-1.5">
                    <TimelineNode active={i === active} />
                  </span>
                  <div className="flex items-baseline gap-3">
                    <GhostNumber value={step.index} active={i === active} />
                    <h3 className="text-[18px] font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
