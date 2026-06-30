"use client";

import { useLenis } from "@/components/scroll-context";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

const steps = [
  {
    id: "discovery",
    index: "01",
    title: "Discovery",
    description:
      "All we need is your idea. From there, we brainstorm and shape the perfect framework that fits your business needs and goals.",
  },
  {
    id: "design",
    index: "02",
    title: "Design",
    description:
      "Our design team combines creativity, crafting visually appealing, user-friendly interfaces that keep customers coming back.",
  },
  {
    id: "develop",
    index: "03",
    title: "Develop",
    description:
      "Our in-house dev team collaborates with our creative team to code with precision, ensuring every piece of code works flawlessly.",
  },
  {
    id: "testing",
    index: "04",
    title: "Testing & QA",
    description:
      "Our engineers ensure your software is bug-free, secure, and performs flawlessly through thorough testing and real-time feedback.",
  },
  {
    id: "launch",
    index: "05",
    title: "Launch",
    description:
      "From deployment to launch, we are with you every step of the way, offering support to manage your application in the long term.",
  },
] as const;

/** Header (72px) + section breathing room */
const STICKY_TOP = 112;
const STICKY_STEP = 24;
const STACK_GAP = 30;

const STACK_PADDING = [
  STACK_GAP * 4,
  STACK_GAP * 3,
  STACK_GAP * 2,
  STACK_GAP,
  0,
] as const;

const stepIcons: Record<(typeof steps)[number]["id"], string[][]> = {
  discovery: [
    ["M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"],
    ["M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"],
    ["M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"],
  ],
  design: [
    ["M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"],
    ["M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
    ["M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"],
  ],
  develop: [
    ["M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"],
    ["M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"],
    ["M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"],
  ],
  testing: [
    ["M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],
    ["M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"],
    ["M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"],
  ],
  launch: [
    ["M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"],
    ["M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"],
    ["M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"],
  ],
};

const PILL_DELAYS = ["delay-0", "delay-75", "delay-150"] as const;

function StepIconPills({
  stepId,
  active,
}: {
  stepId: (typeof steps)[number]["id"];
  active: boolean;
}) {
  const icons = stepIcons[stepId];
  return (
    <div className="flex w-full items-center justify-center gap-6" aria-hidden="true">
      {icons.map((paths, i) => (
        <span
          key={i}
          className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white text-[#404047] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,background-color,color,box-shadow,opacity] duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:scale-100 group-hover:-translate-y-1 ${PILL_DELAYS[i]} hover:z-10 hover:scale-110 hover:bg-brand hover:text-white hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.18)] ${
            active ? "opacity-100" : "opacity-75"
          }`}
        >
          <svg
            className="h-6 w-6 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        </span>
      ))}
    </div>
  );
}

function StepItem({
  step,
  active,
  onActivate,
  stackIndex,
  setRef,
  stackMode,
}: {
  step: (typeof steps)[number];
  active: boolean;
  onActivate: () => void;
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
      onClick={stackMode ? onActivate : undefined}
      onKeyDown={
        stackMode
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
      role={stackMode ? "group" : undefined}
      aria-label={step.title}
    >
      <div
        className={`group flex h-[412px] flex-col overflow-hidden rounded-md bg-[#f4f4f5] p-8 ${
          stackMode ? "cursor-pointer" : ""
        } ${stackIndex > 0 && stackMode ? "lg:shadow-[0_-1px_4px_rgba(0,0,0,0.02)]" : ""}`}
        {...(!stackMode
          ? {
              role: "button",
              tabIndex: 0,
              "aria-expanded": active,
              onClick: onActivate,
              onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onActivate();
                }
              },
            }
          : {})}
      >
        <h3
          className={`text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] transition-colors duration-300 lg:text-[40px] lg:leading-[48px] lg:whitespace-nowrap ${
            active ? "text-[#17171a]" : "text-[#17171a]/55"
          }`}
        >
          {step.title}
        </h3>

        <p
          className={`mt-3 max-w-md text-[15px] leading-relaxed transition-colors duration-300 lg:text-[16px] ${
            active ? "text-[#404047]" : "text-[#404047]/50"
          }`}
        >
          {step.description}
        </p>

        <div className="mt-auto pt-6 lg:pt-8">
          <StepIconPills stepId={step.id} active={active} />
        </div>
      </div>
    </article>
  );
}

export function OurProcessSection() {
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const [stackMode, setStackMode] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);

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

  useEffect(() => {
    if (!stackMode) return;

    const updateActiveFromScroll = () => {
      const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (nodes.length === 0) return;

      let frontmost = 0;

      nodes.forEach((node, index) => {
        const stickyTop = STICKY_TOP + index * STICKY_STEP;
        if (node.getBoundingClientRect().top <= stickyTop + 6) {
          frontmost = index;
        }
      });

      if (frontmost !== activeRef.current) {
        activeRef.current = frontmost;
        setActive(frontmost);
      }
    };

    updateActiveFromScroll();

    if (lenis) {
      lenis.on("scroll", updateActiveFromScroll);
      return () => lenis.off("scroll", updateActiveFromScroll);
    }

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveFromScroll);
  }, [lenis, stackMode]);

  const activateItem = useCallback(
    (index: number) => {
      activeRef.current = index;
      setActive(index);

      if (!stackMode) return;

      const node = itemRefs.current[index];
      if (!node) return;

      const offset = -(STICKY_TOP + index * STICKY_STEP);

      if (lenis) {
        lenis.scrollTo(node, { offset, duration: 1.1 });
      } else {
        const top = node.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [lenis, stackMode],
  );

  return (
    <section
      id="our-process"
      className="border-t border-border bg-white"
      aria-labelledby="our-process-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          {/* Left sticky panel */}
          <div className="lg:sticky lg:top-28 lg:w-[60%] lg:self-start">
            <div className="overflow-hidden rounded-md bg-brand p-8 sm:p-10 lg:p-12">
              <h2
                id="our-process-heading"
                className="max-w-lg text-[clamp(2rem,4.5vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white lg:leading-[1.4]"
              >
                How we make it happen
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 lg:mt-6 lg:text-[16px]">
                Discover how our systematic process ensures your project&apos;s
                success from start to finish.
              </p>

              <div className="mt-10 flex items-center gap-2" aria-hidden="true">
                {steps.map((step, i) => (
                  <span
                    key={step.id}
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-6 bg-white" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-[13px] font-medium text-white/35">
                {steps[active].index} — {steps[active].title}
              </p>

              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-md sm:mt-10">
                <Image
                  src="/images/process-card.jpg"
                  alt="Our collaborative process at work"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right stacking cards */}
          <div className="flex flex-col gap-4 lg:w-[40%] lg:gap-0">
            {steps.map((step, index) => (
              <StepItem
                key={step.id}
                step={step}
                active={active === index}
                onActivate={() => activateItem(index)}
                stackIndex={index}
                setRef={setItemRef(index)}
                stackMode={stackMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
