import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { title: "Today's Deals", href: "/" },
  { title: "Customer Service", href: "/" },
  { title: "Registry", href: "/" },
  { title: "Gift Cards", href: "/" },
  { title: "Sell", href: "/" },
];

export default function Header() {
  return (
    <header className="font-[var(--font-roboto)] w-full text-white">
      {/* Top header section */}
      <div className="flex min-h-[72px] items-center bg-[#49516D] py-2 pl-[169px] pr-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to home page"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/header/tmlogo.svg"
            alt="TM logo"
            width={90}
            height={42}
            priority
          />
        </Link>

        {/* Delivery location */}
        <button
          type="button"
          className="ml-[45px] hidden min-h-[45px] shrink-0 items-center gap-2 rounded-[14px] border-2 border-white px-3 py-1 text-left md:flex"
        >
          <Image
            src="/header/location_icon.svg"
            alt=""
            width={27}
            height={34}
            aria-hidden="true"
          />

          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-medium text-white">
              Deliver to
            </span>

            <span className="text-[14px] font-medium text-white">
              Ukraine
            </span>
          </span>
        </button>

        {/* Search form */}
        <form
          action="/"
          className="ml-[45px] flex h-[45px] min-w-0 max-w-[1116px] flex-1 overflow-hidden rounded-[26px] bg-white"
        >
          {/* Search category button */}
          <button
            type="button"
            className="flex h-full w-[88px] shrink-0 items-center justify-center rounded-[26px] bg-[#9EA5B8] text-[18px] font-medium text-white"
          >
            All
          </button>

          {/* Search input */}
          <input
            type="search"
            name="search"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-white px-4 text-[14px] text-[#49516D] outline-none"
          />

          {/* Search button */}
          <button
            type="submit"
            aria-label="Search"
            className="flex h-full w-[52px] shrink-0 items-center justify-center bg-transparent"
          >
            <Image
              src="/header/search_button_icon.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
            />
          </button>
        </form>

        {/* Account link */}
        <Link
          href="/auth"
          className="ml-[45px] hidden min-h-[45px] shrink-0 flex-col justify-center rounded-[14px] border-2 border-white px-3 py-1 leading-tight lg:flex"
        >
          <span className="text-[14px] font-medium text-white">
            Hello, Sign in
          </span>

          <span className="text-[14px] font-medium text-white">
            Account
          </span>
        </Link>

        {/* Orders link */}
        <Link
          href="/orders"
          className="ml-[45px] hidden min-h-[45px] shrink-0 flex-col justify-center rounded-[14px] border-2 border-white px-3 py-1 leading-tight xl:flex"
        >
          <span className="text-[14px] font-medium text-white">
            Returns
          </span>

          <span className="text-[14px] font-medium text-white">
            &amp; Orders
          </span>
        </Link>

        {/* Shopping cart */}
        <Link
          href="/cart"
          aria-label="Open shopping cart"
          className="ml-[45px] hidden h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[14px] bg-[#9EA5B8] sm:flex"
        >
          <Image
            src="/header/cart_icon.svg"
            alt=""
            width={30}
            height={30}
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Bottom navigation section */}
      <div className="flex min-h-[42px] items-center bg-[#9EA5B8] pl-[169px] pr-4">
        {/* Menu button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex shrink-0 items-center justify-center"
        >
          <Image
            src="/header/menu_button_icon.svg"
            alt=""
            width={32}
            height={23}
            aria-hidden="true"
          />
        </button>

        {/* Navigation links */}
        <nav
          aria-label="Main navigation"
          className="ml-[488px] flex min-w-0 items-center gap-[94px] overflow-x-auto"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="shrink-0 py-2 text-[17px] font-medium text-white"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}