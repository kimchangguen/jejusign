import { Post } from "@/types/post";
import { categories } from "@/lib/categories";
import {
  CATEGORY_IMAGES,
  CATEGORY_SECONDARY_IMAGES,
} from "@/lib/images";

/**
 * Headless WordPress 연결 전, 카테고리 페이지·상세 페이지 디자인을 확인하기 위한
 * 임시 콘텐츠. 가짜 고객명·시공지역·가격·실적 수치는 포함하지 않으며,
 * 카테고리에 대한 일반 정보성 문구로만 구성한다.
 *
 * WordPress 연동 시 이 파일은 사용하지 않고 lib/wordpress.ts 의 fetch 함수가
 * 동일한 Post 형태의 데이터를 REST API에서 가져오도록 교체한다.
 */

const contentByCategory: Record<string, string[]> = {
  "channel-sign": [
    "채널간판은 글자와 로고 형태로 아크릴이나 금속 몸체를 제작하고, 내부에 조명을 넣어 입체감과 야간 가시성을 동시에 확보하는 간판입니다.",
    "매장 파사드의 재질과 크기, 조명 위치에 따라 결과물의 인상이 크게 달라지기 때문에 설계 단계부터 현장 조건을 함께 검토합니다.",
    "광명광고는 디자인 설계부터 몸체 제작, 배선, 현장 설치까지 전 과정을 직접 진행하여 완성도와 사후 관리를 함께 책임집니다.",
  ],
  "led-sign": [
    "LED간판은 저전력으로 밝고 균일한 빛을 낼 수 있어 야간 시인성이 중요한 매장에 특히 효과적인 방식입니다.",
    "모듈 배치와 방수 처리, 전원 설계에 따라 내구성과 밝기 편차가 달라지므로 시공 경험이 결과물의 품질을 좌우합니다.",
    "제작부터 배선, 방수 마감, 현장 설치까지 직접 수행하여 장기간 안정적으로 작동하는 LED간판을 만듭니다.",
  ],
  "blade-sign": [
    "돌출간판은 건물 벽면에서 수직으로 돌출되어 도로 방향에서의 인지도를 높여주는 간판 형태입니다.",
    "고소작업과 구조물 고정이 함께 필요한 작업인 만큼 안전한 시공 역량이 반드시 요구됩니다.",
    "광명광고는 자체 작업차량과 고소작업 경험을 바탕으로 돌출간판의 제작과 설치를 함께 진행합니다.",
  ],
  "standing-sign": [
    "입간판은 매장 앞 동선에서 정보를 전달하고 시선을 끄는 역할을 하는 옥외 광고물입니다.",
    "소재와 형태를 매장 분위기에 맞춰 제작하면 브랜드 톤을 유지하면서도 눈에 띄는 안내물을 만들 수 있습니다.",
    "제작부터 현장 배치까지 직접 진행하여 실제 설치 환경에 맞는 입간판을 완성합니다.",
  ],
  "interior-sign": [
    "실내사인은 매장과 사무 공간의 브랜드 경험을 완성하는 중요한 요소입니다.",
    "포인트 월사인부터 안내 사인, 층별 표지까지 공간의 목적에 맞는 소재와 마감을 선택합니다.",
    "제작과 설치를 함께 진행하여 도면상의 디자인이 실제 공간에서도 동일한 완성도로 구현되도록 합니다.",
  ],
  "banner-print": [
    "현수막과 실사출력은 짧은 기간 안에 넓은 면적의 홍보 효과를 낼 수 있는 방식입니다.",
    "출력 해상도와 소재 선택, 거치 방식에 따라 결과물의 품질과 내구성이 달라집니다.",
    "시트지 작업을 포함한 다양한 옥내외 광고물 제작을 한 곳에서 직접 진행합니다.",
  ],
};

const titleSuffixes = ["소개", "제작 안내"];

export const posts: Post[] = categories.flatMap((category) => {
  const images = [
    CATEGORY_IMAGES[category.slug],
    CATEGORY_SECONDARY_IMAGES[category.slug],
  ];

  return titleSuffixes.map((suffix, index) => ({
    id: category.order * 10 + index,
    slug: `${category.slug}-${index + 1}`,
    categorySlug: category.slug,
    title: `${category.name} ${suffix}`,
    excerpt: category.description,
    content: contentByCategory[category.slug] ?? [category.description],
    featuredImage: images[index] ?? images[0],
  }));
});

export function getPostsByCategory(categorySlug: string): Post[] {
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((item) => item.categorySlug === post.categorySlug && item.slug !== post.slug)
    .slice(0, limit);
}
