import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/repositories/blog';
import { getAllWatches } from '@/lib/repositories/watches';
import { getSiteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [watches, posts] = await Promise.all([getAllWatches(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/watches',
    '/sell',
    '/consignment',
    '/trade-in',
    '/blog',
    '/newsletter',
    '/about'
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7
  }));

  const watchRoutes: MetadataRoute.Sitemap = watches.map((watch) => ({
    url: `${siteUrl}/watches/${watch.slug}`,
    changeFrequency: 'daily',
    priority: 0.8
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  return [...staticRoutes, ...watchRoutes, ...postRoutes];
}
