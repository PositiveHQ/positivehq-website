import { createClient } from 'next-sanity';

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export function isSanityConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) && Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);
}

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
  if (!isSanityConfigured()) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
    apiVersion,
    useCdn: true,
    token: process.env.SANITY_API_READ_TOKEN
  });

  return cachedClient;
}
