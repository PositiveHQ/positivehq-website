'use client';

import { useFormStatus } from 'react-dom';

export function FormSubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl border border-amber-100/25 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(194,166,110,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
