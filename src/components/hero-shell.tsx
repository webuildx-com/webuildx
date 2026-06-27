"use client";

import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";

export function HeroShell() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100svh-72px)] flex-col bg-sea-salt pt-[72px] sm:min-h-svh"
      aria-label="WebuildX introduction"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 lg:px-10">
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-12 lg:py-14">
          <Hero />
        </div>

        <div className="mb-6 shrink-0 border-b border-border pb-6 pt-5 sm:mb-8 sm:pb-8 sm:pt-6">
          <TrustedBy />
        </div>
      </div>
    </section>
  );
}
