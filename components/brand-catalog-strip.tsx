import Link from 'next/link';
import { catalogBrands } from '@/lib/brands';

export function BrandCatalogStrip() {
  return (
    <section aria-labelledby="shop-by-brand" className="bg-[#050608] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
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

        <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div className="flex min-w-max gap-10 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-x-14 lg:gap-y-16 xl:grid-cols-6">
            {catalogBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/catalog?brand=${brand.slug}`}
                className="group flex w-40 shrink-0 flex-col items-center gap-5 rounded-3xl border border-white/0 p-3 text-center transition duration-300 hover:-translate-y-1 hover:border-amber-100/20 hover:bg-white/[0.035] hover:shadow-[0_18px_45px_rgba(201,166,91,0.12)] focus:outline-none focus:ring-2 focus:ring-amber-100/35 lg:w-auto"
              >
                <span className="relative grid h-36 w-36 place-items-center rounded-full border border-white/20 bg-[radial-gradient(circle_at_34%_24%,#ffffff_0%,#e6ebf1_17%,#bac3cf_36%,#727d8c_58%,#252d39_82%,#101620_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_34px_rgba(0,0,0,0.48),0_22px_52px_rgba(0,0,0,0.42)] transition duration-300 group-hover:scale-105 group-hover:border-amber-100/45 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-16px_34px_rgba(0,0,0,0.44),0_0_42px_rgba(217,183,107,0.24)]">
                  <span className="absolute inset-3 rounded-full border border-black/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.30))]" />
                  <span className={`relative flex max-w-[7.6rem] flex-col items-center justify-center text-center font-semibold uppercase text-[#071018] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)] ${brand.wordmarkClass}`}>
                    {brand.wordmark.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </span>
                <span className="flex min-h-10 items-start justify-center text-[12px] font-bold uppercase leading-5 tracking-[0.14em] text-white transition group-hover:text-amber-100">
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
