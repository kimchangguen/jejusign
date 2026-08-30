import Image from "next/image";
import { Category } from "@/lib/categories";

interface CategoryHeroProps {
  category: Category;
  image: string;
}

export default function CategoryHero({ category, image }: CategoryHeroProps) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink text-white md:min-h-[56vh]">
      <Image
        src={image}
        alt={`${category.name} 시공 사진`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

      <div className="container-page relative z-10 pb-12 pt-32 md:pb-16">
        <p className="font-display text-xs tracking-[0.3em] text-white/70">
          {category.nameEn}
        </p>
        <h1 className="text-balance mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {category.h1}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
          {category.description}
        </p>
      </div>
    </section>
  );
}
