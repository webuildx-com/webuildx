"use client";

import { ArrowRightIcon } from "@/components/icons";
import { MorphWordInline, useMorphWord } from "@/components/morph-word";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import Link from "next/link";

export function Hero() {
  const { word, reduced, mounted } = useMorphWord();

  return (
    <div className="max-w-3xl">
      <h1 className="text-[2.25rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
        We <MorphWordInline word={word} reduced={reduced} mounted={mounted} /> digital
        products for ambitious companies.
      </h1>

      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:mt-6 sm:text-[17px]">
        WebuildX partners with startups and growing teams to shape ideas, design
        interfaces, build software, and scale products after launch.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-6">
        <Link
          href="/start-a-project"
          className="inline-flex items-center gap-2 border border-ink/15 bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
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
