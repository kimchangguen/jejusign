import "server-only";
import sanitizeHtml from "sanitize-html";
import { Post } from "@/types/post";

/**
 * Headless WordPress REST API 클라이언트.
 *
 * - 시공사례 = WordPress 카테고리 slug "portfolio" 의 게시물만 사용한다.
 * - 카테고리 ID 는 하드코딩하지 않고 slug 로 조회한다.
 * - 모든 fetch 는 ISR(revalidate) 로 캐시되어, 새 글을 발행하면 재배포 없이
 *   최대 REVALIDATE_SECONDS 이내에 사이트에 반영된다.
 * - "연결 실패" 와 "게시물 0개" 는 구분한다: 실패는 WordPressError 를 throw 하고,
 *   0개는 정상 응답(total: 0)으로 돌려준다.
 */

export const REVALIDATE_SECONDS = 60;
export const PORTFOLIO_SLUG = "portfolio";
export const PROJECT_PAGE_SIZE = 16;

const FALLBACK_IMAGE = "/20260906 (1).jpg";

export class WordPressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WordPressError";
  }
}

export interface PostsPage {
  posts: Post[];
  total: number;
  totalPages: number;
}

interface WpTerm {
  slug: string;
}

interface WpPost {
  slug: string;
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: WpTerm[][];
  };
}

const POST_FIELDS =
  "id,slug,date,title,excerpt,content,_links,_embedded";

function getApiBase(): string {
  const raw = process.env.WORDPRESS_API_URL;
  if (!raw) throw new WordPressError("WORDPRESS_API_URL is not configured");
  const origin = raw.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/, "");
  return `${origin}/wp-json/wp/v2`;
}

async function wpFetch(path: string): Promise<Response> {
  let res: Response;
  try {
    res = await fetch(`${getApiBase()}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    throw new WordPressError(
      `WordPress request failed: ${error instanceof Error ? error.message : "network error"}`
    );
  }
  return res;
}

async function wpJson<T>(path: string): Promise<{ data: T; res: Response }> {
  const res = await wpFetch(path);
  if (!res.ok) throw new WordPressError(`WordPress responded ${res.status} for ${path}`);
  try {
    return { data: (await res.json()) as T, res };
  } catch {
    throw new WordPressError(`WordPress returned invalid JSON for ${path}`);
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const isHex = code[1].toLowerCase() === "x";
      const point = parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(point) ? String.fromCodePoint(point) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}

function formatDate(date: string): string {
  return date.slice(0, 10).replace(/-/g, ".");
}

function mapPost(wp: WpPost): Post {
  const terms = wp._embedded?.["wp:term"]?.flat() ?? [];
  const categorySlug =
    terms.find((term) => term.slug !== PORTFOLIO_SLUG)?.slug ?? PORTFOLIO_SLUG;

  return {
    id: wp.id,
    slug: wp.slug,
    categorySlug,
    title: toPlainText(wp.title.rendered),
    excerpt: toPlainText(wp.excerpt.rendered),
    content: sanitizeContent(wp.content.rendered),
    featuredImage:
      wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? FALLBACK_IMAGE,
    date: formatDate(wp.date),
  };
}

/** slug 로 카테고리 ID 를 조회한다. 카테고리가 없으면 null. */
async function getCategoryId(slug: string): Promise<number | null> {
  const { data } = await wpJson<Array<{ id: number }>>(
    `/categories?slug=${encodeURIComponent(slug)}&_fields=id`
  );
  return data[0]?.id ?? null;
}

const EMPTY_PAGE: PostsPage = { posts: [], total: 0, totalPages: 0 };

/** 카테고리 slug 의 게시물을 최신 발행순으로 한 페이지 가져온다. */
export async function getPostsPage(
  categorySlug: string,
  page: number,
  perPage: number
): Promise<PostsPage> {
  const categoryId = await getCategoryId(categorySlug);
  if (categoryId === null) return EMPTY_PAGE;

  const query =
    `/posts?categories=${categoryId}&orderby=date&order=desc` +
    `&per_page=${perPage}&_embed=wp:featuredmedia,wp:term&_fields=${POST_FIELDS}`;

  const res = await wpFetch(`${query}&page=${page}`);

  // 범위를 벗어난 페이지는 400 → 총 개수만 다시 조회해 호출측이 보정하게 한다.
  if (res.status === 400) {
    const { res: countRes } = await wpJson<unknown[]>(
      `/posts?categories=${categoryId}&per_page=1&_fields=id`
    );
    const total = Number(countRes.headers.get("X-WP-Total") ?? 0);
    return { posts: [], total, totalPages: Math.ceil(total / perPage) };
  }
  if (!res.ok) throw new WordPressError(`WordPress responded ${res.status} for posts`);

  const data = (await res.json()) as WpPost[];
  const total = Number(res.headers.get("X-WP-Total") ?? data.length);
  return {
    posts: data.map(mapPost),
    total,
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? Math.ceil(total / perPage)),
  };
}

export function getPortfolioPage(page: number, perPage = PROJECT_PAGE_SIZE): Promise<PostsPage> {
  return getPostsPage(PORTFOLIO_SLUG, page, perPage);
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return (await getPostsPage(categorySlug, 1, 100)).posts;
}

/** slug 로 portfolio 게시물 1건 조회. 없으면 undefined. */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const categoryId = await getCategoryId(PORTFOLIO_SLUG);
  if (categoryId === null) return undefined;

  const { data } = await wpJson<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&categories=${categoryId}` +
      `&_embed=wp:featuredmedia,wp:term&_fields=${POST_FIELDS}`
  );
  return data[0] ? mapPost(data[0]) : undefined;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const { posts } = await getPortfolioPage(1, limit + 1);
  return posts.filter((item) => item.slug !== post.slug).slice(0, limit);
}

/** sitemap 용: 최신 portfolio 게시물 slug/날짜 (연결 실패 시 빈 배열). */
export async function getPortfolioSitemapEntries(): Promise<Array<{ slug: string; date: string }>> {
  try {
    const { posts } = await getPortfolioPage(1, 100);
    return posts.map(({ slug, date }) => ({ slug, date }));
  } catch {
    return [];
  }
}
