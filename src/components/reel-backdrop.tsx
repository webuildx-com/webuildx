"use client";

import { useEffect, useState } from "react";

// Background showreel
// https://www.youtube.com/watch?v=JheSSTJcsQ4
const REEL_VIDEO_ID = "JheSSTJcsQ4";

type ReelBackdropProps = {
  children: React.ReactNode;
};

export function ReelBackdrop({ children }: ReelBackdropProps) {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(!mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${REEL_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${REEL_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`;

  return (
    <div className="relative isolate -mt-[72px] min-h-svh overflow-hidden pt-[72px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {mounted && showVideo && (
          <div className="absolute inset-0 scale-[1.2] brightness-[0.7] saturate-[0.8]">
            <iframe
              src={embedUrl}
              title="Background reel"
              tabIndex={-1}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
