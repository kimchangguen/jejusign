import Image from "next/image";
import { PRODUCTION_IMAGES } from "@/lib/images";

const strengths = [
  {
    number: "01",
    title: "제주 40년",
    description: "제주에서 약 40년간 간판사업을 이어온 경험",
  },
  {
    number: "02",
    title: "직접 제작",
    description: "디자인만 하는 업체가 아닌 실제 제작 역량",
  },
  {
    number: "03",
    title: "직접 시공",
    description: "간판 설치부터 현장 광고시공 및 공사까지 직접 수행",
  },
  {
    number: "04",
    title: "다양한 광고물",
    description: "간판부터 현수막, 실사출력, 실내외 광고물까지 대응",
  },
];

export default function CompanyStrength() {
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs tracking-[0.3em] text-accent">
            DIRECT PRODUCTION
          </p>
          <h2 className="text-balance mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            제작을 맡기는
            <br />
            회사가 아닙니다
          </h2>
          <p className="mt-5 text-lg font-medium text-white/80 md:text-xl">
            직접 만들고, <br className="sm:hidden" />
            직접 설치합니다.
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item.number} className="border-t border-white/15 pt-5">
                <dt className="font-display text-sm text-accent">
                  {item.number}
                </dt>
                <dd className="mt-2">
                  <p className="text-xl font-bold">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
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
              key={image.src}
              className={`relative overflow-hidden bg-charcoal ${
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
