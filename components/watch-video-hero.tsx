'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const heroVideo = '/media/positive-watch-hero-showcase.mp4';
const heroPoster = '/media/positive-watch-hero-poster.webp';

export function WatchVideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 bg-[#020202] lg:min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0">
        {reducedMotion ? (
          <Image
            src={heroPoster}
            alt="Luxury watch cinematic hero still"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.62] contrast-125 saturate-110"
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover brightness-[0.62] contrast-125 saturate-110"
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
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.64)_42%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0.76)),linear-gradient(0deg,rgba(0,0,0,0.88),transparent_44%,rgba(0,0,0,0.28))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(253,230,138,0.16),transparent_30%),radial-gradient(circle_at_18%_68%,rgba(255,255,255,0.07),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050608] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-6 py-24 lg:min-h-[calc(100vh-5rem)] lg:px-8">
        <div className="max-w-4xl space-y-7 motion-safe:animate-hero-copy-in">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/42 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.8)]" />
            Luxury Watch Concierge
          </div>
          <h1 className="max-w-5xl text-[2.18rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_18px_48px_rgba(0,0,0,0.78)] sm:text-7xl sm:leading-[0.94] lg:text-8xl">
            Sell, Trade, Consign, or Source Your Next Luxury Watch
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-200 drop-shadow-[0_12px_34px_rgba(0,0,0,0.88)] sm:text-lg">
            Clear guidance, documented condition review, and concierge-level communication for high-value watch decisions.
          </p>
          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <Link href="/contact?intent=appointment#contact-form" className="inline-flex items-center justify-center rounded-full border border-amber-100/80 bg-amber-100 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-[0_18px_45px_rgba(253,230,138,0.16)] transition hover:-translate-y-0.5 hover:bg-white">
              Start Watch Review
            </Link>
            <Link href="/contact?intent=buy#contact-form" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-amber-100/55 hover:bg-white/10">
              Request a Watch
            </Link>
          </div>
        </div>
      </div>

      {!reducedMotion && (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-8 right-6 z-20 rounded-full border border-white/18 bg-black/32 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-xl transition hover:border-amber-100/45 hover:text-amber-100 lg:right-8"
          aria-label={paused ? 'Play hero video' : 'Pause hero video'}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      )}
    </section>
  );
}
