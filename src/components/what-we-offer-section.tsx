"use client";

import { useLenis } from "@/components/scroll-context";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

const offerings = [
  {
    id: "web",
    title: "Web development",
    description:
      "Build a beautiful and scalable web application based on predictable processes.",
  },
  {
    id: "mobile",
    title: "Mobile development",
    description:
      "Build a cross-platform mobile application that works and looks great on iOS and Android.",
  },
  {
    id: "design",
    title: "Product design",
    description:
      "Improve your critical business metrics with the best UI/UX practices and user research.",
  },
  {
    id: "cloud",
    title: "Cloud infra",
    description:
      "Deploy, monitor, and scale on reliable cloud infrastructure, with DevOps, CI/CD, and performance engineering built in.",
  },
] as const;

/** Header (72px) + section breathing room — matches `lg:top-28` */
const STICKY_TOP = 112;
/** Title strip visible on each card behind the front card */
const STICKY_STEP = 24;
const CARD_HEIGHT = 412;
/** Scroll runway while each card stays pinned before the next stacks on top */
const STACK_GAP = 180;

const STACK_PADDING = [
  STACK_GAP * 3,
  STACK_GAP * 2,
  STACK_GAP,
  0,
] as const;

function OfferIcon({ path }: { path: string }) {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const offerIcons: Record<(typeof offerings)[number]["id"], string[]> = {
  web: [
    "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Zm0,144H40V104H216v96Z",
    "M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z",
    "M223.51,48h-191A16.51,16.51,0,0,0,16,64.49v127A16.51,16.51,0,0,0,32.49,208h191A16.51,16.51,0,0,0,240,191.51v-127A16.51,16.51,0,0,0,223.51,48Z",
  ],
  mobile: [
    "M200,56H56A24,24,0,0,0,32,80V176a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V80A24,24,0,0,0,200,56Zm8,120a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8Zm-40-32a12,12,0,1,1-12-12A12,12,0,0,1,168,144Z",
    "M184,96a40,40,0,0,0-24-72H88A40,40,0,0,0,64,96a40,40,0,0,0,1.37,65A44,44,0,1,0,136,196V160a40,40,0,1,0,48-64Z",
    "M248,104a8,8,0,0,0-8,8v24H224V120a16,16,0,0,0-16-16H195.31L160,68.69A15.86,15.86,0,0,0,148.69,64H128V48h24a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16h24V64H48A16,16,0,0,0,32,80v56H16V112a8,8,0,0,0-16,0v64a8,8,0,0,0,16,0V152H32v20.69A15.86,15.86,0,0,0,36.69,184L72,219.31A15.86,15.86,0,0,0,83.31,224h65.38A15.86,15.86,0,0,0,160,219.31L195.31,184H208a16,16,0,0,0,16-16V152h16v24a8,8,0,0,0,16,0V112A8,8,0,0,0,248,104Z",
  ],
  design: [
    "M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32Z",
    "M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Z",
    "M184,96a40,40,0,0,0-24-72H88A40,40,0,0,0,64,96a40,40,0,0,0,1.37,65A44,44,0,1,0,136,196V160a40,40,0,1,0,48-64Zm48-32a24,24,0,1,1-24-24A24,24,0,0,1,232,64Z",
  ],
  cloud: [
    "M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z",
    "M216,88H168V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V88H40a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H88v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V168h48a16,16,0,0,0,16-16V104A16,16,0,0,0,216,88Z",
    "M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124Z",
  ],
};

function OfferIconPills({ offerId }: { offerId: (typeof offerings)[number]["id"] }) {
  const icons = offerIcons[offerId];

  return (
    <div
      className="flex w-full items-center justify-center gap-6"
      aria-hidden="true"
    >
      {icons.map((path, index) => (
        <span
          key={index}
          className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white text-[#404047]"
        >
          <OfferIcon path={path} />
        </span>
      ))}
    </div>
  );
}

function OfferTitle({
  offer,
  active,
}: {
  offer: (typeof offerings)[number];
  active: boolean;
}) {
  return (
    <h3
      className={`text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] transition-colors duration-300 lg:text-[40px] lg:leading-[48px] lg:whitespace-nowrap ${
        active ? "text-[#17171a]" : "text-[#17171a]/55"
      }`}
    >
      {offer.title}
    </h3>
  );
}

function OfferItem({
  offer,
  active,
  onActivate,
  stackIndex,
  setRef,
  stackMode,
}: {
  offer: (typeof offerings)[number];
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
      aria-label={offer.title}
    >
      <div
        className={`flex h-[412px] flex-col overflow-hidden rounded-md bg-[#f4f4f5] p-8 ${
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
        <OfferTitle offer={offer} active={active} />
        {active ? (
          <>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#404047] lg:text-[16px]">
              {offer.description}
            </p>
            <div className="mt-auto pt-6 lg:pt-8">
              <OfferIconPills offerId={offer.id} />
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}

export function WhatWeOfferSection() {
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
      id="what-we-offer"
      className="border-t border-border bg-white"
      aria-labelledby="what-we-offer-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="lg:sticky lg:top-28 lg:w-[60%] lg:self-start">
            <div className="overflow-hidden rounded-md bg-brand p-8 sm:p-10 lg:p-12">
              <h2
                id="what-we-offer-heading"
                className="max-w-lg text-[clamp(2rem,4.5vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white lg:leading-[1.4]"
              >
                What we offer
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/90 lg:mt-6 lg:text-[16px]">
                From web and mobile products to design and cloud infrastructure.
                Focused services to help you design, build, and scale with
                clarity.
              </p>

              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-md sm:mt-10">
                <Image
                  src="/images/process-card.jpg"
                  alt="A workspace with a laptop and chair, representing collaborative product development"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={false}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:w-[40%] lg:gap-0">
            {offerings.map((offer, index) => (
              <OfferItem
                key={offer.id}
                offer={offer}
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
