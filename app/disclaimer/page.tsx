import { Metadata } from 'next';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers about watch estimates, values, authentication, and website content.',
  alternates: { canonical: '/disclaimer' }
};

export default function DisclaimerPage() {
  return (
    <Container className="max-w-4xl space-y-8 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Disclaimer</p>
        <h1 className="section-title">Important Disclaimer</h1>
        <p className="text-sm text-slate-300">Pre-launch placeholder. Last updated May 18, 2026.</p>
      </header>
      <section className="surface-card space-y-5 p-6 text-sm leading-7 text-slate-300">
        <p>Positive Watch Co. is not a financial advisor. Watches should not be treated as guaranteed investments, and market values can move quickly based on condition, provenance, demand, macro conditions, and brand-specific factors.</p>
        <p>Online value estimates, trade ranges, and example pricing are not guaranteed offers. Final offers may change after authentication, physical inspection, ownership review, and review of accessories or documentation.</p>
        <p>We work to present accurate information, but users should verify references, condition, service history, photos, prices, availability, and transaction terms before buying, selling, or trading.</p>
        <p>Website copy and operational content may be AI-assisted. AI-assisted content can contain errors or omissions and should not replace direct verification with our team.</p>
      </section>
    </Container>
  );
}
