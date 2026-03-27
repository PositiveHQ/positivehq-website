const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;

export function getPublicSupabaseEnv() {
  const [urlKey, anonKey] = requiredVars;
  const url = process.env[urlKey];
  const key = process.env[anonKey];

  if (!url || !key) {
    throw new Error(
      'Missing Supabase public environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.'
    );
  }

  return { url, key };
}

export function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY for server-side privileged operations.');
  }

  return key;
}
