import { Button } from '@/components/button';
import { Container } from '@/components/container';

export default function TradeInPage() {
  return (
    <Container className="space-y-12 py-16">
      <header className="space-y-4 rounded-2xl bg-slate-900 p-10 text-white">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Trade-In</p>
        <h1 className="max-w-3xl text-4xl font-semibold">Use your current watch toward your next one.</h1>
        <p className="max-w-2xl text-sm text-slate-300">Trade-in combines our buy offer with your target purchase. One transaction. Clean paperwork. Clear numbers.</p>
        <Button href="/sell" className="w-fit">Start Trade-In</Button>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Share your watch', 'Submit reference, condition, and photos for a valuation range.'],
          ['Choose replacement', 'Browse current inventory or tell us your target model.'],
          ['Settle the difference', 'Apply trade value to purchase balance and complete the deal.']
        ].map(([title, copy]) => (
          <article key={title} className="rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-8">
        <h3 className="text-xl font-semibold text-slate-900">Why clients choose trade-in</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>• One point of contact from valuation to delivery.</li>
          <li>• Competitive value backed by current market demand.</li>
          <li>• Less downtime versus selling first and buying later.</li>
        </ul>
      </section>
    </Container>
  );
}
