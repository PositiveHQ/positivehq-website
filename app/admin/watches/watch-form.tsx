import { Watch } from '@/types/watch';

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  watch?: Watch;
  submitLabel: string;
  requirePrimaryImage?: boolean;
};

export function WatchForm({ action, watch, submitLabel, requirePrimaryImage = false }: Props) {
  return (
    <form action={action} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
      <input name="brand" required defaultValue={watch?.brand} placeholder="Brand" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="model" required defaultValue={watch?.model} placeholder="Model" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="reference" required defaultValue={watch?.reference} placeholder="Reference number" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="slug" required defaultValue={watch?.slug} placeholder="Slug" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="sku" required defaultValue={watch?.sku} placeholder="SKU" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="price" type="number" min="0" step="1" required defaultValue={watch?.price} placeholder="Price" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="year" type="number" min="1900" max="2100" required defaultValue={watch?.year} placeholder="Year" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="movement" required defaultValue={watch?.movement} placeholder="Movement" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="caseSize" required defaultValue={watch?.caseSize} placeholder="Case size" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="material" required defaultValue={watch?.material} placeholder="Material" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="dial" required defaultValue={watch?.dial} placeholder="Dial color" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <input name="bracelet" required defaultValue={watch?.bracelet} placeholder="Bracelet / strap" className="rounded border border-slate-300 px-3 py-2 text-sm" />
      <select name="condition" defaultValue={watch?.condition ?? 'Excellent'} className="rounded border border-slate-300 px-3 py-2 text-sm">
        {['Unworn', 'Excellent', 'Very Good', 'Good'].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <select name="status" defaultValue={watch?.status ?? 'in_stock'} className="rounded border border-slate-300 px-3 py-2 text-sm">
        <option value="in_stock">In Stock</option>
        <option value="reserved">Reserved</option>
        <option value="sold">Sold</option>
      </select>
      <select name="visibility" defaultValue={watch?.visibility ?? 'public'} className="rounded border border-slate-300 px-3 py-2 text-sm">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <div className="flex items-center gap-4 text-sm text-slate-700">
        <label className="inline-flex items-center gap-2"><input type="checkbox" name="box" defaultChecked={watch?.box ?? true} /> Box</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" name="papers" defaultChecked={watch?.papers ?? true} /> Papers</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={watch?.featured ?? false} /> Featured</label>
      </div>
      <input
        name="primaryImageUrl"
        required={requirePrimaryImage}
        defaultValue={watch?.images[0]?.url}
        placeholder="Primary image URL"
        className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
      />
      <input
        name="primaryImageAlt"
        required
        defaultValue={watch?.images[0]?.alt}
        placeholder="Primary image alt text"
        className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
      />
      <textarea
        name="description"
        required
        defaultValue={watch?.description}
        placeholder="Description"
        rows={5}
        className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
      />
      <div className="md:col-span-2">
        <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">{submitLabel}</button>
      </div>
    </form>
  );
}
