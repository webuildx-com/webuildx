import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";

export function HeroShell() {
  return (
    <section
      id="hero"
      className="flex min-h-svh flex-col bg-sea-salt pt-[72px]"
      aria-label="WebuildX introduction"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6 py-8 sm:py-14 lg:px-8 lg:py-16">
        <Hero />
      </div>

      <div className="mx-auto w-full max-w-[1280px] shrink-0 border-t border-border px-6 pb-8 pt-6 sm:pb-10 sm:pt-7 lg:px-8">
        <TrustedBy />
      </div>
    </section>
  );
}
