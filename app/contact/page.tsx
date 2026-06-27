import { Metadata } from 'next';
import { Suspense } from 'react';
import { BeforeSubmit } from '@/components/before-submit';
import { Button } from '@/components/button';
import { ContactForm } from '@/components/contact-form';
import { Container } from '@/components/container';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { submitContactAction } from './actions';

const inquiryRoutes = [
  ['Buy inquiry', 'Looking for a specific model, current inventory, sourcing help, or guidance on value and condition.'],
  ['Sell inquiry', 'Send details for an immediate cash offer route with clear review and verification expectations.'],
  ['Trade inquiry', 'Use your current watch toward the next one with transparent numbers and a clean upgrade path.'],
  ['Consignment inquiry', 'Review whether a listed sale may target a stronger possible net result than an immediate offer.']
];

const contactMethods = [
  ['Phone consultations', siteConfig.phoneConsultationText, ''],
  ['Email', siteConfig.email, `mailto:${siteConfig.email}`],
  ['Instagram', '@positivewatchhq', siteConfig.social.instagram]
];

export const metadata: Metadata = {
  title: 'Contact Positive Watch HQ',
  description:
    'Contact Positive Watch HQ for buying, selling, trading, consignment, appointment requests, and general luxury watch questions.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  const siteUrl = getSiteUrl();
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Positive Watch HQ',
    url: `${siteUrl}/contact`,
    about: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.email,
      sameAs: [siteConfig.social.instagram]
    }
  };
  const appointmentHref = '/contact?intent=appointment#contact-form';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />

      <Container className="space-y-16 py-16 lg:py-20">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <p className="eyebrow">Contact</p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
                Speak with Positive Watch HQ.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                For buying, selling, trading, consignment, appointments, or general questions, send the right context and we will come back with a clear next step.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#contact-form" className="sm:min-w-52">Start Contact Form</Button>
                <Button href={appointmentHref} variant="secondary" className="sm:min-w-52">Request Appointment</Button>
                <Button href={`mailto:${siteConfig.email}`} variant="secondary" className="sm:min-w-44">Email Us</Button>
              </div>
            </div>

            <div className="grid gap-3">
              {contactMethods.map(([label, value, href]) => {
                const content = (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-amber-100/35 hover:bg-white/[0.05]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    {content}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button href={appointmentHref} variant="secondary" className="px-3 py-2 text-[10px]">Request Appointment</Button>
                      <Button href={appointmentHref} variant="secondary" className="px-3 py-2 text-[10px]">Schedule Watch Review</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {inquiryRoutes.map(([title, copy]) => (
            <article key={title} className="surface-card p-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="surface-card space-y-6 p-6 lg:p-8">
            <div>
              <p className="eyebrow">Appointment request</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Prefer a scheduled conversation?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Use the form to request an appointment or scheduled call. Include the watch reference, photos you can provide, your timing, and whether you want to buy, sell, trade, or consign.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={appointmentHref}>Request Appointment</Button>
                <Button href={appointmentHref} variant="secondary">Book Trade Consultation</Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-white">Fastest useful context</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li>• Brand, model, and reference if known.</li>
                <li>• Box, papers, year, and condition notes.</li>
                <li>• Budget, target watch, or expected net price.</li>
                <li>• Preferred appointment time or urgency.</li>
              </ul>
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Watch availability, pricing, trade values, and consignment outcomes are subject to review, verification, buyer demand, and final written terms.
            </p>
          </aside>

          <div id="contact-form" className="scroll-mt-28">
            <BeforeSubmit />
            <div className="mt-5">
              <Suspense fallback={<div className="surface-card p-6 text-sm text-slate-300">Loading contact form…</div>}>
                <ContactForm action={submitContactAction} />
              </Suspense>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
