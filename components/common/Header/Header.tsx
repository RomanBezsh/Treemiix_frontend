"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import AccountDropdown from "./AccountDropdown";
import AllCategoriesDropdown from "./AllCategoriesDropdown";

const navigationLinks = [
  { title: "Today's Deals", href: "/" },
  { title: "Customer Service", href: "/customer-service" },
  { title: "Registry", href: "/" },
  { title: "Gift Cards", href: "/gift-cards" },
  { title: "Sell", href: "/sell" },
];

export default function Header() {
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState(false);

  const allDropdownRef = useRef<HTMLFormElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAllDropdownOpen(false);
      }

      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full font-[var(--font-roboto)] text-white">
      {/* Top header */}
      <div className="bg-[#49516D]">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1920px] items-center gap-[14px] px-[14px] py-[10px] sm:px-[20px] lg:gap-[28px] lg:px-[40px] xl:px-[80px] 2xl:px-[120px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to home page"
            className="
              flex shrink-0 items-center
              transition-transform duration-200 ease-out
              hover:scale-[1.04]
              active:scale-[0.97]
            "
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
            className="
              group hidden min-h-[45px] shrink-0 items-center gap-2
              rounded-[14px] border-2 border-white px-3 py-1 text-left
              transition-all duration-200 ease-out
              hover:-translate-y-[1px]
              hover:bg-white/10
              hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.98]
              xl:flex
            "
          >
            <Image
              src="/header/location_icon.svg"
              alt=""
              width={27}
              height={34}
              aria-hidden="true"
              className="
                transition-transform duration-200 ease-out
                group-hover:scale-[1.06]
              "
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
            ref={allDropdownRef}
            className="
              relative flex h-[42px] min-w-0 flex-1
              overflow-visible rounded-[26px] bg-white
              transition-shadow duration-200 ease-out
              focus-within:shadow-[0_4px_14px_rgba(0,0,0,0.18)]
              lg:h-[45px]
            "
          >
            {/* Category */}
            <button
              type="button"
              onClick={() =>
                setIsAllDropdownOpen((current) => !current)
              }
              className="
                hidden h-full w-[78px] shrink-0 items-center justify-center
                rounded-[26px] bg-[#9EA5B8]
                text-[16px] font-medium text-white
                transition-all duration-200 ease-out
                hover:bg-[#AAB1C3]
                active:scale-[0.97]
                sm:flex
                lg:w-[88px] lg:text-[18px]
              "
            >
              All
            </button>

            <AllCategoriesDropdown
              isOpen={isAllDropdownOpen}
              onClose={() => setIsAllDropdownOpen(false)}
            />

            {/* Input */}
            <input
              type="search"
              name="search"
              aria-label="Search products"
              placeholder="Search"
              className="
                min-w-0 flex-1 bg-white px-[14px]
                text-[14px] text-[#49516D]
                outline-none
              "
            />

            {/* Search button */}
            <button
              type="submit"
              aria-label="Search"
              className="
                group flex h-full w-[46px] shrink-0
                items-center justify-center bg-transparent
                transition-colors duration-200 ease-out
                hover:bg-[#49516D]/[0.06]
                lg:w-[52px]
              "
            >
              <Image
                src="/common/search_button_icon.svg"
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
                className="
                  h-[24px] w-[24px]
                  transition-transform duration-200 ease-out
                  group-hover:scale-[1.08]
                  group-active:scale-[0.94]
                  lg:h-[30px] lg:w-[30px]
                "
              />
            </button>
          </form>

          {/* Account */}
          <div
            ref={accountDropdownRef}
            className="relative hidden lg:block"
          >
            <button
              type="button"
              onClick={() =>
                setIsAccountDropdownOpen((current) => !current)
              }
              className="
                flex min-h-[45px] shrink-0 flex-col justify-center
                rounded-[14px] border-2 border-white
                px-3 py-1 leading-tight
                transition-all duration-200 ease-out
                hover:-translate-y-[1px]
                hover:bg-white/10
                hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              <span className="text-[14px] font-medium text-white">
                Hello, Sign in
              </span>

              <span className="text-[14px] font-medium text-white">
                Account
              </span>
            </button>

            <AccountDropdown
              isOpen={isAccountDropdownOpen}
              onClose={() => setIsAccountDropdownOpen(false)}
            />
          </div>

          {/* Mobile account */}
          <Link
            href="/account"
            aria-label="Open account"
            className="
              group flex h-[42px] w-[42px] shrink-0
              items-center justify-center
              rounded-[12px] border border-white/70
              transition-all duration-200 ease-out
              hover:bg-white/10
              hover:shadow-[0_3px_8px_rgba(0,0,0,0.12)]
              active:scale-[0.94]
              lg:hidden
            "
          >
            <Image
              src="/common/account_icon.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className="
                brightness-0 invert
                transition-transform duration-200 ease-out
                group-hover:scale-[1.08]
              "
            />
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className="
              hidden min-h-[45px] shrink-0 flex-col justify-center
              rounded-[14px] border-2 border-white
              px-3 py-1 leading-tight
              transition-all duration-200 ease-out
              hover:-translate-y-[1px]
              hover:bg-white/10
              hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.98]
              2xl:flex
            "
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
            className="
              group relative flex h-[42px] w-[42px] shrink-0
              items-center justify-center
              rounded-[12px] bg-[#9EA5B8]
              transition-all duration-200 ease-out
              hover:-translate-y-[2px]
              hover:bg-[#A9B0C1]
              hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)]
              active:translate-y-0
              active:scale-[0.94]
              sm:h-[45px] sm:w-[45px] sm:rounded-[14px]
            "
          >
            <Image
              src="/header/cart_icon.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
              className="
                h-[26px] w-[26px]
                transition-transform duration-200 ease-out
                group-hover:scale-[1.08]
                sm:h-[30px] sm:w-[30px]
              "
            />

            {/* Cart count */}
            <span
              className="
                absolute -right-1 -top-1
                flex h-[20px] w-[20px] items-center justify-center
                rounded-full
                bg-gradient-to-br from-[#FFDB5A] to-[#FF825A]
                text-[12px] font-black text-white
                shadow-[inset_-2px_2px_3px_rgba(0,0,0,0.1)]
                drop-shadow-md
                transition-transform duration-200 ease-out
                group-hover:scale-[1.12]
              "
            >
              2
            </span>
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
            className="
              group flex shrink-0 items-center justify-center
              transition-transform duration-200 ease-out
              hover:scale-[1.08]
              active:scale-[0.92]
            "
          >
            <Image
              src="/header/menu_button_icon.svg"
              alt=""
              width={32}
              height={23}
              aria-hidden="true"
              className="
                h-[20px] w-[28px]
                transition-opacity duration-200
                group-hover:opacity-75
                lg:h-[23px] lg:w-[32px]
              "
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
                className="
                  shrink-0 whitespace-nowrap py-2
                  text-[14px] font-medium text-white
                  transition-all duration-200 ease-out
                  hover:-translate-y-[1px]
                  hover:text-white/75
                  active:translate-y-0
                  sm:text-[15px]
                  lg:text-[17px]
                "
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