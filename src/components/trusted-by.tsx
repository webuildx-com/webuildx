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

function TrustedByHeading({
  className,
  labelClassName,
}: {
  className?: string;
  labelClassName: string;
}) {
  return (
    <motion.div
      className={`flex items-center gap-3 sm:gap-4 lg:gap-5 ${className ?? ""}`}
      variants={fadeUpSafe}
    >
      <p className={`shrink-0 ${labelClassName}`}>Trusted by ambitious teams</p>
      <span className="h-px min-w-0 flex-1 bg-border" aria-hidden="true" />
    </motion.div>
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
      {/* Mobile: label + line, then marquee */}
      <TrustedByHeading
        className="mb-5 sm:hidden"
        labelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-subtle"
      />

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
              reduced ? "gap-8" : "animate-trusted-marquee gap-10 pr-10"
            }`}
          >
            {marqueeLogos.map(({ id, label }, index) => (
              <li key={`${id}-${index}`} className="shrink-0">
                <span className="whitespace-nowrap text-[15px] font-semibold tracking-[0.01em] text-ink/50">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Tablet + desktop: label + line, then logo row */}
      <TrustedByHeading
        className="mb-4 hidden sm:mb-5 sm:flex"
        labelClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle"
      />

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
            <span className="text-[13px] font-bold leading-none tracking-tight text-ink/45">
              {label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
