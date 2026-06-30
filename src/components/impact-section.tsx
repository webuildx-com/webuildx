"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "10+",
    label: "Products delivered",
    description: "Products, platforms, and digital systems shipped end to end",
  },
  {
    value: "30+",
    label: "Specialists",
    description: "Designers, engineers, and product people across our network",
  },
  {
    value: "$1M+",
    label: "Infrastructure supported",
    description: "Transaction and product infrastructure across fintech systems",
  },
  {
    value: "5+",
    label: "Industries",
    description: "Fintech, SaaS, AI, logistics, and commerce",
  },
] as const;

export function ImpactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="impact"
      className="bg-[#0a0a0a]"
      aria-label="Our impact"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
                Our impact
              </p>
              <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                The work, in numbers
              </h2>
            </div>
            <p className="max-w-xs text-[14px] leading-relaxed text-white/40 lg:pb-1">
              Shipped across fintech, SaaS, AI, and logistics. Every number is a product in production.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile + tablet: stacked list */}
        <ScrollRevealStagger className="flex flex-col divide-y divide-white/10 lg:hidden">
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="flex items-center gap-8 py-7 sm:gap-16"
            >
              <p className="w-28 shrink-0 text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-white sm:w-36 sm:text-[3.25rem]">
                {stat.value}
              </p>
              <div>
                <p className="text-[15px] font-medium text-white/80">
                  {stat.label}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/35">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </ScrollRevealStagger>

        {/* Desktop: 4-column row with equal spacing */}
        <ScrollRevealStagger className="hidden lg:flex">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              variants={pickMotion(reduced, fadeUpSafe)}
              className={`flex flex-1 flex-col gap-5 ${
                index === 0
                  ? "pr-10"
                  : index === stats.length - 1
                  ? "border-l border-white/10 pl-10"
                  : "border-l border-white/10 px-10"
              }`}
            >
              <p className="text-[clamp(3.5rem,5vw,5.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">
                {stat.value}
              </p>
              <div className="flex flex-col gap-1.5">
                <p className="text-[15px] font-medium text-white/80">
                  {stat.label}
                </p>
                <p className="text-[13px] leading-relaxed text-white/35">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </ScrollRevealStagger>

      </div>
    </section>
  );
}
