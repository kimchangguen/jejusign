import { siteConfig } from "@/lib/site-config";

/**
 * 향후 실제 상담/견적 채널(카카오톡, 문의 폼 등)이 생기면
 * 이 배열의 href 값만 교체하면 된다.
 */
const quickMenuItems = [
  {
    key: "call",
    label: "전화",
    ariaLabel: "전화하기",
    href: siteConfig.phoneHref,
    icon: PhoneIcon,
  },
  {
    key: "consult",
    label: "상담",
    ariaLabel: "상담 문의",
    href: "/#contact",
    icon: ChatIcon,
  },
  {
    key: "quote",
    label: "견적",
    ariaLabel: "견적 문의",
    href: "/#contact",
    icon: QuoteIcon,
  },
];

export default function FloatingQuickMenu() {
  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-2.5 md:bottom-10 md:right-8 md:gap-3">
      {quickMenuItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          aria-label={item.ariaLabel}
          className="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-full border border-fog bg-white text-ink shadow-lg transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-14 md:w-14"
        >
          <item.icon />
          <span aria-hidden className="text-[10px] font-medium leading-none">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon() {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function QuoteIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}
