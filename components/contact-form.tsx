'use client';

import { useFormState } from 'react-dom';
import { submitContactAction, ContactState } from '@/app/contact/actions';
import { FormSubmitButton } from './form-submit-button';

const initialState: ContactState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactAction, initialState);

  return (
    <form action={formAction} className="surface-card space-y-4 p-6">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="customerName" placeholder="Your name" className="field-input" />
        <input required type="email" name="email" placeholder="Email" className="field-input" />
      </div>
      <input name="phone" placeholder="Phone (optional)" className="field-input w-full" />
      <input name="subject" placeholder="Subject" className="field-input w-full" />
      <textarea required name="message" rows={5} placeholder="Message" className="field-input w-full" />
      <FormSubmitButton label="Send Message" pendingLabel="Sending..." />
      {state.message && <p className="text-sm text-red-300">{state.message}</p>}
    </form>
  );
}
