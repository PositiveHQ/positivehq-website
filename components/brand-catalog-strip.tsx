import Link from 'next/link';
import { catalogBrands } from '@/lib/brands';

export function BrandCatalogStrip() {
  return (
    <section aria-labelledby="shop-by-brand" className="bg-[#050608] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2 id="shop-by-brand" className="mt-2 text-2xl font-semibold uppercase tracking-[0.18em] text-white sm:text-3xl">
              Shop by Brand
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400 sm:text-right">
            Browse examples or request a specific reference.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div className="flex min-w-max gap-5 lg:grid lg:min-w-0 lg:grid-cols-6 xl:grid-cols-12">
            {catalogBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/catalog?brand=${brand.slug}`}
                className="group flex w-28 shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/0 p-2 text-center transition duration-300 hover:-translate-y-1 hover:border-amber-100/20 hover:bg-white/[0.035] hover:shadow-[0_18px_45px_rgba(201,166,91,0.12)] focus:outline-none focus:ring-2 focus:ring-amber-100/35 lg:w-auto"
              >
                <span className="relative grid h-24 w-24 place-items-center rounded-full border border-white/18 bg-[radial-gradient(circle_at_34%_26%,#ffffff_0%,#d7dde6_19%,#8f9aa8_42%,#303846_68%,#111722_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-12px_28px_rgba(0,0,0,0.46),0_18px_40px_rgba(0,0,0,0.36)] transition duration-300 group-hover:scale-105 group-hover:border-amber-100/45 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-12px_28px_rgba(0,0,0,0.42),0_0_36px_rgba(217,183,107,0.22)]">
                  <span className="absolute inset-2 rounded-full border border-black/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.28))]" />
                  <span className="relative text-xl font-semibold uppercase tracking-[-0.04em] text-[#071018] drop-shadow-[0_1px_0_rgba(255,255,255,0.52)]">
                    {brand.mark}
                  </span>
                </span>
                <span className="flex min-h-10 items-start justify-center text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-white transition group-hover:text-amber-100">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
