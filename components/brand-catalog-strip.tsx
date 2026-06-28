import Link from 'next/link';
import { catalogBrands } from '@/lib/brands';

export function BrandCatalogStrip() {
  return (
    <section id="brands" aria-labelledby="shop-by-brand" className="bg-[#050608] py-14 md:py-18 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Luxury brands</p>
            <h2 id="shop-by-brand" className="mt-2 text-2xl font-semibold uppercase tracking-[0.18em] text-white sm:text-3xl">
              Request by Brand
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400 sm:text-right">
            Choose a brand to start a private sourcing, trade, selling, or consignment conversation.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div className="flex min-w-max gap-7 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6">
            {catalogBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/catalog?brand=${brand.slug}`}
                className="group flex w-48 shrink-0 flex-col items-center rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-amber-100/25 hover:bg-white/[0.045] hover:shadow-[0_24px_70px_rgba(201,166,91,0.13)] focus:outline-none focus:ring-2 focus:ring-amber-100/35 lg:w-auto"
              >
                <span className="relative grid h-32 w-32 place-items-center rounded-full border border-white/20 bg-[radial-gradient(circle_at_34%_24%,#ffffff_0%,#e8edf3_17%,#b9c2ce_36%,#737f90_58%,#29313d_82%,#101620_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_34px_rgba(0,0,0,0.48),0_22px_52px_rgba(0,0,0,0.42)] transition duration-300 group-hover:scale-105 group-hover:border-amber-100/45 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-16px_34px_rgba(0,0,0,0.44),0_0_42px_rgba(217,183,107,0.24)]">
                  <span className="absolute inset-3 rounded-full border border-black/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.30),rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.32))]" />
                  <span className={`relative flex max-w-[7.2rem] flex-col items-center justify-center text-center font-semibold uppercase text-[#071018] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)] ${brand.wordmarkClass}`} aria-label={`${brand.name} wordmark`}>
                    {brand.wordmark.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </span>
                <span className="mt-5 flex min-h-10 items-start justify-center text-[12px] font-bold uppercase leading-5 tracking-[0.14em] text-white transition group-hover:text-amber-100">
                  {brand.name}
                </span>
                <span className="mt-2 min-h-12 text-xs leading-5 text-slate-400">
                  {brand.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
