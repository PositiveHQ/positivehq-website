import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/types/watch';
import { formatBoxAndPapers, formatPrice, formatWatchStatus } from '@/lib/utils';

export function WatchCard({ watch, isSampleInventory = false }: { watch: Watch; isSampleInventory?: boolean }) {
  const primaryImage = watch.images.find((image) => image.isPrimary) ?? watch.images[0];
  if (!primaryImage) return null;

  return (
    <article className="group surface-card overflow-hidden hover:-translate-y-1 hover:border-amber-100/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="eager"
          className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {!isSampleInventory && (
            <span className="rounded-full border border-emerald-200/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
              {formatWatchStatus(watch.status)}
            </span>
          )}
          {isSampleInventory && (
            <span className="rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100">
              Example Inventory Layout — Demo Only
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-100/75">{watch.brand}</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{watch.model}</h3>
          <p className="mt-1 text-sm text-slate-300">Ref. {watch.reference}</p>
        </div>

        <div className="flex items-center justify-between gap-4 border-y border-white/10 py-4">
          <span className="text-2xl font-semibold text-amber-100">{isSampleInventory ? 'Example ' : ''}{formatPrice(watch.price)}</span>
          <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{watch.year}</span>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Condition</dt>
            <dd className="mt-1 font-medium text-slate-100">{watch.condition}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Box/Papers</dt>
            <dd className="mt-1 font-medium text-slate-100">{formatBoxAndPapers(watch.box, watch.papers)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Case</dt>
            <dd className="mt-1 font-medium text-slate-100">{watch.caseSize}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Availability</dt>
            <dd className="mt-1 font-medium text-slate-100">{isSampleInventory ? 'Demo only' : formatWatchStatus(watch.status)}</dd>
          </div>
        </dl>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/watches/${watch.slug}`}
            className="inline-flex items-center justify-center rounded-xl border border-amber-100/25 bg-amber-100/90 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-50"
          >
            {isSampleInventory ? 'View Example' : 'View Watch'}
          </Link>
          <Link
            href={isSampleInventory ? `/contact?intent=buy&brand=${encodeURIComponent(watch.brand)}&model=${encodeURIComponent(watch.model)}&reference=${encodeURIComponent(watch.reference)}#contact-form` : `/watches/${watch.slug}#watch-inquiry`}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:border-amber-100/45 hover:bg-white/10"
          >
            {isSampleInventory ? 'Request Similar Watch' : 'Ask About This Watch'}
          </Link>
        </div>
      </div>
    </article>
  );
}
