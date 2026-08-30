import { siteConfig } from "@/lib/site-config";

interface PhoneLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PhoneLink({ className, children }: PhoneLinkProps) {
  return (
    <a href={siteConfig.phoneHref} className={className}>
      {children ?? siteConfig.phone}
    </a>
  );
}
