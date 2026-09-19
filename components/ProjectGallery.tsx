import ProjectCard from "@/components/ProjectCard";
import ProjectPagination from "@/components/ProjectPagination";
import type { PostsPage } from "@/lib/wordpress";

interface ProjectGalleryProps {
  data: PostsPage;
  currentPage: number;
}

export default function ProjectGallery({ data, currentPage }: ProjectGalleryProps) {
  const { posts, total, totalPages } = data;

  return (
    <div>
      <p className="mb-8 flex items-center gap-2 text-sm font-medium text-graphite">
        <GridIcon />
        Total {total} [ {currentPage} / {Math.max(1, totalPages)} Page ]
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-[26px] gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, index) => (
            <ProjectCard key={post.slug} post={post} priority={currentPage === 1 && index < 4} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-steel">
          등록된 시공사례가 없습니다.
        </p>
      )}

      <ProjectPagination currentPage={currentPage} totalPages={totalPages} />
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
