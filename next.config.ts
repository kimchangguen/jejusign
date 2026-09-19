import type { NextConfig } from "next";

// WordPress 미디어(featured image) 호스트를 next/image 원격 허용 목록에 등록한다.
const wordpressHost = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL).hostname
  : null;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: wordpressHost
      ? [{ protocol: "https", hostname: wordpressHost }]
      : [],
  },
};

export default nextConfig;
