import { Metadata } from 'next';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { submitNewsletterAction } from './actions';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Get new arrivals and watch market updates from Positive Watch HQ.',
  alternates: { canonical: '/newsletter' }
};

export default function NewsletterPage() {
  return (
    <Container className="py-16">
      <section className="surface-card mx-auto max-w-3xl space-y-6 p-10 text-center">
        <p className="eyebrow">Newsletter</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Join the Positive Watch HQ list.</h1>
        <p className="text-sm leading-7 text-slate-300">Receive first access to new arrivals, watch market context, and practical buying/selling insights from our team.</p>
        <NewsletterForm action={submitNewsletterAction} sourcePage="/newsletter" />
      </section>
    </Container>
  );
}
