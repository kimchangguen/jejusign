import { Post } from "@/types/post";
import {
  getPostsByCategory as getLocalPostsByCategory,
  getPostBySlug as getLocalPostBySlug,
  getRelatedPosts as getLocalRelatedPosts,
} from "@/lib/posts";

/**
 * Headless WordPress 연동 지점.
 *
 * 지금은 WordPress 접속 정보가 없기 때문에 lib/posts.ts 의 로컬 데이터를 반환한다.
 * 추후 WordPress REST API 를 연결할 때는 아래 함수 내부만 교체하면 되고,
 * 이 함수들을 호출하는 페이지/컴포넌트 코드는 수정할 필요가 없도록 설계했다.
 *
 * 연동 예정 방식 (참고):
 *   const WP_API_URL = process.env.WORDPRESS_API_URL; // e.g. https://cms.example.com/wp-json/wp/v2
 *   const res = await fetch(`${WP_API_URL}/posts?categories=${categoryId}&_embed`, {
 *     next: { revalidate: 60 },
 *   });
 *
 * 카테고리 slug(channel-sign, led-sign, blade-sign, standing-sign, interior-sign,
 * banner-print) 는 WordPress 카테고리 slug 와 동일하게 맞춰서 생성하면
 * 이 파일의 fetch 로직만 채워 넣는 것으로 연동이 끝난다.
 */

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return getLocalPostsByCategory(categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getLocalPostBySlug(slug);
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  return getLocalRelatedPosts(post, limit);
}
