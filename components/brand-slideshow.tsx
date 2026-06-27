'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  {
    brand: 'Rolex',
    model: 'Submariner · GMT · Datejust',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Omega',
    model: 'Speedmaster · Seamaster',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Cartier',
    model: 'Santos · Tank · Ballon Bleu',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=86'
  },
  {
    brand: 'Tudor',
    model: 'Black Bay · Pelagos',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=86'
  }
];

export function BrandSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <div className="relative mx-auto w-full max-w-[560px] animate-fade-in">
      <div className="absolute -inset-6 rounded-[3rem] bg-amber-100/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.11),transparent_31%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-4 shadow-[0_50px_120px_rgba(0,0,0,0.65)] sm:p-6">
        <div className="relative aspect-square overflow-hidden rounded-[2.4rem] border border-white/15 bg-black">
          {slides.map((item, index) => (
            <Image
              key={item.brand}
              src={item.image}
              alt={`${item.brand} luxury watch`}
              fill
              sizes="(min-width: 1024px) 44vw, 90vw"
              priority={index === 0}
              className={`object-cover brightness-90 contrast-110 saturate-110 transition duration-1000 ${
                index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,transparent_24%,rgba(0,0,0,0.62)_78%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.72))]" />
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/12 bg-black/58 p-5 backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-100/80">Now reviewing</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{slide.brand}</h2>
            <p className="mt-1 text-sm text-slate-300">{slide.model}</p>
          </div>
          <div className="absolute right-6 top-6 flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.brand}
                type="button"
                aria-label={`Show ${item.brand}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${index === active ? 'w-8 bg-amber-100' : 'w-3 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
