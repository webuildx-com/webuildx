"use client";

import { CloseIcon } from "@/components/icons";
import { reelEmbedUrl, SHOWREEL_SRC } from "@/lib/reel";
import { useEffect, useRef } from "react";

type ShowreelModalProps = {
  open: boolean;
  onClose: () => void;
  source: "video" | "embed";
};

export function ShowreelModal({ open, onClose, source }: ShowreelModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      videoRef.current?.play().catch(() => {});
    } else {
      dialog.close();
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [open]);

  const embedUrl = reelEmbedUrl({
    autoplay: true,
    controls: true,
    loop: false,
    mute: true,
  });

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div
          className="flex min-h-full items-center justify-center p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 inline-flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white sm:-top-14"
              aria-label="Close showreel"
            >
              <CloseIcon className="h-4 w-4" />
              Close
            </button>

            <div className="relative aspect-video overflow-hidden bg-black shadow-2xl">
              {source === "video" ? (
                <video
                  ref={videoRef}
                  src={SHOWREEL_SRC}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title="WebuildX showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
