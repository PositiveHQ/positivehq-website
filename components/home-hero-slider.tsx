'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const SCENE_DURATION = 6500;

const scenes = [
  {
    eyebrow: 'Luxury watch concierge',
    headline: 'Sell, Trade, Consign, or Source Your Next Luxury Watch',
    subheadline:
      'Clear guidance, documented condition review, and concierge-level communication for high-value watch decisions.',
    primary: { label: 'Start Watch Review', href: '/contact?intent=appointment#contact-form' },
    secondary: { label: 'Request a Watch', href: '/contact?intent=buy#contact-form' },
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=2200&q=90',
    detailImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=88',
    alt: 'Large cinematic luxury watch hero shot',
    frame: 'Full hero shot',
    motion: 'hero-cinema-pan-left'
  },
  {
    eyebrow: 'Condition review',
    headline: 'Sell With a Clear, Honest Review',
    subheadline:
      'Submit your watch details and receive guidance based on brand, model, condition, box/papers, service history, and current market demand.',
    primary: { label: 'Sell Your Watch', href: '/sell' },
    secondary: { label: 'How Offers Work', href: '/sell#sell-form' },
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=2200&q=90',
    detailImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=88',
    alt: 'Close-up dial and inspection-style watch detail',
    frame: 'Dial / case detail',
    motion: 'hero-cinema-pan-right'
  },
  {
    eyebrow: 'Trade-in path',
    headline: 'Trade Toward Your Next Piece',
    subheadline: 'Review your current watch and explore trade options toward your next watch.',
    primary: { label: 'Start Trade-In', href: '/trade-in' },
    secondary: { label: 'View Trade Process', href: '/process' },
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=2200&q=90',
    detailImage: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=88',
    alt: 'Two-watch composition for trade-in',
    frame: 'Trade composition',
    motion: 'hero-cinema-pan-left'
  },
  {
    eyebrow: 'Sourcing concierge',
    headline: 'Looking for a Specific Watch?',
    subheadline:
      'Tell us the brand, model, reference, budget, and timeline. We’ll review sourcing options and the cleanest path forward.',
    primary: { label: 'Request a Watch', href: '/contact?intent=buy#contact-form' },
    secondary: { label: 'Book Consultation', href: '/contact?intent=appointment#contact-form' },
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2200&q=90',
    detailImage: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1400&q=88',
    alt: 'Premium sourcing-style watch arrangement',
    frame: 'Sourcing detail',
    motion: 'hero-cinema-pan-right'
  }
];

export function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const scene = scenes[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % scenes.length), SCENE_DURATION);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: 1 | -1) => setActive((index) => (index + direction + scenes.length) % scenes.length);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#030303]"
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
      <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden lg:min-h-[calc(100vh-5rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,166,91,0.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,#030303,#070707_45%,#020202)]" />

        {scenes.map((item, index) => {
          const activeScene = index === active;
          return (
            <div
              key={item.headline}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${activeScene ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={!activeScene}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover brightness-[0.68] contrast-125 saturate-110 motion-reduce:animate-none ${activeScene ? item.motion : ''}`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.70)_38%,rgba(0,0,0,0.24)_68%,rgba(0,0,0,0.82)),linear-gradient(0deg,rgba(0,0,0,0.86),transparent_40%,rgba(0,0,0,0.38))]" />

              <div className="absolute right-[-8%] top-[14%] hidden h-[64vh] w-[48vw] overflow-hidden rounded-l-[4rem] border-y border-l border-white/10 bg-black/25 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-sm lg:block">
                <Image
                  src={item.detailImage}
                  alt={`${item.frame} watch detail`}
                  fill
                  sizes="48vw"
                  className={`object-cover opacity-80 brightness-[0.78] contrast-125 saturate-110 motion-reduce:animate-none ${activeScene ? 'hero-cinema-detail' : ''}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.7)),radial-gradient(circle_at_35%_35%,transparent,rgba(0,0,0,0.78)_72%)]" />
              </div>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_28%_42%,rgba(201,166,91,0.10),transparent_34%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-6 py-24 lg:min-h-[calc(100vh-5rem)] lg:px-8">
          <div key={scene.headline} className="max-w-4xl space-y-7 motion-safe:animate-hero-copy-in">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/42 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.8)]" />
              {scene.eyebrow}
            </div>
            <h2 className="max-w-5xl text-[2.18rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_18px_48px_rgba(0,0,0,0.72)] sm:text-7xl sm:leading-[0.94] lg:text-8xl">
              {scene.headline}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-200 drop-shadow-[0_12px_34px_rgba(0,0,0,0.85)] sm:text-lg">
              {scene.subheadline}
            </p>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row motion-safe:animate-hero-cta-in">
              <Link href={scene.primary.href} className="inline-flex items-center justify-center rounded-full border border-amber-100/80 bg-amber-100 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-[0_18px_45px_rgba(253,230,138,0.16)] transition hover:-translate-y-0.5 hover:bg-white">
                {scene.primary.label}
              </Link>
              <Link href={scene.secondary.href} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-amber-100/55 hover:bg-white/10">
                {scene.secondary.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 lg:px-2">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-xl">
            {scenes.map((item, index) => (
              <button
                key={item.headline}
                type="button"
                aria-label={`Show scene ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${index === active ? 'w-12 bg-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.55)]' : 'w-5 bg-white/35 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button type="button" aria-label="Previous scene" onClick={() => go(-1)} className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:border-amber-100/50">←</button>
            <button type="button" aria-label="Next scene" onClick={() => go(1)} className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:border-amber-100/50">→</button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/10">
          <div key={`${active}-${paused}`} className={`h-full bg-gradient-to-r from-amber-200 via-white to-amber-100 ${paused ? '' : 'hero-showcase-progress'}`} />
        </div>
      </div>
    </section>
  );
}
