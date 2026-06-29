"use client";

import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { howWeBuildSteps } from "@/lib/about";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function AboutHowWeBuildSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a]"
      aria-labelledby="about-how-we-build-heading"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <ScrollReveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:gap-16">
            <div className="max-w-xl lg:max-w-2xl">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand lg:mb-4">
                How we build
              </p>
              <h2
                id="about-how-we-build-heading"
                className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
              >
                How we build
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/55 lg:mt-6 lg:text-[16px]">
                We keep strategy, design, and engineering close together, so
                ideas do not get lost between teams — the same people who help
                shape the product are involved in building it, refining it, and
                helping it scale
              </p>
            </div>

            <Link
              href="/#process"
              className="group inline-flex shrink-0 items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white sm:pt-2 lg:pt-4"
            >
              See our process
              <ArrowRightIcon className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-16 border-t border-white/[0.08] lg:mt-20">
          {howWeBuildSteps.map(({ index, title, description }) => (
            <motion.article
              key={index}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 border-b border-white/[0.08] py-8 sm:grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-x-8 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)_1.5rem] lg:gap-x-12 lg:py-10"
            >
              <p className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-brand sm:text-[14px]">
                {index}
              </p>
              <h3 className="text-[1.35rem] font-semibold leading-[1.15] tracking-tight text-white sm:col-start-2 sm:row-start-1 sm:text-[1.5rem] lg:pr-6 lg:text-[1.65rem]">
                {title}
              </h3>
              <p className="col-span-2 text-[14px] leading-[1.65] text-white/50 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:max-w-none lg:text-[15px] lg:leading-relaxed">
                {description}
              </p>
              <ArrowRightIcon
                className="col-span-2 h-4 w-4 shrink-0 justify-self-end text-brand sm:col-span-1 sm:col-start-4 sm:row-start-1 sm:justify-self-end"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
