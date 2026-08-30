import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { CATEGORY_IMAGES } from "@/lib/images";
import { getPostsByCategory } from "@/lib/wordpress";
import CategoryHero from "@/components/CategoryHero";
import PostCard from "@/components/PostCard";
import ContactCTA from "@/components/ContactCTA";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.h1,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <>
      <CategoryHero category={category} image={CATEGORY_IMAGES[category.slug]} />

      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="mb-10 flex items-center justify-between border-b border-fog pb-6">
            <h2 className="text-xl font-bold text-ink md:text-2xl">
              {category.name} 시공사례 &amp; 정보
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
