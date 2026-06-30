"use client";

import { ArrowRightIcon } from "@/components/icons";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { ShowreelModal } from "@/components/showreel-modal";
import { fadeUpSafe, pickMotion, stagger } from "@/lib/motion";
import { reelEmbedUrl, SHOWREEL_SRC } from "@/lib/reel";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type PreviewMode = "video" | "embed" | "static";

/** Inline showreel strip — scales in em with the headline. */
function PhoneStrip({
  onPlay,
  onSourceReady,
}: {
  onPlay: () => void;
  onSourceReady: (source: PreviewMode) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<PreviewMode>("embed");
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (mq.matches) {
        setMode("static");
        onSourceReady("static");
        return;
      }

      // Use embed preview until hero-strip.mp4 is added to public/videos
      setMode("embed");
      onSourceReady("embed");
    };

    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, [onSourceReady]);

  useEffect(() => {
    if (!mounted || mode !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    const fallbackToEmbed = () => {
      setMode("embed");
      onSourceReady("embed");
    };

    video.addEventListener("error", fallbackToEmbed);
    video.play().catch(fallbackToEmbed);

    return () => video.removeEventListener("error", fallbackToEmbed);
  }, [mounted, mode, onSourceReady]);

  const embedUrl = reelEmbedUrl({
    autoplay: true,
    controls: false,
    loop: true,
    mute: true,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCursor({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <button
        type="button"
        onClick={onPlay}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMouseMove}
        className={`group relative mx-[0.14em] inline-flex h-[1.08em] w-[2.45em] shrink-0 translate-y-[0.04em] overflow-hidden rounded-[0.16em] bg-ink align-middle shadow-[0_8px_18px_-12px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.45)] [container-type:size] ${
          finePointer ? "cursor-none" : "cursor-pointer"
        }`}
        aria-label="Play showreel"
      >
        {mounted && mode === "video" && (
          <video
            ref={videoRef}
            src={SHOWREEL_SRC}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            preload="auto"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}

        {mounted && mode === "embed" && (
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <iframe
              src={embedUrl}
              title=""
              tabIndex={-1}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 h-[56.25cqw] min-h-full w-full -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </span>
        )}

        <span className="pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/20" />
      </button>

      {finePointer && hovering && (
        <span
          className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]"
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        >
          Play Me
        </span>
      )}
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [showreelSource, setShowreelSource] = useState<"video" | "embed">(
    "embed",
  );

  const handleSourceReady = useCallback((source: PreviewMode) => {
    if (source !== "static") setShowreelSource(source);
  }, []);

  const handlePlay = useCallback(() => setShowreelOpen(true), []);

  return (
    <motion.div
      className="w-full min-w-0 overflow-hidden text-center"
      initial="hidden"
      animate="visible"
      variants={pickMotion(reduced, stagger)}
    >
      <motion.h1
        variants={pickMotion(reduced, fadeUpSafe)}
        className="mx-auto max-w-5xl text-[clamp(2rem,8vw,2.375rem)] font-semibold leading-[1.14] tracking-tight sm:text-[clamp(2.125rem,5.5vw,3.5rem)] sm:leading-[1.12] lg:text-[clamp(2.5rem,5vw,5rem)] lg:max-w-6xl"
      >
        <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-[0.25em] gap-y-[0.2em]">
          <span className="text-ink">We build</span>
          <span className="inline-flex items-center gap-x-[0.25em]">
            <span className="inline-flex p-1 -m-1 sm:p-0 sm:m-0">
              <PhoneStrip onPlay={handlePlay} onSourceReady={handleSourceReady} />
            </span>
            <span className="text-ink">products</span>
          </span>
        </span>

        <span className="mt-[0.08em] block">
          <span className="text-subtle">for </span>
          <span className="text-ink">ambitious founders</span>
        </span>
      </motion.h1>

      <motion.p
        variants={pickMotion(reduced, fadeUpSafe)}
        className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-7 sm:text-[16px] lg:text-[17px]"
      >
        WebuildX is a design and technology studio helping teams turn early
        thinking into clear plans, sharp designs, and working software
      </motion.p>

      <motion.div
        variants={pickMotion(reduced, fadeUpSafe)}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-5 lg:gap-6"
      >
        <Link href="/start-a-project" className="btn-cta-primary">
          Start a project
          <ArrowRightIcon className="btn-cta-icon" />
        </Link>

        <HoverUnderlineLink
          href="/#work"
          className="link-cta-secondary"
          underlineClassName="bg-brand"
        >
          See our work
        </HoverUnderlineLink>
      </motion.div>

      <ShowreelModal
        open={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        source={showreelSource}
      />
    </motion.div>
  );
}
