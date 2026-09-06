import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";
import { getCategoryBySlug } from "@/lib/categories";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const category = getCategoryBySlug(post.categorySlug);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      {category && (
        <p className="font-display mt-4 text-[11px] tracking-[0.2em] text-accent">
          {category.name.toUpperCase()}
        </p>
      )}
      <p className="mt-2 text-lg font-bold text-ink group-hover:text-accent">
        {post.title}
      </p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel">
        {post.excerpt}
      </p>
    </Link>
  );
}
