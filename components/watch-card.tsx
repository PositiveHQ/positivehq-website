import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/data/watches';
import { formatPrice } from '@/lib/utils';

export function WatchCard({ watch }: { watch: Watch }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={watch.image} alt={`${watch.brand} ${watch.model}`} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">{watch.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{watch.model}</h3>
          <p className="text-sm text-slate-600">Ref. {watch.reference}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">{formatPrice(watch.price)}</span>
          <span className="text-slate-500">{watch.condition}</span>
        </div>
        <Link href={`/watches/${watch.slug}`} className="inline-flex text-sm font-medium text-slate-800 underline-offset-4 hover:underline">
          View Details
        </Link>
      </div>
    </article>
  );
}
