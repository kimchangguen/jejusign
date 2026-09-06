"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { getCategoryBySlug } from "@/lib/categories";
import type { Post } from "@/types/post";

const PAGE_SIZE = 24;

interface ProjectGalleryProps {
  posts: Post[];
  initialPage: number;
}

export default function ProjectGallery({ posts, initialPage }: ProjectGalleryProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [page, setPage] = useState(initialPage);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) => {
      const categoryName = getCategoryBySlug(post.categorySlug)?.name ?? "";
      return (
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        categoryName.toLowerCase().includes(term)
      );
    });
  }, [posts, query]);

  const totalCount = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  // 검색으로 totalPages가 줄어들 때를 대비해 렌더링 시점에만 클램프하고,
  // page 상태 자체는 명시적인 페이지 이동/검색 핸들러에서만 갱신한다.
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleQueryChange(next: string) {
    setQuery(next);
    setPage(1);
  }

  function goToPage(next: number) {
    const clamped = Math.min(Math.max(next, 1), totalPages);
    setPage(clamped);
    router.replace(`/project?page=${clamped}`, { scroll: false });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm font-medium text-graphite">
          <GridIcon />
          Total {totalCount} [ {currentPage} / {totalPages} Page ]
        </p>

        <div className="flex items-center gap-2">
          {searchOpen && (
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="시공사례 검색"
              autoFocus
              className="w-40 rounded-full border border-fog bg-white px-4 py-2 text-sm text-ink outline-none focus-visible:border-accent sm:w-56"
            />
          )}
          <button
            type="button"
            aria-label={searchOpen ? "검색창 닫기" : "검색"}
            onClick={() => {
              setSearchOpen((prev) => !prev);
              if (searchOpen) handleQueryChange("");
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fog bg-white text-ink transition-colors hover:border-ink"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {pagePosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-[26px] gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pagePosts.map((post, index) => (
            <ProjectCard key={post.slug} post={post} priority={currentPage === 1 && index < 4} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-steel">
          검색 결과가 없습니다.
        </p>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="시공사례 페이지네이션"
          className="mt-16 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            aria-label="이전 페이지"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-fog text-ink transition-colors hover:border-ink disabled:opacity-30"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n}페이지로 이동`}
              aria-current={currentPage === n ? "page" : undefined}
              onClick={() => goToPage(n)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentPage === n
                  ? "bg-ink text-white"
                  : "text-graphite hover:bg-white"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            aria-label="다음 페이지"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-fog text-ink transition-colors hover:border-ink disabled:opacity-30"
          >
            →
          </button>
        </nav>
      )}
    </div>
  );
}

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
