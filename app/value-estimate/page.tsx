import { Metadata } from 'next';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitSellSubmissionAction } from '@/app/sell/actions';

export const metadata: Metadata = {
  title: 'Watch Value Estimate',
  description: 'Request a practical watch value estimate from Positive Watch Co.',
  alternates: { canonical: '/value-estimate' }
};

export default function ValueEstimatePage() {
  return (
    <Container className="space-y-10 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Value Estimate</p>
        <h1 className="section-title">Get a practical starting range.</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Share the watch, condition, and accessories. Estimates are directional and not guaranteed offers until review, authentication, and inspection are complete.
        </p>
      </header>
      <SellForm action={submitSellSubmissionAction} submissionLabel="Request Estimate" />
    </Container>
  );
}
