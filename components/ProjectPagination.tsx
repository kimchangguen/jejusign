import Link from "next/link";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
}

/** 1페이지는 /project, 2페이지부터는 /project?page=N 으로 이동한다. */
function pageHref(page: number): string {
  return page === 1 ? "/project" : `/project?page=${page}`;
}

const BASE =
  "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-colors";
const ARROW = `${BASE} border border-fog text-ink hover:border-ink`;

export default function ProjectPagination({
  currentPage,
  totalPages,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="시공사례 페이지네이션"
      className="mt-16 flex flex-wrap items-center justify-center gap-3"
    >
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} aria-label="이전 페이지" className={ARROW}>
          ←
        </Link>
      ) : (
        <span aria-hidden className={`${ARROW} opacity-30`}>
          ←
        </span>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={pageHref(n)}
          aria-label={`${n}페이지로 이동`}
          aria-current={currentPage === n ? "page" : undefined}
          className={`${BASE} ${
            currentPage === n ? "bg-ink text-white" : "text-graphite hover:bg-white"
          }`}
        >
          {n}
        </Link>
      ))}
      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} aria-label="다음 페이지" className={ARROW}>
          →
        </Link>
      ) : (
        <span aria-hidden className={`${ARROW} opacity-30`}>
          →
        </span>
      )}
    </nav>
  );
}
