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

const trustBar = [
  ['✓', 'Private Review', 'Every inquiry starts with a direct concierge review.'],
  ['✓', 'Authentication First', 'Brand, reference, condition, and supporting details are reviewed carefully.'],
  ['✓', 'Clear Communication', 'No pressure, no vague promises, and no public listing confusion.'],
  ['✓', 'Secure Next Steps', 'Payment, shipping, trade, or consignment paths are discussed privately.']
];

const conciergeRoutes = [
  ['Request a Watch', 'Looking for a specific reference? Share the model, budget, timing, and condition expectations.', '/contact?intent=buy#contact-form'],
  ['Submit Your Watch', 'Selling starts with private review of photos, condition, box, papers, and timing.', '/sell#sell-form'],
  ['Discuss a Trade', 'Use your current watch toward the next piece with a clearer path and realistic review.', '/trade-in#trade-form'],
  ['Explore Consignment', 'We can review whether consignment makes sense before anything is publicly listed.', '/consignment#consignment-review']
];

const whyChoose = [
  ['◇', 'Private Sourcing', 'Tell us the reference, budget, timing, and condition expectations. We review the path before presenting options.'],
  ['◌', 'Sell Review', 'Submit your watch details, box, papers, photos, and timing for a clean private review.'],
  ['↔', 'Trade Guidance', 'Move from one piece into another with a clearer discussion of value, demand, and fit.'],
  ['◆', 'Consignment Support', 'Explore whether a managed sale route makes sense before committing to public listing or pricing.']
];

const proofCards = [
  ['Real Review', 'Real Watches Only', 'Every watch is reviewed for brand, model, condition, box, papers, service history, and supporting details.'],
  ['Private Process', 'Private Review First', 'We confirm the situation before discussing serious pricing, sourcing, trade, or consignment options.'],
  ['Clear Communication', 'Clear Communication', 'No pressure. No vague promises. No games. Just direct guidance and the next right step.'],
  ['Secure Process', 'Secure Process', 'Payment, shipping, authentication, and documentation are handled carefully before anything moves forward.']
];

const teamMembers = [
  {
    name: 'Nick Trani',
    role: 'Founder / Positive Watch HQ',
    focus: 'Private sourcing, client relationships, and deal guidance.',
    image: '/media/nicola-trani-homepage-concierge.webp',
    alt: 'Nick Trani of Positive Watch HQ'
  },
  {
    name: 'Robert Cejalvo',
    role: 'Co-Founder / Watch Concierge',
    focus: 'Co-founder support across watch review, private sourcing, client communication, and day-to-day concierge operations.',
    image: '/media/robert-cejalvo-watch-concierge.webp',
    alt: 'Robert Cejalvo, Positive Watch HQ co-founder and watch concierge'
  }
];

export const metadata: Metadata = {
  title: 'Private Luxury Watch Concierge | Positive Watch HQ',
  description:
    'Positive Watch HQ helps clients buy, sell, trade, or consign Rolex, Cartier, Audemars Piguet, Patek Philippe, Omega, and other luxury watches through a private concierge process.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Private Luxury Watch Concierge | Positive Watch HQ',
    description: 'Buy, sell, trade, or consign luxury watches through a cleaner private concierge process.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Luxury Watch Concierge | Positive Watch HQ',
    description: 'Buy, sell, trade, or consign luxury watches through a cleaner private concierge process.'
  }
};

