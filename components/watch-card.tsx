import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/types/watch';
import { formatBoxAndPapers, formatPrice, formatWatchStatus } from '@/lib/utils';

export function WatchCard({ watch, isSampleInventory = false }: { watch: Watch; isSampleInventory?: boolean }) {
  const primaryImage = watch.images.find((image) => image.isPrimary) ?? watch.images[0];
  if (!primaryImage) return null;

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] shadow-[0_18px_55px_rgba(0,0,0,0.36)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-100/30 hover:shadow-[0_26px_80px_rgba(0,0,0,0.58)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.045] group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
            {isSampleInventory ? 'Example request' : formatWatchStatus(watch.status)}
          </span>
          {watch.box && watch.papers && (
            <span className="rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100 backdrop-blur-xl">
              Box/papers considered
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/80">{watch.brand}</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{watch.model}</h3>
          <p className="mt-1 text-sm text-slate-400">Ref. {watch.reference}</p>
        </div>

        <div className="space-y-2 border-y border-white/10 py-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{isSampleInventory ? 'Market context' : 'Price'}</p>
          <div className="flex items-center justify-between gap-4">
            <span className={isSampleInventory ? 'text-base font-semibold text-white' : 'text-2xl font-semibold text-white'}>
              {isSampleInventory ? 'Market range reviewed privately' : formatPrice(watch.price)}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">{watch.year}</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Condition</dt>
            <dd className="mt-1 font-medium text-slate-100">Reviewed privately</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Box/Papers</dt>
            <dd className="mt-1 font-medium text-slate-100">{formatBoxAndPapers(watch.box, watch.papers)}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Case</dt>
            <dd className="mt-1 font-medium text-slate-100">{watch.caseSize}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Availability</dt>
            <dd className="mt-1 font-medium text-slate-100">{isSampleInventory ? 'Availability reviewed privately' : formatWatchStatus(watch.status)}</dd>
          </div>
        </dl>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/contact?intent=buy&brand=${encodeURIComponent(watch.brand)}&model=${encodeURIComponent(watch.model)}&reference=${encodeURIComponent(watch.reference)}#contact-form`}
            className="inline-flex items-center justify-center rounded-xl border border-amber-100/30 bg-amber-100 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-50"
          >
            Request Similar
          </Link>
          <Link
            href={`/contact?intent=buy&brand=${encodeURIComponent(watch.brand)}&model=${encodeURIComponent(watch.model)}&reference=${encodeURIComponent(watch.reference)}#contact-form`}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-100/35 hover:bg-white/10"
          >
            Discuss Model
          </Link>
        </div>
      </div>
    </article>
  );
}
