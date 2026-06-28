import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { RichText } from '@/components/rich-text';
import { submitNewsletterAction } from '@/app/newsletter/actions';
import { getPostBySlug, getPosts } from '@/lib/repositories/blog';
import { getSiteUrl } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      images: [{ url: post.image }]
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const related = (await getPosts()).filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    image: post.image,
    mainEntityOfPage: `${getSiteUrl()}/blog/${post.slug}`
  };

  return (
    <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="max-w-none rounded-3xl border border-white/10 bg-white/[0.03] p-8 prose prose-invert prose-headings:text-white prose-p:text-slate-200 prose-strong:text-white">
        <p className="eyebrow">{post.category ?? 'Journal'}</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">{post.title}</h1>
        <p className="text-sm text-slate-400">By {post.author} · {formatDate(post.publishedAt)}</p>
        <div className="mt-8">
          <RichText value={post.body} />
        </div>
      </article>

      <aside className="space-y-8">
        <section className="surface-card p-6">
          <h2 className="text-lg font-semibold text-white">Stay informed</h2>
          <p className="mt-2 text-sm text-slate-300">Get new arrivals and concise market updates.</p>
          <div className="mt-4">
            <NewsletterForm action={submitNewsletterAction} sourcePage={`/blog/${post.slug}`} />
          </div>
        </section>
        <section className="surface-card p-6">
          <h2 className="text-lg font-semibold text-white">Related posts</h2>
          <div className="mt-4 space-y-4">
            {related.map((item) => (
              <Link key={item.id} href={`/blog/${item.slug}`} className="block text-sm text-slate-300 transition hover:text-amber-100">
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </Container>
  );
}
