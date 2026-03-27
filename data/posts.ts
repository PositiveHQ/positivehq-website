import { BlogPost } from '@/types/blog';

export const posts: BlogPost[] = [
  {
    id: 'p1',
    slug: 'how-to-buy-a-modern-rolex-without-overpaying',
    title: 'How to Buy a Modern Rolex Without Overpaying',
    excerpt: 'A practical framework for judging pricing, condition, and market timing before you buy.',
    body: [
      'Start with a target reference and a clear price window. Most expensive mistakes happen when buyers shop the entire catalog instead of narrowing to one model and configuration.',
      'Condition is value. Bracelet stretch, over-polishing, and mismatched components can move value more than a small price discount. Ask for detailed photos and service history.',
      'If possible, buy from a dealer that pressure tests, verifies movement performance, and discloses what is included. Clean process beats a low price with unknowns.'
    ],
    category: 'Buying',
    author: 'Positive Watch Co Editorial',
    publishedAt: '2026-01-10',
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1400&q=80',
    featured: true
  },
  {
    id: 'p2',
    slug: 'what-dealers-look-for-when-buying-your-watch',
    title: 'What Dealers Look For When Buying Your Watch',
    excerpt: 'Understand the exact inputs behind a real buy offer and improve your result before submitting.',
    body: [
      'Dealers evaluate brand demand, reference liquidity, condition, and completeness. Full sets and recent service records can materially improve the offer range.',
      'Clean, natural-light photos help speed up the process and reduce pricing friction. Show the case, clasp, bracelet, and accessories clearly.',
      'When timing matters, transparency helps. Share any defects up front and you will receive a faster, more accurate offer.'
    ],
    category: 'Selling',
    author: 'Positive Watch Co Editorial',
    publishedAt: '2026-02-01',
    image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'p3',
    slug: 'q1-2026-watch-market-brief',
    title: 'Q1 2026 Watch Market Brief: What Is Moving',
    excerpt: 'A short read on where pricing is stable, where inventory is tight, and what buyers are requesting most.',
    body: [
      'Rolex sports references remain highly liquid in excellent condition and complete sets. Pricing has normalized from previous highs but demand remains resilient.',
      'Selective strength continues in integrated-bracelet designs and heritage models from Omega and Tudor. Buyers are rewarding clean, complete examples.',
      'For sellers, realistic pricing and clear disclosure lead to faster closes. The spread between wholesale and retail narrows when listing quality is high.'
    ],
    category: 'Market',
    author: 'Positive Watch Co Editorial',
    publishedAt: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1615900119312-c3f1598f6f37?auto=format&fit=crop&w=1400&q=80'
  }
];

export const featuredPost = posts.find((post) => post.featured) ?? posts[0];
