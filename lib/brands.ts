export type CatalogBrand = {
  name: string;
  slug: string;
  medallionImage?: string;
  wordmark: string[];
  wordmarkClass: string;
};

export const catalogBrands: CatalogBrand[] = [
  { name: 'Rolex', slug: 'rolex', medallionImage: '/media/brand-medallions/rolex.png', wordmark: ['ROLEX'], wordmarkClass: 'text-[18px] tracking-[0.18em]' },
  { name: 'Cartier', slug: 'cartier', medallionImage: '/media/brand-medallions/cartier.png', wordmark: ['Cartier'], wordmarkClass: 'font-serif text-[22px] normal-case italic tracking-[0.02em]' },
  { name: 'Audemars Piguet', slug: 'audemars-piguet', medallionImage: '/media/brand-medallions/audemars-piguet.png', wordmark: ['AUDEMARS', 'PIGUET'], wordmarkClass: 'text-[11px] tracking-[0.08em] leading-4' },
  { name: 'Patek Philippe', slug: 'patek-philippe', medallionImage: '/media/brand-medallions/patek-philippe.png', wordmark: ['PATEK', 'PHILIPPE'], wordmarkClass: 'text-[13px] tracking-[0.10em] leading-4' },
  { name: 'Omega', slug: 'omega', medallionImage: '/media/brand-medallions/omega.png', wordmark: ['Ω', 'OMEGA'], wordmarkClass: 'text-[14px] tracking-[0.18em] leading-5' },
  { name: 'Panerai', slug: 'panerai', medallionImage: '/media/brand-medallions/panerai.png', wordmark: ['PANERAI'], wordmarkClass: 'text-[14px] tracking-[0.14em]' },
  { name: 'IWC', slug: 'iwc', medallionImage: '/media/brand-medallions/iwc.png', wordmark: ['IWC', 'SCHAFFHAUSEN'], wordmarkClass: 'text-[11px] tracking-[0.06em] leading-4' },
  { name: 'Tudor', slug: 'tudor', medallionImage: '/media/brand-medallions/tudor.png', wordmark: ['TUDOR'], wordmarkClass: 'text-[17px] tracking-[0.14em]' },
  { name: 'Breitling', slug: 'breitling', wordmark: ['BREITLING'], wordmarkClass: 'text-[12px] tracking-[0.15em]' },
  { name: 'Vacheron Constantin', slug: 'vacheron-constantin', wordmark: ['VACHERON', 'CONSTANTIN'], wordmarkClass: 'text-[9px] tracking-[0.04em] leading-4' },
  { name: 'Jaeger-LeCoultre', slug: 'jaeger-lecoultre', wordmark: ['JAEGER-', 'LECOULTRE'], wordmarkClass: 'text-[10px] tracking-[0.04em] leading-4' },
  { name: 'Richard Mille', slug: 'richard-mille', wordmark: ['RICHARD', 'MILLE'], wordmarkClass: 'text-[11px] tracking-[0.08em] leading-4' }
];

export function getBrandBySlug(slug?: string | string[]) {
  const normalized = Array.isArray(slug) ? slug[0] : slug;
  if (!normalized) return undefined;
  return catalogBrands.find((brand) => brand.slug === normalized);
}
