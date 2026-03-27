import { Metadata } from 'next';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Get new arrivals and watch market updates from Positive Watch Co.',
  alternates: { canonical: '/newsletter' }
};

export default function NewsletterPage() {
  return (
    <Container className="py-16">
      <section className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Newsletter</p>
        <h1 className="text-4xl font-semibold text-slate-900">Join the Positive Watch Co. list.</h1>
        <p className="text-sm text-slate-600">Receive first access to new arrivals, watch market context, and practical buying/selling insights from our team.</p>
        <NewsletterForm />
      </section>
    </Container>
  );
}
