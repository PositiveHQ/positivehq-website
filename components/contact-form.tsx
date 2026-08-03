'use client';

import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import { FormSubmitButton } from '@/components/form-submit-button';
import { SmsConsentField } from '@/components/sms-consent-field';
import { siteConfig } from '@/lib/site';

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
  ['general', 'Ask a general question'],
  ['appointment', 'Appointment']
] as const;

const timelineOptions = ['ASAP', 'This week', 'This month', 'Flexible', 'Just exploring'];

function Field({
  label,
  htmlFor,
  required,
  children,
  helper
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  helper?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="space-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
      <span>
        {label}{required ? <span className="text-amber-100"> *</span> : null}
      </span>
      {children}
      {helper ? <span className="block text-[11px] font-normal normal-case leading-5 tracking-normal text-slate-500">{helper}</span> : null}
    </label>
  );
}

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const searchParams = useSearchParams();
  const requestedIntent = searchParams.get('intent');
  const requestedBrand = searchParams.get('brand');
  const requestedModel = searchParams.get('model');
  const requestedReference = searchParams.get('reference');
  const requestedWatchContext = [requestedBrand, requestedModel, requestedReference].filter(Boolean).join(' ');
  const isAppointmentRequest = requestedIntent === 'appointment';
  const defaultIntent = isAppointmentRequest ? 'appointment' : requestedIntent;

  return (
    <form action={formAction} className="surface-card space-y-6 p-6 lg:p-8" noValidate={false}>
      <div>
        <p className="eyebrow">Contact form</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Tell us the right next step.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Required fields are marked with an asterisk. Share as much watch detail as possible so we can reply with a useful next step.
        </p>
      </div>

      {isAppointmentRequest && (
        <div className="rounded-2xl border border-amber-100/25 bg-amber-100/10 p-4 text-sm leading-6 text-amber-50" role="status">
          Appointment request selected. Use the message field to share your preferred date/time and whether this is a buy, sell, trade, consignment, or sourcing review.
        </div>
      )}
      <input type="hidden" name="appointmentRequest" value={isAppointmentRequest ? 'on' : ''} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <input id="contact-name" required name="customerName" autoComplete="name" placeholder="Your full name" className="field-input w-full" />
        </Field>
        <Field label="Phone" htmlFor="contact-phone" helper="Optional, but helpful for appointment scheduling.">
          <input id="contact-phone" name="phone" autoComplete="tel" inputMode="tel" placeholder="Best phone number" className="field-input w-full" />
        </Field>
        <Field label="Email" htmlFor="contact-email" required>
          <input id="contact-email" required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="field-input w-full" />
        </Field>
        <Field label="Brand / model / reference if applicable" htmlFor="contact-watch">
          <input id="contact-watch" name="watchContext" defaultValue={requestedWatchContext} placeholder="Rolex Submariner 124060" className="field-input w-full" />
        </Field>
        <Field label="Budget or expected value" htmlFor="contact-budget">
          <input id="contact-budget" name="budgetOrExpectedValue" placeholder="$10k budget or expected value" className="field-input w-full" />
        </Field>
        <Field label="Desired timeline" htmlFor="contact-timeline">
          <select id="contact-timeline" name="desiredTimeline" defaultValue="Flexible" className="field-input w-full normal-case tracking-normal">
            {timelineOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
      </div>

      <fieldset className="space-y-3" aria-describedby="contact-intent-helper">
        <legend className="text-sm font-semibold text-white">What are you looking to do? <span className="text-amber-100">*</span></legend>
        <p id="contact-intent-helper" className="text-xs leading-5 text-slate-500">Choose the closest option. If you are requesting an appointment, select the topic for that appointment.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200 transition hover:border-amber-100/35 hover:bg-white/[0.05]"
            >
              <input required type="radio" name="inquiryIntent" value={value} defaultChecked={defaultIntent === value} className="accent-amber-200" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Photo upload if relevant" htmlFor="contact-photos" helper={`Secure browser uploads are not enabled yet. Submit the form first, then email photos to ${siteConfig.emailDisplay} if requested or relevant.`}>
        <input id="contact-photos" name="photos" type="file" multiple accept="image/*,video/*" disabled aria-disabled="true" className="field-input w-full opacity-70 file:mr-3 file:rounded-full file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-200" />
      </Field>

      <Field label="Message" htmlFor="contact-message" required>
        <textarea
          id="contact-message"
          required
          name="message"
          rows={6}
          minLength={10}
          placeholder="Tell us what you want to buy, sell, trade, consign, or source. Include condition, box/papers, service history, budget/value, timeline, and preferred appointment time if relevant."
          className="field-input w-full"
        />
      </Field>

      <SmsConsentField />
      <FormSubmitButton label="Send Contact Request" pendingLabel="Sending..." />

      {state.message && (
        <p
          role={state.status === 'error' ? 'alert' : 'status'}
          className={`rounded-2xl border p-4 text-sm ${state.status === 'success' ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200' : state.status === 'error' ? 'border-red-300/25 bg-red-300/10 text-red-200' : 'border-white/10 bg-white/5 text-slate-300'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
