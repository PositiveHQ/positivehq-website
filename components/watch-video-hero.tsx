'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const heroVideo = '/media/positive-watch-hero-drive-v2-best.mp4';
const heroPoster = '/media/positive-watch-hero-drive-v2-best-poster.webp';

export function WatchVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Browser autoplay policies can still block in rare cases; poster remains visible.
    });
  }, [reducedMotion]);

  return (
    <section aria-label="Cinematic watch showcase" className="relative isolate min-h-[82svh] overflow-hidden border-b border-white/10 bg-[#020202] md:min-h-[calc(100vh-5rem)]">
      <Image
        src={heroPoster}
        alt="Luxury watch cinematic hero still"
        fill
        priority
        sizes="100vw"
        className={`object-cover brightness-[0.78] contrast-125 saturate-110 transition duration-700 ${videoReady && !reducedMotion ? 'opacity-0' : 'opacity-100'}`}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full min-h-[82svh] w-full object-cover brightness-[0.78] contrast-125 saturate-110 transition duration-700 md:min-h-[calc(100vh-5rem)] ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-label="Cinematic luxury watch showcase video"
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}
    </section>
  );
}
