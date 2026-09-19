export interface Post {
  id: number;
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  /** WordPress 본문 HTML (서버에서 sanitize 완료) */
  content: string;
  featuredImage: string;
  date: string;
}
