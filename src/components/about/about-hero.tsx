"use client";

import { fadeUpSafe, pickMotion, stagger } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-sea-salt pt-[72px]" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-12 sm:pt-14 lg:pb-16 lg:pt-16">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={pickMotion(reduced, stagger)}
        >
          <motion.p
            variants={pickMotion(reduced, fadeUpSafe)}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand"
          >
            About WebuildX
          </motion.p>
          <motion.h1
            id="about-heading"
            variants={pickMotion(reduced, fadeUpSafe)}
            className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-ink"
          >
            We are a design and engineering studio
          </motion.h1>
          <motion.p
            variants={pickMotion(reduced, fadeUpSafe)}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted lg:mt-6 lg:text-[16px]"
          >
            WebuildX builds software products for founders and companies who
            need both the design and the engineering done well, by the same
            team, from start to finish
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={pickMotion(reduced, fadeUpSafe)}
          transition={{ delay: 0.15 }}
          className="mt-12 overflow-hidden rounded-2xl lg:mt-16"
        >
          <Image
            src="/images/about-hero.png"
            alt=""
            width={1024}
            height={341}
            className="h-auto w-full object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
