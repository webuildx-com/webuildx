"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { principles } from "@/lib/about";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

export function AboutPrinciplesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="section-dot-grid section-dot-grid-mask"
      aria-labelledby="about-principles-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mb-12 max-w-xl lg:mb-16">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
            What we believe
          </p>
          <h2
            id="about-principles-heading"
            className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
          >
            How we work with teams
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {principles.map(({ index, title, description }) => (
            <motion.article
              key={index}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="border-t border-border py-8 sm:border-l sm:border-t-0 sm:px-6 sm:py-8 sm:first:border-l-0 lg:px-8 lg:py-10"
            >
              <p
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle"
                aria-hidden="true"
              >
                {index}
              </p>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink lg:mt-4 lg:text-[18px]">
                {title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted lg:mt-3">
                {description}
              </p>
            </motion.article>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
