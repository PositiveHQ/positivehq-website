export function getSiteUrl() {
  const fallback = 'http://localhost:3000';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export const siteConfig = {
  name: 'Positive Watch HQ',
  description:
    'A premium watch platform for curated luxury watch sales, trade-ins, and consignment with clear condition review and concierge communication.',
  email: 'nick@mrpositivehq.com',
  emailDisplay: 'nick@mrpositivehq.com | robert@positivewatchhq.com',
  emailHref: 'mailto:nick@mrpositivehq.com?cc=robert@positivewatchhq.com',
  contactEmails: ['nick@mrpositivehq.com', 'robert@positivewatchhq.com'],
  phone: '',
  phoneConsultationText: 'Phone consultations available by appointment.',
  social: {
    instagram: 'https://www.instagram.com/positivewatchhq',
    founderInstagram: 'https://www.instagram.com/mr.positive'
  }
};
