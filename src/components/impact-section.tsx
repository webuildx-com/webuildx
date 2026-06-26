"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { RevealBlock } from "@/components/section-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "10+",
    accent: true,
    description: "Products, platforms, and digital systems delivered.",
  },
  {
    value: "5+",
    accent: false,
    description:
      "Industries served across fintech, AI, SaaS, logistics, healthtech, and commerce.",
  },
  {
    value: "2–4 months",
    accent: true,
    description: "Typical MVP launch timeline for focused product builds.",
  },
  {
    value: "30+",
    accent: false,
    description:
      "Design, engineering, product, and cloud specialists across our network.",
  },
  {
    value: "200+",
    accent: true,
    description:
      "Cloud workloads, services, and infrastructure components managed.",
  },
  {
    value: "$1M+",
    accent: false,
    description:
      "Transaction and product infrastructure supported across fintech systems.",
  },
];

export function ImpactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="impact"
      className="flex min-h-svh flex-col bg-sea-salt"
      aria-labelledby="impact-heading"
    >
      <RevealBlock className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex min-h-0 flex-1 flex-col justify-center gap-12 lg:gap-16">
          <ScrollReveal className="max-w-2xl shrink-0">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              Our impact
            </p>
            <h2
              id="impact-heading"
              className="text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.35rem] lg:text-[2.5rem]"
            >
              Built for outcomes, not just delivery
              <span className="text-brand">.</span>
            </h2>
          </ScrollReveal>

          <ScrollRevealStagger className="grid w-full shrink-0 grid-cols-1 divide-y divide-border border border-border md:grid-cols-2 md:divide-x lg:grid-cols-3">
            {stats.map(({ value, accent, description }) => (
              <motion.article
                key={value}
                variants={pickMotion(reduced, fadeUpSafe)}
                className="flex min-h-[220px] flex-col justify-center px-8 py-8 transition-colors duration-500 hover:bg-black/[0.02] lg:min-h-[240px] lg:px-10 lg:py-10"
              >
                <p
                  className={`text-[2.35rem] font-semibold leading-none tracking-tight sm:text-[2.5rem] lg:text-[2.75rem] ${
                    accent ? "text-brand" : "text-ink"
                  }`}
                >
                  {value}
                </p>
                <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed text-muted">
                  {description}
                </p>
              </motion.article>
            ))}
          </ScrollRevealStagger>
        </div>
      </RevealBlock>
    </section>
  );
}
