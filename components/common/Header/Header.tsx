import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { title: "Today's Deals", href: "/" },
  { title: "Customer Service", href: "/customer-service" },
  { title: "Registry", href: "/" },
  { title: "Gift Cards", href: "/gift-cards" },
  { title: "Sell", href: "/sell" },
];

export default function Header() {
  return (
    <header className="w-full font-[var(--font-roboto)] text-white">
      {/* Top header */}
      <div className="bg-[#49516D]">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1920px] items-center gap-[14px] px-[14px] py-[10px] sm:px-[20px] lg:gap-[28px] lg:px-[40px] xl:px-[80px] 2xl:px-[120px]">
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
              className="h-auto w-[68px] sm:w-[80px] lg:w-[90px]"
            />
          </Link>

          {/* Delivery location */}
          <button
            type="button"
            className="hidden min-h-[45px] shrink-0 items-center gap-2 rounded-[14px] border-2 border-white px-3 py-1 text-left xl:flex"
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

          {/* Search */}
          <form
            action="/"
            className="flex h-[42px] min-w-0 flex-1 overflow-hidden rounded-[26px] bg-white lg:h-[45px]"
          >
            {/* Category */}
            <button
              type="button"
              className="hidden h-full w-[78px] shrink-0 items-center justify-center rounded-[26px] bg-[#9EA5B8] text-[16px] font-medium text-white sm:flex lg:w-[88px] lg:text-[18px]"
            >
              All
            </button>

            {/* Input */}
            <input
              type="search"
              name="search"
              aria-label="Search products"
              placeholder="Search"
              className="min-w-0 flex-1 bg-white px-[14px] text-[14px] text-[#49516D] outline-none"
            />

            {/* Search button */}
            <button
              type="submit"
              aria-label="Search"
              className="flex h-full w-[46px] shrink-0 items-center justify-center bg-transparent lg:w-[52px]"
            >
              <Image
                src="/common/search_button_icon.svg"
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
                className="h-[24px] w-[24px] lg:h-[30px] lg:w-[30px]"
              />
            </button>
          </form>

          {/* Account */}
          <Link
            href="/account"
            aria-label="Open account"
            className="hidden min-h-[45px] shrink-0 flex-col justify-center rounded-[14px] border-2 border-white px-3 py-1 leading-tight lg:flex"
          >
            <span className="text-[14px] font-medium text-white">
              Hello, Sign in
            </span>

            <span className="text-[14px] font-medium text-white">
              Account
            </span>
          </Link>

          {/* Mobile account */}
          <Link
            href="/account"
            aria-label="Open account"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] border border-white/70 lg:hidden"
          >
            <Image
              src="/common/account_icon.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className="brightness-0 invert"
            />
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className="hidden min-h-[45px] shrink-0 flex-col justify-center rounded-[14px] border-2 border-white px-3 py-1 leading-tight 2xl:flex"
          >
            <span className="text-[14px] font-medium text-white">
              Returns
            </span>

            <span className="text-[14px] font-medium text-white">
              &amp; Orders
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Open shopping cart"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#9EA5B8] sm:h-[45px] sm:w-[45px] sm:rounded-[14px]"
          >
            <Image
              src="/header/cart_icon.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
              className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]"
            />
          </Link>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-[#9EA5B8]">
        <div className="mx-auto flex min-h-[42px] w-full max-w-[1920px] items-center gap-[20px] px-[14px] sm:px-[20px] lg:px-[40px] xl:px-[80px] 2xl:px-[120px]">
          {/* Menu */}
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
              className="h-[20px] w-[28px] lg:h-[23px] lg:w-[32px]"
            />
          </button>

          {/* Links */}
          <nav
            aria-label="Main navigation"
            className="flex min-w-0 flex-1 items-center gap-[28px] overflow-x-auto lg:justify-center lg:gap-[60px] xl:gap-[80px]"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="shrink-0 whitespace-nowrap py-2 text-[14px] font-medium text-white sm:text-[15px] lg:text-[17px]"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}