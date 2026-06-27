export function getSiteUrl() {
  const fallback = 'http://localhost:3000';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export const siteConfig = {
  name: 'Positive Watch HQ',
  description:
    'A premium watch platform for buying, selling, and trading luxury watches with clear condition review and concierge communication.',
  email: 'hello@positivewatchhq.com',
  phone: '+1 (305) 555-0142',
  social: {
    instagram: 'https://www.instagram.com/positivewatchhq'
  }
};
