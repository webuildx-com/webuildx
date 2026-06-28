"use client";

import { ArrowUpRightIcon } from "@/components/icons";
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
      "We understand the business, users, product goal, and technical constraints",
  },
  {
    id: "shape",
    index: "02",
    title: "Shape",
    description:
      "We define the scope, user flows, architecture, and delivery plan",
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    description:
      "We design, engineer, test, and launch with a focused team",
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    description:
      "We improve performance, reliability, infrastructure, and product growth",
  },
] as const;

/** Staggered positions matched to reference: 01/02 wide top row, 03 center-left, 04 far-right. */
const stepLayout = [
  { left: "0%", top: "0%", width: "42%" },
  { left: "56%", top: "0%", width: "44%" },
  { left: "18%", top: "54%", width: "34%" },
  { left: "64%", top: "54%", width: "36%" },
] as const;

const LINE = "#d8dcdb";
const BRAND = "#ed1b24";

function FlowArrow({
  x,
  y,
  direction,
}: {
  x: number;
  y: number;
  direction: "right" | "down";
}) {
  if (direction === "right") {
    return (
      <path
        d={`M ${x - 1.4} ${y - 0.8} L ${x} ${y} L ${x - 1.4} ${y + 0.8}`}
        fill={BRAND}
        stroke="none"
      />
    );
  }

  return (
    <path
      d={`M ${x - 0.8} ${y - 1.4} L ${x} ${y} L ${x + 0.8} ${y - 1.4}`}
      fill={BRAND}
      stroke="none"
    />
  );
}

function ProcessConnectors() {
  // y=7  — top horizontal 01→02, on the large-number midline
  // y=16 — center divider starts (title level, below the numbers)
  // y=46 — mid spine between the two rows
  // y=61 — bottom horizontal 03→04, on the bottom-number midline
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* 01 → 02 : starts just right of "01", arrow stops just left of "02" */}
      <line x1="11" y1="7" x2="54" y2="7" stroke={LINE} strokeWidth="0.3" />
      <FlowArrow x={54} y={7} direction="right" />

      {/* Center divider: floats from title level down to the spine */}
      <line x1="48" y1="16" x2="48" y2="46" stroke={LINE} strokeWidth="0.3" />

      {/* Mid spine, then turns down at the right with an arrow above 04 */}
      <line x1="2" y1="46" x2="96" y2="46" stroke={LINE} strokeWidth="0.3" />
      <line x1="96" y1="46" x2="96" y2="57" stroke={LINE} strokeWidth="0.3" />
      <FlowArrow x={96} y={57} direction="down" />

      {/* Far-left arrow into 03 */}
      <line x1="8" y1="61" x2="16" y2="61" stroke={LINE} strokeWidth="0.3" />
      <FlowArrow x={16} y={61} direction="right" />

      {/* 03 → 04 : right of "03" to just left of "04" */}
      <line x1="29" y1="61" x2="62" y2="61" stroke={LINE} strokeWidth="0.3" />
      <FlowArrow x={62} y={61} direction="right" />
    </svg>
  );
}

function ProcessStep({ step }: { step: (typeof steps)[number] }) {
  return (
    <article className="relative z-10 min-w-0">
      <p
        aria-hidden="true"
        className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-tight text-ink"
      >
        {step.index}
      </p>
      <span className="mt-3 block h-0.5 w-7 bg-brand" aria-hidden="true" />
      <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink lg:text-[17px]">
        {step.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted lg:text-[15px]">
        {step.description}
      </p>
    </article>
  );
}

export function HowWeWorkSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden border-y border-border bg-white"
      aria-labelledby="how-we-work-heading"
    >
      <div
        className="section-dot-grid section-dot-grid-mask pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-6 py-14 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:gap-20">
          <ScrollReveal className="flex flex-col lg:min-h-[460px] lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                  How we work
                </p>
              </div>

              <h2
                id="how-we-work-heading"
                className="mt-6 max-w-sm text-[clamp(1.85rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-ink lg:mt-8"
              >
                A clear process from idea to launch
              </h2>

              <span
                className="mt-8 block h-px w-full max-w-[220px] bg-border"
                aria-hidden="true"
              />

              <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-muted lg:text-[16px]">
                Strategic thinking, precise execution, measurable impact
              </p>
            </div>

            <Link
              href="/start-a-project"
              className="group relative mt-10 inline-flex w-fit items-center gap-2 pb-1 text-[15px] font-medium text-ink lg:mt-0"
            >
              Start a project
              <ArrowUpRightIcon className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span
                className="absolute bottom-0 left-0 h-px w-full bg-brand"
                aria-hidden="true"
              />
            </Link>
          </ScrollReveal>

          <ScrollRevealStagger className="relative hidden min-h-[400px] w-full min-w-0 sm:block lg:min-h-[460px]">
            <ProcessConnectors />
            <div className="relative h-full min-h-[400px] lg:min-h-[460px]">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={pickMotion(reduced, fadeUpSafe)}
                  className="absolute min-w-0"
                  style={{
                    left: stepLayout[index].left,
                    top: stepLayout[index].top,
                    width: stepLayout[index].width,
                  }}
                >
                  <ProcessStep step={step} />
                </motion.div>
              ))}
            </div>
          </ScrollRevealStagger>
        </div>

        <ScrollRevealStagger className="mt-12 space-y-10 sm:hidden">
          {steps.map((step) => (
            <motion.div key={step.id} variants={pickMotion(reduced, fadeUpSafe)}>
              <ProcessStep step={step} />
            </motion.div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
