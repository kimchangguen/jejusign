import Link from "next/link";
import { getAllPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";

const PREVIEW_COUNT = 8;

export default async function WorksPreview() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, PREVIEW_COUNT);

  return (
    <section className="bg-cream py-[60px] md:py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs tracking-[0.3em] text-accent">
              40 YEARS OF WORK
            </p>
            <h2 className="text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
              제주 곳곳에
              <br />
              광명광고의 작업이 있습니다
            </h2>
          </div>
          <Link
            href="/project"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            시공사례 전체보기
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
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
