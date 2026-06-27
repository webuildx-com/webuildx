"use client";

import { useHeroEntrance } from "@/components/hero-entrance";
import { fadeUpSafe, staggerDelayed } from "@/lib/motion";
import { motion } from "framer-motion";

const logos = [
  { id: "knoxxpay", label: "KnoxxPay" },
  { id: "creditveto", label: "CreditVeto" },
  { id: "orangefarm", label: "Orange Farm" },
  { id: "klerra", label: "Klerra" },
  { id: "landlordcare", label: "LandLordCare" },
] as const;

export function TrustedBy() {
  const { entered } = useHeroEntrance();

  return (
    <motion.div
      aria-label="Trusted by"
      initial="hidden"
      animate={entered ? "visible" : "hidden"}
      variants={staggerDelayed}
    >
      <motion.div
        className="mb-4 flex items-center gap-4 sm:mb-5 sm:gap-5"
        variants={fadeUpSafe}
      >
        <p className="shrink-0 text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-subtle sm:text-[11px]">
          Trusted by ambitious teams
        </p>
        <span className="h-px min-w-0 flex-1 bg-border" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-0 sm:gap-y-0"
        variants={staggerDelayed}
      >
        {logos.map(({ id, label }, index) => (
          <motion.div
            key={id}
            className="relative flex min-w-0 items-center sm:flex-1 sm:justify-center sm:px-3 sm:py-3"
            variants={fadeUpSafe}
          >
            {index > 0 && (
              <span
                className="absolute -left-3 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-border sm:left-0 sm:block"
                aria-hidden="true"
              />
            )}
            <span className="whitespace-nowrap text-[11px] font-semibold leading-none tracking-tight text-ink/60 sm:text-center sm:text-[12px]">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
