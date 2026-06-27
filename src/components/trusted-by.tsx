"use client";

import { useHeroEntrance } from "@/components/hero-entrance";
import { fadeUpSafe, staggerDelayed } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const logos = [
  { id: "knoxxpay", label: "KnoxxPay" },
  { id: "creditveto", label: "CreditVeto" },
  { id: "orangefarm", label: "Orange Farm" },
  { id: "klerra", label: "Klerra" },
  { id: "landlordcare", label: "LandLordCare" },
] as const;

function LogoLabel({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap text-[12px] font-medium tracking-[0.02em] text-ink/40 transition-colors duration-300 hover:text-ink/55">
      {label}
    </span>
  );
}

export function TrustedBy() {
  const { entered } = useHeroEntrance();
  const reduced = useReducedMotion();
  const marqueeLogos = reduced ? logos : [...logos, ...logos];

  return (
    <motion.div
      aria-label="Trusted by"
      initial="hidden"
      animate={entered ? "visible" : "hidden"}
      variants={staggerDelayed}
    >
      <motion.p
        className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-subtle sm:mb-4"
        variants={fadeUpSafe}
      >
        Trusted by ambitious teams
      </motion.p>

      {/* Mobile: slow drift */}
      <motion.div className="sm:hidden" variants={fadeUpSafe}>
        <div
          className={
            reduced
              ? "-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
          }
        >
          <ul
            className={`flex w-max items-center ${
              reduced ? "gap-10" : "animate-trusted-marquee gap-12 pr-12"
            }`}
          >
            {marqueeLogos.map(({ id, label }, index) => (
              <li key={`${id}-${index}`} className="shrink-0">
                <LogoLabel label={label} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Desktop */}
      <motion.ul
        className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-2 lg:gap-x-12"
        variants={staggerDelayed}
      >
        {logos.map(({ id, label }) => (
          <motion.li key={id} variants={fadeUpSafe}>
            <LogoLabel label={label} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
