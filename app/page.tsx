import Image from 'next/image';
import { Metadata } from 'next';
import { BrandSlideshow } from '@/components/brand-slideshow';
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
  ['Buy watches', 'Curated pieces with clear details and a guided path to purchase.', '/watches'],
  ['Sell', 'Get a clear cash offer after review.', '/sell'],
  ['Trade in', 'Put your current watch toward the next one.', '/trade-in'],
  ['Consign', 'List with a clear price plan when time allows.', '/consignment']
];

const proofBullets = [
  'Authentication review before final transaction',
  'Condition details documented clearly',
  'Box, papers, and accessories reviewed',
  'Insured shipping guidance',
  'Payment and settlement route confirmed before completion'
];

export const metadata: Metadata = {
  title: 'Luxury Watches for Sale & Trade-Ins',
  description:
    'Positive Watch HQ sells luxury watches and helps clients trade into the next piece with clear condition review, verification, insured shipping, and concierge communication.',
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

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,166,91,0.20),transparent_34%),radial-gradient(circle_at_82%_6%,rgba(118,142,190,0.15),transparent_28%),linear-gradient(130deg,rgba(255,255,255,0.08),transparent_24%)]" />
        <Container className="relative grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[0.96fr_1.04fr] lg:py-20">
          <div className="max-w-4xl space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
              Watches for sale · trade-ins welcome
            </div>

            <div className="space-y-5">
              <p className="eyebrow">Positive Watch HQ</p>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
                Luxury Watches for Sale. Trade Yours In.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Curated watches, clean trade-in values, verified condition, and calm concierge communication.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/watches" className="sm:min-w-44">View Watches</Button>
              <Button href="/trade-in" variant="secondary" className="sm:min-w-44">Start Trade-In</Button>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                ['24h', 'target response'],
                ['Verified', 'before final transaction'],
                ['Concierge', 'clear next steps']
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <BrandSlideshow />
        </Container>
      </section>

      <Container className="space-y-24 py-18 lg:py-24">
        <section className="grid gap-4 md:grid-cols-5">
          {trustPillars.map((item) => (
            <div key={item} className="surface-card group p-5">
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-amber-100 to-transparent transition group-hover:w-20" />
              <p className="text-sm font-semibold leading-6 text-slate-100">{item}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">How trade-ins work</p>
            <h2 className="section-title mt-3">Move into the next watch.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Simple, documented, and verified before anything is final.
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

        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Featured watches</p>
            <h2 className="section-title mt-3">{isSampleInventory ? 'Example Inventory Layout — Demo Only' : 'Available pieces and trade targets.'}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              {isSampleInventory ? 'This section shows layout only until real inventory is published.' : 'The marketplace is built for watches we sell now — and the brands we want on trade later.'}
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button href="/watches" variant="secondary">Explore Watches</Button>
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
