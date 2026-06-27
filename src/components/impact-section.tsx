"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const featuredStats = [
  {
    value: "10+",
    description: "Products, platforms, and digital systems delivered.",
  },
  {
    value: "30+",
    description:
      "Design, engineering, product, and cloud specialists across our network.",
  },
  {
    value: "$1M+",
    description:
      "Transaction and product infrastructure supported across fintech systems.",
  },
] as const;

export function ImpactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="impact"
      className="bg-sea-salt sm:flex sm:flex-col"
      aria-label="Our impact"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:py-20 lg:px-10 lg:py-28">
        {/* Mobile */}
        <div className="sm:hidden">
          <ScrollReveal className="mb-6 max-w-xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              Our impact
            </p>
            <h2 className="text-[1.5rem] font-semibold leading-[1.15] tracking-tight text-ink">
              Built for outcomes
              <span className="text-brand">.</span>
            </h2>
          </ScrollReveal>

          <ScrollRevealStagger className="divide-y divide-border border-y border-border">
            {featuredStats.map(({ value, description }) => (
              <motion.article
                key={value}
                variants={pickMotion(reduced, fadeUpSafe)}
                className="flex flex-col gap-2 py-5"
              >
                <p className="text-[1.75rem] font-semibold leading-none tracking-tight text-ink">
                  {value}
                </p>
                <p className="text-[13px] leading-relaxed text-muted">
                  {description}
                </p>
              </motion.article>
            ))}
          </ScrollRevealStagger>
        </div>

        {/* Tablet + desktop: align left column with Selected Work (340px at lg) */}
        <div className="hidden sm:grid sm:w-full sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:items-center sm:gap-x-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className="flex min-w-0 flex-col justify-center border-r border-border py-4 pr-8 md:py-6 lg:py-8 lg:pr-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand lg:mb-4">
              Our impact
            </p>
            <h2 className="text-[1.5rem] font-semibold leading-[1.15] tracking-tight text-ink md:text-[1.75rem] lg:text-[2rem] xl:text-[2.15rem]">
              Built for outcomes, not just delivery
              <span className="text-brand">.</span>
            </h2>
          </ScrollReveal>

          <ScrollRevealStagger className="flex min-w-0 flex-1 items-center">
            {featuredStats.map(({ value, description }, index) => (
              <motion.article
                key={value}
                variants={pickMotion(reduced, fadeUpSafe)}
                className="relative flex flex-1 flex-col justify-center px-5 py-6 md:px-7 md:py-7 lg:px-8 lg:py-8"
              >
                {index > 0 && (
                  <span
                    className="absolute left-0 top-1/2 h-[calc(100%-2rem)] max-h-32 w-px -translate-y-1/2 bg-border lg:max-h-40"
                    aria-hidden="true"
                  />
                )}
                <p className="text-[1.75rem] font-semibold leading-none tracking-tight text-ink md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]">
                  {value}
                </p>
                <p className="mt-3 max-w-[220px] text-[13px] leading-snug text-muted md:text-[14px] lg:mt-4 lg:leading-relaxed">
                  {description}
                </p>
              </motion.article>
            ))}
          </ScrollRevealStagger>
        </div>
      </div>
    </section>
  );
}
