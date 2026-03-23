import Image from 'next/image';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { WatchCard } from '@/components/watch-card';
import { featuredWatches } from '@/data/watches';

const trustPoints = ['Authenticated inventory', 'Insured overnight shipping', 'Transparent pricing', 'Fast same-day offers'];

export default function Home() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Positive Watch Co.</p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">Buy your next watch. Sell your current one fast.</h1>
            <p className="max-w-lg text-base text-slate-300">
              A clean, trusted place to shop quality watches, request real buy offers, and trade with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/watches">Shop Watches</Button>
              <Button href="/sell" variant="secondary" className="border-slate-600 bg-transparent text-white hover:bg-slate-900">Sell Your Watch</Button>
            </div>
            <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl border border-slate-800">
            <Image src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1600&q=80" alt="Luxury watch" fill className="object-cover" priority />
          </div>
        </Container>
      </section>

      <Container className="space-y-24 py-20">
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Featured Inventory</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Current highlights</h2>
            </div>
            <Button href="/watches" variant="secondary">View All Watches</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl bg-slate-100 p-8 lg:grid-cols-3">
          {[
            ['Why sell with us', 'Same-day offer reviews, fast payment, and clear communication from start to finish.'],
            ['Simple process', 'Submit details, receive an offer, ship insured, and get paid after verification.'],
            ['Trade-in flexibility', 'Apply existing watch value toward your next piece with transparent math.']
          ].map(([title, copy]) => (
            <article key={title} className="rounded-xl bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{copy}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Newsletter</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Market notes. New arrivals. No noise.</h2>
              <p className="mt-3 max-w-lg text-sm text-slate-600">Join buyers and sellers who want practical watch insights and first access to incoming inventory.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </Container>
    </>
  );
}
