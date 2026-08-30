/**
 * public/ 폴더의 실제 광명광고 시공 사진 중 홈페이지에 사용할 이미지를 선별한 매니페스트.
 * 원본 파일은 이동·삭제·이름 변경하지 않는다.
 */

export interface WorkImage {
  src: string;
  orientation: "landscape" | "portrait";
}

export const HERO_IMAGE = "/KakaoTalk_20210429_132218718.jpg";

// 카테고리별 대표 이미지 (서비스 카드 + 카테고리 페이지 상단 대표사진에 공통 사용)
export const CATEGORY_IMAGES: Record<string, string> = {
  "channel-sign": "/KakaoTalk_20210429_133021357.jpg",
  "led-sign": "/KakaoTalk_20210429_133350498.jpg",
  "blade-sign": "/KakaoTalk_20210429_133724320_10.jpg",
  "standing-sign": "/KakaoTalk_20210429_134131727.jpg",
  "interior-sign": "/KakaoTalk_20210429_134513788_20.jpg",
  "banner-print": "/KakaoTalk_20210429_132221799.jpg",
};

// 각 카테고리의 두 번째 대표 이미지 (placeholder 포스팅 카드용)
export const CATEGORY_SECONDARY_IMAGES: Record<string, string> = {
  "channel-sign": "/KakaoTalk_20210429_133021357_10.jpg",
  "led-sign": "/KakaoTalk_20210429_133350498_10.jpg",
  "blade-sign": "/KakaoTalk_20210429_133724320_20.jpg",
  "standing-sign": "/KakaoTalk_20210429_134131727_10.jpg",
  "interior-sign": "/KakaoTalk_20210429_134513788_10.jpg",
  "banner-print": "/KakaoTalk_20210429_132215719.jpg",
};

export const CATEGORY_TERTIARY_IMAGES: Record<string, string> = {
  "channel-sign": "/KakaoTalk_20210429_133021357_20.jpg",
  "led-sign": "/KakaoTalk_20210429_133350498_20.jpg",
  "blade-sign": "/KakaoTalk_20210429_133724320_29.jpg",
  "standing-sign": "/KakaoTalk_20210429_134131727_20.jpg",
  "interior-sign": "/KakaoTalk_20210429_134513788_29.jpg",
  "banner-print": "/KakaoTalk_20210429_132212465.jpg",
};

// WORK 섹션(메인) 갤러리
export const WORK_GALLERY: WorkImage[] = [
  { src: "/KakaoTalk_20210429_132212465.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210429_132215719.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133021357_10.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133021357_20.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210429_133021357_29.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133350498_10.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210429_133350498_20.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210429_133350498_29.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133724320.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133724320_20.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210429_134131727_10.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_134131727_20.jpg", orientation: "landscape" },
];

// DIRECT PRODUCTION(직접 제작·시공) 섹션
export const PRODUCTION_IMAGES: WorkImage[] = [
  { src: "/KakaoTalk_20210415_112344045.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_133724320_29.jpg", orientation: "portrait" },
  { src: "/KakaoTalk_20210429_134513788.jpg", orientation: "landscape" },
  { src: "/KakaoTalk_20210520_172914738.jpg", orientation: "portrait" },
];
