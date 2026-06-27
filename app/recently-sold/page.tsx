import { Metadata } from 'next';
import { Button } from '@/components/button';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Recently Sold Watches',
  description: 'Verified recently sold watch examples from Positive Watch HQ. No fake sold inventory is displayed.',
  alternates: { canonical: '/recently-sold' }
};

export default function RecentlySoldPage() {
  return (
    <Container className="space-y-12 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Proof</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">Recently Sold Watches</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Real sold examples will be added as transactions are completed. We do not display fake sold inventory.
          </p>
        </div>
      </header>

      <section className="surface-card p-8 text-center lg:p-12">
        <p className="eyebrow">Verified transactions only</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Coming soon.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          This page will only show completed, verified examples with permission and accurate details. Until then, Positive Watch HQ will not use fake sold watches, fake testimonials, or fake proof.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/catalog">View Catalog</Button>
          <Button href="/sell" variant="secondary">Sell Your Watch</Button>
        </div>
      </section>
    </Container>
  );
}
