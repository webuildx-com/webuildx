"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

type ServiceFeaturedVisualProps = {
  id: "design" | "build" | "scale";
};

function loopProps(
  reduced: boolean | null,
  animate: TargetAndTransition,
  transition: Transition,
) {
  if (reduced) return {};
  return { animate, transition };
}

function DesignVisual({ reduced }: { reduced: boolean | null }) {
  const navItems = [0, 1, 2, 3, 4];

  return (
    <div className="relative aspect-[4/3] h-full max-h-[min(52vh,420px)] w-full overflow-hidden border border-border bg-[#f5f5f5] lg:max-h-[min(48vh,440px)]">
      <div className="absolute inset-6 sm:inset-8">
        <div className="flex h-full flex-col overflow-hidden border border-border bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <motion.span
              className="h-2 w-2 rounded-full bg-brand"
              {...loopProps(reduced, { scale: [1, 1.15, 1] }, { duration: 2.4, repeat: Infinity, ease: "easeInOut" })}
            />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <motion.span
              className="ml-3 h-2 rounded-full bg-border"
              {...loopProps(reduced, { width: ["6rem", "8rem", "6rem"], opacity: [0.55, 1, 0.55] }, { duration: 3.2, repeat: Infinity, ease: "easeInOut" })}
            />
          </div>

          <div className="relative flex min-h-0 flex-1">
            <div className="relative w-[28%] border-r border-border bg-[#fafafa] p-3">
              <motion.div
                className="mb-3 h-2 w-12 rounded-full bg-brand/80"
                {...loopProps(reduced, { opacity: [0.65, 1, 0.65] }, { duration: 2.8, repeat: Infinity, ease: "easeInOut" })}
              />
              <div className="relative space-y-2">
                <motion.div
                  className="absolute left-0 h-4 w-full rounded-sm bg-brand/12"
                  {...loopProps(
                    reduced,
                    { y: [0, 24, 48, 72, 48, 24, 0] },
                    { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  )}
                />
                {navItems.map((item) => (
                  <div key={item} className="relative h-4">
                    <motion.div
                      className="relative h-1.5 rounded-full bg-border"
                      style={{ width: `${100 - item * 8}%` }}
                      {...loopProps(
                        reduced,
                        { opacity: [0.45, 1, 0.45] },
                        { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: item * 0.18 },
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col p-4 sm:p-5">
              <motion.div
                className="mb-4 h-3 w-[45%] rounded-full bg-ink/90"
                {...loopProps(reduced, { width: ["38%", "52%", "38%"] }, { duration: 4, repeat: Infinity, ease: "easeInOut" })}
              />
              <motion.div
                className="mb-2 h-2 w-full max-w-[280px] rounded-full bg-border"
                {...loopProps(reduced, { opacity: [0.4, 1, 0.4] }, { duration: 2.2, repeat: Infinity, ease: "easeInOut" })}
              />
              <motion.div
                className="mb-6 h-2 w-[75%] max-w-[220px] rounded-full bg-border"
                {...loopProps(reduced, { opacity: [0.35, 0.9, 0.35] }, { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 })}
              />

              <div className="mt-auto grid grid-cols-2 gap-3">
                {[0, 1].map((card) => (
                  <motion.div
                    key={card}
                    className="aspect-[5/3] rounded-sm border border-border bg-[#fafafa]"
                    {...loopProps(
                      reduced,
                      {
                        borderColor: ["#d8dcdb", "#ed1b24", "#d8dcdb"],
                        scale: [1, 1.02, 1],
                      },
                      { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: card * 0.6 },
                    )}
                  />
                ))}
              </div>

              <motion.div
                className="pointer-events-none absolute bottom-8 right-6 h-3 w-3 rounded-full border-2 border-brand bg-white sm:bottom-10 sm:right-8"
                {...loopProps(
                  reduced,
                  { x: [0, 48, 96, 48, 0], y: [0, -12, 8, 24, 0], opacity: [0, 1, 1, 1, 0] },
                  { duration: 6, repeat: Infinity, ease: "easeInOut" },
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildVisual({ reduced }: { reduced: boolean | null }) {
  const tags = ["API", "Web", "Mobile"];

  return (
    <div className="relative aspect-[4/3] h-full max-h-[min(52vh,420px)] w-full overflow-hidden border border-border bg-[#f0f0f0] lg:max-h-[min(48vh,440px)]">
      <div className="absolute inset-6 sm:inset-8">
        <div className="flex h-full flex-col overflow-hidden border border-[#2a2a2a] bg-ink text-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-white/45">app.tsx</span>
            </div>
            <motion.span
              className="rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#ffb4b4]"
              {...loopProps(
                reduced,
                { opacity: [0.55, 1, 0.55], boxShadow: ["0 0 0 0 rgba(229,35,34,0)", "0 0 0 4px rgba(229,35,34,0.15)", "0 0 0 0 rgba(229,35,34,0)"] },
                { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              )}
            >
              Live
            </motion.span>
          </div>

          <div className="space-y-2 p-4 font-mono text-[11px] leading-6 sm:text-[12px]">
            <p>
              <span className="text-[#7aa2f7]">export</span>{" "}
              <span className="text-[#bb9af7]">function</span>{" "}
              <span className="text-[#7dcfff]">Platform</span>
              <span className="text-white/50">()</span> {"{"}
            </p>
            <p className="pl-4">
              <span className="text-[#bb9af7]">return</span>{" "}
              <span className="text-white/50">(</span>
            </p>
            {["&lt;Dashboard /&gt;", "&lt;ApiLayer /&gt;"].map((line, i) => (
              <motion.p
                key={line}
                className="pl-8"
                {...loopProps(
                  reduced,
                  { opacity: [0.35, 1, 0.35], x: [0, 2, 0] },
                  { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                )}
              >
                <span className="text-[#9ece6a]">{line}</span>
              </motion.p>
            ))}
            <p className="pl-4">
              <span className="text-white/50">)</span>
            </p>
            <p>
              {"}"}
              <motion.span
                className="ml-0.5 inline-block h-[1em] w-[2px] bg-[#7dcfff]"
                {...loopProps(
                  reduced,
                  { opacity: [1, 1, 0, 0] },
                  { duration: 1.1, repeat: Infinity, times: [0, 0.45, 0.55, 1] },
                )}
                aria-hidden="true"
              />
            </p>
          </div>

          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 p-4">
            {tags.map((label, i) => (
              <motion.div
                key={label}
                className="rounded-sm border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-medium uppercase tracking-wider text-white/55"
                {...loopProps(
                  reduced,
                  {
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(229,35,34,0.55)", "rgba(255,255,255,0.1)"],
                    color: ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.95)", "rgba(255,255,255,0.55)"],
                    y: [0, -2, 0],
                  },
                  { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 },
                )}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScaleVisual({ reduced }: { reduced: boolean | null }) {
  const bars = [38, 52, 44, 68, 58, 74, 62, 80];

  return (
    <div className="relative aspect-[4/3] h-full max-h-[min(52vh,420px)] w-full overflow-hidden border border-border bg-[#f5f5f5] lg:max-h-[min(48vh,440px)]">
      <div className="absolute inset-6 flex flex-col sm:inset-8">
        <div className="flex h-full flex-col border border-border bg-white p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.15)] sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
              Production health
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-brand"
                {...loopProps(
                  reduced,
                  { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] },
                  { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                )}
              />
              Operational
            </span>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Requests", value: "2.4M" },
              { label: "Regions", value: "3" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-sm border border-border bg-[#fafafa] px-2 py-3"
                {...loopProps(
                  reduced,
                  { borderColor: ["#d8dcdb", "#ed1b2440", "#d8dcdb"] },
                  { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                )}
              >
                <p className="text-[10px] uppercase tracking-wider text-subtle">{stat.label}</p>
                <motion.p
                  className="mt-1 text-[1.1rem] font-semibold tracking-tight text-ink"
                  {...loopProps(
                    reduced,
                    { opacity: [0.75, 1, 0.75] },
                    { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 },
                  )}
                >
                  {stat.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto flex h-24 items-end gap-2 border-t border-border pt-4">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 origin-bottom rounded-t-sm bg-ink/85"
                style={{ height: `${height}%` }}
                {...loopProps(
                  reduced,
                  { scaleY: [0.72, 1, 0.85, 1, 0.72] },
                  {
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  },
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceFeaturedVisual({ id }: ServiceFeaturedVisualProps) {
  const reduced = useReducedMotion();

  if (id === "design") return <DesignVisual reduced={reduced} />;
  if (id === "build") return <BuildVisual reduced={reduced} />;
  return <ScaleVisual reduced={reduced} />;
}
