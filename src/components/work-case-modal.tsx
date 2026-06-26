"use client";

import { ArrowRightIcon } from "@/components/icons";
import type { WorkProject } from "@/lib/work";
import { useEffect, useRef } from "react";

type WorkCaseModalProps = {
  project: WorkProject | null;
  onClose: () => void;
};

export function WorkCaseModal({ project, onClose }: WorkCaseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div
          className="flex min-h-full items-center justify-center p-6 sm:p-10"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div
            role="document"
            className="relative w-full max-w-lg border border-border bg-white p-8 shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 text-[13px] font-medium text-muted transition-colors hover:text-ink"
              aria-label="Close case study"
            >
              Close
            </button>

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              {project.category}
            </p>
            <h3 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
              {project.name}
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              {project.modal.overview}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
              {project.modal.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-ink"
                >
                  <span
                    className="mt-2 h-px w-4 shrink-0 bg-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {project.href ? (
              <a
                href={project.href}
                className="mt-8 inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Read full case study
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            ) : (
              <p className="mt-8 text-[13px] text-subtle">
                Full case study coming soon.
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
