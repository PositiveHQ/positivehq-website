import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { WatchCard } from '@/components/watch-card';
import { getFeaturedWatches } from '@/lib/repositories/watches';
import { getSiteUrl, siteConfig } from '@/lib/site';

const trustPoints = ['Authenticated inventory', 'Insured overnight shipping', 'Transparent pricing', 'Fast same-day offers'];

export const metadata: Metadata = {
  title: 'Buy & Sell Luxury Watches',
  description: siteConfig.description,
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
    telephone: siteConfig.phone
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(192,157,84,0.22),transparent_45%)]" />
        <Container className="relative grid gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <div className="space-y-8 animate-fade-up">
            <p className="eyebrow">Positive Watch Co.</p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-6xl">Cinematic luxury watches. Curated with conviction.</h1>
            <p className="max-w-lg text-base text-slate-300">
              A modern dealer experience for serious buyers and sellers. Premium inventory, honest condition grading, and concierge-level communication.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/watches">Shop Watches</Button>
              <Button href="/sell" variant="secondary">Sell Your Watch</Button>
            </div>
            <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)] animate-fade-in">
            <Image src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1800&q=80" alt="Luxury watch" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </Container>
      </section>

      <Container className="space-y-24 py-20">
        <section className="space-y-8 animate-fade-up">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured Inventory</p>
              <h2 className="section-title mt-2">Current highlights</h2>
            </div>
            <Button href="/watches" variant="secondary">View All Watches</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ['Why sell with us', 'Same-day offer reviews, fast payment, and clear communication from start to finish.'],
            ['Simple process', 'Submit details, receive an offer, ship insured, and get paid after verification.'],
            ['Trade-in flexibility', 'Apply existing watch value toward your next piece with transparent math.']
          ].map(([title, copy]) => (
            <article key={title} className="surface-card p-6 hover:border-amber-100/35">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="surface-card p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Trust</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Credibility you can verify.</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                We focus on authenticated inventory, direct communication, and clear documentation on every transaction.
              </p>
            </div>
            <Button href="/about" variant="secondary">Learn About Our Process</Button>
          </div>
        </section>

        <section className="surface-card p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Market notes. New arrivals. No noise.</h2>
              <p className="mt-3 max-w-lg text-sm text-slate-300">Join buyers and sellers who want practical watch insights and first access to incoming inventory.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </Container>
    </>
  );
}
