import { Metadata } from 'next';
import { Container } from '@/components/container';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn how Positive Watch Co. sources, authenticates, and supports every watch transaction.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <Container className="space-y-12 py-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">About</p>
        <h1 className="text-4xl font-semibold text-slate-900">Built on clarity, not hype.</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Positive Watch Co. is an independent luxury watch dealer focused on clean inventory, transparent condition reporting, and professional service.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Authentication first', 'Every watch is inspected and represented with detailed photos and objective notes.'],
          ['Transparent sourcing', 'We prioritize verifiable ownership history and complete sets where available.'],
          ['Direct communication', `Questions are handled by specialists. Reach us at ${siteConfig.email} or ${siteConfig.phone}.`]
        ].map(([title, text]) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </Container>
  );
}
