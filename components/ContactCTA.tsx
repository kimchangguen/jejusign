import { siteConfig } from "@/lib/site-config";
import PhoneLink from "@/components/PhoneLink";

export default function ContactCTA() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="font-display text-xs tracking-[0.3em] text-accent">
            CONTACT
          </p>
          <h2 className="text-balance mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            간판이 필요하다면
            <br />
            광명광고에 문의하세요
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-steel md:text-lg">
            신규 매장 간판부터 기존 간판 교체,
            <br />
            각종 광고물 제작과 현장 시공까지 상담 가능합니다.
          </p>

          <div className="mt-10 space-y-1 border-t border-fog pt-8">
            <p className="text-lg font-bold text-ink">{siteConfig.name}</p>
            <p className="text-sm text-steel">{siteConfig.address}</p>
            <PhoneLink className="font-display block text-2xl font-bold text-ink hover:text-accent">
              {siteConfig.phone}
            </PhoneLink>
          </div>

          <PhoneLink className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
            전화하기
          </PhoneLink>
        </div>

        {/* 추후 Google/Naver 지도 embed 영역 */}
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-fog bg-paper p-10 text-center text-steel md:min-h-[380px]">
          <MapPinIcon />
          <p className="text-sm font-medium text-graphite">{siteConfig.address}</p>
          <p className="text-xs text-mist">지도 영역 (추후 연동 예정)</p>
        </div>
      </div>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
