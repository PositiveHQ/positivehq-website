'use client';

import { useMemo, useState } from 'react';
import { Watch, WatchCondition } from '@/types/watch';
import { WatchCard } from './watch-card';

type Props = { watches: Watch[]; isSampleInventory?: boolean };
type SortOption = 'newest' | 'price-low' | 'price-high';
type BoxPapersFilter = 'All' | 'Full Set' | 'Box Only' | 'Papers Only' | 'Watch Only';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function WatchesCatalog({ watches, isSampleInventory = false }: Props) {
  const highestPrice = Math.max(...watches.map((watch) => watch.price), 20000);
  const [brand, setBrand] = useState('All');
  const [condition, setCondition] = useState<'All' | WatchCondition>('All');
  const [availability, setAvailability] = useState<'All' | Watch['status']>('All');
  const [boxPapers, setBoxPapers] = useState<BoxPapersFilter>('All');
  const [caseSize, setCaseSize] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Math.ceil(highestPrice / 1000) * 1000);
  const [sort, setSort] = useState<SortOption>('newest');

  const brands = ['All', ...Array.from(new Set(watches.map((watch) => watch.brand))).sort()];
  const caseSizes = ['All', ...Array.from(new Set(watches.map((watch) => watch.caseSize))).sort()];

  const filtered = useMemo(() => {
    const result = watches.filter((watch) => {
      if (brand !== 'All' && watch.brand !== brand) return false;
      if (condition !== 'All' && watch.condition !== condition) return false;
      if (availability !== 'All' && watch.status !== availability) return false;
      if (caseSize !== 'All' && watch.caseSize !== caseSize) return false;
      if (watch.price < minPrice || watch.price > maxPrice) return false;
      if (boxPapers === 'Full Set' && (!watch.box || !watch.papers)) return false;
      if (boxPapers === 'Box Only' && (!watch.box || watch.papers)) return false;
      if (boxPapers === 'Papers Only' && (watch.box || !watch.papers)) return false;
      if (boxPapers === 'Watch Only' && (watch.box || watch.papers)) return false;
      return true;
    });

    if (sort === 'price-low') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...result].sort((a, b) => b.price - a.price);
    return [...result].sort((a, b) => b.year - a.year);
  }, [availability, boxPapers, brand, caseSize, condition, maxPrice, minPrice, sort, watches]);

  return (
    <div className="space-y-10">
      {isSampleInventory && (
        <section className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-5 text-sm leading-6 text-amber-50">
          <p className="font-semibold uppercase tracking-[0.16em]">Example Inventory Layout — Demo Only</p>
          <p className="mt-2 text-amber-50/85">
            These watches are example layout content only. They are not presented as real inventory, real availability, or real prices. Live watches will be published only after details, photos, condition, and availability are confirmed.
          </p>
        </section>
      )}

      <section className="surface-card space-y-5 p-5 lg:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Filters</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Find the right watch faster.</h2>
          </div>
          <p className="text-sm text-slate-400">Showing {filtered.length} of {watches.length} watches</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Brand
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {brands.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Condition
            <select value={condition} onChange={(e) => setCondition(e.target.value as 'All' | WatchCondition)} className="field-input w-full normal-case tracking-normal">
              {['All', 'Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Box/Papers
            <select value={boxPapers} onChange={(e) => setBoxPapers(e.target.value as BoxPapersFilter)} className="field-input w-full normal-case tracking-normal">
              {['All', 'Full Set', 'Box Only', 'Papers Only', 'Watch Only'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {isSampleInventory ? (
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
              Demo status
              <input value="Demo only" readOnly className="field-input w-full normal-case tracking-normal opacity-80" />
            </label>
          ) : (
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
              Availability
              <select value={availability} onChange={(e) => setAvailability(e.target.value as 'All' | Watch['status'])} className="field-input w-full normal-case tracking-normal">
                <option value="All">All</option>
                <option value="in_stock">In Stock</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </label>
          )}
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Case size
            <select value={caseSize} onChange={(e) => setCaseSize(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {caseSizes.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Min price {currency.format(minPrice)}
            <input type="range" min={0} max={highestPrice} step={250} value={minPrice} onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))} className="w-full accent-amber-200" />
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Max price {currency.format(maxPrice)}
            <input type="range" min={0} max={highestPrice} step={250} value={maxPrice} onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))} className="w-full accent-amber-200" />
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="field-input w-full normal-case tracking-normal">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </label>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="surface-card border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold text-white">No watches match your filters.</h3>
          <p className="mt-2 text-sm text-slate-300">Adjust filters or contact us with the watch you want sourced.</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((watch) => (
            <WatchCard key={watch.id} watch={watch} isSampleInventory={isSampleInventory} />
          ))}
        </section>
      )}
    </div>
  );
}
