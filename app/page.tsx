import Image from 'next/image';
import { Metadata } from 'next';
import { HomeHeroSlider } from '@/components/home-hero-slider';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { WatchCard } from '@/components/watch-card';
import { getFeaturedWatches, getWatchesInventory } from '@/lib/repositories/watches';
import { getSiteUrl, siteConfig } from '@/lib/site';

const trustPillars = ['Verified First', 'Clear Condition', 'Insured Shipping', 'Secure Payment', 'Concierge Help'];

const tradeSteps = [
  ['01', 'Choose the watch', 'Browse what we sell or tell us the model you want.'],
  ['02', 'Send your trade-in', 'Share reference, photos, box/papers, and condition.'],
  ['03', 'Settle cleanly', 'We verify, confirm value, guide payment, and arrange shipping.']
];

const services = [
  ['Source', 'Tell us the watch you want and the cleanest path you need.', '/contact?intent=buy#contact-form'],
  ['Sell', 'Get a clear cash offer after review.', '/sell'],
  ['Trade in', 'Put your current watch toward the next one.', '/trade-in'],
  ['Consign', 'List with a clear price plan when time allows.', '/consignment']
];

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

const proofBullets = [
  'Authentication review before final transaction',
  'Condition details documented clearly',
  'Box, papers, and accessories reviewed',
  'Insured shipping guidance',
  'Payment and settlement route confirmed before completion'
];

export const metadata: Metadata = {
  title: 'Luxury Watch Concierge: Sell, Trade, Consign, Source',
  description:
    'Positive Watch HQ helps clients sell, trade, consign, or source luxury watches with clear condition review, verification, insured shipping, and concierge communication.',
  alternates: { canonical: '/' }
};

export default async function Home() {
  const featuredWatches = await getFeaturedWatches();
  const { isSampleInventory } = await getWatchesInventory();
  const siteUrl = getSiteUrl();
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    sameAs: [siteConfig.social.instagram]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      <HomeHeroSlider />

      <Container className="space-y-24 py-18 lg:py-24">
        <section className="grid gap-4 md:grid-cols-5">
          {trustPillars.map((item) => (
            <div key={item} className="surface-card group p-5">
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-amber-100 to-transparent transition group-hover:w-20" />
              <p className="text-sm font-semibold leading-6 text-slate-100">{item}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Brand navigation</p>
              <h2 className="section-title mt-3">Browse by Brand</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Explore examples, request specific references, or start a sourcing conversation.
              </p>
            </div>
            <Button href="/watches" variant="secondary">View Demo Inventory</Button>
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

        <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-3">Start with the goal. We guide the path.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Sourcing, selling, trading, or consigning — simple, documented, and verified before anything is final.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {tradeSteps.map(([step, title, copy]) => (
              <article key={step} className="surface-card p-6">
                <p className="text-sm font-semibold text-amber-100/80">{step}</p>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,166,91,0.16),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(118,142,190,0.13),transparent_34%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="eyebrow">Trust standard</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Built on verification, documentation, and clear communication.</h2>
            </div>
            <ul className="grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {proofBullets.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-56 w-56 -translate-x-16 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">Sourcing concierge</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Looking for a specific watch?</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">
                If the watch you want is not listed, tell us the brand, model, reference, budget, and timeline. We can review sourcing options, trade possibilities, and the cleanest path forward.
              </p>
              <Button href="/contact?intent=buy#contact-form" className="mt-6">Request a Watch</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2 className="section-title mt-3">Featured Watch Layout</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Example presentation for future curated inventory. Demo watches are not real availability or confirmed sale listings.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button href="/watches" variant="secondary">Explore Demo Watches</Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {featuredWatches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} isSampleInventory={isSampleInventory} />
          ))}
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Recently Sold & Client Proof</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Verified proof only.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">Coming soon as verified transactions are completed.</p>
              <Button href="/recently-sold" variant="secondary" className="mt-5">View Proof Page</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-4">
          {services.map(([title, copy, href], index) => (
            <article key={title} className="surface-card group relative overflow-hidden p-7 hover:-translate-y-1 hover:border-amber-100/35">
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-amber-100/10 blur-2xl transition group-hover:bg-amber-100/20" />
              <p className="text-sm font-semibold text-amber-100/70">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              <Button href={href} variant="secondary" className="mt-8">Start Here</Button>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.48)]">
            <Image
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1600&q=84"
              alt="Luxury watch case and bracelet detail"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              loading="eager"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/16 to-transparent" />
            <div className="absolute bottom-8 left-8 max-w-sm">
              <p className="eyebrow">Condition first</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">The details make the deal.</h2>
            </div>
          </div>

          <div className="surface-card p-8 lg:p-10">
            <p className="eyebrow">Private list</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Drops. Trade notes. No noise.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              New watches, trade opportunities, and market notes.
            </p>
            <div className="mt-7">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
