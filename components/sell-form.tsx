'use client';

import { useMemo, useState } from 'react';
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
};

export function SellForm({ action, submissionLabel }: SellFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('Excellent');

  const estimate = useMemo(() => {
    const baseline = brand.toLowerCase().includes('rolex') ? 9000 : brand.toLowerCase().includes('omega') ? 4500 : 3200;
    const conditionAdjust = condition === 'Unworn' ? 1.15 : condition === 'Excellent' ? 1 : condition === 'Very Good' ? 0.88 : 0.75;
    const yearAdjust = Number(year) > 2019 ? 1.06 : 0.94;

    return Math.max(1800, Math.round(baseline * conditionAdjust * yearAdjust));
  }, [brand, condition, year]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form action={formAction} className="surface-card space-y-4 p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold text-white">Submit watch details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input required name="customerName" placeholder="Your name" className="field-input" />
          <input required type="email" name="email" placeholder="Email" className="field-input" />
          <input name="phone" placeholder="Phone" className="field-input" />
          <input required name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="field-input" />
          <input required name="model" placeholder="Model" className="field-input" />
          <input name="referenceNumber" placeholder="Reference" className="field-input" />
          <input name="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="field-input" />
          <input name="askingPrice" placeholder="Asking price (optional)" className="field-input" />
          <select name="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="field-input">
            {['Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-slate-200">
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="box" /> Box</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="papers" /> Papers</label>
          </div>
        </div>
        <textarea name="notes" rows={4} placeholder="Notes" className="field-input w-full" />
        <FormSubmitButton label={submissionLabel} pendingLabel="Submitting..." />
        {state.message && (
          <p className={`text-sm ${state.status === 'success' ? 'text-emerald-300' : state.status === 'error' ? 'text-red-300' : 'text-slate-300'}`}>
            {state.message}
          </p>
        )}
      </form>

      <aside className="surface-card space-y-4 bg-gradient-to-b from-white/[0.06] to-black/35 p-6">
        <p className="eyebrow">Indicative Value</p>
        <h3 className="text-lg font-semibold text-white">Sample estimate</h3>
        <p className="text-4xl font-semibold text-amber-100">${estimate.toLocaleString()}</p>
        <p className="text-sm text-slate-300">Estimate range is a sample. Final quote follows specialist review and verification.</p>
      </aside>
    </div>
  );
}
