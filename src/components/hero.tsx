"use client";

import { ArrowRightIcon } from "@/components/icons";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import Link from "next/link";

export function Hero() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-[clamp(1.875rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-ink">
        We design and build digital products for ambitious teams.
      </h1>

      <p className="mt-5 max-w-xl text-[clamp(15px,2vw,17px)] leading-relaxed text-muted sm:mt-6">
        WebuildX partners with startups and growing teams to shape ideas, design
        interfaces, build software, and scale products after launch.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-6">
        <Link
          href="/start-a-project"
          className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-footer"
        >
          Start a project
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        <HoverUnderlineLink
          href="#work"
          className="text-[15px] font-medium text-muted transition-colors hover:text-ink"
          underlineClassName="bg-ink/25"
        >
          See our work
        </HoverUnderlineLink>
      </div>
    </div>
  );
}
