import { Metadata } from 'next';
import { Container } from '@/components/container';
import { WatchesCatalog } from '@/components/watches-catalog';
import { getWatchesInventory } from '@/lib/repositories/watches';

const browseBrands = [
  'Rolex',
  'Cartier',
  'Audemars Piguet',
  'Patek Philippe',
  'Omega',
  'Tudor',
  'Breitling',
  'Vacheron Constantin',
  'IWC',
  'Panerai',
  'Jaeger-LeCoultre',
  'Richard Mille'
];

export const metadata: Metadata = {
  title: 'Watch Sourcing & Future Inventory | Positive Watch HQ',
  description: 'Use Positive Watch HQ to source, sell, trade, or consign luxury watches. Demo examples show the future inventory layout until real listings are added.',
  alternates: { canonical: '/watches' }
};

export default async function WatchesPage() {
  const { watches, isSampleInventory } = await getWatchesInventory();

  return (
    <Container className="space-y-12 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Sourcing & future inventory</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
            Source your next watch. Preview how real listings will work.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Current watches shown here are demo layout examples until live inventory is connected. Use this page to understand the future listing experience, then request a sourcing, trade, sell, or consignment review.
          </p>
        </div>
      </header>

      <section className="space-y-6">
        <div>
          <p className="eyebrow">Brand navigation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Browse by Brand</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Demo inventory remains clearly labeled. Use brand browsing to start a sourcing request for a real reference.</p>
        </div>
        <div className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] sm:grid-cols-3 lg:grid-cols-4">
          {browseBrands.map((brand) => (
            <a
              key={brand}
              href={`/contact?intent=buy&brand=${encodeURIComponent(brand)}#contact-form`}
              className="group border-b border-r border-white/10 p-5 transition hover:bg-white/[0.07] sm:p-7"
            >
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-white transition group-hover:text-amber-100">{brand}</span>
              <span className="mt-3 block text-xs leading-5 text-slate-400">Request reference →</span>
            </a>
          ))}
        </div>
      </section>

      <WatchesCatalog watches={watches} isSampleInventory={isSampleInventory} />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="surface-card p-6 lg:p-8">
          <p className="eyebrow">Demo mode</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Example inventory stays clearly labeled.</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
            <li>• Keep “Example Inventory Layout — Demo Only.”</li>
            <li>• Keep demo-only availability.</li>
            <li>• Keep example pricing clearly labeled.</li>
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

      <section className="space-y-5">
        <p className="eyebrow">FAQ</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Are all watches shown available?', 'Availability is confirmed before payment, trade terms, or shipment. Demo/sample inventory is clearly labeled when live inventory is not connected.'],
            ['Can I trade toward a listed watch?', 'Yes. Submit your current watch details and we will review trade value, deal structure, and any cash difference.'],
            ['Can I request more photos?', 'Yes. Ask for additional photos or video of dial, case, bracelet, clasp, accessories, and condition details.'],
            ['Are prices final?', 'Prices are not final until availability, authentication review, condition verification, and cleared payment terms are complete.']
          ].map(([question, answer]) => (
            <article key={question} className="surface-card p-5">
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
