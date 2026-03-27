import { createClient } from '@supabase/supabase-js';
import { getPublicSupabaseEnv, getServiceRoleKey } from '@/lib/env';

/**
 * Server Supabase client with service role access.
 * Keep usage limited to server-only code (route handlers, server actions, backend jobs).
 */
export function createSupabaseServerClient() {
  const { url } = getPublicSupabaseEnv();
  const serviceRoleKey = getServiceRoleKey();
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
