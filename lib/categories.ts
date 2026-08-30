export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  order: number;
  h1: string;
  description: string;
  cardDescription: string;
}

/**
 * 헤더 메뉴 = Headless WordPress 카테고리와 1:1로 대응한다.
 * 워드프레스 연동 시 이 slug 값을 WP 카테고리 slug와 동일하게 맞추면
 * 프론트 구조 변경 없이 실제 포스팅 목록으로 교체할 수 있다.
 */
export const categories: Category[] = [
  {
    slug: "channel-sign",
    name: "채널간판",
    nameEn: "CHANNEL SIGN",
    order: 1,
    h1: "제주 채널간판 제작",
    description:
      "내부 조명을 활용한 입체형 채널간판을 디자인부터 제작, 현장 시공까지 직접 진행합니다.",
    cardDescription: "입체 조명 간판, 디자인부터 제작까지",
  },
  {
    slug: "led-sign",
    name: "LED간판",
    nameEn: "LED SIGN",
    order: 2,
    h1: "제주 LED간판 제작 및 시공",
    description:
      "야간 시인성이 뛰어난 LED간판을 매장 환경에 맞게 설계하고 직접 제작·시공합니다.",
    cardDescription: "야간에도 선명한 LED 조명 간판",
  },
  {
    slug: "blade-sign",
    name: "돌출간판",
    nameEn: "BLADE SIGN",
    order: 3,
    h1: "제주 돌출간판 제작",
    description:
      "건물 외벽에서 돌출되어 원거리 시인성을 높이는 돌출간판을 제작하고 고소작업으로 안전하게 시공합니다.",
    cardDescription: "원거리 시인성을 높이는 돌출형 간판",
  },
  {
    slug: "standing-sign",
    name: "입간판",
    nameEn: "STANDING SIGN",
    order: 4,
    h1: "제주 입간판 제작",
    description:
      "매장 앞 안내와 홍보에 활용되는 입간판을 다양한 소재와 형태로 제작합니다.",
    cardDescription: "매장 앞 안내·홍보용 입간판",
  },
  {
    slug: "interior-sign",
    name: "실내사인",
    nameEn: "INTERIOR SIGN",
    order: 5,
    h1: "제주 실내사인 제작",
    description:
      "매장과 사무 공간의 분위기를 완성하는 실내 사인물을 공간에 맞게 제작·설치합니다.",
    cardDescription: "공간을 완성하는 실내 사인물",
  },
  {
    slug: "banner-print",
    name: "현수막·실사출력",
    nameEn: "BANNER & PRINT",
    order: 6,
    h1: "제주 현수막·실사출력",
    description:
      "현수막, 대형 실사출력, 시트지 작업까지 옥내외 광고물을 폭넓게 제작합니다.",
    cardDescription: "현수막, 실사출력, 시트지 작업",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
