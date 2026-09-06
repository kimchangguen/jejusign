import Image from "next/image";
import { HERO_IMAGE } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="container-page pt-6 md:pt-9">
        <div className="relative mx-auto h-[300px] w-full overflow-hidden rounded-[20px] sm:h-[380px] md:h-[480px] md:rounded-[28px] lg:h-[560px]">
          <Image
            src={HERO_IMAGE}
            alt="광명광고가 시공한 제주 간판 현장"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 42%" }}
          />
        </div>
      </div>

      <div className="container-page grid gap-8 py-14 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <p className="font-display text-xs tracking-[0.3em] text-accent">
            JEJU SIGN · 40 YEARS
          </p>
          <h1 className="text-balance mt-5 text-[2.6rem] font-semibold leading-[1.14] tracking-[-0.03em] text-ink md:text-[3.6rem] lg:text-[4.6rem]">
            제주의 간판을
            <br />
            만들어온 40년
          </h1>
        </div>

        <div className="border-fog md:border-l md:pl-16">
          <p className="text-base leading-[1.8] text-steel md:text-lg md:leading-[1.9]">
            광명광고는 제주에서 약 {siteConfig.yearsInBusiness} 동안 수많은
            매장과 기업의 간판을 제작해온 전문업체입니다.
            <br className="hidden md:block" />
            디자인부터 제작, 설치, 현장시공과 광고공사까지 직접 진행합니다.
            <br className="hidden md:block" />
            채널간판, LED간판, 돌출간판, 실내사인, 현수막, 실사출력 등
            다양한 광고물을 제작합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
