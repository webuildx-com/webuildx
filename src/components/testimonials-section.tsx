"use client";

import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { EASE } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    id: "ipaybtc",
    quote:
      "WebuildX helped us build our Lightning infrastructure from the ground up. Fast, secure, and built to scale.",
    name: "Prince Ogbonna",
    role: "CEO at iPayBTC",
    company: "iPayBTC",
    initials: "PO",
  },
  {
    id: "creditveto",
    quote:
      "The CreditVeto platform was delivered with clarity and precision. The team understood the problem and built the right solution.",
    name: "Tolulope Osokoya",
    role: "Product Lead at CREDITVETO",
    company: "CREDITVETO",
    initials: "TO",
  },
  {
    id: "orangefarm",
    quote:
      "They took our brand and website to the next level. Clean, modern, and aligned with where we're going as a company.",
    name: "Tosin Aribisala",
    role: "CEO at ORANGE FARM TECH",
    company: "ORANGE FARM TECH",
    initials: "TA",
  },
  {
    id: "lightforth",
    quote:
      "WebuildX feels like an extension of our team. Senior people, clear communication, and dependable delivery.",
    name: "Product Manager",
    role: "AI Platform at LIGHTFORTH",
    company: "LIGHTFORTH",
    initials: "LF",
  },
] as const;

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 8H3M7 4L3 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const AUTOPLAY_MS = 5000;

function getCardsPerView(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function TestimonialCard({
  quote,
  name,
  role,
  company,
  initials,
}: (typeof testimonials)[number]) {
  return (
    <article className="flex h-full min-h-[280px] flex-col border border-border bg-white p-5 sm:min-h-[320px] sm:p-6 lg:min-h-[340px] lg:p-7">
      <span
        className="font-serif text-[3.5rem] leading-none text-brand"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/85 lg:text-[16px]">
        {quote}
      </p>
      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sea-salt text-[11px] font-semibold tracking-tight text-ink/70"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-ink">
                {name}
              </p>
              <p className="truncate text-[13px] text-muted">{role}</p>
            </div>
          </div>
          <p className="shrink-0 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/40">
            {company}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const update = () => setCardsPerView(getCardsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);
  const gapRem = 1.25;
  const cardWidth = `((100% - ${(cardsPerView - 1) * gapRem}rem) / ${cardsPerView})`;
  const slideStep = `calc(${cardWidth} + ${gapRem}rem)`;

  const goToIndex = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(maxIndex, Math.max(0, index)));
    },
    [maxIndex],
  );

  const goPrev = () => {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex);
  }, [activeIndex, maxIndex]);

  useEffect(() => {
    if (reduced || maxIndex === 0 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reduced, maxIndex, isPaused]);

  return (
    <section
      id="testimonials"
      className="border-t border-border bg-sea-salt"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <ScrollReveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                Testimonials
              </p>
              <h2
                id="testimonials-heading"
                className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.35rem]"
              >
                What our clients say
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted lg:text-[16px]">
                We partner with ambitious companies to turn ideas into products
                that deliver real impact.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:border-ink/20"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:border-ink/20"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          className="mt-10 lg:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-5"
              animate={{
                x: `calc(-${activeIndex} * ${slideStep})`,
              }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.55, ease: EASE }
              }
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="box-border shrink-0"
                  style={{
                    width: `calc((100% - ${(cardsPerView - 1) * gapRem}rem) / ${cardsPerView})`,
                  }}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => goToIndex(Math.min(index, maxIndex))}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-brand" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
