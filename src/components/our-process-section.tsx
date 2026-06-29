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
      "From deployment to launch, we&apos;re with you every step of the way, offering support to manage your application in the long term.",
  },
] as const;

/** Header (72px) + section breathing room — matches `lg:top-28` */
const STICKY_TOP = 112;
/** Title strip visible on each card behind the front card */
const STICKY_STEP = 24;
/** Scroll runway while each card stays pinned before the next stacks on top */
const STACK_GAP = 180;

const STACK_PADDING = [
  STACK_GAP * 4,
  STACK_GAP * 3,
  STACK_GAP * 2,
  STACK_GAP,
  0,
] as const;

function StepIcon({ path }: { path: string }) {
  return (
    <svg className="h-7 w-7" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const stepIcons: Record<(typeof steps)[number]["id"], string[]> = {
  discovery: [
    // MagnifyingGlass
    "M229.66,218.34l-50.07-50.07a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z",
    // Lightbulb
    "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a88,88,0,1,1-160-50.61V216a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V53.39A88,88,0,0,1,216,104Z",
    // Users
    "M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z",
  ],
  design: [
    // PencilSimple
    "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Z",
    // Eye
    "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.52,133.52,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z",
    // Palette
    "M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Z",
  ],
  develop: [
    // Code
    "M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z",
    // Terminal
    "M223.51,48h-191A16.51,16.51,0,0,0,16,64.49v127A16.51,16.51,0,0,0,32.49,208h191A16.51,16.51,0,0,0,240,191.51v-127A16.51,16.51,0,0,0,223.51,48Z",
    // GitBranch
    "M232,64a32,32,0,1,0-40,31V120a8,8,0,0,1-8,8H96a24,24,0,0,0-24,24v-8.07A32,32,0,1,0,40,176v.09A32,32,0,1,0,88,208v-8a8,8,0,0,1,8-8h88a24,24,0,0,0,24-24V95A32.06,32.06,0,0,0,232,64ZM72,176a16,16,0,1,1-16-16A16,16,0,0,1,72,176Zm88,32a16,16,0,1,1-16-16A16,16,0,0,1,160,208ZM200,80a16,16,0,1,1,16-16A16,16,0,0,1,200,80Z",
  ],
  testing: [
    // CheckCircle
    "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
    // ShieldCheck
    "M208,40H48A16,16,0,0,0,32,56V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Zm-32,80H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z",
    // Bug
    "M96,72a32,32,0,0,1,64,0v80a32,32,0,0,1-64,0ZM248,120a8,8,0,0,0-8-8H192V104c0-3.78-.21-7.52-.62-11.2l25.31-13.77a8,8,0,0,0-7.38-14.17L185.1,77.14A80.14,80.14,0,0,0,176,56H80a80.14,80.14,0,0,0-9.1,21.14L46.69,64.86a8,8,0,0,0-7.38,14.17L64.62,92.8C64.21,96.48,64,100.22,64,104v8H16a8,8,0,0,0,0,16H64v8a80.61,80.61,0,0,0,2.32,19.41L41.38,169.18a8,8,0,1,0,9.24,13.08l22.38-15.8A80.05,80.05,0,0,0,200,152v-8h48A8,8,0,0,0,248,120Zm-48,32a64,64,0,0,1-64,64H120a64,64,0,0,1-64-64V104a64,64,0,0,1,128,0Z",
  ],
  launch: [
    // Rocket
    "M152.77,84.5A64.09,64.09,0,0,0,105.63,19.65a8,8,0,0,0-11.26,7.17V56H72a8,8,0,0,0,0,16h22.37v24H72a8,8,0,0,0,0,16h22.37v12.39a8,8,0,0,0,11.26,7.17A64.09,64.09,0,0,0,152.77,84.5Zm32.94,84.39A72.12,72.12,0,0,0,200,128a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8,72.12,72.12,0,0,0,14.29,40.89L55.12,182.76A8,8,0,0,0,56,196.69,96,96,0,0,0,128,232a96,96,0,0,0,72-35.31,8,8,0,0,0,.88-13.93Z",
    // Globe
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.89,96H168.3a131.56,131.56,0,0,0-22.59-71.58A88.3,88.3,0,0,1,215.89,120ZM128,40a115.18,115.18,0,0,1,24.48,80H103.52A115.18,115.18,0,0,1,128,40ZM40.11,136H87.7a131.56,131.56,0,0,0,22.59,71.58A88.3,88.3,0,0,1,40.11,136Zm104.48,71.58A131.56,131.56,0,0,0,167.19,136h47.59A88.3,88.3,0,0,1,144.59,207.58ZM87.7,120H40.11A88.3,88.3,0,0,1,110.29,48.42,131.56,131.56,0,0,0,87.7,120ZM128,216a115.18,115.18,0,0,1-24.48-80h48.96A115.18,115.18,0,0,1,128,216Z",
    // ChartLineUp
    "M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z",
  ],
};

function StepIconPills({ stepId }: { stepId: (typeof steps)[number]["id"] }) {
  const icons = stepIcons[stepId];
  return (
    <div className="flex w-full items-center justify-center gap-6" aria-hidden="true">
      {icons.map((path, index) => (
        <span
          key={index}
          className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white text-[#404047]"
        >
          <StepIcon path={path} />
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
        className={`flex h-[412px] flex-col overflow-hidden rounded-md bg-[#f4f4f5] p-8 transition-opacity duration-300 ${
          stackMode ? "cursor-pointer" : ""
        } ${stackIndex > 0 && stackMode ? "lg:shadow-[0_-10px_40px_rgba(0,0,0,0.08)]" : ""}`}
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
        <div className="flex items-start justify-between">
          <h3
            className={`text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] transition-colors duration-300 lg:text-[40px] lg:leading-[48px] lg:whitespace-nowrap ${
              active ? "text-[#17171a]" : "text-[#17171a]/55"
            }`}
          >
            {step.title}
          </h3>
          <span
            className={`shrink-0 text-[13px] font-medium tabular-nums transition-colors duration-300 ${
              active ? "text-[#17171a]/40" : "text-[#17171a]/25"
            }`}
          >
            {step.index}
          </span>
        </div>

        <p
          className={`mt-3 max-w-md text-[15px] leading-relaxed transition-colors duration-300 lg:text-[16px] ${
            active ? "text-[#404047]" : "text-[#404047]/50"
          }`}
        >
          {step.description}
        </p>

        <div className="mt-auto pt-6 lg:pt-8">
          <StepIconPills stepId={step.id} />
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
        const top =
          node.getBoundingClientRect().top + window.scrollY + offset;
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
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-wide text-white">
                  Our process
                </span>
              </div>

              <h2
                id="our-process-heading"
                className="mt-5 max-w-lg text-[clamp(2rem,4.5vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white lg:leading-[1.4]"
              >
                How we make it happen
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 lg:mt-6 lg:text-[16px]">
                Discover how our systematic process ensures your project&apos;s
                success from start to finish.
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
