import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Watch Guides',
  description: 'Practical guides for buying, selling, trading, and valuing luxury watches.',
  alternates: { canonical: '/guides' }
};

const guides = [
  ['Selling a watch', 'What affects value, what documents help, and why inspection matters.', '/sell-your-watch'],
  ['Getting an estimate', 'Why online ranges are directional until authentication and market review.', '/value-estimate'],
  ['Buying confidently', 'How to review condition, provenance, availability, and transaction terms.', '/watches']
];

export default function GuidesPage() {
  return (
    <Container className="space-y-10 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Guides</p>
        <h1 className="section-title">Plain-language watch guidance.</h1>
        <p className="max-w-2xl text-sm text-slate-300">Start with the essentials before buying, selling, or trading. Values fluctuate, and every transaction should be verified before completion.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {guides.map(([title, copy, href]) => (
          <Link key={title} href={href} className="surface-card block p-6 transition hover:border-amber-100/35">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{copy}</p>
          </Link>
        ))}
      </section>
    </Container>
  );
}
