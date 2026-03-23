import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { posts } from '@/data/posts';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
      <article className="prose prose-slate max-w-none">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{post.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{post.title}</h1>
        <p className="text-sm text-slate-500">By {post.author} · {formatDate(post.publishedAt)}</p>
        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>

      <aside className="space-y-8">
        <section className="rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Stay informed</h2>
          <p className="mt-2 text-sm text-slate-600">Get new arrivals and concise market updates.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Related posts</h2>
          <div className="mt-4 space-y-4">
            {related.map((item) => (
              <Link key={item.id} href={`/blog/${item.slug}`} className="block text-sm text-slate-700 hover:text-slate-900">
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </Container>
  );
}
