import Link from 'next/link';
import { redirect } from 'next/navigation';
import { clearAdminSession, isAdminAuthenticated } from '@/lib/admin-auth';
import { getAdminWatches } from '@/lib/repositories/watches';
import { formatPrice, formatWatchStatus } from '@/lib/utils';
import { deleteWatchAction, quickUpdateWatchAction } from './actions';

async function logoutAction() {
  'use server';
  await clearAdminSession();
  redirect('/admin/login');
}

export default async function AdminWatchesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const watches = await getAdminWatches();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Watch Inventory</h1>
          <p className="mt-1 text-sm text-slate-600">Manage visibility, featured status, and watch details.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/watches/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Add Watch</Link>
          <form action={logoutAction}>
            <button type="submit" className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Logout</button>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Watch</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watches.map((watch) => (
              <tr key={watch.id} className="border-t border-slate-200 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{watch.brand} {watch.model}</p>
                  <p className="text-xs text-slate-500">Ref {watch.reference} · {watch.slug}</p>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{formatPrice(watch.price)}</td>
                <td className="px-4 py-3">
                  <form action={quickUpdateWatchAction.bind(null, watch.id)} className="space-y-2">
                    <input type="hidden" name="brand" value={watch.brand} />
                    <input type="hidden" name="model" value={watch.model} />
                    <input type="hidden" name="reference" value={watch.reference} />
                    <input type="hidden" name="price" value={watch.price} />
                    <input type="hidden" name="condition" value={watch.condition} />
                    <input type="hidden" name="year" value={watch.year} />
                    <input type="hidden" name="description" value={watch.description} />
                    <input type="hidden" name="slug" value={watch.slug} />
                    <input type="hidden" name="movement" value={watch.movement} />
                    <input type="hidden" name="caseSize" value={watch.caseSize} />
                    <input type="hidden" name="material" value={watch.material} />
                    <input type="hidden" name="dial" value={watch.dial} />
                    <input type="hidden" name="bracelet" value={watch.bracelet} />
                    <input type="hidden" name="sku" value={watch.sku} />
                    <input type="hidden" name="primaryImageUrl" value={watch.images[0]?.url ?? ''} />
                    <input type="hidden" name="primaryImageAlt" value={watch.images[0]?.alt ?? ''} />
                    <input type="hidden" name="box" value={String(watch.box)} />
                    <input type="hidden" name="papers" value={String(watch.papers)} />

                    <select name="status" defaultValue={watch.status} className="rounded border border-slate-300 px-2 py-1 text-xs">
                      <option value="in_stock">{formatWatchStatus('in_stock')}</option>
                      <option value="reserved">{formatWatchStatus('reserved')}</option>
                      <option value="sold">{formatWatchStatus('sold')}</option>
                    </select>
                    <select name="visibility" defaultValue={watch.visibility} className="ml-2 rounded border border-slate-300 px-2 py-1 text-xs">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    <label className="ml-2 inline-flex items-center gap-1 text-xs text-slate-700">
                      <input type="checkbox" name="featured" defaultChecked={Boolean(watch.featured)} /> Featured
                    </label>
                    <button type="submit" className="ml-2 rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100">Save</button>
                  </form>
                </td>
                <td className="px-4 py-3 text-slate-700">{watch.visibility}</td>
                <td className="px-4 py-3 text-slate-700">{watch.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/watches/${watch.id}/edit`} className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100">Edit</Link>
                    <form action={deleteWatchAction.bind(null, watch.id)}>
                      <button type="submit" className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Note: create/edit/delete write operations require Supabase env keys and migrated tables.</p>
    </div>
  );
}
