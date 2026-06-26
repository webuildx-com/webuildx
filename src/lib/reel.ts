export const REEL_VIDEO_ID = "JheSSTJcsQ4";

export function reelEmbedUrl(options: {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  mute?: boolean;
}) {
  const {
    autoplay = true,
    controls = false,
    loop = true,
    mute = true,
  } = options;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: REEL_VIDEO_ID,
    controls: controls ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    disablekb: controls ? "0" : "1",
    fs: controls ? "1" : "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
  });

  return `https://www.youtube-nocookie.com/embed/${REEL_VIDEO_ID}?${params}`;
}
