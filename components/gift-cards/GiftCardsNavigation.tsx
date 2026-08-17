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
      <div className="w-full overflow-x-auto">
        <div className="flex min-h-[52px] w-max items-center gap-[52px] px-[24px] lg:w-full lg:justify-between lg:px-[40px]">
          {navigationLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-[18px] font-normal leading-[150%] text-[#8A8A8A]"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}