'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    eyebrow: 'Positive Watch HQ',
    headline: 'Sell, Trade, Consign, or Source Your Next Luxury Watch',
    subheadline:
      'Clear guidance, documented condition review, and concierge-level communication for high-value watch decisions.',
    primary: { label: 'Start Watch Review', href: '/contact?intent=appointment#contact-form' },
    secondary: { label: 'Request a Watch', href: '/contact?intent=buy#contact-form' },
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1800&q=88',
    alt: 'Luxury dive watch hero photo'
  },
  {
    eyebrow: 'Sourcing concierge',
    headline: 'Source the Watch You Actually Want',
    subheadline:
      'Tell us the brand, model, reference, budget, and timeline. We’ll review sourcing options and the cleanest path forward.',
    primary: { label: 'Request a Watch', href: '/contact?intent=buy#contact-form' },
    secondary: { label: 'Book Consultation', href: '/contact?intent=appointment#contact-form' },
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1800&q=88',
    alt: 'Premium watch collection detail'
  },
  {
    eyebrow: 'Sell with clarity',
    headline: 'Sell With a Clear, Honest Review',
    subheadline:
      'Submit your watch details and receive guidance based on brand, model, condition, box/papers, service history, and current market demand.',
    primary: { label: 'Sell Your Watch', href: '/sell' },
    secondary: { label: 'How Offers Work', href: '/sell#sell-form' },
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1800&q=88',
    alt: 'Close-up watch inspection style photo'
  },
  {
    eyebrow: 'Trade-in path',
    headline: 'Trade Toward Your Next Piece',
    subheadline: 'Review your current watch and explore trade options toward your next watch.',
    primary: { label: 'Start Trade-In', href: '/trade-in' },
    secondary: { label: 'View Trade Process', href: '/process' },
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1800&q=88',
    alt: 'Luxury watch transition composition'
  }
];

export function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: 1 | -1) => setActive((index) => (index + direction + slides.length) % slides.length);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#050505]"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,166,91,0.18),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.95),rgba(0,0,0,0.34),rgba(0,0,0,0.92))]" />

      <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.headline}
            className={`absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              index === active ? 'translate-x-0' : index < active ? '-translate-x-full' : 'translate-x-full'
            }`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover brightness-[0.72] contrast-110 saturate-110 transition duration-[6200ms] motion-reduce:transition-none ${index === active ? 'scale-105' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.54)_44%,rgba(0,0,0,0.12)_70%,rgba(0,0,0,0.78)),linear-gradient(0deg,rgba(0,0,0,0.82),transparent_38%)]" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div key={slides[active].headline} className="max-w-4xl animate-fade-up space-y-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.8)]" />
              {slides[active].eyebrow}
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              {slides[active].headline}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {slides[active].subheadline}
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row motion-safe:animate-fade-in">
              <Link href={slides[active].primary.href} className="inline-flex items-center justify-center rounded-full border border-amber-100/70 bg-amber-100 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-white">
                {slides[active].primary.label}
              </Link>
              <Link href={slides[active].secondary.href} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-100/50 hover:bg-white/15">
                {slides[active].secondary.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 lg:px-2">
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.headline}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${index === active ? 'w-12 bg-amber-100' : 'w-5 bg-white/35 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:border-amber-100/50">←</button>
            <button type="button" aria-label="Next slide" onClick={() => go(1)} className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:border-amber-100/50">→</button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/10">
          <div key={`${active}-${paused}`} className={`h-full bg-gradient-to-r from-amber-200 via-white to-amber-100 ${paused ? '' : 'hero-slider-progress'}`} />
        </div>
      </div>
    </section>
  );
}
