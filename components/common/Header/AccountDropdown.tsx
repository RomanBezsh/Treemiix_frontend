"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/authSession";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { useWishlistCount } from "@/lib/wishlist";

const accountLinks = [
  { title: "Account", href: "/account" },
  { title: "Orders", href: "/account/orders" },
  { title: "Seller Center", href: "/sell/apply" },
  { title: "Lists", href: "/account/lists" },
  { title: "Messages", href: "/account/messages" },
];

interface AccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
}

export default function AccountDropdown({
  isOpen,
  onClose,
  isAuthenticated = false,
}: AccountDropdownProps) {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  // Admins cannot open a store: they get the admin panel instead of Seller Center
  const wishlistCount = useWishlistCount();
  const links = (
    isAdmin
      ? accountLinks.map((item) => (item.href === "/sell/apply" ? { title: "Admin panel", href: "/admin" } : item))
      : accountLinks
  ).map((item) =>
    // Wishlist size next to "Lists" for signed-in users
    item.href === "/account/lists" && isAuthenticated ? { ...item, title: `Lists (${wishlistCount})` } : item,
  );

  const handleLogout = () => {
    clearAuthSession();
    onClose();
    router.push("/");
    window.dispatchEvent(new Event("cart-updated"));
  };

  const userFirstName =
    typeof window !== "undefined"
      ? localStorage.getItem("userFirstName") ||
        localStorage.getItem("userEmail") ||
        "Customer"
      : "Customer";
  return (
    <div
      aria-hidden={!isOpen}
      className={`
        absolute right-0 top-[calc(100%+8px)] z-50
        w-[300px] max-w-[calc(100vw-32px)] rounded-[20px] bg-[#F8F8F8] p-6
        shadow-[0px_2px_4px_rgba(0,0,0,0.2)]
        origin-top
        transition-all duration-200 ease-out
        ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-[8px] scale-[0.97] opacity-0"
        }
      `}
    >
      {/* Pointer */}
      <div className="absolute -top-[8px] right-[24px] sm:right-[40px] h-[10px] w-[20px] bg-[#F8F8F8] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />

      {isAuthenticated ? (
        <>
          {/* User greeting & Sign out */}
          <div className="flex flex-col items-center gap-2 py-3">
            <span className="text-[14px] font-medium text-[#333333]">
              Hello, {userFirstName}
            </span>
            <button
              onClick={handleLogout}
              className="
                flex w-[204px] items-center justify-center
                rounded-[20px]
                bg-gradient-to-br from-[#FFDB5A] to-[#FF825A]
                py-2 text-[18px] font-medium text-white
                shadow-[0px_2px_4px_rgba(0,0,0,0.2)]
                transition-all duration-200 ease-out
                hover:-translate-y-[1px]
                hover:scale-[1.02]
                hover:shadow-[0_5px_10px_rgba(0,0,0,0.18)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Sign out
            </button>
          </div>

          <hr className="my-4 border-[#EFEFEF]" />
        </>
      ) : (
        <>
          {/* Sign in */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/auth"
              onClick={onClose}
              className="
                flex w-[204px] items-center justify-center
                rounded-[20px]
                bg-gradient-to-br from-[#FFDB5A] to-[#FF825A]
                py-2 text-[18px] font-medium text-white
                shadow-[0px_2px_4px_rgba(0,0,0,0.2)]
                transition-all duration-200 ease-out
                hover:-translate-y-[1px]
                hover:scale-[1.02]
                hover:shadow-[0_5px_10px_rgba(0,0,0,0.18)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Sign in
            </Link>

            <Link
              href="/auth"
              onClick={onClose}
              className="
                text-[12px] text-[#828282]
                transition-colors duration-200
                hover:text-[#555555]
              "
            >
              New customer?{" "}
              <span className="text-blue-500 transition-colors duration-200 hover:text-blue-600">
                Start here.
              </span>
            </Link>
          </div>

          <hr className="my-4 border-[#EFEFEF]" />
        </>
      )}

      {/* Account links */}
      <nav aria-label="Your account" className="flex flex-col gap-1 text-[14px] text-[#828282]">
        <span className="mb-1 text-[12px] font-medium text-[#828282]">
          Your Account
        </span>

        {links.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onClose}
            className="
              w-fit py-[3px]
              transition-all duration-150 ease-out
              hover:translate-x-[2px]
              hover:text-[#333333]
            "
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}