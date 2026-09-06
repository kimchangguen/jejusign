/**
 * public/ 폴더의 실제 광명광고 시공 사진 매니페스트.
 * 원본 파일은 이동·삭제·이름 변경하지 않는다.
 *
 * 참고: 기존에 이 매니페스트가 참조하던 카카오톡 사진 파일들은
 * 별도 작업으로 이미 교체되어 디스크에 존재하지 않는다. 현재 public/ 에는
 * 새로 추가된 시공사진 20장(20260906 (n).jpg)만 남아있어, 아래 매니페스트는
 * 그 20장을 참조하도록 재구성했다.
 */

export interface WorkImage {
  src: string;
  orientation: "landscape" | "portrait";
}

const PHOTO_NUMBERS = [
  1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22,
];

// 새로 추가된 시공사진 20장
export const WORK_PHOTOS: string[] = PHOTO_NUMBERS.map(
  (n) => `/20260906 (${n}).jpg`
);

function photo(index: number): string {
  return WORK_PHOTOS[index % WORK_PHOTOS.length];
}

export const HERO_IMAGE = photo(0);

// 카테고리별 대표 이미지 (서비스 카드 + 카테고리 페이지 상단 대표사진 + 시공사례 카드에 공통 사용)
export const CATEGORY_IMAGES: Record<string, string> = {
  "channel-sign": photo(1),
  "led-sign": photo(2),
  "blade-sign": photo(3),
  "standing-sign": photo(4),
  "interior-sign": photo(5),
  "banner-print": photo(6),
};

// 각 카테고리의 두 번째 대표 이미지 (placeholder 포스팅 카드용)
export const CATEGORY_SECONDARY_IMAGES: Record<string, string> = {
  "channel-sign": photo(7),
  "led-sign": photo(8),
  "blade-sign": photo(9),
  "standing-sign": photo(10),
  "interior-sign": photo(11),
  "banner-print": photo(12),
};

export const CATEGORY_TERTIARY_IMAGES: Record<string, string> = {
  "channel-sign": photo(13),
  "led-sign": photo(14),
  "blade-sign": photo(15),
  "standing-sign": photo(16),
  "interior-sign": photo(17),
  "banner-print": photo(18),
};

// ABOUT(직접 제작·시공) 섹션
export const PRODUCTION_IMAGES: WorkImage[] = [
  { src: photo(19), orientation: "portrait" },
  { src: photo(0), orientation: "landscape" },
  { src: photo(5), orientation: "portrait" },
  { src: photo(10), orientation: "landscape" },
];
