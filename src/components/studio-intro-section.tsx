import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

export function StudioIntroSection() {
  return (
    <section className="border-t border-border bg-white" aria-label="About the studio">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:py-32 lg:px-10 lg:py-40">
        <div className="flex flex-col gap-10">

          <p className="max-w-4xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#17171a]">
            Webuilx is a design and technology studio for founders and businesses ready to build something real.
          </p>

          <Link
            href="/about"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#17171a]/25 pb-0.5 text-[14px] font-medium text-[#17171a] transition-colors hover:border-[#17171a]"
          >
            Our story
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </section>
  );
}
