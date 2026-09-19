import Link from "next/link";
import { getPortfolioPage } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import ProjectPagination from "@/components/ProjectPagination";

const PREVIEW_COUNT = 16;

export default async function WorksPreview() {
  let data = null;
  try {
    data = await getPortfolioPage(1, PREVIEW_COUNT);
  } catch (error) {
    console.error("[WorksPreview] WordPress portfolio fetch failed", error);
  }

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
            className="group inline-flex shrink-0 items-center gap-2.5 self-start text-lg font-semibold text-ink transition-colors hover:text-accent md:self-auto md:text-xl"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-accent">
              시공사례 전체보기
            </span>
            <ArrowIcon />
          </Link>
        </div>

        {data === null ? (
          <p className="mt-12 py-16 text-center text-sm text-steel md:mt-16">
            시공사례를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
          </p>
        ) : data.posts.length === 0 ? (
          <p className="mt-12 py-16 text-center text-sm text-steel md:mt-16">
            등록된 시공사례가 없습니다.
          </p>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
              {data.posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {/* 메인은 항상 최신 16개 = 1페이지. 2페이지 이상은 /project?page=N 으로 이동한다. */}
            <ProjectPagination
              currentPage={1}
              totalPages={Math.ceil(data.total / PREVIEW_COUNT)}
            />
          </>
        )}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
