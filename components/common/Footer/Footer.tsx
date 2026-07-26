import Link from "next/link";

const desktopFooterSections = [
  {
    title: "Get to Know Us",
    links: [
      { title: "Careers", href: "/" },
      { title: "Blog", href: "/" },
      { title: "About Treemix", href: "/" },
      { title: "Investor Relations", href: "/" },
      { title: "Treemix Devices", href: "/" },
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      { title: "Sell products on Treemix", href: "/" },
      { title: "Sell apps on Treemix", href: "/" },
      { title: "Become an Affiliate", href: "/" },
      { title: "Advertise Your Products", href: "/" },
      { title: "See More Make Money with Us", href: "/" },
    ],
  },
  {
    title: "Treemix Payment Products",
    links: [
      { title: "Shop with Points", href: "/" },
      { title: "Reload Your Balance", href: "/" },
      { title: "Treemix Currency Converter", href: "/" },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { title: "Treemix and COVID-19", href: "/" },
      { title: "Your Account", href: "/auth" },
      { title: "Your Orders", href: "/orders" },
      { title: "Shipping Rates & Policies", href: "/" },
      { title: "Returns & Replacements", href: "/" },
      { title: "Manage Your Content and Devices", href: "/" },
      { title: "Treemix Assistant", href: "/" },
      { title: "Help", href: "/" },
    ],
  },
];

const mobileFooterLinks = [
  { title: "Your Lists", href: "/" },
  { title: "Your Orders", href: "/orders" },
  { title: "Find a Gift", href: "/" },
  { title: "Gift Cards & Registry", href: "/" },
  { title: "Browsing History", href: "/" },
  { title: "Your Account", href: "/auth" },
  { title: "Returns", href: "/" },
  { title: "Sell products on Treemix", href: "/" },
  { title: "Customer Service", href: "/" },
];

export default function Footer() {
  return (
    <footer className="w-full font-[var(--font-roboto)] text-white">
      {/* Back to top section */}
      <a
        href="#top"
        className="flex h-[42px] w-full items-center justify-center bg-[#49516D] text-[20px] font-SemiBold text-white"
      >
        Back to top
      </a>

      {/* Mobile footer */}
      <div className="bg-[#626B88] px-[26px] pb-[52px] pt-[28px] md:hidden">
        <nav
          aria-label="Mobile footer navigation"
          className="grid grid-cols-2 gap-x-[24px] gap-y-[20px]"
        >
          {mobileFooterLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-[14px] font-normal leading-[1.25] text-white"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop footer */}
      <div className="hidden bg-[#626B88] px-4 pb-[70px] pt-[42px] md:block">
        <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-[80px]">
          {desktopFooterSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-[18px] text-[20px] font-semibold text-white">
                {section.title}
              </h2>

              <ul className="flex flex-col gap-[13px]">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-[16px] font-normal leading-[1.2] text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}