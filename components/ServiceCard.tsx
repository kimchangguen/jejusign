import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/categories";

interface ServiceCardProps {
  category: Category;
  image: string;
}

export default function ServiceCard({ category, image }: ServiceCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-charcoal"
    >
      <Image
        src={image}
        alt={`${category.name} 시공 사진`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity group-hover:from-ink/95" />

      <div className="relative z-10 flex items-end justify-between p-5 md:p-7">
        <div>
          <p className="font-display text-xs tracking-[0.2em] text-white/60">
            {String(category.order).padStart(2, "0")} · {category.nameEn}
          </p>
          <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
            {category.name}
          </p>
          <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-white/70 md:text-sm">
            {category.cardDescription}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform group-hover:translate-x-1 group-hover:bg-accent group-hover:border-accent">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
