import Image from "next/image";
import { WORK_GALLERY } from "@/lib/images";

export default function WorkGallery() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs tracking-[0.3em] text-accent">
              40 YEARS OF WORK
            </p>
            <h2 className="text-balance mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              제주 곳곳에
              <br />
              광명광고의 작업이 있습니다
            </h2>
          </div>
        </div>

        <div className="mt-12 columns-2 gap-3 md:mt-16 md:columns-3 md:gap-4 lg:columns-4">
          {WORK_GALLERY.map((image) => (
            <div
              key={image.src}
              className="relative mb-3 overflow-hidden break-inside-avoid bg-charcoal md:mb-4"
            >
              <Image
                src={image.src}
                alt="광명광고 시공 사진"
                width={image.orientation === "landscape" ? 1440 : 810}
                height={image.orientation === "landscape" ? 810 : 1440}
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
