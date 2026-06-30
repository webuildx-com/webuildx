"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import {
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  OFFICE_LOCATION_SHORT,
  OFFICE_MAPS_URL,
} from "@/lib/contact";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/webuildx/",
  },
  {
    label: "X",
    href: "https://x.com/webuildXHQ",
  },
] as const;

export function AboutStudioSection() {
  return (
    <section className="bg-sea-salt" aria-labelledby="about-studio-heading">
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:items-center sm:gap-x-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className="flex min-w-0 flex-col justify-center sm:border-r sm:border-border sm:py-4 sm:pr-8 lg:py-8 lg:pr-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand lg:mb-4">
              Our studio
            </p>
            <h2
              id="about-studio-heading"
              className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]"
            >
              Based in Lagos, working globally
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="min-w-0 space-y-8">
            <p className="text-[15px] leading-relaxed text-muted lg:text-[16px]">
              Our studio is in {OFFICE_LOCATION_SHORT}, where we collaborate with
              teams across time zones. Whether you need a product partner on the
              ground or a remote team that ships like they&apos;re in the room,
              we&apos;re set up for both
            </p>

            <address className="not-italic space-y-4 text-[14px] leading-relaxed text-muted lg:text-[15px]">
              <p>
                <a
                  href={OFFICE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition-colors hover:text-brand"
                >
                  {OFFICE_ADDRESS}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-ink transition-colors hover:text-brand"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </address>

            <ul className="flex flex-wrap gap-4">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
