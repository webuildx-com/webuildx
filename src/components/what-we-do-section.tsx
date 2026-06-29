"use client";

import { ArrowRightIcon } from "@/components/icons";
import { useLenis } from "@/components/scroll-context";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const services = [
  {
    id: "design",
    title: "Design",
    description:
      "Great products start with great design. We craft intuitive user experiences and distinctive brand identities that resonate — turning complex problems into elegant, memorable solutions.",
    items: ["Product Design", "UX / UI Design", "Brand Identity", "Design Systems", "Art Direction"],
    bg: "bg-[#0a0a0a]",
    title_color: "text-white",
    desc_color: "text-white/55",
    item_color: "text-white/80",
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Build a beautiful and scalable web application based on predictable processes. From landing pages to complex SaaS platforms, we ship fast, reliable, and maintainable code.",
    items: ["Web Applications", "SaaS Platforms", "CMS & E-commerce", "Dashboards", "Landing Pages"],
    bg: "bg-brand",
    title_color: "text-white",
    desc_color: "text-white/70",
    item_color: "text-white",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Build a cross-platform mobile application that works and looks great on iOS and Android. We handle everything from architecture to App Store submission.",
    items: ["iOS Development", "Android Development", "React Native", "App Strategy", "App Store Publishing"],
    bg: "bg-[#f4f4f5]",
    title_color: "text-[#17171a]",
    desc_color: "text-[#404047]/70",
    item_color: "text-[#17171a]",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Deploy, monitor, and scale on reliable cloud infrastructure. We build the pipelines, security layers, and performance foundations that keep your product running smoothly at any scale.",
    items: ["Cloud Infrastructure", "DevOps & CI/CD", "Security & Compliance", "Performance Engineering", "Monitoring & Observability"],
    bg: "bg-[#17171a]",
    title_color: "text-white",
    desc_color: "text-white/55",
    item_color: "text-white/80",
  },
] as const;

/** Header (72px) + section breathing room */
const STICKY_TOP = 112;
/** How much of the card behind peeks out */
const STICKY_STEP = 28;
/** Scroll runway per card */
const STACK_PADDING = [0, 0, 0, 0] as const;

function ServiceCard({
  service,
  stackIndex,
  setRef,
  stackMode,
}: {
  service: (typeof services)[number];
  stackIndex: number;
  setRef: (node: HTMLElement | null) => void;
  stackMode: boolean;
}) {
  const stickyTop = STICKY_TOP + stackIndex * STICKY_STEP;
  const stackPadding = STACK_PADDING[stackIndex];

  return (
    <article
      ref={setRef}
      className="scroll-mt-28 max-lg:mb-4 max-lg:last:mb-0 lg:sticky"
      style={
        stackMode
          ? {
              top: stickyTop,
              zIndex: stackIndex + 1,
              paddingBottom: stackPadding > 0 ? stackPadding : undefined,
            }
          : undefined
      }
      aria-label={service.title}
    >
      <div
        className={`overflow-hidden rounded-md ${service.bg} ${
          stackIndex > 0 && stackMode ? "lg:shadow-[0_-10px_40px_rgba(0,0,0,0.08)]" : ""
        }`}
      >
        <div className="p-8 sm:p-10 lg:p-12">
          <h3
            className={`text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] ${service.title_color}`}
          >
            {service.title}
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-12">
            <p className={`text-[15px] leading-relaxed lg:text-[16px] ${service.desc_color}`}>
              {service.description}
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {service.items.map((item) => (
                <li
                  key={item}
                  className={`text-[14px] font-medium lg:text-[15px] ${service.item_color}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WhatWeDoSection() {
  const lenis = useLenis();
  const [stackMode, setStackMode] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const setItemRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      itemRefs.current[index] = node;
    },
    [],
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setStackMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="what-we-do"
      className="border-t border-border bg-white"
      aria-labelledby="what-we-do-heading"
    >
      {/* Section header */}
      <div className="relative z-10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-16 sm:pt-20 lg:px-10 lg:pb-16 lg:pt-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="what-we-do-heading"
              className="max-w-xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#17171a]"
            >
              What we do
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#404047]/70 lg:pb-1 lg:text-[16px]">
              The strongest companies are built at the intersection of
              strategy, design, and engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Stacking cards */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col gap-4 lg:gap-0">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              stackIndex={index}
              setRef={setItemRef(index)}
              stackMode={stackMode}
            />
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-28 lg:pt-14">
        <div className="flex items-center gap-4">
          <Link href="/start-a-project" className="btn-cta-header">
            Start a project
            <ArrowRightIcon className="btn-cta-icon" />
          </Link>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 border-b border-[#17171a]/25 pb-0.5 text-[14px] font-medium text-[#17171a] transition-colors hover:border-[#17171a]"
          >
            See our work
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
