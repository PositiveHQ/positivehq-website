import { Metadata } from 'next';
import { BeforeSubmit } from '@/components/before-submit';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitConsignmentSubmissionAction } from '@/app/sell/actions';

const howItWorks = [
  {
    title: '1. Initial review',
    copy: 'Send the brand, model, reference, condition notes, box/papers status, photos, and your preferred net target.'
  },
  {
    title: '2. Market plan',
    copy: 'We review current demand, comparable asking prices, realistic sell-through expectations, and presentation requirements.'
  },
  {
    title: '3. Listing agreement',
    copy: 'If consignment is the right route, the watch, reserve, commission terms, and communication plan are agreed before listing.'
  },
  {
    title: '4. Sale and settlement',
    copy: 'After a buyer completes payment and the transaction clears, proceeds are paid according to the agreed consignment terms.'
  }
];

const serviceDetails = [
  ['Expected timeline', 'Some watches move quickly; others may need weeks or longer depending on price, demand, seasonality, and buyer confidence.'],
  ['Pricing strategy', 'We position the watch around realistic market evidence: condition, completeness, recent comps, dealer spread, and desired net outcome.'],
  ['Commission structure', 'Commission is agreed before listing. Final terms should be confirmed in writing before the watch is marketed.'],
  ['Photography', 'Clean, premium photography highlights dial, case, bracelet, clasp, accessories, and any material condition details.'],
  ['Listing', 'The listing should be clear on reference, condition, box/papers, service history where known, and what is included.'],
  ['Buyer communication', 'We handle buyer questions, negotiation context, and next-step communication while keeping expectations realistic.'],
  ['Payment after sale', 'Seller payment follows buyer payment clearance, verification, and any agreed settlement terms.'],
  ['Risks and expectations', 'Consignment can target a stronger net result, but sale timing is not guaranteed and final outcome depends on market demand.']
];

export const metadata: Metadata = {
  title: 'Consign Your Watch',
  description:
    'Consign your luxury watch with a clear market plan, pricing strategy, premium photography, buyer communication, and transparent expectations from Positive Watch HQ.',
  alternates: { canonical: '/consignment' }
};

export default function ConsignmentPage() {
  return (
    <Container className="space-y-16 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-6">
          <p className="eyebrow">Consignment</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">
            Consign Your Watch With a Clear Plan
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Consignment may help sellers target a stronger net price compared to an immediate cash offer, but it may take longer and depends on market demand. Positive Watch HQ keeps the route practical: honest pricing, premium presentation, and clear expectations before the watch is listed.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#consignment-review" className="sm:min-w-64">Request a Consignment Review</Button>
            <Button href="/sell" variant="secondary" className="sm:min-w-44">Compare Cash Offer</Button>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">How consignment works</p>
          <h2 className="section-title">A structured route for sellers who can wait for the right buyer.</h2>
          <p className="text-sm leading-7 text-slate-300">
            The goal is not to promise the highest headline price. The goal is to decide whether the watch has a realistic market, present it properly, communicate clearly with buyers, and protect the seller from vague expectations.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.title} className="surface-card p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card overflow-hidden p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="eyebrow">Plan details</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">What we set before the watch goes live.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Consignment works best when the pricing, commission, photography, listing content, buyer communication, payment timing, and risk expectations are written down upfront.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {serviceDetails.map(([title, copy]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Best fit', 'Sellers who want a stronger possible net price and can allow enough time for the right buyer.'],
          ['Not guaranteed', 'No listing strategy can guarantee timing, buyer demand, final price, or acceptance of a specific reserve.'],
          ['Clear record', 'The agreed route should document watch details, commission, reserve, payout timing, and responsibilities.']
        ].map(([title, copy]) => (
          <article key={title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section id="consignment-review" className="space-y-5 scroll-mt-28">
        <div className="max-w-3xl space-y-3">
          <p className="eyebrow">Request a Consignment Review</p>
          <h2 className="section-title">Send the watch details and target outcome.</h2>
          <p className="text-sm leading-7 text-slate-300">
            Include the reference, condition, box/papers, asking or target net price, and any timing constraints in the notes. We will review whether consignment, immediate sale, or waiting is the cleaner route.
          </p>
        </div>
        <BeforeSubmit />
        <SellForm action={submitConsignmentSubmissionAction} submissionLabel="Request a Consignment Review" variant="consignment" />
      </section>

      <section className="space-y-5">
        <p className="eyebrow">FAQ</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Is consignment faster than a cash offer?', 'Usually no. Consignment may target a stronger net result, but it can take longer and depends on buyer demand.'],
            ['Who sets the asking price?', 'The pricing plan should be agreed before listing, using condition, completeness, comps, and realistic sell-through expectations.'],
            ['When is payment made?', 'Seller payment follows buyer payment clearance and the agreed settlement terms.'],
            ['Can consignment be declined?', 'Yes. If market demand, condition, reserve, or risk profile does not fit, an immediate sale or waiting may be cleaner.']
          ].map(([question, answer]) => (
            <article key={question} className="surface-card p-5">
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
