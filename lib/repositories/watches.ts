import { watches as mockWatches } from '@/data/watches';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Watch, WatchDbRow, WatchImage, WatchImageDbRow, WatchUpsertInput } from '@/types/watch';

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'watch-images';

const toDomainImage = (image: WatchImageDbRow): WatchImage => ({
  id: image.id,
  watchId: image.watch_id,
  url: image.url,
  alt: image.alt_text ?? 'Watch image',
  sortOrder: image.sort_order,
  isPrimary: image.is_primary,
  storagePath: image.storage_path
});

const toDomainWatch = (row: WatchDbRow): Watch => ({
  id: row.id,
  slug: row.slug,
  brand: row.brand,
  model: row.model,
  reference: row.reference_number,
  price: Number(row.price),
  year: row.year,
  condition: row.condition,
  status: row.status,
  box: row.box,
  papers: row.papers,
  movement: row.movement,
  caseSize: row.case_size,
  material: row.material,
  dial: row.dial_color,
  bracelet: row.bracelet_strap,
  sku: row.sku,
  visibility: row.visibility,
  description: row.description,
  featured: row.featured,
  images: (row.watch_images ?? []).sort((a, b) => a.sort_order - b.sort_order).map(toDomainImage)
});

const toDbWatchInput = (input: WatchUpsertInput) => ({
  brand: input.brand,
  model: input.model,
  reference_number: input.reference,
  price: input.price,
  status: input.status,
  condition: input.condition,
  year: input.year,
  box: input.box,
  papers: input.papers,
  description: input.description,
  slug: input.slug,
  featured: input.featured,
  movement: input.movement,
  case_size: input.caseSize,
  material: input.material,
  dial_color: input.dial,
  bracelet_strap: input.bracelet,
  sku: input.sku,
  visibility: input.visibility
});

async function fetchSupabaseWatches(options?: { includePrivate?: boolean }): Promise<Watch[] | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = createSupabaseServerClient();
    let query = supabase.from('watches').select('*, watch_images(*)').order('created_at', { ascending: false });

    if (!options?.includePrivate) {
      query = query.eq('visibility', 'public');
    }

    const { data, error } = await query;

    if (error || !data) return null;
    return (data as WatchDbRow[]).map(toDomainWatch);
  } catch {
    return null;
  }
}

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add env vars and run migrations before using admin write operations.');
  }
}

export async function getAllWatches(): Promise<Watch[]> {
  const liveData = await fetchSupabaseWatches();
  if (liveData && liveData.length > 0) return liveData;
  return mockWatches;
}

export async function getFeaturedWatches(): Promise<Watch[]> {
  const allWatches = await getAllWatches();
  return allWatches.filter((watch) => watch.featured);
}

export async function getWatchBySlug(slug: string): Promise<Watch | null> {
  const allWatches = await getAllWatches();
  return allWatches.find((watch) => watch.slug === slug) ?? null;
}

export async function getAdminWatches(): Promise<Watch[]> {
  const liveData = await fetchSupabaseWatches({ includePrivate: true });
  if (liveData && liveData.length > 0) return liveData;
  return mockWatches;
}

export async function getWatchById(id: string): Promise<Watch | null> {
  const watches = await getAdminWatches();
  return watches.find((watch) => watch.id === id) ?? null;
}

export async function createWatch(input: WatchUpsertInput): Promise<string> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('watches')
    .insert(toDbWatchInput(input))
    .select('id')
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to create watch.');
  }

  if (input.primaryImageUrl) {
    const { error: imageError } = await supabase.from('watch_images').insert({
      watch_id: data.id,
      url: input.primaryImageUrl,
      alt_text: input.primaryImageAlt,
      sort_order: 0,
      is_primary: true,
      storage_path: ''
    });

    if (imageError) {
      throw new Error(imageError.message);
    }
  }

  return data.id;
}

