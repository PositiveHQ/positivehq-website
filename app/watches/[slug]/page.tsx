import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { WatchCard } from '@/components/watch-card';
import { WatchInquiryForm } from '@/components/watch-inquiry-form';
import { getAllWatches, getWatchBySlug, getWatchDetail } from '@/lib/repositories/watches';
import { getSiteUrl } from '@/lib/site';
import { formatBoxAndPapers, formatPrice, formatWatchStatus } from '@/lib/utils';
import { submitWatchInquiryAction } from './actions';

type DetailNotes = {
  condition: string[][];
  included: string[][];
  media: string[][];
};

const mediaRequirements = [
  'Main dial photo',
  'Case side photo',
  'Caseback photo if appropriate',
  'Bracelet photo',
  'Clasp photo',
  'Bezel close-up',
  'Crystal close-up',
  'Box/papers/accessories photo',
  'Optional video walkthrough'
];

const detailNotesBySlug: Record<string, DetailNotes> = {
  'rolex-submariner-124060': {
    condition: [
      ['Case condition', 'Demo field only. Real case notes will be written from actual inspection photos before publication.'],
      ['Bezel condition', 'Demo field only. Real bezel condition requires close-up photos and review before publication.'],
      ['Crystal condition', 'Demo field only. Real crystal condition requires close-up photos before publication.'],
      ['Bracelet condition', 'Demo field only. Real bracelet wear, stretch, and finish notes will be documented from actual photos.'],
      ['Clasp condition', 'Clasp detail required for real listing; example layout does not confirm clasp wear.'],
      ['Polishing notes', 'Example listing copy assumes strong lines; actual polishing history must be documented before sale.'],
      ['Bracelet link count', 'Full bracelet fit and link count must be photographed and listed before real publication.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example full-set layout. Real box photo required.'],
      ['Papers/warranty card included?', 'Example full-set layout. Real warranty card photo required.'],
      ['Warranty card date if applicable', 'Must be recorded from actual card before real listing.'],
      ['Booklets/tags/extra links', 'Accessory flat-lay required before real listing.'],
      ['Service records if available', 'None represented in demo layout.']
    ],
    media: []
  },
  'omega-speedmaster-moonwatch-31030425001001': {
    condition: [
      ['Case condition', 'Demo field only. Real case wear notes will be written from actual inspection photos before publication.'],
      ['Bezel condition', 'Tachymeter bezel macro required before real sale copy is published.'],
      ['Crystal condition', 'Hesalite crystal condition must be photographed for scratches, haze, or polishing marks.'],
      ['Bracelet condition', 'Bracelet stretch and clasp wear must be documented from real photos.'],
      ['Clasp condition', 'Clasp photo required before real listing.'],
      ['Polishing notes', 'Polishing history not represented by demo data.'],
      ['Bracelet link count', 'Extra links and wrist fit must be confirmed before real listing.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example full-set layout. Real box photo required.'],
      ['Papers/warranty card included?', 'Example full-set layout. Real warranty card photo required.'],
      ['Warranty card date if applicable', 'Must be recorded from actual card before real listing.'],
      ['Booklets/tags/extra links', 'Accessory flat-lay required before real listing.'],
      ['Service records if available', 'Movement report/service records must be uploaded if referenced.']
    ],
    media: []
  },
  'tudor-black-bay-58-79030n': {
    condition: [
      ['Case condition', 'Demo field only. Real case condition will be documented from actual photos before publication.'],
      ['Bezel condition', 'Bezel pip, insert, and edge condition require macro photos before real listing.'],
      ['Crystal condition', 'Crystal close-up required before real listing.'],
      ['Bracelet condition', 'Bracelet and end-link condition must be documented.'],
      ['Clasp condition', 'Clasp desk marks must be photographed before publication.'],
      ['Polishing notes', 'Polishing history not represented by demo data.'],
      ['Bracelet link count', 'Link count must be confirmed before real listing.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example full-set layout. Real box photo required.'],
      ['Papers/warranty card included?', 'Example full-set layout. Real warranty card photo required.'],
      ['Warranty card date if applicable', 'Must be recorded from actual card before real listing.'],
      ['Booklets/tags/extra links', 'Accessory flat-lay required before real listing.'],
      ['Service records if available', 'None represented in demo layout.']
    ],
    media: []
  },

  'cartier-santos-medium-wssa0029': {
    condition: [
      ['Case condition', 'Demo field only. Real case condition will be documented from actual Cartier photos before publication.'],
      ['Bezel condition', 'Polished bezel screw and edge close-ups required before a real listing.'],
      ['Crystal condition', 'Crystal macro required before real publication.'],
      ['Bracelet condition', 'SmartLink bracelet and strap condition must be photographed before real listing.'],
      ['Clasp condition', 'Deployant/clasp operation and hairlines must be documented.'],
      ['Polishing notes', 'Unworn status must be supported by real photos and accessory review before publication.'],
      ['Bracelet link count', 'Full link count and strap/bracelet package must be shown.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example full-set layout. Real box photo required.'],
      ['Papers/warranty card included?', 'Example full-set layout. Real warranty card photo required.'],
      ['Warranty card date if applicable', 'Must be recorded from actual card before real listing.'],
      ['Booklets/tags/extra links', 'Cartier accessories and extra links/strap items must be photographed.'],
      ['Service records if available', 'None represented in demo layout.']
    ],
    media: []
  },
  'grand-seiko-snowflake-sbga211': {
    condition: [
      ['Case condition', 'Demo field only. Real titanium case wear will be documented from actual photos before publication.'],
      ['Bezel condition', 'Bezel edge and brushed/polished transitions require close photos.'],
      ['Crystal condition', 'Crystal and anti-reflective coating condition must be photographed.'],
      ['Bracelet condition', 'Titanium bracelet marks and sizing require documentation.'],
      ['Clasp condition', 'Clasp desk wear should be shown clearly before real publication.'],
      ['Polishing notes', 'Any refinishing on titanium case/bracelet must be disclosed if known.'],
      ['Bracelet link count', 'Link count and wrist fit must be confirmed before sale.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example box included. Real box/accessory photo required.'],
      ['Papers/warranty card included?', 'Example data says papers not included; real warranty status must be confirmed.'],
      ['Warranty card date if applicable', 'Not represented in demo layout.'],
      ['Booklets/tags/extra links', 'Booklets, tags, and links must be listed if included.'],
      ['Service records if available', 'Spring Drive service or timing records should be uploaded if available.']
    ],
    media: []
  },
  'rolex-datejust-126334-blue-dial': {
    condition: [
      ['Case condition', 'Demo field only. Real Datejust case, sticker, and handling notes must be documented before publication.'],
      ['Bezel condition', 'Fluted bezel facets require close-up photos before real listing.'],
      ['Crystal condition', 'Crystal and cyclops clarity must be photographed.'],
      ['Bracelet condition', 'Jubilee bracelet condition and stretch must be documented.'],
      ['Clasp condition', 'Clasp and Easylink area should be shown before publication.'],
      ['Polishing notes', 'Unworn status must be supported by real photos and review.'],
      ['Bracelet link count', 'Full link count and fit must be confirmed before sale.'],
      ['Known flaws or limitations', 'Demo-only watch page. Not real inventory or confirmed condition.']
    ],
    included: [
      ['Box included?', 'Example full-set layout. Real box photo required.'],
      ['Papers/warranty card included?', 'Example full-set layout. Real warranty card photo required.'],
      ['Warranty card date if applicable', 'Must be recorded from actual card before real listing.'],
      ['Booklets/tags/extra links', 'Rolex tags, booklet, holder, and links must be photographed.'],
      ['Service records if available', 'None represented in demo layout.']
    ],
    media: []
  },
};

