import { ArrowRightIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import {
  CONTACT_EMAIL,
  OFFICE_LOCATION_SHORT,
  OFFICE_MAPS_URL,
} from "@/lib/contact";
import Link from "next/link";

const navigationLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/start-a-project" },
];

const serviceLinks = [
  { label: "Design", href: "/#services" },
  { label: "Build", href: "/#services" },
  { label: "Scale", href: "/#services" },
];

const contactLinks = [
  {
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M4 7.5 12 13l8-5.5M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: OFFICE_LOCATION_SHORT,
    href: OFFICE_MAPS_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/webuildx/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.69H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/webuildXHQ",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
        <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.41l-5.8-7.58-6.64 7.58H.96l8.6-9.83L0 2.25h7.59l5.24 6.93 6.07-6.93Zm-1.29 17.52h2.04L6.49 4.13H4.28l13.33 15.64Z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];

function FooterColumn({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
        {title}
      </p>
      {children}
    </div>
  );
}

function FooterNavLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-[14px] text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactItem({
  label,
  href,
  icon,
}: {
  label: string;
  href: string | null;
  icon: React.ReactNode;
}) {
  const content = (
    <>
      <span className="text-white/50">{icon}</span>
      <span className="text-white/80">{label}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-3 text-[14px] transition-colors hover:[&_span]:text-white"
        >
          {content}
        </a>
      ) : (
        <span className="inline-flex items-center gap-3 text-[14px]">
          {content}
        </span>
      )}
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-footer text-white"
      aria-label="Site footer"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <h2 className="max-w-md text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
              Let&apos;s build something that works.
            </h2>

            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60 lg:mt-6 lg:text-[15px]">
              WebuildX is a design-led product development studio that helps
              ambitious companies design, build, and scale digital products that
              create real impact.
            </p>

            <Link
              href="/start-a-project"
              className="group mt-8 inline-flex items-center gap-3 bg-white px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white/90 lg:mt-10"
            >
              Start a project
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-0">
            <FooterColumn title="Navigation">
              <FooterNavLinks links={navigationLinks} />
            </FooterColumn>

            <FooterColumn
              title="Services"
              className="sm:border-l sm:border-white/10 sm:pl-8 lg:pl-10"
            >
              <FooterNavLinks links={serviceLinks} />
            </FooterColumn>

            <FooterColumn
              title="Contact"
              className="sm:col-span-2 sm:border-l sm:border-white/10 sm:pl-8 lg:col-span-1 lg:pl-10"
            >
              <ul className="space-y-3">
                {contactLinks.map((item) => (
                  <ContactItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                  />
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <Link href="/" className="inline-flex shrink-0 items-center">
            <Logo className="h-6 w-auto brightness-0 invert sm:h-7" />
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p className="text-[12px] leading-relaxed text-white/50 lg:text-[13px]">
              © {year} WebuildX Software Technology Limited. All rights reserved.
            </p>
            <nav
              aria-label="Legal"
              className="flex items-center gap-4 text-[12px] lg:text-[13px]"
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
