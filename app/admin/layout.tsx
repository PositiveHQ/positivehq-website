import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/admin/watches" className="text-sm font-semibold tracking-wide text-slate-900">Positive Watch Co. Admin</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/watches" className="text-slate-700 hover:text-slate-900">Watches</Link>
            <Link href="/watches" className="text-slate-700 hover:text-slate-900">View Public Site</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
