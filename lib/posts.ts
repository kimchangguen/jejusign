import { Post } from "@/types/post";
import { categories } from "@/lib/categories";
import { WORK_PHOTOS } from "@/lib/images";

/**
 * Headless WordPress 연결 전, 시공사례 목록·상세 페이지 디자인을 확인하기 위한
 * 프론트엔드 개발용 샘플 콘텐츠. 가짜 고객명·시공지역 상세주소·가격·실적 수치는
 * 포함하지 않으며, 카테고리에 대한 일반 정보성 문구로만 구성한다.
 *
 * WordPress 연동 시 이 파일은 사용하지 않고 lib/wordpress.ts 의 fetch 함수가
 * 동일한 Post 형태의 데이터를 REST API에서 가져오도록 교체한다. 목록/상세/페이지네이션은
 * 모두 배열 길이를 기준으로 동적으로 계산되므로, 실제 게시물 수가 늘어나도
 * 프론트엔드 코드를 수정할 필요가 없다.
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

// 카테고리별 샘플 제목 (제주 지역·업종을 다양하게 조합해 48개가 서로 달라 보이도록 구성)
const titlesByCategory: Record<string, string[]> = {
  "channel-sign": [
    "제주시 LED 채널간판 제작 시공",
    "제주 카페 전면 채널간판 교체",
    "서귀포 매장 채널사인 신규 제작",
    "제주시 상가 외벽 채널사인",
    "애월 카페거리 채널간판 시공",
    "제주 프랜차이즈 채널간판 제작",
    "조천 음식점 채널간판 교체",
    "제주시 병원 채널사인 제작",
  ],
  "led-sign": [
    "제주 병원 LED 간판 시공",
    "제주시 대형 옥외 LED간판 제작",
    "서귀포 매장 LED 사인 교체",
    "제주 편의점 LED간판 시공",
    "한림 카페 LED 조명간판 제작",
    "제주시 약국 LED간판 시공",
    "제주 미용실 LED사인 제작",
    "제주 야간 조명 LED간판 시공",
  ],
  "blade-sign": [
    "제주시 카페 돌출간판 제작",
    "서귀포 상가 돌출사인 시공",
    "제주 병원 돌출간판 교체",
    "제주시 음식점 돌출간판 제작",
    "애월 매장 돌출사인 시공",
    "제주 약국 돌출간판 제작",
    "조천 카페 돌출간판 신규 시공",
    "제주시 미용실 돌출사인 제작",
  ],
  "standing-sign": [
    "제주 매장 입간판 제작",
    "서귀포 카페 입간판 시공",
    "제주시 상가 안내 입간판 제작",
    "제주 음식점 메뉴 입간판 시공",
    "한림 펜션 안내 입간판 제작",
    "제주 관광지 입간판 시공",
    "조천 매장 입간판 신규 제작",
    "제주시 병원 입간판 시공",
  ],
  "interior-sign": [
    "제주 실내 아크릴 사인 시공",
    "서귀포 매장 실내사인 제작",
    "제주시 사무공간 실내 사인 시공",
    "제주 카페 포인트 월사인 제작",
    "애월 리조트 실내 안내사인 시공",
    "제주 병원 실내 사인 제작",
    "제주시 상가 층별 표지 시공",
    "조천 매장 실내 사인물 제작",
  ],
  "banner-print": [
    "제주 현수막 및 실사출력 시공",
    "제주시 대형 실사출력 제작",
    "서귀포 매장 시트지 작업",
    "제주 행사 현수막 제작",
    "한림 상가 실사출력 시공",
    "제주시 매장 시트지 교체",
    "조천 현수막 제작 및 설치",
    "제주 관광업체 실사출력 시공",
  ],
};

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

const BASE_DATE = new Date("2026-09-06");
const categoryCount = categories.length;

export const posts: Post[] = categories.flatMap((category, categoryIndex) => {
  const titles = titlesByCategory[category.slug] ?? [category.h1];
  const content = contentByCategory[category.slug] ?? [category.description];

  return titles.map((title, titleIndex) => {
    // 카테고리를 인터리빙한 순번으로 날짜/이미지를 배정해, 최신순 정렬 시
    // 카테고리가 자연스럽게 섞이고 인접 카드의 썸네일이 겹치지 않도록 한다.
    const interleavedRank = titleIndex * categoryCount + categoryIndex;
    const date = new Date(BASE_DATE);
    date.setDate(date.getDate() - interleavedRank);

    return {
      id: category.order * 100 + titleIndex,
      slug: `${category.slug}-${titleIndex + 1}`,
      categorySlug: category.slug,
      title,
      excerpt: category.description,
      content,
      featuredImage: WORK_PHOTOS[interleavedRank % WORK_PHOTOS.length],
      date: formatDate(date),
    };
  });
});

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

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
