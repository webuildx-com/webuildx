"use client";

import { ArrowRightIcon } from "@/components/icons";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { useHeroEntrance } from "@/components/hero-entrance";
import { Logo } from "@/components/logo";
import { useHeaderVisibility } from "@/components/scroll-context";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/start-a-project" },
];

function HeaderInner() {
  return (
    <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
      <Link href="/" className="inline-flex shrink-0 cursor-pointer items-center">
        <Logo className="h-6 w-auto sm:h-7" />
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

      <Link
        href="/start-a-project"
        className="inline-flex shrink-0 cursor-pointer items-center gap-2 bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Start a project
        <ArrowRightIcon className="h-4 w-4 shrink-0" />
      </Link>
    </div>
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
