import Link from 'next/link';
import { Container } from './container';

const links = [
  { href: '/watches', label: 'Shop Watches' },
  { href: '/sell', label: 'Sell' },
  { href: '/trade-in', label: 'Trade-In' },
  { href: '/blog', label: 'Journal' },
  { href: '/newsletter', label: 'Newsletter' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide text-slate-900">
          POSITIVE WATCH CO.
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/sell"
          className="rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
        >
          Get Offer
        </Link>
      </Container>
    </header>
  );
}
