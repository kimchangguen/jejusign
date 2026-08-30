import { AnchorHTMLAttributes } from "react";
import { siteConfig } from "@/lib/site-config";

interface PhoneLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

export default function PhoneLink({ children, ...rest }: PhoneLinkProps) {
  return (
    <a href={siteConfig.phoneHref} {...rest}>
      {children ?? siteConfig.phone}
    </a>
  );
}
