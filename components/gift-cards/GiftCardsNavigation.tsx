import Link from "next/link";

const navigationLinks = [
  { title: "Best Sellers", href: "/gift-cards" },
  { title: "By occasion", href: "/gift-cards/occasion" },
  { title: "Redeem Gift Cards", href: "/gift-cards/redeem" },
  { title: "View Your Balance", href: "/gift-cards/balance" },
  { title: "Reload Your Balance", href: "/gift-cards/reload" },
  { title: "By Brand", href: "/gift-cards/brands" },
  { title: "/// Cash", href: "/gift-cards/cash" },
  { title: "For Businesses", href: "/gift-cards/business" },
  { title: "Be Informed", href: "/gift-cards/informed" },
  { title: "Find a Gift", href: "/gift-cards/find" },
  { title: "Registry & Gifting", href: "/gift-cards/registry" },
];

export default function GiftCardsNavigation() {
  return (
    <nav
      aria-label="Gift cards navigation"
      className="w-full bg-[#F8F8F8] font-[var(--font-roboto)]"
    >
      <div className="gift-fade-down mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-center gap-x-[18px] gap-y-[8px] px-[14px] py-[10px] sm:gap-x-[24px] sm:px-[24px] lg:min-h-[52px] lg:flex-nowrap lg:justify-between lg:gap-[24px] lg:px-[40px] lg:py-0">
        {navigationLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="
              relative whitespace-nowrap
              text-[12px] font-normal leading-[150%] text-[#8A8A8A]
              transition-all duration-200 ease-out
              after:absolute after:bottom-[-2px] after:left-1/2
              after:h-[1px] after:w-0
              after:-translate-x-1/2
              after:bg-[#7E8CBD]
              after:transition-all after:duration-200
              hover:-translate-y-[1px]
              hover:text-[#5F6F9B]
              hover:after:w-full
              sm:text-[14px]
              lg:text-[18px]
            "
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}