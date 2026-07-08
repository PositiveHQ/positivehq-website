import { Metadata } from 'next';
import { BeforeSubmit } from '@/components/before-submit';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitTradeSubmissionAction } from '@/app/sell/actions';

const faqs = [
  ['Is the trade value guaranteed?', 'No. Final trade value is subject to authentication, condition verification, market demand, and deal structure.'],
  ['Can I trade toward any watch?', 'You can request any target watch. We will confirm availability, price, and whether the trade structure makes sense.'],
  ['What if I owe money on the trade?', 'Share the expected cash difference if known. We will outline the balance once both sides are reviewed.'],
  ['Do photos matter?', 'Yes. Clear photos of case, bezel, crystal, bracelet, clasp, serial/reference areas where appropriate, and accessories speed up review.']
];

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
        <p className="max-w-2xl text-sm leading-7 text-slate-300">Trade-in combines your current watch value with your target purchase. One conversation. Clear numbers. Final value after review.</p>
        <Button href="#trade-form" className="w-fit">Start Trade-In</Button>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Share your watch', 'Submit reference, condition, box/papers, service history, and photos.'],
          ['Choose replacement', 'Request the target watch desired so we can review sourcing options.'],
          ['Settle cleanly', 'We confirm value, payment difference, verification, and shipping.']
        ].map(([title, copy]) => (
          <article key={title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="surface-card p-8">
        <h3 className="text-xl font-semibold text-white">Trade value note</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Estimated value range will be provided after review. Final trade value is subject to authentication, condition verification, market demand, and deal structure.
        </p>
      </section>

      <section id="trade-form" className="space-y-4 scroll-mt-28">
        <h2 className="text-2xl font-semibold text-white">Submit your trade details</h2>
        <p className="text-sm text-slate-300">Share your current watch and the target watch you want. We will come back with trade options.</p>
        <BeforeSubmit />
        <SellForm action={submitTradeSubmissionAction} submissionLabel="Submit Trade Request" variant="trade" />
      </section>

      <section className="space-y-5">
        <p className="eyebrow">FAQ</p>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="surface-card p-5">
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
