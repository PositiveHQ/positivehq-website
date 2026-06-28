export type CatalogBrand = {
  name: string;
  slug: string;
  wordmark: string[];
  wordmarkClass: string;
  description: string;
};

export const catalogBrands: CatalogBrand[] = [
  { name: 'Rolex', slug: 'rolex', wordmark: ['ROLEX'], wordmarkClass: 'text-[18px] tracking-[0.18em]', description: 'Iconic sport and dress models.' },
  { name: 'Omega', slug: 'omega', wordmark: ['Ω', 'OMEGA'], wordmarkClass: 'text-[14px] tracking-[0.18em] leading-5', description: 'Moonwatch heritage and everyday icons.' },
  { name: 'Tudor', slug: 'tudor', wordmark: ['TUDOR'], wordmarkClass: 'text-[17px] tracking-[0.14em]', description: 'Modern tool watches with strong value.' },
  { name: 'Grand Seiko', slug: 'grand-seiko', wordmark: ['GRAND', 'SEIKO'], wordmarkClass: 'text-[12px] tracking-[0.10em] leading-4', description: 'Japanese precision and refined finishing.' },
  { name: 'Cartier', slug: 'cartier', wordmark: ['Cartier'], wordmarkClass: 'font-serif text-[22px] normal-case italic tracking-[0.02em]', description: 'Timeless design and elegant classics.' },
  { name: 'Breitling', slug: 'breitling', wordmark: ['BREITLING'], wordmarkClass: 'text-[12px] tracking-[0.15em]', description: 'Aviation chronographs and robust sport models.' },
  { name: 'IWC', slug: 'iwc', wordmark: ['IWC', 'SCHAFFHAUSEN'], wordmarkClass: 'text-[11px] tracking-[0.06em] leading-4', description: 'Pilot, dress, and engineering-led pieces.' },
  { name: 'Zenith', slug: 'zenith', wordmark: ['ZENITH'], wordmarkClass: 'text-[14px] tracking-[0.16em]', description: 'El Primero chronographs and collector references.' },
  { name: 'TAG Heuer', slug: 'tag-heuer', wordmark: ['TAG', 'HEUER'], wordmarkClass: 'text-[12px] tracking-[0.12em] leading-4', description: 'Sport watches, racing heritage, and daily wear.' },
  { name: 'Longines', slug: 'longines', wordmark: ['LONGINES'], wordmarkClass: 'text-[13px] tracking-[0.14em]', description: 'Elegant Swiss classics and accessible luxury.' },
  { name: 'Audemars Piguet', slug: 'audemars-piguet', wordmark: ['AUDEMARS', 'PIGUET'], wordmarkClass: 'text-[11px] tracking-[0.08em] leading-4', description: 'High-end collector demand.' },
  { name: 'Patek Philippe', slug: 'patek-philippe', wordmark: ['PATEK', 'PHILIPPE'], wordmarkClass: 'text-[13px] tracking-[0.10em] leading-4', description: 'Prestige, heritage, and investment-grade pieces.' }
];

export function getBrandBySlug(slug?: string | string[]) {
  const normalized = Array.isArray(slug) ? slug[0] : slug;
  if (!normalized) return undefined;
  return catalogBrands.find((brand) => brand.slug === normalized);
}
