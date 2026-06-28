"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: "design",
    title: "Design",
    description: "Product strategy, UX/UI, brand systems, websites, design systems",
  },
  {
    id: "build",
    title: "Build",
    description: "Web apps, mobile apps, SaaS platforms, APIs, dashboards, AI products",
  },
  {
    id: "scale",
    title: "Scale",
    description:
      "Cloud infrastructure, DevOps, CI/CD, monitoring, performance, technical support",
  },
] as const;

export function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="services"
      className="border-t border-border bg-sea-salt"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              What we do
            </p>
          </div>

          <h2
            id="services-heading"
            className="mt-6 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink"
          >
            One studio for product, design, and technology
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted lg:text-[16px]">
            We partner with ambitious companies to design, build, and scale
            digital products that drive real impact
          </p>

          <Link
            href="/start-a-project"
            className="mt-8 inline-flex items-center bg-brand px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Start a project
          </Link>
        </ScrollReveal>

        <div className="mt-12 h-px w-full bg-border lg:mt-16" aria-hidden="true" />

        <ScrollRevealStagger className="mt-12 grid grid-cols-1 sm:grid-cols-3 lg:mt-16">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              variants={pickMotion(reduced, fadeUpSafe)}
              className={`py-8 first:pt-0 sm:py-0 ${
                i > 0
                  ? "border-t border-border sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12"
                  : ""
              } ${i < services.length - 1 ? "sm:pr-8 lg:pr-12" : ""}`}
            >
              <span className="block h-0.5 w-7 bg-brand" aria-hidden="true" />
              <h3 className="mt-6 text-[1.5rem] font-semibold tracking-tight text-ink">
                {service.title}
              </h3>
              <span
                className="mt-4 block h-px w-full bg-border"
                aria-hidden="true"
              />
              <p className="mt-5 max-w-[260px] text-[15px] leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.article>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
