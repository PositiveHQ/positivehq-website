'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Button } from './button';

export function SellForm() {
  const [submitted, setSubmitted] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('Excellent');

  const estimate = useMemo(() => {
    const baseline = brand.toLowerCase().includes('rolex') ? 9000 : brand.toLowerCase().includes('omega') ? 4500 : 3200;
    const conditionAdjust = condition === 'Unworn' ? 1.15 : condition === 'Excellent' ? 1 : condition === 'Very Good' ? 0.88 : 0.75;
    const yearAdjust = Number(year) > 2019 ? 1.06 : 0.94;

    return Math.max(1800, Math.round(baseline * conditionAdjust * yearAdjust));
  }, [brand, condition, year]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold text-slate-900">Submit watch details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input required value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none" />
          <input required value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none" />
          <input placeholder="Reference" className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none" />
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none" />
          <select value={condition} onChange={(e) => setCondition(e.target.value)} className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none">
            {['Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <input type="email" required placeholder="Email" className="rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none" />
        </div>
        <label className="block rounded-md border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
          Upload photos (mock)
          <input type="file" multiple className="mt-3 block w-full text-xs text-slate-500" />
        </label>
        <Button type="submit">Get Estimate</Button>
      </form>

      <aside className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Sample estimate</h3>
        <p className="text-3xl font-semibold text-slate-900">${estimate.toLocaleString()}</p>
        <p className="text-sm text-slate-600">Estimate range is a placeholder based on details entered. Final offer follows physical verification.</p>
        {submitted && <p className="rounded-md bg-slate-900 px-4 py-3 text-sm text-white">Request received. A specialist will contact you shortly.</p>}
      </aside>
    </div>
  );
}
