'use client';

import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';
import { SmsConsentField } from './sms-consent-field';

type InquiryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: InquiryState = { status: 'idle' };

export function WatchInquiryForm({
  action
}: {
  action: (state: InquiryState, formData: FormData) => Promise<InquiryState>;
}) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="surface-card space-y-3 p-5">
      <h3 className="text-lg font-semibold text-white">Inquire about this watch</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="customerName" required placeholder="Your name" className="field-input" />
        <input type="email" name="email" required placeholder="Email" className="field-input" />
      </div>
      <input name="phone" placeholder="Phone (optional)" className="field-input w-full" />
      <textarea name="message" required minLength={10} rows={4} placeholder="Message" className="field-input w-full" />
      <SmsConsentField />
      <FormSubmitButton label="Send Inquiry" pendingLabel="Sending..." />
      {state.message && (
        <p className={`text-sm ${state.status === 'success' ? 'text-emerald-300' : state.status === 'error' ? 'text-red-300' : 'text-slate-300'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
