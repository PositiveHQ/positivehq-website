import { Metadata } from 'next';
import { WatchVideoHero } from '@/components/watch-video-hero';
import { BrandCatalogStrip } from '@/components/brand-catalog-strip';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { getSiteUrl, siteConfig } from '@/lib/site';

const tradeSteps = [
  ['01', 'Share the goal', 'Tell us if you want to source, sell, trade, or consign.'],
  ['02', 'Document the watch', 'Brand, model, reference, photos, condition, box/papers, and timing.'],
  ['03', 'Move cleanly', 'We review the path, verify the details, then guide the next step.']
];

const services = [
  ['Source', 'Request a specific reference and the cleanest route to acquire it.', '/contact?intent=buy#contact-form'],
  ['Sell', 'Submit your watch for clear review before any offer is final.', '/sell'],
  ['Trade in', 'Use your current watch toward the next piece.', '/trade-in'],
  ['Consign', 'Set a realistic price plan when timing matters more than speed.', '/consignment']
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
  const siteUrl = getSiteUrl();
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
      <BrandCatalogStrip />

      <Container className="space-y-24 py-18 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="eyebrow">Positive Watch HQ</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
              A quiet luxury watch concierge for sourcing, selling, trading, and consignment.
            </h1>
          </div>
          <div className="max-w-xl lg:ml-auto">
            <p className="text-base leading-8 text-slate-300">
              Product-first guidance for high-value watch decisions: clear communication, documented condition review, careful verification, and a clean path forward.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?intent=buy#contact-form">Request a Watch</Button>
              <Button href="/contact?intent=appointment#contact-form" variant="secondary">Start Watch Review</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-3">Start with the goal. We guide the path.</h2>
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,166,91,0.14),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(118,142,190,0.11),transparent_34%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="eyebrow">Trust standard</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Verification, documentation, and clear communication.</h2>
            </div>
            <ul className="grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {proofBullets.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4">{item}</li>
              ))}
            </ul>
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

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Recently Sold & Client Proof</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Verified proof only.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">Coming soon as verified transactions are completed. We will not publish fake sold examples, fake reviews, or unsupported proof.</p>
              <Button href="/recently-sold" variant="secondary" className="mt-5">View Proof Page</Button>
            </div>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-56 w-56 -translate-x-16 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">Private list</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Drops. Trade notes. No noise.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">
                New watches, trade opportunities, and market notes.
              </p>
              <div className="mt-7">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
