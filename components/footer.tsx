import Link from 'next/link';
import { Container } from './container';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-base font-semibold tracking-wide text-slate-900">Positive Watch Co.</p>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            Buy your next watch. Sell your current one fast. Every listing is inspected, photographed in-house, and represented clearly.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Explore</p>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-slate-900" href="/watches">Shop Watches</Link>
            <Link className="block hover:text-slate-900" href="/sell">Sell Your Watch</Link>
            <Link className="block hover:text-slate-900" href="/trade-in">Trade-In</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Content</p>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-slate-900" href="/blog">Journal</Link>
            <Link className="block hover:text-slate-900" href="/newsletter">Newsletter</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
