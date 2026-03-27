import { featuredPost, posts } from '@/data/posts';
import { BlogPost } from '@/types/blog';
import { getSanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/lib/sanity/queries';

type SanityPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  body: unknown;
  author: string;
};

function toBlogPost(post: SanityPost): BlogPost {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image || 'https://images.unsplash.com/photo-1615900119312-c3f1598f6f37?auto=format&fit=crop&w=1400&q=80',
    publishedAt: post.publishedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    body: post.body,
    author: post.author
  };
}

async function getSanityPosts(): Promise<BlogPost[] | null> {
  const sanityClient = getSanityClient();
  if (!sanityClient) return null;

  try {
    const data = await sanityClient.fetch<SanityPost[]>(blogPostsQuery);
    if (!data || data.length === 0) return null;
    return data.map(toBlogPost);
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const livePosts = await getSanityPosts();
  if (livePosts) return livePosts;
  return posts;
}

export async function getFeaturedPost(): Promise<BlogPost> {
  const livePosts = await getPosts();
  return livePosts[0] ?? featuredPost;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured()) {
    const sanityClient = getSanityClient();
    if (!sanityClient) return posts.find((post) => post.slug === slug) ?? null;

    try {
      const data = await sanityClient.fetch<SanityPost | null>(blogPostBySlugQuery, { slug });
      if (data) return toBlogPost(data);
    } catch {
      // fall through to mock data
    }
  }

  return posts.find((post) => post.slug === slug) ?? null;
}
