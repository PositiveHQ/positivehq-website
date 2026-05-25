'use client';

import { useFormState } from 'react-dom';
import { submitNewsletterAction, NewsletterState } from '@/app/newsletter/actions';
import { Button } from './button';

const initialState: NewsletterState = { status: 'idle' };

export function NewsletterForm({ sourcePage = '/newsletter' }: { sourcePage?: string }) {
  const [state, formAction] = useFormState(submitNewsletterAction.bind(null, sourcePage), initialState);
  return (
    <form action={formAction} className="space-y-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input required type="email" name="email" placeholder="Email address" className="field-input" />
        <Button type="submit">Subscribe</Button>
      </div>
      <p className={`text-xs ${state.status === 'error' ? 'text-red-300' : state.status === 'success' ? 'text-emerald-300' : 'text-slate-400'}`}>
        {state.message ?? 'No spam. Just new arrivals, market context, and practical buying/selling guidance.'}
      </p>
    </form>
  );
}