export default async function Home() {
  const siteUrl = getSiteUrl();
  const { watches, isSampleInventory } = await getWatchesInventory();
  const popularRequests = watches.filter((watch) => watch.featured).slice(0, 3);
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

      <section className="relative overflow-hidden border-b border-white/10 bg-[#010309] py-16 lg:py-20">
        <Image
          src="/media/positive-watch-hero-drive-v2-best-poster.webp"
          alt="Luxury watch detail background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-34"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,3,9,0.97)_0%,rgba(2,8,20,0.84)_46%,rgba(7,26,51,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(217,183,107,0.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(18,58,111,0.22),transparent_28%)]" />
        <Container className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-4xl animate-fade-up">
            <p className="eyebrow">Positive Watch HQ Concierge</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
              A Private Luxury Watch Concierge
            </h1>
          </div>
          <div className="max-w-2xl lg:ml-auto">
            <p className="text-lg leading-8 text-slate-200 sm:text-xl">
              Buy, sell, trade, or consign Rolex, Cartier, Audemars Piguet, Patek Philippe, Omega, and other luxury watches through a cleaner, more personal process.
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              No pressure. No inflated promises. No guessing games. Just clear guidance, private review, and the right next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?intent=buy#contact-form">Request a Watch</Button>
              <Button href="/sell#sell-form" variant="secondary">Start Watch Review</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-[#020814]/95 py-5">
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
        <section className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Human guidance</p>
            <h2 className="section-title">Private Watch Guidance From Real People</h2>
            <p className="text-sm leading-7 text-slate-300">
              Positive Watch HQ was built for people who want a more personal way to buy, sell, trade, or consign luxury watches. You are not submitting a watch into a faceless platform. You are starting a private conversation with real people who review the details, communicate clearly, and guide the next step with care.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <article key={member.name} className="surface-card overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/[0.035]">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-amber-100/80">{member.role}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{member.focus}</p>
                </div>
              </article>
            ))}
            <p className="text-xs leading-5 text-slate-500 sm:col-span-2">
              Initial conversations are handled privately by direct inquiry or appointment.
            </p>
          </div>
        </section>

        {isSampleInventory && (
          <section className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-5 text-sm leading-6 text-amber-50">
            <p className="font-semibold uppercase tracking-[0.16em]">Private sourcing examples — not public inventory</p>
            <p className="mt-2 text-amber-50/85">Public inventory is only displayed when availability is verified. Until then, these examples show the types of watches clients ask us to source, sell, trade, or consign privately.</p>
          </section>
        )}

        <section className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Popular Watch Requests</p>
              <h2 className="section-title mt-3">Watches clients often ask us to review or source.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">These are examples of the types of watches clients often ask us to source, sell, trade, or consign. Availability, pricing, condition, and final terms are reviewed privately before anything is presented as real inventory.</p>
            </div>
            <Button href="/contact?intent=buy#contact-form" variant="secondary">Request a Specific Watch</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {popularRequests.map((watch) => <WatchCard key={watch.id} watch={watch} isSampleInventory={isSampleInventory} />)}
          </div>
        </section>
      </Container>

      <BrandCatalogStrip />

      <Container className="space-y-24 py-18 lg:py-24">
        <section className="grid gap-5 md:grid-cols-4">
          {conciergeRoutes.map(([title, copy, href]) => (
            <article key={title} className="surface-card p-6 hover:-translate-y-1 hover:border-amber-100/30">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              <Button href={href} variant="secondary" className="mt-6">Start Private Review</Button>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">Concierge process</p>
            <h2 className="section-title mt-3">Clear routes for every watch decision.</h2>
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

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {proofCards.map(([label, title, copy]) => (
            <article key={title} className="surface-card p-7">
              <p className="text-amber-100">{label}</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-amber-100/20 bg-[linear-gradient(135deg,rgba(217,183,107,0.18),rgba(18,58,111,0.16)_46%,rgba(1,3,9,0.42))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] lg:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-16 -translate-y-20 rounded-full bg-amber-100/16 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Private review</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ready to Start a Watch Review?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Share the reference, condition, box and papers, photos, and timing. We’ll review the path privately and guide the next step.</p>
            </div>
            <Button href="/sell#sell-form">Start Private Review</Button>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-56 w-56 -translate-x-16 -translate-y-16 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Private sourcing notes. No noise.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-300">A minimal update list for sourcing opportunities, trade notes, and private collecting guidance.</p>
              <div className="mt-7"><NewsletterForm action={submitNewsletterAction} sourcePage="/" /></div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
