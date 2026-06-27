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
  const swatches = [
    { color: "#ed1b24", label: "Brand" },
    { color: "#0b1e1c", label: "Ink" },
    { color: "#f9f9f9", label: "Surface" },
  ];

  return (
    <div className="relative aspect-[4/3] h-full max-h-[min(44vh,360px)] w-full overflow-hidden border border-border bg-[#fafafa] sm:max-h-[min(52vh,420px)] lg:max-h-[min(48vh,440px)]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e4e7e6 1px, transparent 1px), linear-gradient(90deg, #e4e7e6 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <motion.span
        className="pointer-events-none absolute -right-1 top-2 select-none text-[4.5rem] font-semibold leading-none tracking-tighter text-ink/[0.05] sm:text-[5.5rem]"
        {...loopProps(reduced, { y: [0, -5, 0] }, { duration: 5.5, repeat: Infinity, ease: "easeInOut" })}
        aria-hidden="true"
      >
        Aa
      </motion.span>

      <motion.div
        className="absolute left-[9%] top-[13%] w-[80%] overflow-hidden rounded-sm border border-border bg-white shadow-[0_18px_36px_-18px_rgba(11,30,28,0.14)]"
        {...loopProps(reduced, { y: [0, -3, 0] }, { duration: 4.2, repeat: Infinity, ease: "easeInOut" })}
      >
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand sm:h-2 sm:w-2" />
            <span className="h-1.5 w-5 rounded-full bg-border sm:h-2 sm:w-6" />
          </div>
          <motion.span
            className="rounded-full bg-brand px-2 py-0.5 text-[8px] font-medium text-white sm:text-[9px]"
            {...loopProps(reduced, { scale: [1, 1.05, 1] }, { duration: 2.4, repeat: Infinity, ease: "easeInOut" })}
          >
            Primary
          </motion.span>
        </div>

        <div className="p-3.5 sm:p-4">
          <motion.div
            className="mb-2 h-2 w-[52%] rounded-full bg-ink sm:h-2.5"
            {...loopProps(reduced, { width: ["46%", "58%", "46%"] }, { duration: 3.8, repeat: Infinity, ease: "easeInOut" })}
          />
          <div className="mb-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-border" />
            <div className="h-1.5 w-[72%] rounded-full bg-border" />
          </div>

          <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.14em] text-subtle sm:text-[9px]">
            Palette
          </p>
          <div className="grid grid-cols-3 gap-2">
            {swatches.map(({ color, label }, i) => (
              <motion.div
                key={label}
                className="overflow-hidden rounded-sm border border-border"
                {...loopProps(
                  reduced,
                  { scale: [1, 1.04, 1] },
                  { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 },
                )}
              >
                <div className="aspect-[4/3]" style={{ backgroundColor: color }} />
                <p className="bg-white px-1.5 py-1 text-[7px] font-medium text-muted sm:text-[8px]">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[11%] right-[7%] w-[44%] border border-border bg-white/95 p-2.5 backdrop-blur-sm shadow-[0_8px_24px_-12px_rgba(11,30,28,0.12)] sm:p-3"
        {...loopProps(reduced, { y: [0, 4, 0] }, { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 })}
      >
        <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-subtle sm:text-[8px]">
          Typography
        </p>
        <p className="mt-0.5 text-[15px] font-semibold tracking-tight text-ink sm:text-[17px]">
          Inter
        </p>
        <div className="mt-1.5 flex items-end gap-1.5">
          {[400, 500, 600, 700].map((weight, i) => (
            <motion.span
              key={weight}
              className="text-[11px] leading-none text-ink/45 sm:text-[12px]"
              style={{ fontWeight: weight }}
              {...loopProps(
                reduced,
                { color: ["rgba(11,30,28,0.35)", "rgba(237,27,36,0.85)", "rgba(11,30,28,0.35)"] },
                { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 },
              )}
            >
              Aa
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[9%] top-[48%] h-px w-[80%] origin-left bg-brand/50"
        {...loopProps(reduced, { scaleX: [0.2, 1, 0.2] }, { duration: 5, repeat: Infinity, ease: "easeInOut" })}
        aria-hidden="true"
      />
    </div>
  );
}

function BuildVisual({ reduced }: { reduced: boolean | null }) {
  const tags = ["API", "Web", "Mobile"];

  return (
    <div className="relative aspect-[4/3] h-full max-h-[min(44vh,360px)] w-full overflow-hidden border border-border bg-[#f0f0f0] sm:max-h-[min(52vh,420px)] lg:max-h-[min(48vh,440px)]">
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
    <div className="relative aspect-[4/3] h-full max-h-[min(44vh,360px)] w-full overflow-hidden border border-border bg-[#f5f5f5] sm:max-h-[min(52vh,420px)] lg:max-h-[min(48vh,440px)]">
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
