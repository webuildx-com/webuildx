"use client";

import { fadeUpSafe, pickMotion, stagger } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

export function StartProjectHero() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-sea-salt pt-[72px]" aria-labelledby="start-project-heading">
      <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-14 lg:px-10 lg:pb-10 lg:pt-16">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={pickMotion(reduced, stagger)}
        >
          <motion.h1
            id="start-project-heading"
            variants={pickMotion(reduced, fadeUpSafe)}
            className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-ink"
          >
            Tell us what you&apos;re building
            <span className="text-brand">.</span>
          </motion.h1>
          <motion.p
            variants={pickMotion(reduced, fadeUpSafe)}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted lg:mt-6 lg:text-[16px]"
          >
            Tell us what you&apos;re building, where you are in the process, and
            what kind of help you need. We&apos;ll help you figure out the
            smartest path to design, build, or scale it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
