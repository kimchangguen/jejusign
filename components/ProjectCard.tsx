import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";
import { getCategoryBySlug } from "@/lib/categories";

interface ProjectCardProps {
  post: Post;
  priority?: boolean;
}

export default function ProjectCard({ post, priority = false }: ProjectCardProps) {
  const category = getCategoryBySlug(post.categorySlug);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-charcoal">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1440px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-2 rounded-[10px] border border-white/65 opacity-0 transition-opacity duration-[350ms] ease-out group-hover:opacity-100"
        />
      </div>

      <p className="mt-4 line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-accent">
        {post.title}
      </p>
      <div className="mt-2 border-t border-fog pt-2">
        <p className="line-clamp-3 text-sm leading-relaxed text-steel">
          {post.excerpt}
        </p>
        <p className="font-display mt-2 text-[11px] tracking-[0.15em] text-accent">
          {category?.name ?? "간판"} · {post.date}
        </p>
      </div>
    </Link>
  );
}
