'use client';

import { useFormState } from 'react-dom';
import { FormSubmitButton } from '@/components/form-submit-button';

type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

type ContactFormProps = {
  action: (state: ContactState, formData: FormData) => Promise<ContactState>;
};

const initialState: ContactState = { status: 'idle' };

const options = [
  ['buy', 'Buy a watch'],
  ['sell', 'Sell a watch'],
  ['trade', 'Trade a watch'],
  ['consign', 'Consign a watch'],
  ['general', 'Ask a general question']
];

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="surface-card space-y-5 p-6 lg:p-8">
      <div>
        <p className="eyebrow">Contact form</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Tell us the right next step.</h2>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-white">What are you looking to do?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200 transition hover:border-amber-100/35 hover:bg-white/[0.05]"
            >
              <input required type="radio" name="inquiryIntent" value={value} className="accent-amber-200" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="customerName" placeholder="Your name" className="field-input" />
        <input required type="email" name="email" placeholder="Email" className="field-input" />
        <input name="phone" placeholder="Phone" className="field-input" />
        <input name="preferredTime" placeholder="Preferred appointment time" className="field-input" />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
        <input type="checkbox" name="appointmentRequest" className="mt-1 accent-amber-200" />
        <span>I would like to request an appointment or a scheduled call.</span>
      </label>

      <textarea
        required
        name="message"
        rows={6}
        placeholder="Tell us about the watch, reference, budget, trade details, consignment goal, or general question."
        className="field-input w-full"
      />

      <FormSubmitButton label="Send Contact Request" pendingLabel="Sending..." />

      {state.message && (
        <p className={`text-sm ${state.status === 'success' ? 'text-emerald-300' : state.status === 'error' ? 'text-red-300' : 'text-slate-300'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
