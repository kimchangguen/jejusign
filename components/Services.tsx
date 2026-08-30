import { categories } from "@/lib/categories";
import { CATEGORY_IMAGES } from "@/lib/images";
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="font-display text-xs tracking-[0.3em] text-accent">
            SIGN &amp; ADVERTISING
          </p>
          <h2 className="text-balance mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            간판 제작에 필요한
            <br />
            모든 과정을 한 곳에서
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {categories.map((category) => (
            <ServiceCard
              key={category.slug}
              category={category}
              image={CATEGORY_IMAGES[category.slug]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
