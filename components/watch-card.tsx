import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/types/watch';
import { formatPrice, formatWatchStatus } from '@/lib/utils';

export function WatchCard({ watch }: { watch: Watch }) {
  const primaryImage = watch.images.find((image) => image.isPrimary) ?? watch.images[0];
  if (!primaryImage) return null;

  return (
    <article className="group surface-card overflow-hidden hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-100/75">{watch.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{watch.model}</h3>
          <p className="text-sm text-slate-300">Ref. {watch.reference}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white">{formatPrice(watch.price)}</span>
          <span className="text-slate-400">{formatWatchStatus(watch.status)}</span>
        </div>
        <Link
          href={`/watches/${watch.slug}`}
          className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:text-amber-50"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
