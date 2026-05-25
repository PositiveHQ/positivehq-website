import { Metadata } from 'next';
import { Container } from '@/components/container';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Pre-launch terms for using the Positive Watch Co. website.',
  alternates: { canonical: '/terms' }
};

export default function TermsPage() {
  return (
    <Container className="max-w-4xl space-y-8 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Terms</p>
        <h1 className="section-title">Terms of Use</h1>
        <p className="text-sm text-slate-300">Pre-launch placeholder. Last updated May 18, 2026.</p>
      </header>
      <section className="surface-card space-y-5 p-6 text-sm leading-7 text-slate-300">
        <p>The website is provided for informational and lead intake purposes. Listings, estimates, availability, and pricing may change without notice.</p>
        <p>Positive Watch Co. is not a financial advisor, investment advisor, or tax advisor. Watch values fluctuate, and past market behavior does not guarantee future value.</p>
        <p>Estimates are not guaranteed offers. Any purchase, sale, or trade may require authentication, physical inspection, verification of ownership, and final written confirmation.</p>
        <p>Users are responsible for verifying watch details, condition, pricing, and transaction terms before transacting. We may decline or revise any transaction where information is incomplete or inaccurate.</p>
        <p>Website content may be created or refined with AI-assisted tools and should be independently verified before reliance. Contact <a className="text-amber-100" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with questions.</p>
      </section>
    </Container>
  );
}
