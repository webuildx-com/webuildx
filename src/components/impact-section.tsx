"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { value: "10+", label: "Products delivered", accent: true },
  { value: "5+", label: "Industries served", accent: false },
  { value: "2–4 mo", label: "Typical MVP timeline", accent: true },
  { value: "30+", label: "Specialists in network", accent: false },
  { value: "200+", label: "Cloud workloads managed", accent: true },
  { value: "$1M+", label: "Fintech infra supported", accent: false },
];

export function ImpactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="impact"
      className="bg-sea-salt"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:py-14 lg:px-10 lg:py-20">
        <ScrollReveal className="mb-8 max-w-xl sm:mb-10 lg:mb-12">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
            Our impact
          </p>
          <h2
            id="impact-heading"
            className="text-[1.625rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2rem] lg:text-[2.5rem]"
          >
            Built for outcomes
            <span className="text-brand">.</span>
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:gap-0">
          {stats.map(({ value, label, accent }) => (
            <motion.article
              key={value}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="group flex flex-col justify-between bg-sea-salt px-4 py-4 transition-colors duration-300 hover:bg-black/[0.02] sm:px-6 sm:py-6 lg:min-h-[180px] lg:px-8 lg:py-8"
            >
              <p
                className={`text-[1.5rem] font-semibold leading-none tracking-tight transition-transform duration-300 group-hover:scale-[1.02] sm:text-[2rem] lg:text-[2.5rem] ${
                  accent ? "text-brand" : "text-ink"
                }`}
              >
                {value}
              </p>
              <p className="mt-2 text-[12px] leading-snug text-muted sm:mt-3 sm:text-[13px] lg:text-[14px]">
                {label}
              </p>
            </motion.article>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
