'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const heroVideo = '/media/positive-watch-hero-reference-clear.mp4';
const heroPoster = '/media/positive-watch-hero-reference-clear-poster.webp';

export function WatchVideoHero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <section aria-label="Cinematic watch showcase" className="relative isolate min-h-[72svh] overflow-hidden border-b border-white/10 bg-[#020202] md:min-h-[calc(100vh-5rem)]">
      {reducedMotion ? (
        <Image
          src={heroPoster}
          alt="Luxury watch cinematic hero still"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.78] contrast-125 saturate-110"
        />
      ) : (
        <video
          className="h-full min-h-[72svh] w-full object-cover brightness-[0.78] contrast-125 saturate-110 md:min-h-[calc(100vh-5rem)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-label="Cinematic luxury watch showcase video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}
    </section>
  );
}
