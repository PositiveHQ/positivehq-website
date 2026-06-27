'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Container } from './container';

const links = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/sell', label: 'Sell' },
  { href: '/trade-in', label: 'Trade' },
  { href: '/consignment', label: 'Consign' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cta = pathname.startsWith('/catalog') || pathname.startsWith('/watches')
    ? { href: '/contact?intent=buy#contact-form', label: 'Request a Watch' }
    : pathname.startsWith('/sell')
      ? { href: '/sell#sell-form', label: 'Sell Watch' }
      : pathname.startsWith('/trade-in')
        ? { href: '/trade-in#trade-form', label: 'Start Trade-In' }
        : pathname.startsWith('/consignment')
          ? { href: '/consignment#consignment-review', label: 'Request Consignment Review' }
          : pathname.startsWith('/contact')
            ? { href: '/contact?intent=appointment#contact-form', label: 'Request Appointment' }
            : { href: '/contact?intent=appointment#contact-form', label: 'Start Watch Review' };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050608]/76 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center text-white" aria-label="Positive Watch HQ home">
          <Image
            src="/positive-watch-hq-wordmark-gentry-inspired.svg"
            alt="Positive Watch HQ"
            width={980}
            height={220}
            priority
            className="h-11 w-44 object-contain object-left sm:h-12 sm:w-52 lg:w-60"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 transition hover:text-amber-100">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={cta.href}
            className="hidden rounded-full border border-amber-100/35 bg-amber-100/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-100/20 sm:inline-flex"
          >
            {cta.label}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="absolute right-6 top-1/2 inline-flex -translate-y-1/2 flex-shrink-0 flex-col rounded-xl border border-white/20 p-2 text-slate-200 transition hover:border-amber-100/45 hover:text-amber-100 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-[#050608]/96 lg:hidden">
          <Container className="space-y-3 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:border-amber-100/35 hover:text-amber-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg border border-amber-100/30 bg-amber-100/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-100/20"
            >
              {cta.label}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
