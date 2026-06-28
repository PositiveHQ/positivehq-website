import { Metadata } from 'next';
import { Container } from '@/components/container';
import { WatchesCatalog } from '@/components/watches-catalog';
import { catalogBrands, getBrandBySlug } from '@/lib/brands';
import { getWatchesInventory } from '@/lib/repositories/watches';

export const metadata: Metadata = {
  title: 'Catalog | Positive Watch HQ',
  description: 'Browse Positive Watch HQ brand categories and demo-only inventory examples. Real availability, pricing, and sale listings are confirmed only after review.',
  alternates: { canonical: '/catalog' }
};

type CatalogPageProps = {
  searchParams?: { brand?: string | string[] };
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { watches, isSampleInventory } = await getWatchesInventory();
  const selectedBrand = getBrandBySlug(searchParams?.brand);

  return (
    <Container className="space-y-12 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-amber-100/[0.07] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Catalog</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
            Browse brands. Request the right reference.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {selectedBrand
              ? `Browse ${selectedBrand.name} examples or request a specific reference. Positive Watch HQ is currently in demo-inventory mode.`
              : 'Positive Watch HQ is currently in demo-inventory mode. Catalog examples show how real listings will be presented once live inventory is connected.'}
          </p>
          <div className="rounded-2xl border border-amber-100/20 bg-amber-100/10 p-4 text-sm leading-6 text-amber-50">
            Example Inventory Layout — Demo Only. Not real inventory, real availability, or confirmed sale listing. Demo only.
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div>
          <p className="eyebrow">Brand navigation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Brands & Categories</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Use a brand category to start a sourcing request. Demo inventory remains clearly labeled and is not presented as live stock.</p>
        </div>
        <div className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] sm:grid-cols-3 lg:grid-cols-4">
          {catalogBrands.map((brand) => (
            <a
              key={brand.slug}
              href={`/catalog?brand=${brand.slug}`}
              className={`group border-b border-r border-white/10 p-5 transition hover:bg-white/[0.07] sm:p-7 ${selectedBrand?.slug === brand.slug ? 'bg-amber-100/10' : ''}`}
            >
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-white transition group-hover:text-amber-100">{brand.name}</span>
              <span className="mt-3 block text-xs leading-5 text-slate-400">Browse / request →</span>
            </a>
          ))}
        </div>
      </section>

      <WatchesCatalog watches={watches} isSampleInventory={isSampleInventory} initialBrand={selectedBrand?.name} />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="surface-card p-6 lg:p-8">
          <p className="eyebrow">Demo mode</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Example inventory stays clearly labeled.</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
            <li>• Keep “Example Inventory Layout — Demo Only.”</li>
            <li>• Keep “Not real inventory, real availability, or confirmed sale listing.”</li>
            <li>• Keep demo-only availability and example pricing clearly labeled.</li>
          </ul>
        </article>
        <article className="surface-card p-6 lg:p-8">
          <p className="eyebrow">Live inventory mode</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Real listings remove every demo marker.</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
            <li>• Add real photos, condition notes, included accessories, and availability.</li>
            <li>• Add a real inquiry path for that watch.</li>
            <li>• Product structured data only appears for live inventory.</li>
          </ul>
        </article>
      </section>
    </Container>
  );
}
