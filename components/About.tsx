import Image from "next/image";
import { PRODUCTION_IMAGES } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

const strengths = [
  {
    number: "01",
    title: "제주 40년",
    titleEn: "40 YEARS",
    description: "제주에서 약 40년간 간판사업을 이어온 경험",
  },
  {
    number: "02",
    title: "직접 제작",
    titleEn: "IN-HOUSE PRODUCTION",
    description: "디자인만 하는 업체가 아닌 실제 제작 역량",
  },
  {
    number: "03",
    title: "직접 시공",
    titleEn: "INSTALLATION",
    description: "간판 설치부터 현장 광고시공 및 공사까지 직접 수행",
  },
  {
    number: "04",
    title: "다양한 광고물",
    titleEn: "SIGN & PRINT",
    description: "간판부터 현수막, 실사출력, 실내외 광고물까지 대응",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-paper py-[60px] md:py-[100px] lg:py-[140px]">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-display text-xs tracking-[0.3em] text-accent">
            ABOUT GWANGMYEONG
          </p>
          <h2 className="text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
            40년의 경험,
            <br />
            직접 제작하는 기술
          </h2>
          <p className="mt-6 max-w-md text-base leading-[1.8] text-steel md:text-lg">
            {siteConfig.name}는 단순 디자인 업체가 아니라 직접 제작과 설치,
            광고시공 공사까지 수행하는 제주 간판 전문기업입니다.
          </p>

          <dl className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item.number} className="border-t border-fog pt-5">
                <dt className="font-display text-3xl font-semibold text-accent md:text-4xl">
                  {item.number}
                </dt>
                <dd className="mt-3">
                  <p className="font-display text-[11px] tracking-[0.2em] text-steel">
                    {item.titleEn}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-steel">
                    {item.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {PRODUCTION_IMAGES.map((image, index) => (
            <div
              key={image.src + index}
              className={`relative overflow-hidden rounded-2xl bg-charcoal ${
                index % 2 === 0 ? "mt-0" : "mt-8 md:mt-10"
              }`}
              style={{
                aspectRatio: image.orientation === "landscape" ? "4 / 3" : "3 / 4",
              }}
            >
              <Image
                src={image.src}
                alt="광명광고 직접 제작 및 시공 현장"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
