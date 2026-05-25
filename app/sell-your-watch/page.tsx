import { Metadata } from 'next';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitSellSubmissionAction } from '@/app/sell/actions';

export const metadata: Metadata = {
  title: 'Sell Your Watch',
  description: 'Submit your watch details and receive a clear offer from Positive Watch Co.',
  alternates: { canonical: '/sell-your-watch' }
};

export default function SellYourWatchPage() {
  return (
    <Container className="space-y-12 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Sell Your Watch</p>
        <h1 className="section-title">Fast, clear offers from a real dealer.</h1>
        <p className="max-w-2xl text-sm text-slate-300">Submit your watch details and photos. We review the watch, send a real offer, and pay quickly once verified.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['1. Submit details', 'Include reference, condition, and accessories.'],
          ['2. Receive offer', 'Most submissions reviewed within one business day.'],
          ['3. Ship insured', 'We send insured instructions. Payment clears after verification.']
        ].map(([title, copy]) => (
          <article key={title} className="surface-card p-5">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <SellForm action={submitSellSubmissionAction} submissionLabel="Submit Sell Request" />
    </Container>
  );
}