const transactionNotes = [
  ['Availability confirmation', 'Availability is confirmed before payment or trade terms are finalized.'],
  ['Authentication review', 'Every transaction is subject to final authentication review.'],
  ['Payment options', 'Payment route is confirmed directly before settlement.'],
  ['Insured shipping', 'Eligible shipments use insured shipping with tracking/signature requirements.'],
  ['Return eligibility', 'Return eligibility depends on watch, deal structure, payment route, and written terms.'],
  ['Trade-in eligibility', 'Trade-ins are reviewed by brand, model, condition, completeness, and market demand.']
];

const faqs = [
  ['Is this watch available?', 'Availability is confirmed before final transaction, payment, or trade terms.'],
  ['Can I request more photos or video?', 'Yes. Use the inquiry form or CTA to request dial, case, bracelet, clasp, accessories, and video details.'],
  ['Can I trade toward this watch?', 'Yes, if your trade is a fit after review. Final trade value depends on authentication, condition, demand, and deal structure.'],
  ['Is the price final?', 'Prices and offers are not final until availability, condition, authentication, and payment terms are complete.']
];

function fallbackDetails(watch: { box: boolean; papers: boolean }): DetailNotes {
  return {
    condition: [
      ['Case condition', 'Specific case notes will be published from inspection photos before the watch is marked ready for sale.'],
      ['Bezel condition', 'Specific bezel notes will be published from close-up inspection photos.'],
      ['Crystal condition', 'Specific crystal notes will be published from close-up inspection photos.'],
      ['Bracelet condition', 'Bracelet condition will be listed with stretch, scratches, and finish notes where applicable.'],
      ['Clasp condition', 'Clasp wear and operation will be documented with photos.'],
      ['Polishing notes', 'Polishing history and visible line condition will be documented where known.'],
      ['Bracelet link count', 'Link count and approximate fit will be documented before final sale.'],
      ['Known flaws or limitations', 'Any known flaws will be disclosed before final transaction.']
    ],
    included: [
      ['Box included?', watch.box ? 'Yes — box included.' : 'No box represented.'],
      ['Papers/warranty card included?', watch.papers ? 'Yes — papers/warranty card included.' : 'No papers/warranty card represented.'],
      ['Warranty card date if applicable', 'Warranty date will be recorded when available.'],
      ['Booklets/tags/extra links', 'Booklets, tags, and extra links will be listed if included.'],
      ['Service records if available', 'Service records will be listed if available.']
    ],
    media: []
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const watch = await getWatchBySlug(params.slug);
  if (!watch) return { title: 'Watch Not Found' };
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
  const { watch, isSampleInventory } = await getWatchDetail(params.slug);
  if (!watch) notFound();
  if (watch.images.length === 0) notFound();

  const related = (await getAllWatches()).filter((item) => item.slug !== watch.slug && item.brand === watch.brand).slice(0, 3);
  const details = detailNotesBySlug[watch.slug] ?? fallbackDetails(watch);
  const inquiryAction = submitWatchInquiryAction.bind(null, { id: watch.id, slug: watch.slug, reference: watch.reference });
  const siteUrl = getSiteUrl();
  const productLd = !isSampleInventory ? {
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
  } : null;

  return (
    <Container className="space-y-14 py-16">
      {productLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />}
      {isSampleInventory && (
        <section className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-5 text-sm leading-6 text-amber-50">
          <p className="font-semibold uppercase tracking-[0.16em]">Example Inventory Layout — Demo Only</p>
          <p className="mt-2 text-amber-50/90">This page demonstrates the watch detail layout. It is not real inventory, real availability, or a confirmed sale listing.</p>
        </section>
      )}

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
          <p className="text-4xl font-semibold text-amber-100">{isSampleInventory ? 'Example ' : ''}{formatPrice(watch.price)}</p>
          <dl className="surface-card grid grid-cols-2 gap-4 p-5 text-sm">
            <div><dt className="text-slate-400">Condition</dt><dd className="font-medium text-white">{watch.condition}</dd></div>
            <div><dt className="text-slate-400">Year</dt><dd className="font-medium text-white">{watch.year}</dd></div>
            <div><dt className="text-slate-400">Box & Papers</dt><dd className="font-medium text-white">{formatBoxAndPapers(watch.box, watch.papers)}</dd></div>
            <div><dt className="text-slate-400">Availability</dt><dd className="font-medium text-white">{isSampleInventory ? 'Demo only' : formatWatchStatus(watch.status)}</dd></div>
            <div><dt className="text-slate-400">Movement</dt><dd className="font-medium text-white">{watch.movement}</dd></div>
            <div><dt className="text-slate-400">Case Size</dt><dd className="font-medium text-white">{watch.caseSize}</dd></div>
            <div><dt className="text-slate-400">Material</dt><dd className="font-medium text-white">{watch.material}</dd></div>
          </dl>
          <p className="text-sm leading-7 text-slate-300">{watch.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="#watch-inquiry">Ask About This Watch</Button>
            <Button href="#watch-inquiry" variant="secondary">Request More Photos / Video</Button>
            <Button href={`/trade-in?target=${encodeURIComponent(`${watch.brand} ${watch.model}`)}`} variant="secondary">Trade Toward This Watch</Button>
            <Button href="#watch-inquiry" variant="secondary">Make an Offer</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="surface-card p-6">
          <p className="eyebrow">Condition Notes</p>
          <div className="mt-5 space-y-3">{details.condition.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-sm font-semibold text-white">{label}</p><p className="mt-1 text-sm leading-6 text-slate-300">{value}</p></div>)}</div>
        </article>
        <article className="surface-card p-6">
          <p className="eyebrow">What’s Included</p>
          <div className="mt-5 space-y-3">{details.included.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-sm font-semibold text-white">{label}</p><p className="mt-1 text-sm leading-6 text-slate-300">{value}</p></div>)}</div>
        </article>
        <article className="surface-card p-6">
          <p className="eyebrow">Payment / Shipping / Return Notes</p>
          <div className="mt-5 space-y-3">{transactionNotes.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-sm font-semibold text-white">{label}</p><p className="mt-1 text-sm leading-6 text-slate-300">{value}</p></div>)}</div>
        </article>
      </section>

      <section className="surface-card p-6">
        <p className="eyebrow">Media Requirements</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Every real listing should include complete watch media.</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mediaRequirements.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-slate-300">{item}</p>)}
        </div>
      </section>

      <section id="watch-inquiry" className="scroll-mt-28"><WatchInquiryForm action={inquiryAction} /></section>

      <section className="space-y-5"><p className="eyebrow">FAQ</p><div className="grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="surface-card p-5"><h3 className="font-semibold text-white">{question}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{answer}</p></article>)}</div></section>

      {related.length > 0 && <section className="space-y-6"><h2 className="text-2xl font-semibold text-white">Related watches</h2><div className="grid gap-6 md:grid-cols-3">{related.map((item) => <WatchCard key={item.id} watch={item} isSampleInventory={isSampleInventory} />)}</div></section>}
    </Container>
  );
}
