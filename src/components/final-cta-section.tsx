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
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="min-w-0 flex-1">
            <h2
              id="final-cta-heading"
              className="max-w-[22ch] text-[clamp(1.875rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white"
            >
              Have a product, platform, or website to build?
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/90 lg:text-[17px]">
              Tell us what you&apos;re working on. We&apos;ll help you figure
              out the smartest way to design, build, or scale it
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="btn-cta-inverse group shrink-0 self-stretch sm:self-start lg:self-center"
          >
            Start a project
            <ArrowRightIcon className="btn-cta-icon transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
