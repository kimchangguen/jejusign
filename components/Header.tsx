"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import PhoneLink from "@/components/PhoneLink";

const navItems = [
  { slug: "", name: "HOME" },
  ...categories.map((category) => ({ slug: category.slug, name: category.name })),
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-fog bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight text-ink md:text-2xl">
            {siteConfig.name}
          </span>
          <span className="font-display mt-0.5 text-[10px] tracking-[0.2em] text-steel md:text-xs">
            {siteConfig.nameEn}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const href = item.slug ? `/${item.slug}` : "/";
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-graphite"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <PhoneLink className="font-display hidden items-center gap-2 text-sm font-semibold tracking-wide text-ink md:flex">
            <span aria-hidden className="text-accent">●</span>
            {siteConfig.phone}
          </PhoneLink>
          <PhoneLink className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white md:hidden">
            <span className="sr-only">전화 상담</span>
            <PhoneIcon />
          </PhoneLink>
          <button
            type="button"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {navItems.map((item) => {
              const href = item.slug ? `/${item.slug}` : "/";
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`border-b border-fog py-4 text-lg font-medium ${
                    isActive ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <PhoneLink className="mt-6 flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-base font-semibold text-white">
              <PhoneIcon />
              {siteConfig.phone} 전화하기
            </PhoneLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
