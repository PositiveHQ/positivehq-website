import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { WatchCard } from '@/components/watch-card';
import { WatchInquiryForm } from '@/components/watch-inquiry-form';
import { getAllWatches, getWatchBySlug } from '@/lib/repositories/watches';
import { getSiteUrl } from '@/lib/site';
import { formatBoxAndPapers, formatPrice, formatWatchStatus } from '@/lib/utils';
import { submitWatchInquiryAction } from './actions';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const watch = await getWatchBySlug(params.slug);
  if (!watch) {
    return { title: 'Watch Not Found' };
  }

  return {
    title: `${watch.brand} ${watch.model}`,
    description: watch.description,
    alternates: { canonical: `/watches/${watch.slug}` },
    openGraph: {
      title: `${watch.brand} ${watch.model}`,
      description: watch.description,
      type: 'website',
      images: [{ url: watch.images[0]?.url || '' }]
    }
  };
}

export default async function WatchDetailPage({ params }: { params: { slug: string } }) {
  const watch = await getWatchBySlug(params.slug);
  if (!watch) notFound();
  if (watch.images.length === 0) notFound();

  const related = (await getAllWatches())
    .filter((item) => item.slug !== watch.slug && item.brand === watch.brand)
    .slice(0, 3);

  const inquiryAction = submitWatchInquiryAction.bind(null, {
    id: watch.id,
    slug: watch.slug,
    reference: watch.reference
  });
  const siteUrl = getSiteUrl();
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${watch.brand} ${watch.model}`,
    sku: watch.sku,
    image: watch.images.map((image) => image.url),
    description: watch.description,
    brand: { '@type': 'Brand', name: watch.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: watch.price,
      availability: `https://schema.org/${watch.status === 'in_stock' ? 'InStock' : watch.status === 'reserved' ? 'PreOrder' : 'OutOfStock'}`,
      url: `${siteUrl}/watches/${watch.slug}`
    }
  };

  return (
    <Container className="space-y-14 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            <Image src={watch.images[0].url} alt={watch.images[0].alt} fill className="object-cover transition duration-700 hover:scale-105" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {watch.images.map((image, index) => (
              <div key={image.id + index} className="relative aspect-square overflow-hidden rounded-xl border border-white/10">
                <Image src={image.url} alt={image.alt} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="eyebrow">{watch.brand}</p>
            <h1 className="mt-1 text-4xl font-semibold text-white">{watch.model}</h1>
            <p className="mt-2 text-sm text-slate-300">Reference {watch.reference}</p>
          </div>
          <p className="text-4xl font-semibold text-amber-100">{formatPrice(watch.price)}</p>
          <dl className="surface-card grid grid-cols-2 gap-4 p-5 text-sm">
            <div><dt className="text-slate-400">Condition</dt><dd className="font-medium text-white">{watch.condition}</dd></div>
            <div><dt className="text-slate-400">Year</dt><dd className="font-medium text-white">{watch.year}</dd></div>
            <div><dt className="text-slate-400">Box & Papers</dt><dd className="font-medium text-white">{formatBoxAndPapers(watch.box, watch.papers)}</dd></div>
            <div><dt className="text-slate-400">Availability</dt><dd className="font-medium text-white">{formatWatchStatus(watch.status)}</dd></div>
            <div><dt className="text-slate-400">Movement</dt><dd className="font-medium text-white">{watch.movement}</dd></div>
            <div><dt className="text-slate-400">Case Size</dt><dd className="font-medium text-white">{watch.caseSize}</dd></div>
            <div><dt className="text-slate-400">Material</dt><dd className="font-medium text-white">{watch.material}</dd></div>
          </dl>
          <p className="text-sm leading-7 text-slate-300">{watch.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#watch-inquiry">Inquire About This Watch</Button>
            <Button href="/trade-in" variant="secondary">Request Trade-In</Button>
          </div>
          <div className="surface-card p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Trust & Delivery</p>
            <ul className="mt-3 space-y-2">
              <li>• Multi-point authentication before listing.</li>
              <li>• Insured overnight shipping with signature required.</li>
              <li>• Straightforward return policy on eligible inventory.</li>
            </ul>
          </div>
          <div id="watch-inquiry">
            <WatchInquiryForm action={inquiryAction} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Related watches</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => <WatchCard key={item.id} watch={item} />)}
          </div>
        </section>
      )}
    </Container>
  );
}
