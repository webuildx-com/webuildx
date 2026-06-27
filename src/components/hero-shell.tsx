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
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-14 px-6 pb-10 sm:gap-24 sm:pt-14 sm:pb-14 lg:gap-32 lg:px-8 lg:pt-16 lg:pb-16">
        <div className="flex flex-col justify-start pt-28 sm:flex-1 sm:justify-center sm:pt-6 lg:pt-8">
          <Hero />
        </div>

        <div className="shrink-0 border-b border-border pb-6 sm:pb-7">
          <TrustedBy />
        </div>
      </div>
    </section>
  );
}
