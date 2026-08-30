export const siteConfig = {
  name: "광명광고",
  nameEn: "GWANGMYEONG SIGN",
  shortEn: "JEJU SIGN",
  address: "제주특별자치도 제주시 연북로 545",
  phone: "064-726-1301",
  phoneHref: "tel:064-726-1301",
  region: "제주특별자치도",
  yearsInBusiness: "40년",
  tagline: "제주의 간판을 만들어온 40년",
  // 실제 도메인이 정해지면 배포 환경의 NEXT_PUBLIC_SITE_URL 값으로 교체한다.
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
