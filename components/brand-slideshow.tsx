'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const slides = [
  {
    brand: 'Rolex',
    model: 'Submariner · GMT · Datejust',
    signal: 'Trade target · high demand',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Omega',
    model: 'Speedmaster · Seamaster',
    signal: 'Clean value · strong liquidity',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Cartier',
    model: 'Santos · Tank · Ballon Bleu',
    signal: 'Dress icons · elegant trades',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Tudor',
    model: 'Black Bay · Pelagos',
    signal: 'Modern sport · sharp entry',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=86'
  }
];

export function BrandSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  const nextBrand = useMemo(() => slides[(active + 1) % slides.length].brand, [active]);

  return (
    <div className="relative mx-auto w-full max-w-[590px] animate-fade-in">
      <div className="absolute -inset-8 rounded-[3.4rem] bg-[radial-gradient(circle,rgba(253,230,138,0.18),transparent_62%)] blur-3xl" />
      <div className="hero-holo-frame relative overflow-hidden rounded-[3.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.015))] p-4 shadow-[0_55px_140px_rgba(0,0,0,0.72)] backdrop-blur sm:p-6">
        <div className="absolute inset-0 rounded-[3.2rem] bg-[linear-gradient(120deg,transparent,rgba(253,230,138,0.20),transparent)] opacity-60" />
        <div className="hero-orbit-ring absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100/15" />
        <div className="hero-orbit-ring hero-orbit-ring-slow absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

        <div className="relative aspect-square overflow-hidden rounded-[2.55rem] border border-white/15 bg-black">
          {slides.map((item, index) => (
            <Image
              key={item.brand}
              src={item.image}
              alt={`${item.brand} luxury watch`}
              fill
              sizes="(min-width: 1024px) 44vw, 90vw"
              priority={index === 0}
              className={`object-cover brightness-[0.82] contrast-125 saturate-110 transition duration-1000 ${
                index === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_20%,rgba(0,0,0,0.55)_64%,rgba(0,0,0,0.88)_100%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.78))]" />
          <div className="hero-scanline absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-amber-100/12 to-transparent" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:38px_38px]" />

          <div className="absolute left-5 top-5 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-xl">
            Live rotation
          </div>

          <div className="absolute right-5 top-5 flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.brand}
                type="button"
                aria-label={`Show ${item.brand}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? 'w-9 bg-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.65)]' : 'w-3 bg-white/35 hover:bg-white/55'}`}
              />
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-3xl border border-white/12 bg-black/62 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/80 to-transparent" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-amber-100/75">Trade radar</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">{slide.brand}</h2>
                <p className="mt-2 text-sm text-slate-300">{slide.model}</p>
              </div>
              <div className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right sm:block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Next</p>
                <p className="mt-1 text-sm font-semibold text-amber-100">{nextBrand}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div key={slide.brand} className="hero-progress h-full rounded-full bg-gradient-to-r from-amber-200 via-white to-amber-100" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{slide.signal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
