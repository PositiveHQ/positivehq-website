import { Metadata } from 'next';
import { Container } from '@/components/container';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Positive Watch Co. handles personal information submitted through the website.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-4xl space-y-8 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Privacy</p>
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-sm text-slate-300">Pre-launch placeholder. Last updated May 18, 2026.</p>
      </header>
      <section className="surface-card space-y-5 p-6 text-sm leading-7 text-slate-300">
        <p>We collect information you submit through forms, including contact details, watch details, and messages. We use this information to respond to inquiries, review potential transactions, provide estimates, and operate the website.</p>
        <p>Watch values fluctuate, and any estimate provided through the site is not a guaranteed offer. Authentication, ownership review, and physical inspection may be required before any transaction is completed.</p>
        <p>We may use AI-assisted tools to draft, organize, or review website content and inbound lead information. Users should verify all watch details, pricing, and transaction terms before transacting.</p>
        <p>We do not intend to sell personal information. Access to lead records should be limited to authorized operators. Production data storage and retention should be reviewed before launch.</p>
        <p>Questions can be sent to <a className="text-amber-100" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
      </section>
    </Container>
  );
}
