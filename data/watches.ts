export type WatchCondition = 'Unworn' | 'Excellent' | 'Very Good' | 'Good';

export type Watch = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  reference: string;
  price: number;
  year: number;
  condition: WatchCondition;
  boxPapers: 'Full Set' | 'Watch Only' | 'Partial Set';
  availability: 'In Stock' | 'Reserved' | 'Sold';
  movement: string;
  caseSize: string;
  dial: string;
  bracelet: string;
  image: string;
  gallery: string[];
  description: string;
  featured?: boolean;
};

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
    boxPapers: 'Full Set',
    availability: 'In Stock',
    movement: 'Automatic',
    caseSize: '41mm',
    dial: 'Black',
    bracelet: 'Oystersteel',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80'
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
    boxPapers: 'Full Set',
    availability: 'In Stock',
    movement: 'Manual Wind',
    caseSize: '42mm',
    dial: 'Black',
    bracelet: 'Steel',
    image: 'https://images.unsplash.com/photo-1548171915-e79a1e624a9f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548171915-e79a1e624a9f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
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
    boxPapers: 'Full Set',
    availability: 'In Stock',
    movement: 'Automatic',
    caseSize: '39mm',
    dial: 'Black',
    bracelet: 'Steel',
    image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1200&q=80'
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
    boxPapers: 'Full Set',
    availability: 'In Stock',
    movement: 'Automatic',
    caseSize: '35.1mm',
    dial: 'Silver',
    bracelet: 'Steel',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1200&q=80'
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
    boxPapers: 'Partial Set',
    availability: 'Reserved',
    movement: 'Spring Drive',
    caseSize: '41mm',
    dial: 'White',
    bracelet: 'Titanium',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80'
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
    boxPapers: 'Full Set',
    availability: 'In Stock',
    movement: 'Automatic',
    caseSize: '41mm',
    dial: 'Blue',
    bracelet: 'Jubilee',
    image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Fluted bezel and blue sunburst dial configuration with complete factory package.'
  }
];

export const featuredWatches = watches.filter((watch) => watch.featured);
