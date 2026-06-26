"use client";

import { ProcessArrowIcon } from "@/components/icons";
import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    lines: [
      "We understand the business, users, product goal,",
      "and technical constraints.",
    ],
  },
  {
    id: "shape",
    index: "02",
    title: "Shape",
    lines: [
      "We define the scope, user flows, architecture,",
      "and delivery plan.",
    ],
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    lines: ["We design, engineer, test, and launch", "with a focused team."],
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    lines: [
      "We improve performance, reliability,",
      "infrastructure, and product growth.",
    ],
  },
] as const;

const rowGridClass =
  "grid w-full grid-cols-[0_1fr_auto] items-start gap-x-4 gap-y-3 pl-16 sm:gap-x-5 md:grid-cols-[0_1fr_1fr_1fr_0.5fr] md:items-center md:gap-x-6 md:pl-20 lg:gap-x-8 lg:pl-24";

const ctaGridClass =
  "grid w-full grid-cols-[0_auto_1fr_auto] items-center gap-x-4 gap-y-3 pl-16 sm:gap-x-5 md:grid-cols-[0_6.5rem_10rem_minmax(16rem,22rem)_1fr_2rem] md:items-center md:gap-x-8 md:pl-20 lg:grid-cols-[0_7rem_10.5rem_minmax(18rem,24rem)_1fr_2rem] lg:gap-x-10 lg:pl-24";

function TimelineMarker({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute top-1/2 z-10 flex size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ink/20 bg-white ${className}`}
      aria-hidden="true"
    >
      <span className="size-[5px] bg-brand" />
    </span>
  );
}

export function ProcessRoadmapSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="process-roadmap"
      className="border-t border-border bg-sea-salt"
      aria-labelledby="process-roadmap-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span
              className="h-0.5 w-8 shrink-0 bg-brand"
              aria-hidden="true"
            />
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              How we work
            </p>
          </div>

          <h2
            id="process-roadmap-heading"
            className="mt-8 max-w-[16ch] text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.06] tracking-tight text-ink lg:mt-10"
          >
            A clear process from idea to launch.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger className="relative ml-3 lg:ml-4">
          <div
            className="absolute bottom-0 left-0 top-0 w-px bg-border"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <motion.article
              key={step.id}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="relative py-10 lg:py-[3.25rem]"
            >
              <div className={rowGridClass}>
                <span className="relative col-start-1 row-start-1 w-0 self-center">
                  <TimelineMarker className="-left-16 md:-left-20 lg:-left-24" />
                </span>

                <div className="col-start-2 flex w-full min-w-0 flex-col items-start gap-2 md:contents">
                  <p className="justify-self-start text-left text-[2.75rem] font-semibold leading-none tracking-tight text-ink md:col-start-2 md:row-start-1 md:text-[3.25rem] lg:text-[3.5rem]">
                    {step.index}
                  </p>

                  <h3 className="w-full justify-self-start text-left text-[2.75rem] font-bold leading-none tracking-tight text-ink md:col-start-3 md:row-start-1 md:w-auto md:text-[3.25rem] lg:text-[3.5rem]">
                    {step.title}
                  </h3>

                  <p className="w-full min-w-0 justify-self-start text-left text-[14px] leading-[1.55] text-muted md:col-start-4 md:row-start-1 md:text-[15px]">
                    {step.lines[0]}
                    <br />
                    {step.lines[1]}
                  </p>
                </div>

                <span className="col-start-3 row-start-1 flex h-7 w-7 shrink-0 items-center justify-center justify-self-end self-start md:col-start-5 md:justify-self-center md:self-center lg:h-8 lg:w-8">
                  <ProcessArrowIcon className="h-full w-full text-brand" />
                </span>
              </div>

              <div
                className="absolute bottom-0 left-16 right-0 h-px bg-border md:left-20 lg:left-24"
                aria-hidden="true"
              />
            </motion.article>
          ))}

          <motion.div variants={pickMotion(reduced, fadeUpSafe)}>
            <Link
              href="#contact"
              className="group relative block py-10 transition-colors hover:bg-ink/[0.02] lg:py-[3.25rem]"
            >
              <div className={ctaGridClass}>
                <span className="relative col-start-1 row-start-1 w-0 self-center">
                  <TimelineMarker className="-left-16 md:-left-20 lg:-left-24" />
                </span>

                <p className="col-start-2 col-span-2 row-start-1 self-center text-[2.75rem] font-semibold leading-none tracking-tight text-brand md:col-span-2 md:text-[3.25rem] lg:text-[3.5rem]">
                  Start a project
                </p>

                <p className="col-span-4 row-start-2 self-center text-[14px] leading-[1.55] text-muted sm:col-span-4 md:col-span-1 md:col-start-4 md:row-start-1 md:text-[15px]">
                  Tell us about your product, timeline,
                  <br />
                  and what you want to build next.
                </p>

                <span className="col-start-4 row-start-1 flex h-7 w-7 shrink-0 items-center justify-center justify-self-end self-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-6 md:row-start-1 lg:h-8 lg:w-8">
                  <ProcessArrowIcon className="h-full w-full text-brand" />
                </span>
              </div>
            </Link>
          </motion.div>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
