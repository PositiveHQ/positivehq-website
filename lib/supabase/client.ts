import { createClient } from '@supabase/supabase-js';
import { getPublicSupabaseEnv } from '@/lib/env';

/**
 * Browser-safe Supabase client.
 * Use this only where anon key permissions are enough.
 */
export function createSupabaseBrowserClient() {
  const { url, key } = getPublicSupabaseEnv();
  return createClient(url, key);
}
