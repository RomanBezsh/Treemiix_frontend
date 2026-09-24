"use client";

import React from "react";
import Link from "next/link";

const yourLists = [
  "Create a List",
  "Find a List or Registry",
  "TreemiixSmile Charity Lists",
];

const yourAccount = [
  { title: "Account", href: "/account" },
  { title: "Admin Panel", href: "/admin" },
  { title: "Orders", href: "/account/orders" },
  { title: "Recommendations", href: "/account" },
  { title: "Browsing History", href: "/account" },
  { title: "Watchlist", href: "/account" },
  { title: "Video Purchases & Rentals", href: "/account" },
  { title: "Kindle Unlimited", href: "/account" },
  { title: "Content & Devices", href: "/account" },
  { title: "Subscribe & Save Items", href: "/account" },
  { title: "Memberships & Subscriptions", href: "/account" },
  { title: "Music Library", href: "/account" },
];

interface AccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountDropdown({
  isOpen,
  onClose,
}: AccountDropdownProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`
        absolute -right-[150px] top-[calc(100%+10px)] z-50
        w-[432px] rounded-[20px] bg-[#F8F8F8] p-6
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
      <div className="absolute -top-[10px] right-[190px] h-[10px] w-[20px] bg-[#F8F8F8] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />

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
          href="/register"
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

      {/* Lists & Account */}
      <div className="flex gap-6 text-[12px] text-[#828282]">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-[#828282]">
            Your Lists
          </span>

          {yourLists.map((item) => (
            <Link
              key={item}
              href="/"
              onClick={onClose}
              className="
                w-fit
                transition-all duration-150 ease-out
                hover:translate-x-[2px]
                hover:text-black
              "
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="w-[1px] bg-[#EFEFEF]" />

        <div className="flex flex-col gap-2">
          <span className="font-medium text-[#828282]">
            Your Account
          </span>

          {yourAccount.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`
                w-fit
                transition-all duration-150 ease-out
                hover:translate-x-[2px]
                ${
                  item.title === "Admin Panel"
                    ? "font-bold text-[#FF825A] hover:text-[#FF6B3D]"
                    : "hover:text-black"
                }
              `}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}