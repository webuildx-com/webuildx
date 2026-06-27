"use client";

import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";

export function HeroShell() {
  return (
    <section
      id="hero"
      className="flex flex-col bg-sea-salt pt-[72px] sm:min-h-svh"
      aria-label="WebuildX introduction"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 lg:px-10">
        <div className="flex flex-col justify-start pt-28 pb-10 sm:flex-1 sm:justify-center sm:py-12 lg:py-14">
          <Hero />
        </div>

        <div className="mb-8 shrink-0 border-b border-border pb-8 pt-4 sm:mb-8 sm:pb-8 sm:pt-6">
          <TrustedBy />
        </div>
      </div>
    </section>
  );
}