export async function updateWatch(id: string, input: WatchUpsertInput): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('watches').update(toDbWatchInput(input)).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  if (input.primaryImageUrl) {
    const { data: currentPrimary } = await supabase
      .from('watch_images')
      .select('id, url')
      .eq('watch_id', id)
      .eq('is_primary', true)
      .maybeSingle();

    if (!currentPrimary || currentPrimary.url !== input.primaryImageUrl) {
      await supabase.from('watch_images').update({ is_primary: false }).eq('watch_id', id);

      const { data: latestImage } = await supabase
        .from('watch_images')
        .select('sort_order')
        .eq('watch_id', id)
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextSortOrder = (latestImage?.sort_order ?? -1) + 1;
      const { error: imageError } = await supabase.from('watch_images').insert({
        watch_id: id,
        url: input.primaryImageUrl,
        alt_text: input.primaryImageAlt || `${input.brand} ${input.model}`,
        sort_order: nextSortOrder,
        is_primary: true,
        storage_path: ''
      });

      if (imageError) {
        throw new Error(imageError.message);
      }
    }
  }
}

export async function uploadWatchImage(params: {
  watchId: string;
  fileName: string;
  mimeType: string;
  fileBuffer: Buffer;
  altText?: string;
  makePrimary?: boolean;
}): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const safeFileName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
  const storagePath = `${params.watchId}/${Date.now()}-${safeFileName}`;

  const { error: uploadError } = await supabase.storage.from(storageBucket).upload(storagePath, params.fileBuffer, {
    contentType: params.mimeType,
    upsert: false
  });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage.from(storageBucket).getPublicUrl(storagePath);
  const publicUrl = publicUrlData.publicUrl;

  const { data: latestImage } = await supabase
    .from('watch_images')
    .select('sort_order')
    .eq('watch_id', params.watchId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextSortOrder = (latestImage?.sort_order ?? -1) + 1;

  if (params.makePrimary) {
    await supabase.from('watch_images').update({ is_primary: false }).eq('watch_id', params.watchId);
  }

  const { error: imageError } = await supabase.from('watch_images').insert({
    watch_id: params.watchId,
    url: publicUrl,
    alt_text: params.altText ?? 'Watch image',
    sort_order: nextSortOrder,
    is_primary: Boolean(params.makePrimary),
    storage_path: storagePath
  });

  if (imageError) {
    throw new Error(imageError.message);
  }
}

export async function setPrimaryWatchImage(watchId: string, imageId: string): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  await supabase.from('watch_images').update({ is_primary: false }).eq('watch_id', watchId);
  const { error } = await supabase.from('watch_images').update({ is_primary: true }).eq('id', imageId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteWatchImage(imageId: string): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { data: image, error: fetchError } = await supabase
    .from('watch_images')
    .select('id, watch_id, storage_path, is_primary')
    .eq('id', imageId)
    .single();

  if (fetchError || !image) {
    throw new Error(fetchError?.message ?? 'Image not found.');
  }

  const { error: deleteError } = await supabase.from('watch_images').delete().eq('id', imageId);
  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (image.storage_path) {
    await supabase.storage.from(storageBucket).remove([image.storage_path]);
  }

  if (image.is_primary) {
    const { data: nextImage } = await supabase
      .from('watch_images')
      .select('id')
      .eq('watch_id', image.watch_id)
      .order('sort_order', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextImage?.id) {
      await supabase.from('watch_images').update({ is_primary: true }).eq('id', nextImage.id);
    }
  }
}

export async function deleteWatch(id: string): Promise<void> {
  assertSupabaseConfigured();

  const watch = await getWatchById(id);
  if (watch) {
    const paths = watch.images.map((image) => image.storagePath).filter((path): path is string => Boolean(path));
    if (paths.length > 0) {
      const supabase = createSupabaseServerClient();
      await supabase.storage.from(storageBucket).remove(paths);
    }
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('watches').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

// Backward-compatible alias during transition.
export const getWatches = getAllWatches;
