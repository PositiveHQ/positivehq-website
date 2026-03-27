import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { createWatchAction } from '../actions';
import { WatchForm } from '../watch-form';

export default async function NewAdminWatchPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">Add New Watch</h1>
        <Link href="/admin/watches" className="text-sm text-slate-600 hover:text-slate-900">Back to inventory</Link>
      </div>
      <WatchForm action={createWatchAction} submitLabel="Create Watch" requirePrimaryImage />
    </div>
  );
}
