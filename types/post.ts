export interface Post {
  id: number;
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
}
