'use client';

import { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';

type SubmissionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: SubmissionState = { status: 'idle' };

type SellFormProps = {
  action: (state: SubmissionState, formData: FormData) => Promise<SubmissionState>;
  submissionLabel: string;
  variant?: 'sell' | 'trade' | 'consignment';
};

const conditionOptions = ['Unworn', 'Excellent', 'Very Good', 'Good'];
const boxPaperOptions = ['Full set', 'Box only', 'Papers only', 'Watch only', 'Not sure'];
const timelineOptions = ['ASAP', 'This week', 'This month', 'Flexible', 'Just exploring'];

function Field({ label, children, helper }: { label: string; children: ReactNode; helper?: string }) {
  return (
    <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
      {label}
      {children}
      {helper ? <span className="block text-[11px] font-normal normal-case leading-5 tracking-normal text-slate-500">{helper}</span> : null}
    </label>
  );
}

export function SellForm({ action, submissionLabel, variant = 'sell' }: SellFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const isTrade = variant === 'trade';

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form action={formAction} className="surface-card space-y-5 p-6 lg:col-span-2">
        <div>
          <p className="eyebrow">{isTrade ? 'Trade form' : variant === 'consignment' ? 'Consignment form' : 'Sell form'}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isTrade ? 'Submit your trade details' : variant === 'consignment' ? 'Request a consignment review' : 'Submit watch details'}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><input required name="customerName" placeholder="Name" className="field-input w-full" /></Field>
          <Field label="Phone"><input name="phone" placeholder="Phone" className="field-input w-full" /></Field>
          <Field label="Email"><input required type="email" name="email" placeholder="Email" className="field-input w-full" /></Field>
          <Field label={isTrade ? 'Current watch brand' : 'Brand'}><input required name="brand" placeholder={isTrade ? 'Current watch brand' : 'Brand'} className="field-input w-full" /></Field>
          <Field label={isTrade ? 'Current watch model' : 'Model'}><input required name="model" placeholder={isTrade ? 'Current watch model' : 'Model'} className="field-input w-full" /></Field>
          <Field label="Reference number"><input name="referenceNumber" placeholder="Reference number" className="field-input w-full" /></Field>
          <Field label="Year"><input name="year" placeholder="Year" className="field-input w-full" /></Field>
          <Field label="Condition">
            <select name="condition" defaultValue="Excellent" className="field-input w-full normal-case tracking-normal">
              {conditionOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Box/papers">
            <select name="boxPapers" defaultValue="Not sure" className="field-input w-full normal-case tracking-normal">
              {boxPaperOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Service history?"><input name="serviceHistory" placeholder="Service history?" className="field-input w-full" /></Field>
          <Field label="Photo upload" helper="Secure browser uploads are not enabled yet. Submit the form first, then email photos to hello@positivewatchhq.com if requested or relevant."><input name="photos" type="file" multiple accept="image/*,video/*" disabled aria-disabled="true" className="field-input w-full opacity-70 file:mr-3 file:rounded-full file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-200" /></Field>

          {isTrade ? (
            <>
              <Field label="Target watch desired"><input name="targetWatch" placeholder="Target watch desired" className="field-input w-full" /></Field>
              <Field label="Expected cash difference if known"><input name="cashDifference" placeholder="Expected cash difference if known" className="field-input w-full" /></Field>
            </>
          ) : (
            <>
              <Field label="Any aftermarket parts?"><input name="aftermarketParts" placeholder="Any aftermarket parts?" className="field-input w-full" /></Field>
              <Field label="Desired timeline">
                <select name="timeline" defaultValue="Flexible" className="field-input w-full normal-case tracking-normal">
                  {timelineOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </Field>
            </>
          )}

          {isTrade && (
            <Field label="Timeline">
              <select name="timeline" defaultValue="Flexible" className="field-input w-full normal-case tracking-normal">
                {timelineOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>
          )}
        </div>

        <textarea name="notes" rows={5} placeholder="Notes" className="field-input w-full" />
        <FormSubmitButton label={submissionLabel} pendingLabel="Submitting..." />
        {state.message && (
          <p
            role={state.status === 'error' ? 'alert' : 'status'}
            className={`rounded-2xl border p-4 text-sm ${state.status === 'success' ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200' : state.status === 'error' ? 'border-red-300/25 bg-red-300/10 text-red-200' : 'border-white/10 bg-white/5 text-slate-300'}`}
          >
            {state.message}
          </p>
        )}
      </form>

      <aside className="surface-card space-y-4 bg-gradient-to-b from-white/[0.06] to-black/35 p-6">
        <p className="eyebrow">Review note</p>
        <h3 className="text-xl font-semibold text-white">
          {isTrade ? 'Value after review' : 'Offer after review'}
        </h3>
        <p className="text-sm leading-7 text-slate-300">
          {isTrade
            ? 'Estimated value range will be provided after review. Final trade value is subject to authentication, condition verification, market demand, and deal structure.'
            : 'Cash offers are based on brand, model, reference, condition, box/papers, service history, market demand, and resale value. Final offer is provided after review.'}
        </p>
      </aside>
    </div>
  );
}
