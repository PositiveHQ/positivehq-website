import { Metadata } from 'next';
import { Container } from '@/components/container';
import { WatchesCatalog } from '@/components/watches-catalog';
import { getWatchesInventory } from '@/lib/repositories/watches';

export const metadata: Metadata = {
  title: 'Luxury Watches for Sale & Trade',
  description: 'Browse Positive Watch HQ watch listings and trade targets with brand, reference, price, condition, box/papers, availability, and inquiry options.',
  alternates: { canonical: '/watches' }
};

export default async function WatchesPage() {
  const { watches, isSampleInventory } = await getWatchesInventory();

  return (
    <Container className="space-y-12 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Watches</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
            Watches we sell. Brands we welcome on trade.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            A clean marketplace for current pieces and future trade-in targets. Filter by brand, price, condition, box/papers, availability, and case size.
          </p>
        </div>
      </header>

      <WatchesCatalog watches={watches} isSampleInventory={isSampleInventory} />

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
