"use client";

import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="bg-brand text-white"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:py-12 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="min-w-0 flex-1">
            <h2
              id="final-cta-heading"
              className="max-w-[22ch] text-[clamp(1.375rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-white"
            >
              Have a product, platform, or website to build?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/90 lg:mt-4 lg:text-[16px]">
              Tell us what you&apos;re working on. We&apos;ll help you figure
              out the smartest way to design, build, or scale it.
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="inline-flex shrink-0 items-center gap-2 self-start bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white/90"
          >
            Start a project
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
