import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import PhoneLink from "@/components/PhoneLink";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-white md:min-h-[100svh]">
      <Image
        src={HERO_IMAGE}
        alt="광명광고가 시공한 제주 대형 간판"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="container-page relative z-10 pb-14 pt-24 md:pb-24 md:pt-40">
        <p className="font-display text-xs tracking-[0.3em] text-white/70 md:text-sm">
          JEJU SIGN · 40 YEARS
        </p>
        <h1 className="text-balance mt-5 max-w-4xl text-[2.6rem] font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-[5.5rem]">
          제주의 간판을 <br className="hidden sm:block" />
          만들어온 40년
        </h1>
        <p className="mt-6 max-w-xl text-lg font-medium text-white/90 md:text-2xl">
          디자인부터 제작, 시공까지
          <br />
          광명광고가 직접 합니다
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          제주에서 약 {siteConfig.yearsInBusiness} 동안 수많은 매장과 기업의 간판을
          제작해온 광명광고. 채널간판부터 LED, 각종 옥내외 광고물까지 직접
          제작하고 현장 시공합니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-fog"
          >
            시공 분야 보기
          </Link>
          <PhoneLink className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            전화 상담 {siteConfig.phone}
          </PhoneLink>
        </div>
      </div>
    </section>
  );
}
