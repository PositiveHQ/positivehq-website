import { Metadata } from 'next';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitTradeSubmissionAction } from '@/app/sell/actions';

export const metadata: Metadata = {
  title: 'Trade-In',
  description: 'Use your current watch value toward your next purchase with a clear trade process.',
  alternates: { canonical: '/trade-in' }
};

export default function TradeInPage() {
  return (
    <Container className="space-y-12 py-16">
      <header className="surface-card space-y-4 bg-gradient-to-r from-[#121418] via-[#0f1218] to-[#19140c] p-10 text-white">
        <p className="eyebrow">Trade-In</p>
        <h1 className="max-w-3xl text-4xl font-semibold">Use your current watch toward your next one.</h1>
        <p className="max-w-2xl text-sm text-slate-300">Trade-in combines our buy offer with your target purchase. One transaction. Clean paperwork. Clear numbers.</p>
        <Button href="#trade-form" className="w-fit">Start Trade-In</Button>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Share your watch', 'Submit reference, condition, and photos for a valuation range.'],
          ['Choose replacement', 'Browse current inventory or tell us your target model.'],
          ['Settle the difference', 'Apply trade value to purchase balance and complete the deal.']
        ].map(([title, copy]) => (
          <article key={title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="surface-card p-8">
        <h3 className="text-xl font-semibold text-white">Why clients choose trade-in</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>• One point of contact from valuation to delivery.</li>
          <li>• Competitive value backed by current market demand.</li>
          <li>• Less downtime versus selling first and buying later.</li>
        </ul>
      </section>

      <section id="trade-form" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Submit your trade details</h2>
        <p className="text-sm text-slate-300">Share your current watch details and we will come back with trade options.</p>
        <SellForm action={submitTradeSubmissionAction} submissionLabel="Submit Trade Request" />
      </section>
    </Container>
  );
}
