import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Positive Watch Co.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return (
    <Container className="max-w-3xl py-16">
      <section className="surface-card space-y-5 p-8">
        <p className="eyebrow">Received</p>
        <h1 className="section-title">Thank you.</h1>
        <p className="text-sm leading-7 text-slate-300">
          Your submission has been received. Our team will review the details and follow up directly. Any value estimate is subject to market movement, authentication, and inspection.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/watches" className="text-amber-100 transition hover:text-amber-50">Browse watches</Link>
          <Link href="/guides" className="text-amber-100 transition hover:text-amber-50">Read guides</Link>
        </div>
      </section>
    </Container>
  );
}
