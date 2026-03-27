'use client';

import { FormEvent, useState } from 'react';
import { Button } from './button';

export function NewsletterForm() {
  const [state, setState] = useState<'idle' | 'success'>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('success');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input required type="email" placeholder="Email address" className="field-input" />
        <Button type="submit">Subscribe</Button>
      </div>
      <p className="text-xs text-slate-400">
        {state === 'success' ? 'Thanks for subscribing. You are on the list.' : 'No spam. Just new arrivals, market context, and practical buying/selling guidance.'}
      </p>
    </form>
  );
}
