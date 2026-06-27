"use client";

import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    description:
      "We understand the business, users, product goal, and technical constraints.",
  },
  {
    id: "shape",
    index: "02",
    title: "Shape",
    description:
      "We define the scope, user flows, architecture, and delivery plan.",
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    description:
      "We design, engineer, test, and launch with a focused team.",
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    description:
      "We improve performance, reliability, infrastructure, and product growth.",
  },
] as const;

export function HowWeWorkSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="how-we-work"
      className="my-6 border-t border-border bg-sea-salt lg:my-10"
      aria-labelledby="how-we-work-heading"
    >
          <div className="mx-auto max-w-[1280px] px-6 py-10 sm:py-14 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-0">
          <ScrollReveal className="lg:col-span-5 lg:pr-12 xl:pr-16">
            <span
              className="mb-4 block h-0.5 w-10 bg-brand"
              aria-hidden="true"
            />
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              How we work
            </p>
            <h2
              id="how-we-work-heading"
              className="max-w-md text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-[1.12] tracking-tight text-ink"
            >
              A clear process from idea to launch
              <span className="text-brand">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted lg:text-[16px]">
              A focused, end-to-end approach that turns strategy into a product
              that delivers real impact.
            </p>

            <Link
              href="/start-a-project"
              className="group relative mt-8 inline-flex items-center gap-3 py-1 pl-4 lg:mt-10"
            >
              <span
                className="absolute bottom-0 left-0 top-0 w-0.5 origin-center scale-y-75 bg-brand/30 transition-all duration-300 group-hover:scale-y-100 group-hover:bg-brand"
                aria-hidden="true"
              />
              <span className="text-[16px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
                Start a project
              </span>
              <ArrowRightIcon className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          </ScrollReveal>

          <ScrollRevealStagger className="lg:col-span-7 lg:pl-12 xl:pl-16">
            <div className="relative">
              <span
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-border"
                aria-hidden="true"
              />

              {steps.map((step) => (
                <motion.article
                  key={step.id}
                  variants={pickMotion(reduced, fadeUpSafe)}
                        className="relative grid grid-cols-[minmax(2.5rem,3.5rem)_1px_1fr] items-start gap-x-4 border-b border-border py-5 pl-3 first:pt-0 last:border-b-0 sm:grid-cols-[minmax(3.5rem,5rem)_1px_1fr] sm:gap-x-6 sm:py-7 sm:pl-5 lg:gap-x-8 lg:py-10 lg:pl-6"
                >
                  <p
                    aria-hidden="true"
                    className="pt-0.5 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-none tracking-tight text-ink"
                  >
                    {step.index}
                  </p>

                  <span className="self-stretch bg-border" aria-hidden="true" />

                  <div className="min-w-0 pt-1">
                    <h3 className="text-[17px] font-semibold tracking-tight text-ink lg:text-[18px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted lg:text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </ScrollRevealStagger>
        </div>
      </div>
    </section>
  );
}
