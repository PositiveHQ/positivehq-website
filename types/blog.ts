export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown;
  author: string;
  publishedAt: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  category?: string;
  featured?: boolean;
}
