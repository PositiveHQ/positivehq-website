import { Metadata } from 'next';
import { Button } from '@/components/button';
import { Container } from '@/components/container';

const steps = [
  ['Review', 'We start with brand, model, reference, photos, box/papers, service context, and your goal.'],
  ['Verify', 'Authentication, condition, availability, and payment path are reviewed before final terms.'],
  ['Structure', 'We outline buy, sell, trade, or consignment options with clear expectations.'],
  ['Settle', 'Final terms are documented before payment, handoff, delivery, or seller payout.']
];

export const metadata: Metadata = {
  title: 'Process',
  description: 'Positive Watch HQ process for clear luxury watch buying, selling, trade-ins, and consignment.',
  alternates: { canonical: '/process' }
};

export default function ProcessPage() {
  return (
    <Container className="space-y-12 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Process</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">Clear steps before high-value decisions.</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Every transaction is subject to final authentication review, condition verification, availability confirmation, and cleared payment. Offers, prices, and trade values are not final until review is complete.
          </p>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-4">
        {steps.map(([title, copy]) => (
          <article key={title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="surface-card p-8 lg:p-10">
        <p className="eyebrow">No pressure</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">The deal should make sense before it moves.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Positive Watch HQ is built for clear communication, documented expectations, and realistic market guidance across buying, selling, trade-ins, and consignment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/catalog">Brands & Requests</Button>
          <Button href="/sell" variant="secondary">Sell</Button>
          <Button href="/trade-in" variant="secondary">Trade</Button>
        </div>
      </section>
    </Container>
  );
}
