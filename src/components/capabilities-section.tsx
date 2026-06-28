"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { EASE, fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function DesignIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <motion.circle
        cx="12"
        cy="12"
        r="1.4"
        fill="currentColor"
        stroke="none"
        animate={active ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{
          duration: 1.4,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

function BuildIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.path
        d="M9 8l-4 4 4 4"
        animate={{ x: active ? -1.5 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <motion.path
        d="M15 8l4 4-4 4"
        animate={{ x: active ? 1.5 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <path d="M13.5 7l-3 10" />
    </svg>
  );
}

function ScaleIcon({ active }: { active: boolean }) {
  return (
    <motion.svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={active ? { y: [0, -2.5, 0] } : { y: 0 }}
      transition={{
        duration: 2,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 9.5 4 4 0 0 0 7 18z" />
    </motion.svg>
  );
}

const capabilities = [
  {
    id: "design",
    title: "Design",
    description: "Product strategy, UX/UI, brand systems, websites, design systems",
    Icon: DesignIcon,
  },
  {
    id: "build",
    title: "Build",
    description: "Web apps, mobile apps, SaaS platforms, APIs, dashboards, AI products",
    Icon: BuildIcon,
  },
  {
    id: "scale",
    title: "Scale",
    description:
      "Cloud infrastructure, DevOps, CI/CD, monitoring, performance, technical support",
    Icon: ScaleIcon,
  },
] as const;

const HEADING_WORDS = [
  "One",
  "studio",
  "for",
  "product,",
  "design,",
  "and",
  "technology",
];

const clipUp = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function CapabilitiesSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const wordVariant = pickMotion(reduced, clipUp);

  return (
    <section
      id="capabilities"
      className="border-t border-border bg-white"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-28 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-0">
          {/* Left: intro */}
          <div className="lg:flex lg:flex-col lg:justify-center lg:pr-14">
            <ScrollReveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                What we do
              </p>
            </ScrollReveal>

            {/* Heading — word-by-word clip reveal */}
            <ScrollRevealStagger className="mt-6">
              <h2
                id="capabilities-heading"
                className="flex flex-wrap text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-ink"
              >
                {HEADING_WORDS.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="mr-[0.28em] inline-block overflow-hidden pb-[0.06em] align-bottom"
                  >
                    <motion.span variants={wordVariant} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </ScrollRevealStagger>

            <ScrollReveal delay={0.1}>
              <span
                className="mt-8 block h-px w-24 bg-border"
                aria-hidden="true"
              />

              <p className="mt-6 text-[15px] leading-relaxed text-muted lg:text-[16px]">
                Strategy to scale — from idea to impact
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5 lg:gap-6">
                <Link href="/start-a-project" className="btn-cta-primary">
                  Start a project
                </Link>
                <Link
                  href="/work"
                  className="group relative link-cta-secondary text-ink"
                >
                  See our work
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-brand transition-transform duration-300 group-hover:scale-x-0"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-brand transition-transform delay-150 duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: capability rows */}
          <ScrollRevealStagger className="lg:border-l lg:border-border">
            {capabilities.map(({ id, title, description, Icon }, i) => {
              const isActive = i === active;
              const dimmed = !isActive;
              return (
                <motion.article
                  key={id}
                  variants={pickMotion(reduced, fadeUpSafe)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative py-8 transition-opacity duration-500 lg:px-12 lg:py-10 ${
                    i > 0 ? "border-t border-border" : ""
                  } ${dimmed ? "lg:opacity-55" : "opacity-100"}`}
                >
                  {/* Sliding red rail (morphs between rows) */}
                  {isActive && !reduced && (
                    <motion.span
                      layoutId="capability-rail"
                      className="absolute left-0 top-0 hidden h-full w-0.5 bg-brand lg:block"
                      transition={{ duration: 0.4, ease: EASE }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <div className="flex items-center gap-5">
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                          isActive
                            ? "bg-brand text-white"
                            : "bg-ink/[0.05] text-ink/70"
                        }`}
                      >
                        <Icon active={isActive} />
                      </span>
                      <h3
                        className={`text-[1.5rem] font-semibold tracking-tight text-ink transition-transform duration-500 lg:text-[1.75rem] ${
                          isActive ? "lg:translate-x-1.5" : ""
                        }`}
                      >
                        {title}
                      </h3>
                    </div>
                    <p
                      className={`max-w-none text-[14px] leading-relaxed transition-colors duration-500 sm:max-w-[280px] lg:max-w-[240px] ${
                        isActive ? "text-ink/80" : "text-muted"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </ScrollRevealStagger>
        </div>
      </div>
    </section>
  );
}
