import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPortfolioPage, PROJECT_PAGE_SIZE } from "@/lib/wordpress";
import ProjectGallery from "@/components/ProjectGallery";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "시공사례",
  description:
    "제주 곳곳에 광명광고의 작업이 있습니다. 40년간 제주에서 직접 제작하고 시공해 온 광명광고의 다양한 현장 사례를 확인해보세요.",
};

interface ProjectPageProps {
  searchParams: Promise<{ page?: string }>;
}

const WIDE_CONTAINER =
  "mx-auto w-full max-w-[1800px] px-[18px] sm:px-6 lg:px-10 xl:px-[60px]";

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const { page } = await searchParams;
  const requested = Number(page);
  const currentPage = Number.isInteger(requested) && requested > 0 ? requested : 1;

  let data = null;
  try {
    data = await getPortfolioPage(currentPage, PROJECT_PAGE_SIZE);
  } catch (error) {
    console.error("[ProjectPage] WordPress portfolio fetch failed", error);
  }

  // 범위를 벗어난 페이지는 마지막 페이지로 보정한다.
  if (data && data.total > 0 && currentPage > data.totalPages) {
    redirect(data.totalPages === 1 ? "/project" : `/project?page=${data.totalPages}`);
  }

  return (
    <>
      <section className="bg-cream pb-4 pt-16 md:pt-20">
        <div className={`${WIDE_CONTAINER} text-center`}>
          <p className="font-display text-xs tracking-[0.35em] text-accent">
            PROJECTS
          </p>
          <h1 className="text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
            시공사례
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-steel md:text-lg">
            제주 곳곳에 광명광고의 작업이 있습니다.
            <br />
            40년간 제주에서 직접 제작하고 시공해 온 광명광고의 다양한 현장
            사례를 확인해보세요.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className={WIDE_CONTAINER}>
          {data ? (
            <ProjectGallery data={data} currentPage={currentPage} />
          ) : (
            <p className="py-20 text-center text-sm text-steel">
              시공사례를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
            </p>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
