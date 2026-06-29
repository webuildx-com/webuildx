"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { specialties } from "@/lib/about";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

export function AboutNetworkSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a]"
      aria-labelledby="about-network-heading"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <ScrollReveal className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
            Our network
          </p>
          <h2
            id="about-network-heading"
            className="mt-5 text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
          >
            A senior network, not a bloated agency
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/55 lg:mt-6 lg:text-[16px]">
            We operate as a focused studio with a 30+ person specialist
            network — designers, engineers, and product people who join each
            engagement as the work demands
          </p>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {specialties.map((label) => (
            <motion.div
              key={label}
              variants={pickMotion(reduced, fadeUpSafe)}
              className="group flex items-center gap-3 bg-[#0a0a0a] px-5 py-6 sm:px-6 sm:py-7"
            >
              <span
                className="h-px w-3 shrink-0 bg-brand/50 transition-all duration-300 group-hover:w-5 group-hover:bg-brand"
                aria-hidden="true"
              />
              <p className="text-[14px] font-medium leading-snug text-white/75 transition-colors group-hover:text-white sm:text-[15px]">
                {label}
              </p>
            </motion.div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
