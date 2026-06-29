"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutStorySection() {
  return (
    <section
      className="border-t border-border bg-sea-salt"
      aria-labelledby="about-story-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:items-center sm:gap-x-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className="flex min-w-0 flex-col justify-center sm:border-r sm:border-border sm:py-4 sm:pr-8 lg:py-8 lg:pr-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand lg:mb-4">
              Our story
            </p>
            <h2
              id="about-story-heading"
              className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
            >
              We started because the gap was real
            </h2>
          </ScrollReveal>

          <ScrollReveal
            delay={0.06}
            className="min-w-0 space-y-6 text-[15px] leading-relaxed text-muted lg:space-y-8 lg:text-[16px]"
          >
            <p>
              We were engineers working across different companies and products,
              and we kept seeing the same problem: businesses with solid ideas
              and genuine ambition, but no reliable way to turn that into
              working software — the talent was hard to find, the process fell
              apart, and the product never quite matched what was imagined
            </p>
            <p>
              So we built the studio we kept wishing existed — one that
              understands the business problem before touching any technology,
              and stays close enough to care about the outcome long after the
              work is done — that&apos;s still what WebuildX is
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
