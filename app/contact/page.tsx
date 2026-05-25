import { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Container } from '@/components/container';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Positive Watch Co. about buying, selling, trading, or valuing a watch.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6">
        <header className="space-y-3">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Talk with Positive Watch Co.</h1>
          <p className="max-w-2xl text-sm text-slate-300">Send a question about a watch, selling, trading, or an estimate. We will review and respond directly.</p>
        </header>
        <ContactForm />
      </section>
      <aside className="surface-card h-fit space-y-4 p-6 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Direct contact</h2>
        <p><a className="text-amber-100" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
        <p><a className="text-amber-100" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
        <p>Estimates are not guaranteed offers. Authentication and inspection may be required before a final transaction.</p>
      </aside>
    </Container>
  );
}
