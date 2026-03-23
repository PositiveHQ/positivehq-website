import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { WatchCard } from '@/components/watch-card';
import { watches } from '@/data/watches';
import { formatPrice } from '@/lib/utils';

export default function WatchDetailPage({ params }: { params: { slug: string } }) {
  const watch = watches.find((item) => item.slug === params.slug);
  if (!watch) notFound();

  const related = watches.filter((item) => item.slug !== watch.slug && item.brand === watch.brand).slice(0, 3);

  return (
    <Container className="space-y-14 py-16">
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200">
            <Image src={watch.gallery[0]} alt={`${watch.brand} ${watch.model}`} fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {watch.gallery.map((image, index) => (
              <div key={image + index} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                <Image src={image} alt={`${watch.brand} view ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{watch.brand}</p>
            <h1 className="mt-1 text-4xl font-semibold text-slate-900">{watch.model}</h1>
            <p className="mt-2 text-sm text-slate-600">Reference {watch.reference}</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{formatPrice(watch.price)}</p>
          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
            <div><dt className="text-slate-500">Condition</dt><dd className="font-medium text-slate-900">{watch.condition}</dd></div>
            <div><dt className="text-slate-500">Year</dt><dd className="font-medium text-slate-900">{watch.year}</dd></div>
            <div><dt className="text-slate-500">Box & Papers</dt><dd className="font-medium text-slate-900">{watch.boxPapers}</dd></div>
            <div><dt className="text-slate-500">Availability</dt><dd className="font-medium text-slate-900">{watch.availability}</dd></div>
            <div><dt className="text-slate-500">Movement</dt><dd className="font-medium text-slate-900">{watch.movement}</dd></div>
            <div><dt className="text-slate-500">Case Size</dt><dd className="font-medium text-slate-900">{watch.caseSize}</dd></div>
          </dl>
          <p className="text-sm leading-6 text-slate-600">{watch.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/sell">Inquire About This Watch</Button>
            <Button href="/trade-in" variant="secondary">Request Trade-In</Button>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Trust & Delivery</p>
            <ul className="mt-3 space-y-2">
              <li>• Multi-point authentication before listing.</li>
              <li>• Insured overnight shipping with signature required.</li>
              <li>• Straightforward return policy on eligible inventory.</li>
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Related watches</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => <WatchCard key={item.id} watch={item} />)}
          </div>
        </section>
      )}
    </Container>
  );
}
