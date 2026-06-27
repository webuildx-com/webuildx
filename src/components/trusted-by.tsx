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
      <motion.p
        className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand sm:mb-5"
        variants={fadeUpSafe}
      >
        Trusted by ambitious teams
      </motion.p>

      {/* Mobile: 3 on top, 2 centered below — 6-col grid keeps rows aligned */}
      <motion.ul
        className="grid grid-cols-6 gap-x-1 gap-y-5 sm:hidden"
        variants={staggerDelayed}
      >
        {logos.slice(0, 3).map(({ id, label }) => (
          <motion.li
            key={id}
            className="col-span-2 flex items-center justify-center text-center"
            variants={fadeUpSafe}
          >
            <span className="text-[13px] font-bold leading-tight tracking-tight text-ink">
              {label}
            </span>
          </motion.li>
        ))}
        {logos.slice(3).map(({ id, label }, index) => (
          <motion.li
            key={id}
            className={`col-span-2 flex items-center justify-center text-center ${
              index === 0 ? "col-start-2" : "col-start-4"
            }`}
            variants={fadeUpSafe}
          >
            <span className="text-[13px] font-bold leading-tight tracking-tight text-ink">
              {label}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Desktop: single row */}
      <motion.ul
        className="hidden sm:flex sm:items-center"
        variants={staggerDelayed}
      >
        {logos.map(({ id, label }, index) => (
          <motion.li
            key={id}
            className="relative flex-1 py-1 text-center"
            variants={fadeUpSafe}
          >
            {index > 0 && (
              <span
                className="absolute left-0 top-1/2 h-6 w-px -translate-y-1/2 bg-border"
                aria-hidden="true"
              />
            )}
            <span className="text-[13px] font-bold leading-none tracking-tight text-ink">
              {label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
