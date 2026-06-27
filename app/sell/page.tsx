import { Metadata } from 'next';
import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';
import { submitSellSubmissionAction } from './actions';

const process = [
  ['1. Submit details', 'Send brand, model, reference, year, condition, box/papers, service history, photos, and timing.'],
  ['2. Market review', 'We compare current demand, resale value, condition risk, completeness, and expected dealer spread.'],
  ['3. Clear offer', 'You receive a cash offer with the assumptions explained before any next step.'],
  ['4. Verify and settle', 'Final offer is confirmed after authentication, condition review, availability of details, and cleared payment path.']
];

const valueFactors = ['Brand and model demand', 'Reference and configuration', 'Year and warranty status', 'Condition and polishing', 'Box, papers, tags, links', 'Service history', 'Aftermarket parts', 'Market liquidity'];
const brands = ['Rolex', 'Omega', 'Cartier', 'Tudor', 'Grand Seiko', 'Breitling', 'Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'Other quality Swiss/Japanese luxury watches'];
const faqs = [
  ['Is the first offer final?', 'No. Offers are not final until authentication review, condition verification, and deal terms are complete.'],
  ['Do I need box and papers?', 'No, but full sets usually support stronger value and buyer confidence.'],
  ['Can I sell a watch with aftermarket parts?', 'Possibly, but aftermarket parts can materially reduce value and must be disclosed.'],
  ['How fast can I get paid?', 'Timing depends on review, shipping or appointment route, verification, and cleared payment.']
];

export const metadata: Metadata = {
  title: 'Sell Your Watch',
  description: 'Sell your luxury watch with a clear, honest cash offer based on brand, model, reference, condition, box/papers, market demand, and resale value.',
  alternates: { canonical: '/sell' }
};

export default function SellPage() {
  return (
    <Container className="space-y-14 py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-amber-100/[0.08] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-20 -translate-y-24 rounded-full bg-amber-100/12 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="eyebrow">Sell</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-6xl">Sell Your Watch With a Clear, Honest Offer</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Submit your watch details and receive a transparent cash offer based on brand, model, reference, condition, box/papers, current market demand, and resale value.
          </p>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-4">
        {process.map(([title, copy]) => (
          <article key={title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="surface-card p-7">
          <p className="eyebrow">How we price offers</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Market value minus real selling risk.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Cash offers consider likely resale value, current buyer demand, condition risk, time to sell, fees, shipping, payment risk, and margin required to operate responsibly.
          </p>
        </article>
        <article className="surface-card p-7">
          <p className="eyebrow">What affects value</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {valueFactors.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-sm text-slate-300">{item}</p>)}
          </div>
        </article>
      </section>

      <section className="surface-card p-7">
        <p className="eyebrow">What brands we buy</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Desirable luxury watches with clear market demand.</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => <p key={brand} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-slate-100">{brand}</p>)}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="eyebrow">After you submit</p>
          <h2 className="section-title mt-3">We review, clarify, then offer.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">If the watch is a fit, we will ask any missing questions, review photos, explain the offer logic, and outline the cleanest verification/payment route.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="surface-card p-5">
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sell-form" className="space-y-5 scroll-mt-28">
        <div>
          <p className="eyebrow">Sell form</p>
          <h2 className="section-title mt-3">Send the details.</h2>
        </div>
        <SellForm action={submitSellSubmissionAction} submissionLabel="Submit Sell Request" variant="sell" />
      </section>
    </Container>
  );
}
