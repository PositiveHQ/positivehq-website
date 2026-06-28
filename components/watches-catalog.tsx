'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Watch, WatchCondition } from '@/types/watch';
import { WatchCard } from './watch-card';

type Props = { watches: Watch[]; isSampleInventory?: boolean; initialBrand?: string };
type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular' | 'recent';
type BoxPapersFilter = 'All' | 'Full Set' | 'Box Only' | 'Papers Only' | 'Watch Only';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function WatchesCatalog({ watches, isSampleInventory = false, initialBrand }: Props) {
  const highestPrice = Math.max(...watches.map((watch) => watch.price), 20000);
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState(initialBrand ?? 'All');
  const [condition, setCondition] = useState<'All' | WatchCondition>('All');
  const [availability, setAvailability] = useState<'All' | Watch['status']>('All');
  const [boxPapers, setBoxPapers] = useState<BoxPapersFilter>('All');
  const [caseSize, setCaseSize] = useState('All');
  const [material, setMaterial] = useState('All');
  const [movement, setMovement] = useState('All');
  const [year, setYear] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Math.ceil(highestPrice / 1000) * 1000);
  const [sort, setSort] = useState<SortOption>('newest');

  const brands = ['All', ...Array.from(new Set([...watches.map((watch) => watch.brand), ...(initialBrand ? [initialBrand] : [])])).sort()];
  const caseSizes = ['All', ...Array.from(new Set(watches.map((watch) => watch.caseSize))).sort()];
  const materials = ['All', ...Array.from(new Set(watches.map((watch) => watch.material))).sort()];
  const movements = ['All', ...Array.from(new Set(watches.map((watch) => watch.movement))).sort()];
  const years = ['All', ...Array.from(new Set(watches.map((watch) => String(watch.year)))).sort((a, b) => Number(b) - Number(a))];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = watches.filter((watch) => {
      if (normalizedQuery) {
        const haystack = `${watch.brand} ${watch.model} ${watch.reference} ${watch.material} ${watch.movement} ${watch.caseSize}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      if (brand !== 'All' && watch.brand !== brand) return false;
      if (condition !== 'All' && watch.condition !== condition) return false;
      if (availability !== 'All' && watch.status !== availability) return false;
      if (caseSize !== 'All' && watch.caseSize !== caseSize) return false;
      if (material !== 'All' && watch.material !== material) return false;
      if (movement !== 'All' && watch.movement !== movement) return false;
      if (year !== 'All' && String(watch.year) !== year) return false;
      if (watch.price < minPrice || watch.price > maxPrice) return false;
      if (boxPapers === 'Full Set' && (!watch.box || !watch.papers)) return false;
      if (boxPapers === 'Box Only' && (!watch.box || watch.papers)) return false;
      if (boxPapers === 'Papers Only' && (watch.box || !watch.papers)) return false;
      if (boxPapers === 'Watch Only' && (watch.box || watch.papers)) return false;
      return true;
    });

    if (sort === 'price-low') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...result].sort((a, b) => b.price - a.price);
    if (sort === 'popular') return [...result].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.price - a.price);
    return [...result].sort((a, b) => b.year - a.year);
  }, [availability, boxPapers, brand, caseSize, condition, material, maxPrice, minPrice, movement, query, sort, watches, year]);

  return (
    <div className="space-y-10">
      {isSampleInventory && (
        <section className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-5 text-sm leading-6 text-amber-50">
          <p className="font-semibold uppercase tracking-[0.16em]">Example Inventory Layout — Demo Only</p>
          <p className="mt-2 text-amber-50/85">
            These watches are example layout content only. They are not presented as real inventory, real availability, or real prices. If a selected brand has no examples yet, use the contact form to request a specific reference.
          </p>
        </section>
      )}

      <section className="surface-card space-y-6 p-5 lg:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Instant search</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Find the right watch faster.</h2>
          </div>
          <p className="text-sm text-slate-400">Showing {filtered.length} of {watches.length} {isSampleInventory ? 'example ' : 'available '}watches</p>
        </div>

        <label className="block space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
          Search brand, model, reference, material, or movement
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Rolex 124060, Cartier Santos, steel, automatic..."
            className="field-input w-full normal-case tracking-normal"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Brand
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {brands.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Price range
            <span className="field-input flex w-full items-center justify-between normal-case tracking-normal text-slate-200">
              <span>{currency.format(minPrice)}</span>
              <span className="text-slate-500">—</span>
              <span>{currency.format(maxPrice)}</span>
            </span>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Condition
            <select value={condition} onChange={(e) => setCondition(e.target.value as 'All' | WatchCondition)} className="field-input w-full normal-case tracking-normal">
              {['All', 'Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Year
            <select value={year} onChange={(e) => setYear(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {years.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Case size
            <select value={caseSize} onChange={(e) => setCaseSize(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {caseSizes.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Material
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {materials.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Movement
            <select value={movement} onChange={(e) => setMovement(e.target.value)} className="field-input w-full normal-case tracking-normal">
              {movements.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Box & Papers
            <select value={boxPapers} onChange={(e) => setBoxPapers(e.target.value as BoxPapersFilter)} className="field-input w-full normal-case tracking-normal">
              {['All', 'Full Set', 'Box Only', 'Papers Only', 'Watch Only'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {isSampleInventory ? (
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
              Availability
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
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="field-input w-full normal-case tracking-normal">
              <option value="newest">Newest</option>
              <option value="price-low">Price Low–High</option>
              <option value="price-high">Price High–Low</option>
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Min price {currency.format(minPrice)}
            <input type="range" min={0} max={highestPrice} step={250} value={minPrice} onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))} className="w-full accent-amber-200" />
          </label>
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Max price {currency.format(maxPrice)}
            <input type="range" min={0} max={highestPrice} step={250} value={maxPrice} onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))} className="w-full accent-amber-200" />
          </label>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="surface-card border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold text-white">No examples match this search yet.</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Request the specific reference you want and we’ll review sourcing options.</p>
          <Link
            href={`/contact?intent=buy${brand !== 'All' ? `&brand=${encodeURIComponent(brand)}` : ''}#contact-form`}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-amber-100/25 bg-amber-100/90 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-50"
          >
            Request This Brand
          </Link>
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
