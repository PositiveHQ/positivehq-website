import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/container';
import { featuredPost, posts } from '@/data/posts';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const remaining = posts.filter((post) => post.id !== featuredPost.id);

  return (
    <Container className="space-y-12 py-16">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Journal</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Trusted watch guidance</h1>
      </header>

      <Link href={`/blog/${featuredPost.slug}`} className="grid gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-2">
        <div className="relative min-h-[280px]">
          <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover" />
        </div>
        <div className="space-y-4 p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Featured · {featuredPost.category}</p>
          <h2 className="text-3xl font-semibold text-slate-900">{featuredPost.title}</h2>
          <p className="text-sm text-slate-600">{featuredPost.excerpt}</p>
          <p className="text-xs text-slate-500">{formatDate(featuredPost.publishedAt)}</p>
        </div>
      </Link>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {remaining.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-400">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{post.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <p className="mt-4 text-xs text-slate-500">{formatDate(post.publishedAt)}</p>
          </Link>
        ))}
      </section>
    </Container>
  );
}
