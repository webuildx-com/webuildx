"use client";

import { ScrollReveal, ScrollRevealStagger } from "@/components/scroll-reveal";
import {
  featuredTeamMember,
  teamClosingLine,
  teamMembers,
} from "@/lib/about";
import { fadeUpSafe, pickMotion } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

function TeamFeaturedArt() {
  return (
    <div
      className="relative hidden min-h-[12rem] overflow-hidden bg-[#ececec] lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="320" height="220" fill="#ececec" />
        <circle cx="78" cy="118" r="52" fill="none" stroke="#d4d4d4" strokeWidth="1.2" />
        <path
          d="M78 66 A52 52 0 0 1 78 170"
          fill="none"
          stroke="#d0d0d0"
          strokeWidth="1"
        />
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={168 + col * 18}
              cy={72 + row * 18}
              r="2.5"
              fill="#d8d8d8"
            />
          )),
        )}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={248}
            y={48 + i * 14}
            width="10"
            height="8"
            rx="2"
            fill="#d2d2d2"
          />
        ))}
      </svg>
    </div>
  );
}

export function AboutTeamSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-sea-salt" aria-labelledby="about-team-heading">
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className="flex min-w-0 flex-col justify-start lg:border-r lg:border-border lg:pr-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand lg:mb-4">
              The team
            </p>
            <h2
              id="about-team-heading"
              className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
            >
              Small senior teams, clear ownership
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted lg:mt-6 lg:text-[16px]">
              Design, product, and engineering people who stay close to the work
            </p>
          </ScrollReveal>

          <div className="min-w-0">
            <ScrollReveal>
              <article className="overflow-hidden border border-border bg-[#f0f0f0]">
                <div className="grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,12rem)]">
                  <div className="border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
                    <h3 className="text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2rem]">
                      {featuredTeamMember.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-snug text-muted sm:text-[15px]">
                      {featuredTeamMember.role}
                    </p>
                  </div>

                  <div className="flex items-center border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
                    <p className="max-w-md text-[14px] leading-[1.65] text-muted lg:text-[15px] lg:leading-relaxed">
                      {featuredTeamMember.bio}
                    </p>
                  </div>

                  <TeamFeaturedArt />
                </div>
              </article>
            </ScrollReveal>

            <ScrollRevealStagger className="mt-px grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map(({ index, name, role, description }) => (
                <motion.article
                  key={index}
                  variants={pickMotion(reduced, fadeUpSafe)}
                  className="flex min-h-[11rem] flex-col bg-sea-salt p-6 sm:p-7 lg:min-h-[12rem]"
                >
                  <h3 className="text-[1.35rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[1.5rem]">
                    {name}
                  </h3>
                  <p className="mt-2 text-[14px] font-medium text-ink sm:text-[15px]">
                    {role}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                    {description}
                  </p>
                </motion.article>
              ))}

              <motion.div
                variants={pickMotion(reduced, fadeUpSafe)}
                className="relative flex min-h-[11rem] items-center justify-center overflow-hidden bg-sea-salt p-6 sm:p-7 lg:min-h-[12rem]"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, rgba(11, 30, 28, 0.08) 1px, transparent 1.4px)",
                    backgroundSize: "18px 18px",
                    backgroundPosition: "right bottom",
                  }}
                  aria-hidden="true"
                />
                <p className="relative max-w-[16rem] text-center text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[1.5rem]">
                  {teamClosingLine}
                </p>
              </motion.div>
            </ScrollRevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
