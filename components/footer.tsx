import Link from 'next/link';
import Image from 'next/image';
import { Container } from './container';
import { siteConfig } from '@/lib/site';

const disclaimer = 'Every transaction is subject to final authentication review, condition verification, availability confirmation, and cleared payment. Offers, prices, and trade values are not final until review is complete.';

export function Footer() {
  return (
    <footer className="mt-28 border-t border-white/10 bg-[#030405]">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/positive-watch-hq-wordmark-gentry-inspired.svg"
            alt="Positive Watch HQ"
            width={980}
            height={220}
            className="h-16 w-72 object-contain object-left"
          />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            A premium watch concierge for sourcing, trade-ins, consignment, and future curated inventory with clearer details, calmer communication, and stronger presentation.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Contact:{' '}
            <a href={siteConfig.emailHref} className="text-amber-100 transition hover:text-amber-50">
              {siteConfig.emailDisplay}
            </a>
            <br />
            <span className="text-slate-400">{siteConfig.phoneConsultationText}</span>
          </p>
          <p className="mt-5 max-w-lg text-xs leading-5 text-slate-500">{disclaimer}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Explore</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link className="block transition hover:text-amber-100" href="/catalog">Catalog</Link>
            <Link className="block transition hover:text-amber-100" href="/sell">Sell</Link>
            <Link className="block transition hover:text-amber-100" href="/trade-in">Trade</Link>
            <Link className="block transition hover:text-amber-100" href="/consignment">Consign</Link>
            <Link className="block transition hover:text-amber-100" href="/process">Process</Link>
            <Link className="block transition hover:text-amber-100" href="/about">About</Link>
            <Link className="block transition hover:text-amber-100" href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Proof</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link className="block transition hover:text-amber-100" href="/recently-sold">Recently Sold</Link>
            <Link className="block transition hover:text-amber-100" href="/blog">Journal</Link>
            <Link className="block transition hover:text-amber-100" href="/newsletter">Newsletter</Link>
            <a className="block transition hover:text-amber-100" href={siteConfig.social.instagram}>Instagram</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
