"use client";

import { ArrowRightIcon } from "@/components/icons";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { useHeroEntrance } from "@/components/hero-entrance";
import { Logo } from "@/components/logo";
import { useHeaderVisibility } from "@/components/scroll-context";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/start-a-project" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function HeaderInner() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex min-w-0 shrink cursor-pointer items-center"
          onClick={() => setMenuOpen(false)}
        >
          <Logo className="h-5 w-auto max-w-[128px] sm:h-6 sm:max-w-[148px] lg:h-7 lg:max-w-none" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <HoverUnderlineLink
              key={link.href}
              href={link.href}
              className="text-[15px] text-muted hover:text-ink"
            >
              {link.label}
            </HoverUnderlineLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/start-a-project"
            className="hidden items-center gap-2 bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover md:inline-flex"
          >
            Start a project
            <ArrowRightIcon className="h-4 w-4 shrink-0" />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-sea-salt md:hidden"
          >
            <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6">
              <Link
                href="/start-a-project"
                className="mb-4 inline-flex w-full items-center justify-center gap-2 bg-brand px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
                onClick={() => setMenuOpen(false)}
              >
                Start a project
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>

              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block border-b border-border py-4 text-[16px] font-medium text-ink transition-colors last:border-b-0 hover:text-brand"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

type HeaderProps = {
  alwaysVisible?: boolean;
};

export function Header({ alwaysVisible = false }: HeaderProps) {
  const headerVisible = useHeaderVisibility();
  const { entered } = useHeroEntrance();
  const showHeader = alwaysVisible || (entered && headerVisible);

  if (alwaysVisible) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-sea-salt">
        <HeaderInner />
      </header>
    );
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-sea-salt"
      initial={false}
      animate={{
        y: showHeader ? 0 : "-100%",
        pointerEvents: showHeader ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeaderInner />
    </motion.header>
  );
}
