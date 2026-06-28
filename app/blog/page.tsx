import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/container';
import { getFeaturedPost, getPosts } from '@/lib/repositories/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Watch market insights, buying guidance, and selling strategies from Positive Watch HQ.',
  alternates: { canonical: '/blog' }
};

export default async function BlogPage() {
  const posts = await getPosts();
  if (posts.length === 0) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold text-white">Journal</h1>
        <p className="mt-3 text-sm text-slate-300">No articles are published yet. Check back soon.</p>
      </Container>
    );
  }
  const featuredPost = await getFeaturedPost();
  const remaining = posts.filter((post) => post.id !== featuredPost.id);

  return (
    <Container className="space-y-12 py-16">
      <header>
        <p className="eyebrow">Journal</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">Trusted watch guidance</h1>
      </header>

      <Link href={`/blog/${featuredPost.slug}`} className="surface-card grid gap-8 overflow-hidden lg:grid-cols-2">
        <div className="relative min-h-[280px]">
          <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </div>
        <div className="space-y-4 p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-100/80">
            Featured{featuredPost.category ? ` · ${featuredPost.category}` : ''}
          </p>
          <h2 className="text-3xl font-semibold text-white">{featuredPost.title}</h2>
          <p className="text-sm text-slate-300">{featuredPost.excerpt}</p>
          <p className="text-xs text-slate-400">{formatDate(featuredPost.publishedAt)}</p>
        </div>
      </Link>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {remaining.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="surface-card p-6 hover:border-amber-100/35">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{post.category ?? 'Journal'}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
            <p className="mt-4 text-xs text-slate-400">{formatDate(post.publishedAt)}</p>
          </Link>
        ))}
      </section>
    </Container>
  );
}
