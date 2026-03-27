export function getSiteUrl() {
  const fallback = 'http://localhost:3000';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export const siteConfig = {
  name: 'Positive Watch Co.',
  description: 'Buy and sell premium watches with a clean, trusted dealer process.',
  email: 'hello@positivewatchco.com',
  phone: '+1 (305) 555-0142'
};
