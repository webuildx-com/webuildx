"use client";

import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="bg-[#f4f4f5] text-ink"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 rounded-lg bg-brand p-8 sm:p-12 lg:gap-6 lg:p-16">
          <div className="flex flex-col gap-6">
            <h2
              id="final-cta-heading"
              className="max-w-2xl text-[clamp(1.875rem,5vw,2.25rem)] font-semibold leading-[1.2] tracking-tight text-white lg:text-[36px] lg:leading-[1.25]"
            >
              Ready to design, build, or scale your product?
            </h2>
            <p className="max-w-[620px] text-[16px] leading-[26px] text-white lg:text-[18px]">
              Tell us what you&apos;re building — we&apos;ll help you shape
              ideas, ship software, and scale what comes next
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="inline-flex w-fit items-center justify-center rounded-md bg-[#17171a] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#2a2a2e] sm:text-[14px]"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
