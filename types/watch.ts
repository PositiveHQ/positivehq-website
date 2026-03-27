export type WatchCondition = 'Unworn' | 'Excellent' | 'Very Good' | 'Good';
export type WatchStatus = 'in_stock' | 'reserved' | 'sold';
export type WatchVisibility = 'public' | 'private';

export interface WatchImage {
  id: string;
  watchId: string;
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary?: boolean;
  storagePath?: string;
}

export interface Watch {
  id: string;
  slug: string;
  brand: string;
  model: string;
  reference: string;
  price: number;
  year: number;
  condition: WatchCondition;
  status: WatchStatus;
  box: boolean;
  papers: boolean;
  movement: string;
  caseSize: string;
  material: string;
  dial: string;
  bracelet: string;
  sku: string;
  visibility: WatchVisibility;
  description: string;
  images: WatchImage[];
  featured?: boolean;
}

export interface WatchDbRow {
  id: string;
  created_at: string;
  updated_at: string;
  brand: string;
  model: string;
  reference_number: string;
  price: number;
  status: WatchStatus;
  condition: WatchCondition;
  year: number;
  box: boolean;
  papers: boolean;
  description: string;
  slug: string;
  featured: boolean;
  movement: string;
  case_size: string;
  material: string;
  dial_color: string;
  bracelet_strap: string;
  sku: string;
  visibility: WatchVisibility;
  watch_images?: WatchImageDbRow[];
}

export interface WatchImageDbRow {
  id: string;
  watch_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  storage_path: string;
  created_at: string;
}

export interface WatchUpsertInput {
  brand: string;
  model: string;
  reference: string;
  price: number;
  status: WatchStatus;
  condition: WatchCondition;
  year: number;
  box: boolean;
  papers: boolean;
  description: string;
  slug: string;
  featured: boolean;
  movement: string;
  caseSize: string;
  material: string;
  dial: string;
  bracelet: string;
  sku: string;
  visibility: WatchVisibility;
  primaryImageUrl: string;
  primaryImageAlt: string;
}
