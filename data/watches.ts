import { Watch } from '@/types/watch';

export const watches: Watch[] = [
  {
    id: '1',
    slug: 'rolex-submariner-124060',
    brand: 'Rolex',
    model: 'Submariner',
    reference: '124060',
    price: 11850,
    year: 2023,
    condition: 'Excellent',
    status: 'in_stock',
    box: true,
    papers: true,
    movement: 'Automatic',
    caseSize: '41mm',
    material: 'Oystersteel',
    dial: 'Black',
    bracelet: 'Oystersteel',
    sku: 'PWC-ROL-124060-001',
    visibility: 'public',
    images: [
      {
        id: '1-1',
        watchId: '1',
        url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80',
        alt: 'Rolex Submariner front view',
        sortOrder: 0,
        isPrimary: true
      },
      {
        id: '1-2',
        watchId: '1',
        url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
        alt: 'Rolex Submariner bracelet detail',
        sortOrder: 1
      },
      {
        id: '1-3',
        watchId: '1',
        url: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
        alt: 'Rolex Submariner side profile',
        sortOrder: 2
      }
    ],
    description: 'A clean, sharp Submariner with strong case lines and full set accessories. Fully inspected and pressure tested before listing.',
    featured: true
  },
  {
    id: '2',
    slug: 'omega-speedmaster-moonwatch-31030425001001',
    brand: 'Omega',
    model: 'Speedmaster Moonwatch',
    reference: '310.30.42.50.01.001',
    price: 6350,
    year: 2022,
    condition: 'Very Good',
    status: 'in_stock',
    box: true,
    papers: true,
    movement: 'Manual Wind',
    caseSize: '42mm',
    material: 'Steel',
    dial: 'Black',
    bracelet: 'Steel',
    sku: 'PWC-OMG-31030425001001-001',
    visibility: 'public',
    images: [
      {
        id: '2-1',
        watchId: '2',
        url: 'https://images.unsplash.com/photo-1548171915-e79a1e624a9f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Omega Speedmaster Moonwatch',
        sortOrder: 0,
        isPrimary: true
      },
      {
        id: '2-2',
        watchId: '2',
        url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Omega Speedmaster side angle',
        sortOrder: 1
      }
    ],
    description: 'The latest Hesalite Moonwatch with honest wear and a strong movement performance report.',
    featured: true
  },
  {
    id: '3',
    slug: 'tudor-black-bay-58-79030n',
    brand: 'Tudor',
    model: 'Black Bay 58',
    reference: '79030N',
    price: 3295,
    year: 2021,
    condition: 'Excellent',
    status: 'in_stock',
    box: true,
    papers: true,
    movement: 'Automatic',
    caseSize: '39mm',
    material: 'Steel',
    dial: 'Black',
    bracelet: 'Steel',
    sku: 'PWC-TUD-79030N-001',
    visibility: 'public',
    images: [
      {
        id: '3-1',
        watchId: '3',
        url: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tudor Black Bay 58',
        sortOrder: 0,
        isPrimary: true
      }
    ],
    description: 'Classic proportions, strong lume, and full set paperwork. A balanced daily-wear dive watch.',
    featured: true
  },
  {
    id: '4',
    slug: 'cartier-santos-medium-wssa0029',
    brand: 'Cartier',
    model: 'Santos Medium',
    reference: 'WSSA0029',
    price: 6650,
    year: 2023,
    condition: 'Unworn',
    status: 'in_stock',
    box: true,
    papers: true,
    movement: 'Automatic',
    caseSize: '35.1mm',
    material: 'Steel',
    dial: 'Silver',
    bracelet: 'Steel',
    sku: 'PWC-CAR-WSSA0029-001',
    visibility: 'public',
    images: [
      {
        id: '4-1',
        watchId: '4',
        url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Cartier Santos Medium',
        sortOrder: 0,
        isPrimary: true
      }
    ],
    description: 'Unworn current-production Santos Medium with stickers removed only for authentication imaging.'
  },
  {
    id: '5',
    slug: 'grand-seiko-snowflake-sbga211',
    brand: 'Grand Seiko',
    model: 'Snowflake',
    reference: 'SBGA211',
    price: 4650,
    year: 2020,
    condition: 'Good',
    status: 'reserved',
    box: true,
    papers: false,
    movement: 'Spring Drive',
    caseSize: '41mm',
    material: 'Titanium',
    dial: 'White',
    bracelet: 'Titanium',
    sku: 'PWC-GRS-SBGA211-001',
    visibility: 'public',
    images: [
      {
        id: '5-1',
        watchId: '5',
        url: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80',
        alt: 'Grand Seiko Snowflake dial',
        sortOrder: 0,
        isPrimary: true
      }
    ],
    description: 'Distinctive textured dial with light case wear. Movement regulated and tested in-house.'
  },
  {
    id: '6',
    slug: 'rolex-datejust-126334-blue-dial',
    brand: 'Rolex',
    model: 'Datejust 41',
    reference: '126334',
    price: 12800,
    year: 2024,
    condition: 'Unworn',
    status: 'in_stock',
    box: true,
    papers: true,
    movement: 'Automatic',
    caseSize: '41mm',
    material: 'Steel',
    dial: 'Blue',
    bracelet: 'Jubilee',
    sku: 'PWC-ROL-126334-001',
    visibility: 'public',
    images: [
      {
        id: '6-1',
        watchId: '6',
        url: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80',
        alt: 'Rolex Datejust 41 blue dial',
        sortOrder: 0,
        isPrimary: true
      }
    ],
    description: 'Fluted bezel and blue sunburst dial configuration with complete factory package.'
  }
];

export const featuredWatches = watches.filter((watch) => watch.featured);
