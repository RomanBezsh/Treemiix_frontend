"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AccountDropdown from "./AccountDropdown";
import AllCategoriesDropdown from "./AllCategoriesDropdown";
import { clearAuthSession } from "@/lib/authSession";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

const navigationLinks = [
  { title: "Today's Deals", href: "/todays-deals" },
  { title: "Customer Service", href: "/customer-service" },
  { title: "Registry", href: "/" },
  { title: "Gift Cards", href: "/gift-cards" },
  { title: "Sell", href: "/sell" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  // Close the mobile menu after navigation
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  // Escape closes the menu, page scroll is locked while it is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchValue.trim();
    router.push(query ? `/catalog?search=${encodeURIComponent(query)}` : "/catalog");
  };

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

  useEffect(() => {
    const loadCartCount = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/carts/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          clearAuthSession();
          setCartCount(0);
          return;
        }

        if (!res.ok) {
          setCartCount(0);
          return;
        }

        const cart = await res.json();
        const cartItems: { quantity?: number }[] = Array.isArray(
          cart?.items,
        )
          ? cart.items
          : [];

        setCartCount(
          cartItems.reduce(
            (total, item) =>
              total + (Number(item.quantity) || 0),
            0,
          ),
        );
      } catch {
        setCartCount(0);
      }
    };

    loadCartCount();

    const handleCartUpdated = () => {
      loadCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdated,
      );
    };
  }, [pathname]);

  return (
    <header className="w-full font-[var(--font-roboto)] text-white">
      {/* Top header */}
      <div className="bg-[#49516D]">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1920px] flex-wrap items-center gap-x-[12px] gap-y-[10px] px-[14px] py-[10px] sm:px-[20px] md:flex-nowrap md:gap-[14px] lg:gap-[28px] lg:px-[40px] xl:px-[80px] 2xl:px-[120px]">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            className="
              group flex h-[42px] w-[32px] shrink-0 items-center justify-center
              transition-transform duration-200 ease-out
              active:scale-[0.92]
              md:hidden
            "
          >
            <Image
              src="/header/menu_button_icon.svg"
              alt=""
              width={32}
              height={23}
              aria-hidden="true"
              className="h-[20px] w-[28px]"
            />
          </button>

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
              hover:-translate-y-[2px]
              hover:bg-white/10
              hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.97]
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
            onSubmit={handleSearchSubmit}
            ref={allDropdownRef}
            className="
              relative order-last flex h-[42px] min-w-0 basis-full
              overflow-visible rounded-[26px] bg-white
              md:order-none md:flex-1 md:basis-auto
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="
                min-w-0 flex-1 rounded-l-[26px] bg-white px-[16px]
                text-[14px] text-[#49516D]
                outline-none
                sm:rounded-l-none sm:px-[14px]
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
                hover:-translate-y-[2px]
                hover:bg-white/10
                hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
                active:translate-y-0
                active:scale-[0.97]
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
              group ml-auto flex h-[42px] w-[42px] shrink-0
              items-center justify-center
              rounded-full border-2 border-white/80
              md:ml-0 md:rounded-[12px] md:border md:border-white/70
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
            href="/account/orders"
            className="
              hidden min-h-[45px] shrink-0 flex-col justify-center
              rounded-[14px] border-2 border-white
              px-3 py-1 leading-tight
              transition-all duration-200 ease-out
              hover:-translate-y-[2px]
              hover:bg-white/10
              hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.97]
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
            {cartCount > 0 && (
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
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="hidden bg-[#9EA5B8] md:block">
        <div className="mx-auto flex min-h-[42px] w-full max-w-[1920px] items-center gap-[20px] px-[14px] sm:px-[20px] lg:px-[40px] xl:px-[80px] 2xl:px-[120px]">
          {/* Menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
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
                  hover:-translate-y-[2px]
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

      {/* Navigation drawer (burger menu) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/40"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsMenuOpen(false);
          }}
        >
          <nav
            aria-label="Menu"
            className="flex h-full w-[82%] max-w-[320px] flex-col overflow-y-auto bg-[#49516D] shadow-[4px_0_20px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between px-[20px] py-[16px]">
              <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label="Go to home page">
                <Image src="/header/tmlogo.svg" alt="TM logo" width={90} height={42} className="h-auto w-[68px]" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-[28px] leading-none text-white transition-colors hover:bg-white/10"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-col border-t border-white/15 py-[8px]">
              {navigationLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-[20px] py-[12px] text-[16px] font-medium transition-colors hover:bg-white/10 ${
                      pathname === link.href && link.href !== "/" ? "bg-white/10 text-white" : "text-white/90"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col border-t border-white/15 py-[8px]">
              {[
                { title: "Your Account", href: "/account" },
                { title: "Returns & Orders", href: "/account/orders" },
                { title: "Cart", href: "/cart" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-[20px] py-[12px] text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}