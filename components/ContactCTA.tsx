import { siteConfig } from "@/lib/site-config";
import PhoneLink from "@/components/PhoneLink";

// 주소 문자열 기반 Google Maps 연동 (API Key 불필요)
const mapQuery = encodeURIComponent(siteConfig.address);
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`;
const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-white py-20 md:py-28">
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

        <div className="overflow-hidden rounded-2xl border border-fog bg-paper">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[320px]">
            <iframe
              src={mapEmbedSrc}
              title={`광명광고 위치 - ${siteConfig.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="text-base font-bold text-ink">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-steel">{siteConfig.address}</p>
              <PhoneLink className="font-display mt-1 block text-sm font-semibold text-ink hover:text-accent">
                {siteConfig.phone}
              </PhoneLink>
            </div>
            <a
              href={mapLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Google 지도에서 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
