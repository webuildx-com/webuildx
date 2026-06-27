"use client";

import { ArrowDownRightIcon, ArrowRightIcon } from "@/components/icons";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLenis } from "@/components/scroll-context";
import { WorkCaseModal } from "@/components/work-case-modal";
import { workProjects } from "@/lib/work";
import type { WorkProject } from "@/lib/work";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const panelTints: Record<string, string> = {
  knoxxpay: "from-[#f4f7fb] via-white to-[#fafafa]",
  klerra: "from-[#f5f5f5] via-white to-[#f0f0f0]",
  creditveto: "from-[#f8f8f8] via-white to-[#f3f3f3]",
  "orange-farm": "from-[#fff7ed] via-white to-[#fafafa]",
};

const panelGlow: Record<string, string> = {
  knoxxpay: "bg-[#3b82f6]/8",
  klerra: "bg-[#6366f1]/10",
  creditveto: "bg-[#a8b4ff]/10",
  "orange-farm": "bg-[#ffb86a]/12",
};

export function SelectedWorkSection() {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState(workProjects[0].id);
  const [modalProject, setModalProject] = useState<WorkProject | null>(null);
  const panelRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setPanelRef = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) panelRefs.current.set(id, node);
      else panelRefs.current.delete(id);
    },
    [],
  );

  useLayoutEffect(() => {
    const nodes = Array.from(panelRefs.current.values());
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top) {
          const id = top.target.getAttribute("data-project-id");
          if (id) setActiveId(id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToProject = (id: string) => {
    const node = panelRefs.current.get(id);
    if (!node) return;

    if (lenis) {
      lenis.scrollTo(node, { offset: -96, duration: 1.1 });
    } else {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setActiveId(id);
  };

  return (
    <>
      <section
        id="work"
        className="border-t border-border bg-sea-salt"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
            {/* Sticky spotlight rail */}
            <div className="lg:sticky lg:top-[72px] lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:self-start lg:py-20">
              <ScrollReveal>
                <p
                  id="work-heading"
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand"
                >
                  Selected work
                </p>
                <p className="max-w-sm text-[1.35rem] font-semibold leading-[1.3] tracking-tight text-ink sm:text-[1.75rem] lg:text-[1.85rem]">
                  Products we&apos;ve helped take from idea to launch and
                  beyond.
                </p>
              </ScrollReveal>

              <nav
                className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-10 lg:hidden [&::-webkit-scrollbar]:hidden"
                aria-label="Project index"
              >
                {workProjects.map((project) => {
                  const isActive = activeId === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => scrollToProject(project.id)}
                      className={`shrink-0 border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "border-brand bg-brand/5 text-ink"
                          : "border-border bg-white text-muted hover:border-ink/15 hover:text-ink"
                      }`}
                    >
                      {project.name}
                    </button>
                  );
                })}
              </nav>

              <nav
                className="mt-10 hidden lg:flex lg:flex-1 lg:flex-col"
                aria-label="Project index"
              >
                <ul className="flex flex-1 flex-col space-y-1 border-t border-border pt-6">
                  {workProjects.map((project) => {
                    const isActive = activeId === project.id;
                    return (
                      <li key={project.id}>
                        <button
                          type="button"
                          onClick={() => scrollToProject(project.id)}
                          className={`group flex w-full items-start border-l-2 py-3 pl-4 text-left transition-colors duration-300 ${
                            isActive
                              ? "border-brand"
                              : "border-transparent hover:border-border"
                          }`}
                        >
                          <span>
                            <span
                              className={`block text-[15px] font-semibold tracking-tight transition-colors ${
                                isActive
                                  ? "text-ink"
                                  : "text-muted group-hover:text-ink"
                              }`}
                            >
                              {project.name}
                            </span>
                            <span className="mt-0.5 block text-[12px] text-subtle">
                              {project.category}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}

                  <li className="mt-auto border-t border-border pt-1">
                    <Link
                      href="/work"
                      className="group flex w-full items-start border-l-2 border-transparent py-3 pl-4 text-left transition-colors duration-300 hover:border-border"
                    >
                      <span className="flex w-full items-center justify-between gap-3">
                        <span className="text-[15px] font-semibold tracking-tight text-muted transition-colors group-hover:text-ink">
                          View all work
                        </span>
                        <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Scrolling project panels */}
            <div className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:py-20">
              {workProjects.map((project) => {
                const hasCover = Boolean(project.coverImage);
                const coverTone = project.coverTone ?? "dark";
                const isStoneCover = hasCover && project.coverTheme === "stone";
                const isLightCover =
                  hasCover && coverTone === "light" && !isStoneCover;
                const softOverlay = project.coverOverlay === "soft";

                return (
                  <article
                    key={project.id}
                    ref={setPanelRef(project.id)}
                    data-project-id={project.id}
                    id={`work-${project.id}`}
                    className="scroll-mt-24 border-b border-border py-10 last:border-b-0 sm:scroll-mt-28 sm:py-14 lg:py-16 lg:first:pt-0"
                  >
                    <div className="flex flex-col justify-center lg:justify-start">
                      <div
                        className={`group relative aspect-[16/10] max-h-[min(56vh,480px)] w-full overflow-hidden border border-border transition-colors duration-500 hover:border-ink/15 sm:max-h-[min(72vh,640px)] ${
                          hasCover
                            ? isStoneCover
                              ? "bg-[#f5f2ee]"
                              : isLightCover
                                ? "bg-[#e8efe4]"
                                : "bg-[#141414]"
                            : `bg-gradient-to-br ${panelTints[project.id]}`
                        }`}
                      >
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt=""
                            fill
                            className="object-cover"
                            style={{
                              objectPosition:
                                project.coverObjectPosition ??
                                (project.coverImagePosition === "top"
                                  ? "center top"
                                  : "center"),
                            }}
                            sizes="(max-width: 1024px) 100vw, 720px"
                          />
                        ) : null}

                        {!hasCover ? (
                          <div
                            className={`absolute -right-12 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full blur-3xl ${panelGlow[project.id]}`}
                            aria-hidden="true"
                          />
                        ) : null}

                        {hasCover ? (
                          isStoneCover ? (
                            <>
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.32)_0%,rgba(15,23,42,0.08)_20%,transparent_40%)]"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(250,248,245,0.95)_0%,rgba(250,248,245,0.72)_24%,rgba(250,248,245,0.2)_48%,transparent_68%)]"
                                aria-hidden="true"
                              />
                            </>
                          ) : isLightCover ? (
                            <>
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.15)_28%,transparent_48%)]"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.72)_32%,rgba(255,255,255,0.2)_58%,transparent_82%)]"
                                aria-hidden="true"
                              />
                            </>
                          ) : softOverlay ? (
                            <>
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.06)_18%,transparent_36%)]"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_22%,rgba(0,0,0,0.08)_42%,transparent_62%)]"
                                aria-hidden="true"
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.12)_22%,transparent_42%)]"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_30%,rgba(0,0,0,0.2)_55%,transparent_78%)]"
                                aria-hidden="true"
                              />
                            </>
                          )
                        ) : (
                          <div
                            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.45)_38%,rgba(255,255,255,0)_68%)]"
                            aria-hidden="true"
                          />
                        )}

                        <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                          <span
                            className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
                              isStoneCover
                                ? "text-white/75"
                                : isLightCover
                                  ? "text-muted"
                                  : hasCover
                                    ? "text-white/65"
                                    : "text-subtle"
                            }`}
                          >
                            {project.category}
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 lg:p-10">
                          <h3
                            className={`max-w-2xl text-[1.35rem] font-semibold leading-[1.08] tracking-tight sm:text-[2.25rem] lg:text-[2.5rem] ${
                              isStoneCover
                                ? "text-stone-900"
                                : isLightCover || !hasCover
                                  ? "text-ink"
                                  : "text-white"
                            }`}
                          >
                            {project.name}
                          </h3>
                          <p
                            className={`mt-2 max-w-lg text-[14px] leading-relaxed sm:mt-3 sm:text-[16px] ${
                              isStoneCover
                                ? "text-stone-600"
                                : isLightCover || !hasCover
                                  ? "text-muted"
                                  : "text-white/82"
                            }`}
                          >
                            {project.summary}
                          </p>
                          <button
                            type="button"
                            onClick={() => setModalProject(project)}
                            className={`mt-4 inline-flex items-center gap-2 text-[13px] font-medium transition-colors sm:mt-7 sm:text-[14px] ${
                              isStoneCover
                                ? "text-[#d95847] hover:text-[#bf4a3b]"
                                : isLightCover || !hasCover
                                  ? "text-ink hover:text-brand"
                                  : "text-white hover:text-white/80"
                            }`}
                          >
                            View case
                            <ArrowDownRightIcon
                              className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
                                isStoneCover
                                  ? "text-[#d95847]"
                                  : isLightCover || !hasCover
                                    ? "text-brand"
                                    : "text-white/90"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WorkCaseModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}
