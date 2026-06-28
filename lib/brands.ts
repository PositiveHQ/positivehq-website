export type CatalogBrand = {
  name: string;
  slug: string;
  mark: string;
};

export const catalogBrands: CatalogBrand[] = [
  { name: 'Rolex', slug: 'rolex', mark: 'R' },
  { name: 'Cartier', slug: 'cartier', mark: 'C' },
  { name: 'Audemars Piguet', slug: 'audemars-piguet', mark: 'AP' },
  { name: 'Patek Philippe', slug: 'patek-philippe', mark: 'PP' },
  { name: 'Omega', slug: 'omega', mark: 'Ω' },
  { name: 'Panerai', slug: 'panerai', mark: 'P' },
  { name: 'IWC', slug: 'iwc', mark: 'IWC' },
  { name: 'Tudor', slug: 'tudor', mark: 'T' },
  { name: 'Breitling', slug: 'breitling', mark: 'B' },
  { name: 'Vacheron Constantin', slug: 'vacheron-constantin', mark: 'VC' },
  { name: 'Jaeger-LeCoultre', slug: 'jaeger-lecoultre', mark: 'JL' },
  { name: 'Richard Mille', slug: 'richard-mille', mark: 'RM' }
];

export function getBrandBySlug(slug?: string | string[]) {
  const normalized = Array.isArray(slug) ? slug[0] : slug;
  if (!normalized) return undefined;
  return catalogBrands.find((brand) => brand.slug === normalized);
}
