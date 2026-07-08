import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { getSiteUrl, siteConfig } from '@/lib/site';

const philosophy = [
  ['Trust before transaction', 'The details matter before anyone commits: reference, condition, accessories, payment path, and verification expectations.'],
  ['Clarity over pressure', 'Luxury watch decisions should not rely on vague promises or fake urgency. The right deal can stand up to documentation.'],
  ['Condition-first review', 'We focus on honest condition notes, photos, completeness, service context where known, and any material limitations.'],
  ['Long-term relationships', 'The goal is not a single rushed sale. It is to become a reliable contact for collectors, sellers, and first-time buyers.']
];

const founderNotes = [
  'Founder: Nicola Trani / Mr.Positive',
  'New Jersey-based, appointment-led, with shipping options available where appropriate',
  'Instagram: @mr.positive'
];

export const metadata: Metadata = {
  title: 'About Positive Watch HQ',
  description:
    'Learn who Positive Watch HQ is, why it exists, and how its appointment-only concierge approach supports trust, clarity, condition review, and long-term watch relationships.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Positive Watch HQ',
    url: `${siteUrl}/about`,
    about: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.email,
      contactPoint: siteConfig.contactEmails.map((email) => ({
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email
      })),
      sameAs: [siteConfig.social.instagram, siteConfig.social.founderInstagram]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />

      <Container className="space-y-16 py-16 lg:py-20">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
          <div className="relative max-w-5xl space-y-6">
            <p className="eyebrow">About Positive Watch HQ</p>
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
              Built for clarity, trust, and better luxury watch transactions.
            </h1>
            <p className="max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
              Positive Watch HQ was built to sell luxury watches with a cleaner trade-in path. Every conversation should be clear, documented, and handled with respect from first message to final delivery.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" className="sm:min-w-52">Contact the Team</Button>
              <Button href="/catalog" variant="secondary" className="sm:min-w-44">Brands & Requests</Button>
            </div>
          </div>
        </header>

        <section className="surface-card overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(253,230,138,0.12),transparent_36%),#050608] p-8 lg:border-b-0 lg:border-r lg:border-white/10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_42%,transparent_44%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_25%)]" />
              <Image
                src="/media/nicola-trani-founder-speaking.webp"
                alt="Nicola Trani speaking at a private event"
                width={920}
                height={1346}
                quality={100}
                priority
                sizes="(min-width: 1024px) 360px, 78vw"
                className="relative h-auto w-full max-w-sm rounded-[2rem] border border-amber-100/20 object-cover shadow-[0_28px_70px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div className="p-6 lg:p-8">
              <p className="eyebrow">Founder</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Nicola Trani / Mr.Positive</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Positive Watch HQ was built by Nicola Trani, also known as Mr.Positive, with a simple belief: high-value watch transactions should be clear, documented, and handled with respect. The goal is not hype or pressure. The goal is a cleaner way to buy, sell, trade, and consign luxury watches with honest communication from first message to final delivery.
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                {founderNotes.map((note) => (
                  <li key={note} className="rounded-2xl border border-white/10 bg-black/25 p-4">{note}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={siteConfig.social.founderInstagram} variant="secondary">Instagram</Button>
                <Button href="/contact">Request Consultation</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Who we are</p>
            <h2 className="section-title">A concierge watch business for serious decisions.</h2>
            <p className="text-sm leading-7 text-slate-300">
              Positive Watch HQ helps clients choose the next watch and trade in the current one with a calm, appointment-led approach. The process stays clear before a watch moves, payment clears, or final decision is made.
            </p>
          </div>
          <div className="surface-card p-6 lg:p-8">
            <p className="eyebrow">Why we exist</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">The watch market can feel noisy. We make the next step cleaner.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A luxury watch transaction often involves meaningful money, condition nuance, authentication risk, shipping risk, and timing pressure. Positive Watch HQ exists to slow the process down enough to review the details, communicate the trade-offs, and keep expectations realistic.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {philosophy.map(([title, copy]) => (
            <article key={title} className="surface-card p-6">
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-amber-100 to-transparent" />
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,166,91,0.16),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(118,142,190,0.13),transparent_34%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">Our philosophy</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Respect the watch. Respect the client. Document the deal.</h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-slate-300">
              <p>
                We focus on trust, clarity, condition, and long-term relationships. That means clear communication around what is known, what still needs to be verified, and what happens next.
              </p>
              <p>
                Every transaction is subject to verification, condition review, availability confirmation, and cleared payment. We do not want a client to feel rushed into a decision they do not understand.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:items-start">
          <article className="surface-card p-6 lg:p-8">
            <p className="eyebrow">Appointment-only / concierge positioning</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">A focused experience, not a crowded sales floor.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Positive Watch HQ is appointment-led and concierge-style. If a client wants a watch or wants to trade into one, the best next step is to share the target model, trade details, and schedule a focused conversation.
            </p>
            <Button href="/contact?intent=appointment#contact-form" className="mt-6">Request Appointment</Button>
          </article>
        </section>

        <section className="surface-card grid gap-8 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
          <div>
            <p className="eyebrow">Contact information</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Start with the details. We will guide the next step.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              For buying, selling, trading, consignment, or appointment requests, contact Positive Watch HQ directly.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">Phone</p>
              <p className="mt-2 text-sm font-semibold text-white">{siteConfig.phoneConsultationText}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button href="/contact?intent=appointment#contact-form" variant="secondary" className="px-3 py-2 text-[10px]">Schedule Watch Review</Button>
                <Button href="/contact?intent=appointment#contact-form" variant="secondary" className="px-3 py-2 text-[10px]">Book Trade Consultation</Button>
              </div>
            </div>
            <a href={siteConfig.emailHref} className="rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-amber-100/35">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">Email</p>
              <p className="mt-2 break-all text-sm font-semibold text-white">{siteConfig.emailDisplay}</p>
            </a>
            <a href={siteConfig.social.instagram} className="rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-amber-100/35">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">Instagram</p>
              <p className="mt-2 text-sm font-semibold text-white">@positivewatchhq</p>
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
