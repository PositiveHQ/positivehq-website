'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    label: 'Rolex',
    image: '/media/brand-showcase/rolex-hero.webp',
    alt: 'Rolex watch photo showcase slide'
  },
  {
    label: 'Cartier',
    image: '/media/brand-showcase/cartier-hero.webp',
    alt: 'Cartier watch photo showcase slide'
  },
  {
    label: 'Tudor',
    image: '/media/brand-showcase/tudor-hero.webp',
    alt: 'Tudor watch photo showcase slide'
  }
];

const DURATION = 5200;

export function WatchPhotoShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), DURATION);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: 1 | -1) => setActive((index) => (index + direction + slides.length) % slides.length);

  return (
    <section
      aria-label="Watch photo showcase"
      className="relative overflow-hidden bg-[#050608] py-10 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (startX.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
        if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_35px_110px_rgba(0,0,0,0.6)] md:aspect-[16/7] md:rounded-[2.5rem]">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={index !== active}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 1180px, 100vw"
                priority={index === 0}
                className={`object-cover brightness-[0.82] contrast-125 saturate-110 motion-reduce:animate-none ${index === active ? 'hero-cinema-detail' : ''}`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.42),transparent_38%,rgba(0,0,0,0.12))]" />
            </div>
          ))}

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
            <p className="rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
              {slides[active].label}
            </p>
            <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-2 py-2 backdrop-blur-xl">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show watch photo ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${active === index ? 'w-8 bg-amber-100' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
