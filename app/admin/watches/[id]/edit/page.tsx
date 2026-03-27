import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getWatchById } from '@/lib/repositories/watches';
import { deleteWatchImageAction, setPrimaryWatchImageAction, updateWatchAction, uploadWatchImageAction } from '../../actions';
import { WatchForm } from '../../watch-form';

export default async function EditAdminWatchPage({ params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const watch = await getWatchById(params.id);
  if (!watch) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">Edit Watch</h1>
        <Link href="/admin/watches" className="text-sm text-slate-600 hover:text-slate-900">Back to inventory</Link>
      </div>

      <WatchForm action={updateWatchAction.bind(null, watch.id)} watch={watch} submitLabel="Save Changes" />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Image Gallery</h2>

        <form action={uploadWatchImageAction.bind(null, watch.id)} className="grid gap-3 md:grid-cols-4">
          <input type="file" name="image" accept="image/*" required className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
          <input type="text" name="altText" placeholder="Alt text" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <label className="inline-flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <input type="checkbox" name="makePrimary" /> Set as primary
          </label>
          <button type="submit" className="w-fit rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Upload Image</button>
        </form>

        <div className="grid gap-4 md:grid-cols-3">
          {watch.images.map((image) => (
            <article key={image.id} className="rounded-lg border border-slate-200 p-3">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-600">{image.alt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {!image.isPrimary && (
                  <form action={setPrimaryWatchImageAction.bind(null, watch.id, image.id)}>
                    <button type="submit" className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100">Set Primary</button>
                  </form>
                )}
                {image.isPrimary && <span className="rounded bg-slate-900 px-2 py-1 text-xs text-white">Primary</span>}
                <form action={deleteWatchImageAction.bind(null, watch.id, image.id)}>
                  <button type="submit" className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50">Remove</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
