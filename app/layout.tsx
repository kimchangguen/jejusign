import type { Metadata } from "next";
import { Noto_Sans_KR, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { siteConfig } from "@/lib/site-config";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "제주간판 광명광고 | 제주 40년 간판 제작·시공 전문",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "제주에서 40년간 간판을 제작해온 광명광고. 채널간판, LED간판, 돌출간판, 실내사인, 현수막, 실사출력까지 디자인·제작·현장 시공을 직접 진행합니다.",
  keywords: ["제주간판", "제주 간판", "제주간판업체", "채널간판", "LED간판", "돌출간판"],
  openGraph: {
    title: "제주간판 광명광고 | 제주 40년 간판 제작·시공 전문",
    description:
      "제주에서 40년간 간판을 제작해온 광명광고. 디자인부터 제작, 현장 시공까지 직접 진행합니다.",
    siteName: siteConfig.name,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressRegion: siteConfig.region,
      addressCountry: "KR",
    },
    telephone: siteConfig.phone,
    areaServed: siteConfig.region,
  };

  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className={`${notoSansKR.variable} ${oswald.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingQuickMenu />
      </body>
    </html>
  );
}
