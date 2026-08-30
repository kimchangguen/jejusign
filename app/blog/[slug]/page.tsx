import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress";
import { getCategoryBySlug } from "@/lib/categories";
import { CATEGORY_TERTIARY_IMAGES } from "@/lib/images";
import PostCard from "@/components/PostCard";
import PhoneLink from "@/components/PhoneLink";
import { siteConfig } from "@/lib/site-config";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.categorySlug);
  const relatedPosts = await getRelatedPosts(post);
  const bodyImage = CATEGORY_TERTIARY_IMAGES[post.categorySlug];

  return (
    <article>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal md:aspect-[21/9]">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl py-10 md:py-16">
          {category && (
            <Link
              href={`/${category.slug}`}
              className="font-display text-xs font-semibold tracking-[0.2em] text-accent"
            >
              {category.name.toUpperCase()}
            </Link>
          )}
          <h1 className="text-balance mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            {post.title}
          </h1>

          <div className="prose-content mt-8 space-y-5 text-base leading-relaxed text-graphite md:text-lg">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {bodyImage && (
            <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-xl bg-charcoal md:aspect-[16/9]">
              <Image
                src={bodyImage}
                alt={`${category?.name ?? ""} 시공 사진`}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-14 rounded-2xl bg-paper p-8 text-center md:p-10">
            <p className="text-lg font-bold text-ink">
              {category?.name ?? "간판"} 상담이 필요하신가요?
            </p>
            <p className="mt-2 text-sm text-steel">
              {siteConfig.name}에 문의하시면 현장 상황에 맞게 상담해드립니다.
            </p>
            <PhoneLink className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark">
              {siteConfig.phone} 전화하기
            </PhoneLink>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="border-t border-fog py-14 md:py-20">
            <p className="text-lg font-bold text-ink md:text-xl">관련 콘텐츠</p>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
