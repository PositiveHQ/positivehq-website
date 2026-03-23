import { Container } from '@/components/container';
import { SellForm } from '@/components/sell-form';

export default function SellPage() {
  return (
    <Container className="space-y-12 py-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Sell Your Watch</p>
        <h1 className="text-4xl font-semibold text-slate-900">Fast, clear offers from a real dealer.</h1>
        <p className="max-w-2xl text-sm text-slate-600">Submit your watch details and photos. We review the watch, send a real offer, and pay quickly once verified.</p>
      </header>

      <section className="grid gap-6 rounded-xl bg-slate-100 p-6 md:grid-cols-3">
        {[
          ['1. Submit details', 'Include reference, condition, and accessories.'],
          ['2. Receive offer', 'Most submissions reviewed within one business day.'],
          ['3. Ship insured', 'We send insured instructions. Payment clears after verification.']
        ].map(([title, copy]) => (
          <article key={title} className="rounded-lg bg-white p-5">
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <SellForm />
    </Container>
  );
}
