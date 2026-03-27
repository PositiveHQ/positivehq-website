export const blogPostsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": coverImage.asset->url,
  publishedAt,
  seoTitle,
  seoDescription,
  body,
  "author": coalesce(author->name, "Positive Watch Co Editorial")
}`;

export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": coverImage.asset->url,
  publishedAt,
  seoTitle,
  seoDescription,
  body,
  "author": coalesce(author->name, "Positive Watch Co Editorial")
}`;
