'use client';

import { useMemo, useState } from 'react';
import { Watch, WatchCondition } from '@/data/watches';
import { WatchCard } from './watch-card';

type Props = { watches: Watch[] };

type SortOption = 'newest' | 'price-low' | 'price-high';

export function WatchesCatalog({ watches }: Props) {
  const [brand, setBrand] = useState('All');
  const [condition, setCondition] = useState<'All' | WatchCondition>('All');
  const [availability, setAvailability] = useState<'All' | Watch['availability']>('In Stock');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState<SortOption>('newest');

  const brands = ['All', ...new Set(watches.map((watch) => watch.brand))];

  const filtered = useMemo(() => {
    const result = watches.filter((watch) => {
      if (brand !== 'All' && watch.brand !== brand) return false;
      if (condition !== 'All' && watch.condition !== condition) return false;
      if (availability !== 'All' && watch.availability !== availability) return false;
      if (watch.price > maxPrice) return false;
      return true;
    });

    if (sort === 'price-low') return result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return result.sort((a, b) => b.price - a.price);
    return result.sort((a, b) => b.year - a.year);
  }, [availability, brand, condition, maxPrice, sort, watches]);

  return (
    <div className="space-y-10">
      <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-5">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          {brands.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select value={condition} onChange={(e) => setCondition(e.target.value as 'All' | WatchCondition)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          {['All', 'Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select value={availability} onChange={(e) => setAvailability(e.target.value as 'All' | Watch['availability'])} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          {['In Stock', 'Reserved', 'Sold', 'All'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <label className="flex items-center gap-3 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600">
          Max {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(maxPrice)}
          <input type="range" min={2000} max={20000} step={250} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-slate-700" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No watches match your filters.</h3>
          <p className="mt-2 text-sm text-slate-600">Adjust filters or check back soon as inventory updates weekly.</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </section>
      )}
    </div>
  );
}
