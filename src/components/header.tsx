"use client";

import { ArrowRightIcon } from "@/components/icons";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { useHeroEntrance } from "@/components/hero-entrance";
import { Logo } from "@/components/logo";
import { useHeaderVisibility } from "@/components/scroll-context";
import { EASE } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/start-a-project" },
];

const menuStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const menuItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

function MenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-70 md:hidden"
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
        {[0, 1, 2].map((line) => (
          <motion.span
            key={line}
            className="absolute left-0 block h-[1.5px] w-full origin-center rounded-full bg-ink"
            initial={false}
            animate={
              reduced
                ? {
                    top: line === 0 ? "0%" : line === 1 ? "50%" : "100%",
                    y: line === 1 ? "-50%" : line === 2 ? "-100%" : 0,
                    rotate: 0,
                    opacity: open && line === 1 ? 0 : 1,
                  }
                : open
                  ? line === 0
                    ? { top: "50%", y: "-50%", rotate: 45, opacity: 1 }
                    : line === 1
                      ? { top: "50%", y: "-50%", rotate: 0, opacity: 0 }
                      : { top: "50%", y: "-50%", rotate: -45, opacity: 1 }
                  : {
                      top: line === 0 ? "0%" : line === 1 ? "50%" : "100%",
                      y: line === 1 ? "-50%" : line === 2 ? "-100%" : 0,
                      rotate: 0,
                      opacity: 1,
                    }
            }
            transition={{ duration: 0.32, ease: EASE }}
          />
        ))}
      </span>
    </button>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-[72px] z-40 bg-ink/25 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={onClose}
          />

          <motion.nav
            id="mobile-nav"
            className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border bg-sea-salt/95 backdrop-blur-xl md:hidden"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <div className="mx-auto flex min-h-[min(420px,calc(100dvh-72px))] max-w-[1280px] flex-col px-5 pb-8 pt-6 sm:px-6">
              <motion.p
                className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-brand"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
              >
                Explore
              </motion.p>

              <motion.ul
                className="flex-1"
                variants={reduced ? undefined : menuStagger}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={reduced ? undefined : menuItem}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between border-b border-border/70 py-3.5 transition-colors"
                      onClick={onClose}
                    >
                      <span className="text-[17px] font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
                        {link.label}
                      </span>
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-8 border-t border-border pt-6"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.28 }}
              >
                <p className="mb-4 text-[13px] leading-relaxed text-muted">
                  Ready to design, build, or scale your product?
                </p>
                <Link
                  href="/start-a-project"
                  className="inline-flex w-full items-center justify-center gap-2 bg-brand px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
                  onClick={onClose}
                >
                  Start a project
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 ${
          menuOpen ? "relative z-50" : ""
        }`}
      >
        <Link
          href="/"
          className="inline-flex min-w-0 shrink cursor-pointer items-center"
          onClick={closeMenu}
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

          <MenuButton
            open={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
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
      transition={{ duration: 0.35, ease: EASE }}
    >
      <HeaderInner />
    </motion.header>
  );
}
