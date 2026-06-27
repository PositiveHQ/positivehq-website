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

const timelineOptions = ['ASAP', 'This week', 'This month', 'Flexible', 'Just exploring'];

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="surface-card space-y-5 p-6 lg:p-8">
      <div>
        <p className="eyebrow">Contact form</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Tell us the right next step.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="customerName" placeholder="Name" className="field-input" />
        <input name="phone" placeholder="Phone" className="field-input" />
        <input required type="email" name="email" placeholder="Email" className="field-input" />
        <input name="watchContext" placeholder="Brand/model/reference if applicable" className="field-input" />
        <input name="budgetOrExpectedValue" placeholder="Budget or expected value" className="field-input" />
        <select name="desiredTimeline" defaultValue="Flexible" className="field-input normal-case tracking-normal">
          {timelineOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
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

      <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        Photo upload if relevant
        <input name="photos" type="file" multiple accept="image/*,video/*" className="field-input w-full file:mr-3 file:rounded-full file:border-0 file:bg-amber-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black" />
      </label>

      <textarea
        required
        name="message"
        rows={6}
        placeholder="Message"
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
