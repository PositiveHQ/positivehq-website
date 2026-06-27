import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { WatchCard } from '@/components/watch-card';
import { getFeaturedWatches } from '@/lib/repositories/watches';
import { getSiteUrl, siteConfig } from '@/lib/site';

const trustPoints = [
  'Reference and condition reviewed before listing',
  'Clear offer math for sellers and trade-ins',
  'Insured shipping guidance from enquiry to close',
  'Premium presentation without hiding material flaws'
];

const stats = [
  ['24h', 'target response window'],
  ['3-step', 'sell / trade process'],
  ['Full-set', 'box & papers clearly marked']
];

const services = [
  {
    title: 'Buy curated watches',
    copy: 'Explore a tighter edit of modern icons, daily-wear classics, and statement pieces with clear condition notes.',
    href: '/watches'
  },
  {
    title: 'Sell with confidence',
    copy: 'Send the reference, photos, box/papers status, and asking price. We come back with a clean next step.',
    href: '/sell'
  },
  {
    title: 'Consign with a clear plan',
    copy: 'Target a stronger possible net price with pricing strategy, premium photography, listing support, and realistic timing.',
    href: '/consignment'
  },
  {
    title: 'Trade into the next one',
    copy: 'Use your current watch as part of the deal with transparent trade value, costs, and upgrade path.',
    href: '/trade-in'
  }
];

const process = [
  ['01', 'Submit the watch', 'Share reference, condition, photos, accessories, and what you want to do next.'],
  ['02', 'Review the details', 'We check market context, completeness, condition signals, and any authenticity or seller-risk flags.'],
  ['03', 'Agree the route', 'Buy, sell, trade, or wait — with clear communication before anything moves.']
];

export const metadata: Metadata = {
  title: 'Luxury Watch Buyers, Sellers & Trade-Ins',
  description:
    'Positive Watch HQ is a premium watch platform for buying, selling, and trading luxury watches with clear condition review, transparent offers, and concierge communication.',
  alternates: { canonical: '/' }
};

export default async function Home() {
  const featuredWatches = await getFeaturedWatches();
  const siteUrl = getSiteUrl();
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: []
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,166,91,0.20),transparent_34%),radial-gradient(circle_at_82%_6%,rgba(118,142,190,0.15),transparent_28%),linear-gradient(130deg,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-white/10 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[430px] w-[430px] -translate-x-1/2 rounded-full border border-amber-100/20 opacity-50" />

        <Container className="relative grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="max-w-3xl space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
              Luxury watches · buy · sell · trade
            </div>

            <div className="space-y-5">
              <p className="eyebrow">Positive Watch HQ</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
                A sharper way to move luxury watches.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A premium destination for buyers, sellers, and trade-ins — built around curated inventory, clear condition review, and calm concierge communication.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/sell" className="sm:min-w-44">Get an Offer</Button>
              <Button href="/watches" variant="secondary" className="sm:min-w-44">View Inventory</Button>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] animate-fade-in">
            <div className="absolute -inset-6 rounded-[3rem] bg-amber-100/10 blur-3xl" />
            <div className="watch-orbit relative aspect-square rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.11),transparent_31%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-6 shadow-[0_50px_120px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-8 rounded-full border border-amber-100/20" />
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="relative h-full overflow-hidden rounded-full border border-white/15 bg-black">
                <Image
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1800&q=86"
                  alt="Close-up of a premium steel chronograph watch"
                  fill
                  className="object-cover brightness-90 contrast-110 saturate-110"
                  priority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_28%,rgba(0,0,0,0.64)_74%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.65))]" />
                <div className="absolute bottom-10 left-[16%] right-[16%] rounded-3xl border border-white/12 bg-black/55 p-4 backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/80">Featured experience</p>
                  <p className="mt-2 text-base font-semibold leading-snug text-white sm:text-lg">Curated drops. Honest details. Fast conversations.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="space-y-28 py-20 lg:py-28">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((item) => (
            <div key={item} className="surface-card group p-5">
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-amber-100 to-transparent transition group-hover:w-20" />
              <p className="text-sm leading-6 text-slate-200">{item}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Featured inventory</p>
            <h2 className="section-title mt-3">Current highlights with presence.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              A cleaner showroom feel for hero pieces and fast scanning — brand, reference, price, condition, and next action stay obvious.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button href="/watches" variant="secondary">Explore All Watches</Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {featuredWatches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-4">
          {services.map((service, index) => (
            <article key={service.title} className="surface-card group relative overflow-hidden p-7 hover:-translate-y-1 hover:border-amber-100/35">
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-amber-100/10 blur-2xl transition group-hover:bg-amber-100/20" />
              <p className="text-sm font-semibold text-amber-100/70">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{service.copy}</p>
              <Button href={service.href} variant="secondary" className="mt-8">Start Here</Button>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,166,91,0.16),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(118,142,190,0.13),transparent_34%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">The process</p>
              <h2 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight text-white sm:text-5xl">Built for trust before the transaction.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                Positive Watch HQ should feel premium, but it should also feel serious: no vague promises, no fake urgency, and no hidden condition story.
              </p>
            </div>
            <div className="space-y-4">
              {process.map(([step, title, copy]) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur">
                  <div className="flex gap-5">
                    <p className="text-sm font-semibold text-amber-100/80">{step}</p>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.48)]">
            <Image
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1600&q=84"
              alt="Luxury watch case and bracelet detail"
              fill
              loading="eager"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/16 to-transparent" />
            <div className="absolute bottom-8 left-8 max-w-sm">
              <p className="eyebrow">Detail matters</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Presentation that still respects condition.</h2>
            </div>
          </div>

          <div className="surface-card p-8 lg:p-10">
            <p className="eyebrow">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Market notes. New arrivals. No noise.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Join buyers and sellers who want practical watch insights and first access to incoming inventory.
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
