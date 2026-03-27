import { redirect } from 'next/navigation';
import { createAdminSession, isAdminAuthenticated, isAdminConfigured, validateAdminPassword } from '@/lib/admin-auth';

async function loginAction(formData: FormData) {
  'use server';

  const password = String(formData.get('password') ?? '');

  if (!isAdminConfigured()) {
    redirect('/admin/login?error=config');
  }

  if (!validateAdminPassword(password)) {
    redirect('/admin/login?error=invalid');
  }

  await createAdminSession();
  redirect('/admin/watches');
}

export default async function AdminLoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  if (await isAdminAuthenticated()) {
    redirect('/admin/watches');
  }

  const error = searchParams?.error;

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold text-slate-900">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-600">Internal use only. Enter the admin password to manage watch inventory.</p>
      {error === 'invalid' && <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">Incorrect password.</p>}
      {error === 'config' && <p className="mt-4 rounded bg-amber-50 px-3 py-2 text-sm text-amber-700">Admin password is not configured.</p>}
      <form action={loginAction} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <input
          type="password"
          name="password"
          required
          placeholder="Admin password"
          className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm"
        />
        <button type="submit" className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700">
          Sign in
        </button>
      </form>
    </div>
  );
}
