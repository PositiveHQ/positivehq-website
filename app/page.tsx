import Image from 'next/image';
import { Metadata } from 'next';
import { BrandCatalogStrip } from '@/components/brand-catalog-strip';
import { WatchVideoHero } from '@/components/watch-video-hero';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { WatchCard } from '@/components/watch-card';
import { submitNewsletterAction } from '@/app/newsletter/actions';
import { getWatchesInventory } from '@/lib/repositories/watches';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { formatPrice } from '@/lib/utils';

const trustBar = [
  ['✓', 'Authenticity Guaranteed', 'Every transaction starts with verification.'],
  ['✓', 'Secure Payments', 'Settlement routes confirmed before completion.'],
  ['✓', 'Worldwide Shipping', 'Insured shipping guidance for eligible deals.'],
  ['✓', 'Verified Sellers', 'Private seller and watch review before listing.']
];

const whyChoose = [
  ['◇', 'Authenticity Guaranteed', 'Brand, model, reference, condition, and accessories are reviewed before serious transaction steps.'],
  ['◌', 'Verified Sellers', 'We review the seller context and supporting details before presenting a watch as available.'],
  ['▣', 'Secure Checkout', 'Payment, settlement, and final written terms are confirmed directly before completion.'],
  ['✈', 'Global Shipping', 'Shipping paths are handled with tracking, insurance guidance, and clear handoff expectations.']
];

const proofCards = [
  ['Private Review Process', 'No faceless marketplace intake. A concierge reviews the watch, goal, timing, and next step.'],
  ['Real Proof Only', 'No fake reviews, fake sold examples, or inflated claims. Public proof is published only when verified.'],
  ['Clean Communication', 'No pressure. No games. No vague promises. Just direct guidance and clear next steps.']
];

export const metadata: Metadata = {
  title: 'Luxury Watch Marketplace | Positive Watch HQ',
  description:
    'Discover, sell, and trade authenticated luxury watches through Positive Watch HQ, a premium concierge marketplace for Rolex, Cartier, Omega, Patek Philippe, Audemars Piguet, and more.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Discover Your Next Timepiece | Positive Watch HQ',
    description: 'Buy, sell, and trade authenticated luxury watches through a cleaner concierge marketplace.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover Your Next Timepiece | Positive Watch HQ',
    description: 'Buy, sell, and trade authenticated luxury watches through a cleaner concierge marketplace.'
  }
};

export default async function Home() {
  const siteUrl = getSiteUrl();
  const { watches, isSampleInventory } = await getWatchesInventory();
  const featured = watches.filter((watch) => watch.featured).slice(0, 3);
  const recentlyAdded = [...watches].sort((a, b) => b.year - a.year).slice(0, 4);
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    contactPoint: siteConfig.contactEmails.map((email) => ({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email
    })),
    sameAs: [siteConfig.social.instagram]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      <WatchVideoHero />

      <section className="relative overflow-hidden border-b border-white/10 bg-black py-16 lg:py-20">
        <Image
          src="/media/positive-watch-hero-drive-v2-best-poster.webp"
          alt="Luxury watch detail background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-34"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.96)_0%,rgba(3,4,5,0.82)_46%,rgba(3,4,5,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(201,166,91,0.16),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(120,140,190,0.10),transparent_28%)]" />
        <Container className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-4xl animate-fade-up">
            <p className="eyebrow">Positive Watch HQ Marketplace</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Discover Your Next Timepiece
            </h1>
          </div>
          <div className="max-w-2xl lg:ml-auto">
            <p className="text-lg leading-8 text-slate-200 sm:text-xl">
              Buy, sell, and trade authenticated luxury watches from trusted collectors worldwide.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/catalog">Shop Watches</Button>
              <Button href="/sell#sell-form" variant="secondary">Sell Your Watch</Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.14em] text-slate-300 sm:grid-cols-4">
              {['Rolex', 'Cartier', 'Omega', 'Patek'].map((brand) => (
                <span key={brand} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-center backdrop-blur-xl">{brand}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-[#050608]/95 py-5">
        <Container>
          <div className="grid gap-3 md:grid-cols-4">
            {trustBar.map(([icon, title, copy]) => (
              <article key={title} className="group rounded-xl border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-100/30 hover:bg-white/[0.055]">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-100/30 bg-amber-100/10 text-amber-100">{icon}</span>
                  <div>
                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container className="space-y-24 py-18 lg:py-24">
        {isSampleInventory && (
          <section className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-5 text-sm leading-6 text-amber-50">
            <p className="font-semibold uppercase tracking-[0.16em]">Example Inventory Layout — Demo Only</p>
            <p className="mt-2 text-amber-50/85">Featured and recently added watches below demonstrate the marketplace design. They are not presented as real inventory, real availability, or real prices.</p>
          </section>
        )}

        <section className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Featured Watches</p>
              <h2 className="section-title mt-3">Curated pieces, presented clearly.</h2>
            </div>
            <Button href="/catalog" variant="secondary">View All Watches</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((watch) => <WatchCard key={watch.id} watch={watch} isSampleInventory={isSampleInventory} />)}
          </div>
        </section>
      </Container>

      <BrandCatalogStrip />

      <Container className="space-y-24 py-18 lg:py-24">
        <section className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Recently Added</p>
              <h2 className="section-title mt-3">Latest marketplace examples.</h2>
            </div>
            <Button href="/catalog?sort=recent" variant="secondary">Browse Latest</Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyAdded.map((watch) => {
              const image = watch.images.find((item) => item.isPrimary) ?? watch.images[0];
              return (
                <a key={watch.id} href={`/watches/${watch.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-amber-100/30 hover:shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    {image && <Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/80">{watch.brand}</p>
                    <h3 className="font-semibold text-white">{watch.model}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-100">{isSampleInventory ? 'Example ' : ''}{formatPrice(watch.price)}</span>
                      <span className="text-slate-500">Listed recently</span>
                    </div>
                    <p className="text-xs text-slate-400">Private marketplace · Location confirmed before transaction</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="section-title mt-3">Built for confidence before commitment.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map(([icon, title, copy]) => (
              <article key={title} className="surface-card p-6 hover:-translate-y-1 hover:border-amber-100/30">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-100/25 bg-amber-100/10 text-xl text-amber-100">{icon}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {proofCards.map(([title, copy]) => (
            <article key={title} className="surface-card p-7">
              <p className="text-amber-100">★★★★★</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-amber-100/20 bg-[linear-gradient(135deg,rgba(201,166,91,0.18),rgba(255,255,255,0.045)_45%,rgba(0,0,0,0.34))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] lg:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-16 -translate-y-20 rounded-full bg-amber-100/16 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Sell your watch</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ready to Sell Your Watch?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Share the reference, condition, box and papers, photos, and timing. We’ll review the path privately and guide the next step.</p>
            </div>
            <Button href="/sell#sell-form">Get Started</Button>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-56 w-56 -translate-x-16 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Private drops. Market notes. No noise.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">A minimal update list for new watches, trade opportunities, and collecting notes.</p>
              <div className="mt-7"><NewsletterForm action={submitNewsletterAction} sourcePage="/" /></div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
