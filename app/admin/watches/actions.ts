'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  createWatch,
  deleteWatch,
  deleteWatchImage,
  setPrimaryWatchImage,
  updateWatch,
  uploadWatchImage
} from '@/lib/repositories/watches';
import { WatchCondition, WatchStatus, WatchUpsertInput, WatchVisibility } from '@/types/watch';

const conditions: WatchCondition[] = ['Unworn', 'Excellent', 'Very Good', 'Good'];
const statuses: WatchStatus[] = ['in_stock', 'reserved', 'sold'];
const visibilityOptions: WatchVisibility[] = ['public', 'private'];

function parseBoolean(value: FormDataEntryValue | null) {
  return value === 'on' || value === 'true';
}

function parseWatchInput(formData: FormData): WatchUpsertInput {
  const brand = String(formData.get('brand') ?? '').trim();
  const model = String(formData.get('model') ?? '').trim();
  const reference = String(formData.get('reference') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const sku = String(formData.get('sku') ?? '').trim();
  const movement = String(formData.get('movement') ?? '').trim();
  const caseSize = String(formData.get('caseSize') ?? '').trim();
  const material = String(formData.get('material') ?? '').trim();
  const dial = String(formData.get('dial') ?? '').trim();
  const bracelet = String(formData.get('bracelet') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const primaryImageUrl = String(formData.get('primaryImageUrl') ?? '').trim();
  const primaryImageAlt = String(formData.get('primaryImageAlt') ?? '').trim();
  const status = String(formData.get('status') ?? 'in_stock') as WatchStatus;
  const visibility = String(formData.get('visibility') ?? 'public') as WatchVisibility;
  const condition = String(formData.get('condition') ?? 'Excellent') as WatchCondition;
  const price = Number(formData.get('price'));
  const year = Number(formData.get('year'));

  if (!brand || !model || !reference || !slug || !sku || !movement || !caseSize || !material || !dial || !bracelet || !description) {
    throw new Error('Please complete all required text fields.');
  }

  if (!conditions.includes(condition)) throw new Error('Invalid condition.');
  if (!statuses.includes(status)) throw new Error('Invalid status.');
  if (!visibilityOptions.includes(visibility)) throw new Error('Invalid visibility.');
  if (Number.isNaN(price) || price < 0) throw new Error('Price must be a positive number.');
  if (Number.isNaN(year) || year < 1900 || year > 2100) throw new Error('Year must be between 1900 and 2100.');
  if (primaryImageUrl && !primaryImageUrl.startsWith('http')) throw new Error('Primary image URL must start with http/https.');

  return {
    brand,
    model,
    reference,
    price,
    status,
    condition,
    year,
    box: parseBoolean(formData.get('box')),
    papers: parseBoolean(formData.get('papers')),
    description,
    slug,
    featured: parseBoolean(formData.get('featured')),
    movement,
    caseSize,
    material,
    dial,
    bracelet,
    sku,
    visibility,
    primaryImageUrl,
    primaryImageAlt: primaryImageAlt || `${brand} ${model}`
  };
}

async function assertAdminSession() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }
}

export async function createWatchAction(formData: FormData) {
  await assertAdminSession();
  const payload = parseWatchInput(formData);
  await createWatch(payload);
  revalidatePath('/admin/watches');
  revalidatePath('/watches');
  redirect('/admin/watches');
}

export async function updateWatchAction(id: string, formData: FormData) {
  await assertAdminSession();
  const payload = parseWatchInput(formData);
  await updateWatch(id, payload);
  revalidatePath('/admin/watches');
  revalidatePath(`/admin/watches/${id}/edit`);
  revalidatePath('/watches');
  revalidatePath(`/watches/${payload.slug}`);
  redirect('/admin/watches');
}

export async function deleteWatchAction(id: string) {
  await assertAdminSession();
  await deleteWatch(id);
  revalidatePath('/admin/watches');
  revalidatePath('/watches');
}

export async function quickUpdateWatchAction(id: string, formData: FormData) {
  await assertAdminSession();

  const existing = {
    brand: String(formData.get('brand')),
    model: String(formData.get('model')),
    reference: String(formData.get('reference')),
    price: Number(formData.get('price')),
    status: String(formData.get('status')) as WatchStatus,
    condition: String(formData.get('condition')) as WatchCondition,
    year: Number(formData.get('year')),
    box: parseBoolean(formData.get('box')),
    papers: parseBoolean(formData.get('papers')),
    description: String(formData.get('description')),
    slug: String(formData.get('slug')),
    featured: parseBoolean(formData.get('featured')),
    movement: String(formData.get('movement')),
    caseSize: String(formData.get('caseSize')),
    material: String(formData.get('material')),
    dial: String(formData.get('dial')),
    bracelet: String(formData.get('bracelet')),
    sku: String(formData.get('sku')),
    visibility: String(formData.get('visibility')) as WatchVisibility,
    primaryImageUrl: String(formData.get('primaryImageUrl')),
    primaryImageAlt: String(formData.get('primaryImageAlt'))
  } satisfies WatchUpsertInput;

  await updateWatch(id, existing);
  revalidatePath('/admin/watches');
}

export async function uploadWatchImageAction(watchId: string, formData: FormData) {
  await assertAdminSession();

  const file = formData.get('image');
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Please select an image file.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed.');
  }

  const altText = String(formData.get('altText') ?? '').trim();
  const makePrimary = parseBoolean(formData.get('makePrimary'));
  const bytes = Buffer.from(await file.arrayBuffer());

  await uploadWatchImage({
    watchId,
    fileName: file.name,
    mimeType: file.type,
    fileBuffer: bytes,
    altText,
    makePrimary
  });

  revalidatePath(`/admin/watches/${watchId}/edit`);
  revalidatePath('/admin/watches');
  revalidatePath('/watches');
}

export async function deleteWatchImageAction(watchId: string, imageId: string) {
  await assertAdminSession();
  await deleteWatchImage(imageId);
  revalidatePath(`/admin/watches/${watchId}/edit`);
  revalidatePath('/watches');
}

export async function setPrimaryWatchImageAction(watchId: string, imageId: string) {
  await assertAdminSession();
  await setPrimaryWatchImage(watchId, imageId);
  revalidatePath(`/admin/watches/${watchId}/edit`);
  revalidatePath('/watches');
}
