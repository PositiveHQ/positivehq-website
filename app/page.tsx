import { Metadata } from 'next';
import { WatchVideoHero } from '@/components/watch-video-hero';
import { BrandCatalogStrip } from '@/components/brand-catalog-strip';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { submitNewsletterAction } from '@/app/newsletter/actions';
import { getSiteUrl, siteConfig } from '@/lib/site';

const tradeSteps = [
  ['01', 'Share the goal', 'Tell us if you want to buy, sell, trade, or consign — and what outcome would make the most sense.'],
  ['02', 'Document the details', 'Brand, model, reference, photos, condition, box/papers, budget, value expectations, and timing.'],
  ['03', 'Move with clarity', 'We review the path, verify what matters, then guide the next step with clear communication.']
];

const trustBullets = [
  'Authentication review before any final transaction',
  'Condition, completeness, and supporting details documented clearly',
  'Private guidance before serious pricing or trade discussions',
  'Insured shipping and secure settlement route reviewed before completion',
  'No fake inventory, fake sold examples, or inflated claims'
];

const intentCards = [
  {
    title: 'Buy a Watch',
    copy: 'Looking for a specific Rolex, Cartier, AP, Patek, Omega, or other luxury piece? Tell us what you want and we will help source the right option.',
    href: '/contact?intent=buy#contact-form',
    cta: 'Request a Watch'
  },
  {
    title: 'Sell a Watch',
    copy: 'Submit your watch details, condition, box, papers, and photos. We will review the opportunity and guide the next step.',
    href: '/sell#sell-form',
    cta: 'Start Watch Review'
  },
  {
    title: 'Trade a Watch',
    copy: 'Looking to move from one piece into another? We can help review your current watch and discuss possible trade paths.',
    href: '/trade-in#trade-form',
    cta: 'Discuss a Trade'
  },
  {
    title: 'Consign a Watch',
    copy: 'Want help selling without handling the process alone? We can review whether consignment makes sense for your watch.',
    href: '/consignment#consignment-review',
    cta: 'Explore Consignment'
  }
];

const proofCards = [
  ['Real Watches Only', 'Every watch is reviewed for brand, model, condition, box, papers, and supporting details.'],
  ['Private Review Process', 'We confirm the situation first before discussing serious pricing, sourcing, trade, or consignment options.'],
  ['Clean Communication', 'No pressure. No games. No vague promises. Just clear next steps.']
];

export const metadata: Metadata = {
  title: 'Private Luxury Watch Concierge | Positive Watch HQ',
  description:
    'Positive Watch HQ helps clients buy, sell, trade, or consign Rolex, Cartier, Audemars Piguet, Patek Philippe, Omega, and other luxury watches through a private concierge process.',
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
              A Private Luxury Watch Concierge
            </h1>
          </div>
          <div className="max-w-xl lg:ml-auto">
            <p className="text-base leading-8 text-slate-300">
              Buy, sell, trade, or consign Rolex, Cartier, Audemars Piguet, Patek Philippe, Omega, and other luxury watches through a cleaner, more personal process.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              No pressure. No inflated promises. No guessing games. Just a clear path to the right watch decision.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?intent=buy#contact-form">Request a Watch</Button>
              <Button href="/contact?intent=appointment#contact-form" variant="secondary">Start Watch Review</Button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_45%,rgba(201,166,91,0.08))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-10 lg:p-12">
          <div className="absolute left-0 top-0 h-72 w-72 -translate-x-20 -translate-y-24 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="eyebrow">Private concierge</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">A Private Watch Concierge, Not a Random Online Form</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Positive Watch HQ was built for people who want a cleaner, more personal way to buy, sell, trade, or consign luxury watches. You are not submitting your watch into a faceless marketplace. You are working directly with a concierge team that reviews the details, communicates clearly, and helps guide the next step with care.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-amber-100/20 bg-black/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/75">Concierge team</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-xl font-semibold text-white">Nick Trani</h3>
                  <p className="mt-1 text-sm text-slate-400">Private watch guidance and client support</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-xl font-semibold text-white">Robert / Watch Concierge</h3>
                  <p className="mt-1 text-sm text-slate-400">Private sourcing, selling, trade, and consignment support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Client intent</p>
            <h2 className="section-title mt-3">What Are You Looking To Do?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Choose the cleanest starting point. Each route is reviewed privately before any serious pricing, sourcing, trade, or consignment discussion.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {intentCards.map((card, index) => (
              <article key={card.title} className="surface-card group relative overflow-hidden p-7 hover:-translate-y-1 hover:border-amber-100/35">
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-amber-100/10 blur-2xl transition group-hover:bg-amber-100/20" />
                <p className="text-sm font-semibold text-amber-100/70">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.copy}</p>
                <Button href={card.href} variant="secondary" className="mt-8">{card.cta}</Button>
              </article>
            ))}
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
              {trustBullets.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative space-y-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <p className="eyebrow">Verified Proof Only</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Real proof, not borrowed credibility.</h2>
              </div>
              <p className="text-sm leading-7 text-slate-300">
                We only publish real sold watches, verified client feedback, and documented transactions. No fake reviews. No fake sold examples. No inflated claims. Until public proof is available, every inquiry is handled privately with clear communication, documentation, and verification.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {proofCards.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                </article>
              ))}
            </div>
            <Button href="/recently-sold" variant="secondary">View Proof Page</Button>
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
                <NewsletterForm action={submitNewsletterAction} sourcePage="/" />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
