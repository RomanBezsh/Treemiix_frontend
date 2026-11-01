"use client";

import React from "react";
import Link from "next/link";
import { getDisplayName, type AuthUser } from "@/lib/useAuthUser";

const yourLists = [
  "Create a List",
  "Find a List or Registry",
  "TreemiixSmile Charity Lists",
];

const yourAccount = [
  { title: "Account", href: "/account" },
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
  user: AuthUser | null;
  onSignOut: () => void;
}

export default function AccountDropdown({
  isOpen,
  onClose,
  user,
  onSignOut,
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

      {/* Signed in: greeting + sign out */}
      {user ? (
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-[16px] font-medium text-[#333333]">
            Hello, {getDisplayName(user)}
          </p>
          {user.email && (
            <p className="max-w-full truncate text-[12px] text-[#828282]">{user.email}</p>
          )}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="tm-press mt-2 flex w-[204px] items-center justify-center rounded-[20px] border-2 border-[#7C9BC0] py-[6px] text-[16px] font-medium text-[#7C9BC0] hover:bg-[#7C9BC0]/10"
          >
            Sign out
          </button>
        </div>
      ) : (
      /* Guest: sign in */
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
            hover:-translate-y-[2px]
            hover:shadow-[0_5px_10px_rgba(0,0,0,0.18)]
            active:translate-y-0
            active:scale-[0.97]
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
      )}

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
              className="
                w-fit
                transition-all duration-150 ease-out
                hover:translate-x-[2px]
                hover:text-black
              "
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}