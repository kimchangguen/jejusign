import Link from "next/link";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import PhoneLink from "@/components/PhoneLink";

export default function Footer() {
  return (
    <footer className="bg-ink text-fog">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3 md:py-20">
        <div>
          <p className="text-xl font-bold text-white">{siteConfig.name}</p>
          <p className="font-display mt-1 text-xs tracking-[0.2em] text-mist">
            {siteConfig.nameEn}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-mist">
            제주에서 {siteConfig.yearsInBusiness} 동안 간판을 제작해온 광명광고.
            <br />
            디자인, 제작, 현장 시공까지 직접 진행합니다.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">SERVICE</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-mist">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`} className="hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">CONTACT</p>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            {siteConfig.address}
          </p>
          <PhoneLink className="font-display mt-3 inline-block text-lg font-semibold text-white">
            {siteConfig.phone}
          </PhoneLink>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.address}</p>
        </div>
      </div>
    </footer>
  );
}
