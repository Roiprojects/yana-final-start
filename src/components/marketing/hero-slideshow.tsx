
import { useEffect, useState } from "react";

/**
 * Cinematic hero background that can use silent desktop/mobile videos or fall back to
 * bright crossfading photos.
 */
export function HeroSlideshow({
  images,
  interval = 6000,
  videoSrc,
  mobileVideoSrc,
  poster,
  mobilePoster,
}: {
  images: string[];
  interval?: number;
  videoSrc?: string;
  mobileVideoSrc?: string;
  poster?: string;
  mobilePoster?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (videoSrc || images.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval, videoSrc]);

  if (videoSrc) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <video
          className="absolute inset-0 hidden h-full w-full scale-[1.01] object-cover md:block"
          style={{ filter: "brightness(1.1) contrast(1.07) saturate(1.18)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <video
          className="absolute inset-0 h-full w-full scale-[1.01] object-cover md:hidden"
          style={{ filter: "brightness(1.1) contrast(1.07) saturate(1.18)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={mobilePoster ?? poster}
        >
          <source src={mobileVideoSrc ?? videoSrc} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            filter: "brightness(1.08) contrast(1.05) saturate(1.16)",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1600ms ease-in-out",
            animation: i === active ? "kenburns 8s ease-out both" : "none",
          }}
        />
      ))}
    </div>
  );
}
