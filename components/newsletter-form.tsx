'use client';

import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';

type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

type NewsletterFormProps = {
  action: (state: NewsletterState, formData: FormData) => Promise<NewsletterState>;
  sourcePage: string;
};

const initialState: NewsletterState = { status: 'idle' };

export function NewsletterForm({ action, sourcePage }: NewsletterFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-4" noValidate={false}>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input required type="email" name="email" autoComplete="email" placeholder="Email address" className="field-input" />
        <FormSubmitButton label="Subscribe" pendingLabel="Subscribing..." />
      </div>
      <p
        role={state.status === 'error' ? 'alert' : state.status === 'success' ? 'status' : undefined}
        className={`text-xs ${state.status === 'success' ? 'text-emerald-300' : state.status === 'error' ? 'text-red-300' : 'text-slate-400'}`}
      >
        {state.message || 'No spam. Just new arrivals, market context, and practical buying/selling guidance.'}
      </p>
    </form>
  );
}
