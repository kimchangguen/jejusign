import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getPortfolioSitemapEntries } from "@/lib/wordpress";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.domain;
  const posts = await getPortfolioSitemapEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/project`, changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((category) => ({
      url: `${base}/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date.replace(/\./g, "-"),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return staticRoutes;
}
