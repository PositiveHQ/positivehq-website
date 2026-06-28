'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from './container';

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Shop' },
  { href: '/catalog#brands', label: 'Brands' },
  { href: '/sell', label: 'Sell' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const utilityLinks = [
  { href: '/contact?intent=buy#contact-form', label: 'Wishlist', icon: '♡' },
  { href: '/contact?intent=appointment#contact-form', label: 'Account', icon: '◌' },
  { href: '/contact?intent=buy#contact-form', label: 'Cart', icon: '○' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const cta = pathname.startsWith('/catalog') || pathname.startsWith('/watches')
    ? { href: '/contact?intent=buy#contact-form', label: 'Request a Watch' }
    : pathname.startsWith('/sell')
      ? { href: '/sell#sell-form', label: 'Sell Watch' }
      : pathname.startsWith('/trade-in')
        ? { href: '/trade-in#trade-form', label: 'Start Trade-In' }
        : pathname.startsWith('/consignment')
          ? { href: '/consignment#consignment-review', label: 'Request Consignment Review' }
          : { href: '/sell#sell-form', label: 'Sell Your Watch' };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 border-b transition duration-300 ${solid || open ? 'border-white/10 bg-[#050608]/92 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl' : 'border-white/5 bg-[#050608]/42 backdrop-blur-xl'}`}>
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

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 transition duration-300 hover:text-amber-100">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 xl:flex">
              {utilityLinks.map((link) => (
                <Link key={link.label} href={link.href} aria-label={link.label} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-sm text-slate-200 transition duration-300 hover:border-amber-100/35 hover:text-amber-100">
                  {link.icon}
                </Link>
              ))}
            </div>
            <Link
              href={cta.href}
              className="hidden rounded-full border border-amber-100/35 bg-amber-100/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 transition duration-300 hover:bg-amber-100/20 sm:inline-flex"
            >
              {cta.label}
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex flex-shrink-0 flex-col rounded-xl border border-white/20 p-2 text-slate-200 transition hover:border-amber-100/45 hover:text-amber-100 lg:hidden"
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
              {[...links, { href: '/trade-in', label: 'Trade' }, { href: '/consignment', label: 'Consign' }].map((link) => (
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

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/10 bg-[#050608]/90 px-2 py-2 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden" aria-label="Mobile bottom navigation">
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            { href: '/', label: 'Home', icon: '⌂' },
            { href: '/catalog', label: 'Shop', icon: '◈' },
            { href: '/sell', label: 'Sell', icon: '$' },
            { href: '/contact?intent=buy#contact-form', label: 'Wish', icon: '♡' },
            { href: '/contact', label: 'Contact', icon: '•' }
          ].map((item) => (
            <Link key={item.label} href={item.href} className="rounded-xl px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-300 transition hover:bg-white/5 hover:text-amber-100">
              <span className="block text-base leading-none">{item.icon}</span>
              <span className="mt-1 block">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
