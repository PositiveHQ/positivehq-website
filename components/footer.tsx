import Link from 'next/link';
import { Container } from './container';
import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-28 border-t border-white/10 bg-[#040506]">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/80">Positive Watch Co.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Buy your next watch. Sell your current one fast. Every listing is inspected, photographed in-house, and represented clearly.
          </p>
          <p className="mt-4 text-sm text-slate-300">
            Contact:{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-amber-100 transition hover:text-amber-50">
              {siteConfig.email}
            </a>{' '}
            ·{' '}
            <a href={`tel:${siteConfig.phone}`} className="text-amber-100 transition hover:text-amber-50">
              {siteConfig.phone}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Explore</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link className="block transition hover:text-amber-100" href="/watches">Shop Watches</Link>
            <Link className="block transition hover:text-amber-100" href="/sell">Sell Your Watch</Link>
            <Link className="block transition hover:text-amber-100" href="/trade-in">Trade-In</Link>
            <Link className="block transition hover:text-amber-100" href="/about">About</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Content</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link className="block transition hover:text-amber-100" href="/blog">Journal</Link>
            <Link className="block transition hover:text-amber-100" href="/newsletter">Newsletter</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
