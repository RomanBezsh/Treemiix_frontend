"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    key: "account-details",
    title: "Account Details",
    icon: "/common/account_icon.svg",
    href: "/account",
  },
  {
    key: "lists",
    title: "Your Lists",
    icon: "/account/account_your_lists_icon.svg",
    href: "/account/lists",
  },
  {
    key: "gift-card",
    title: "Gift Card",
    icon: "/account/account_gift_card_icon.svg",
    href: "/account/gift-card",
  },
  {
    key: "orders",
    title: "Your Orders",
    icon: "/common/cart_icon.svg",
    href: "/account/orders",
  },
  {
    key: "addresses",
    title: "Delivery Addresses",
    icon: "/account/account_location_icon.svg",
    href: "/account/addresses",
  },
  {
    key: "payment-methods",
    title: "Payment Methods",
    icon: "/common/card_icon.svg",
    href: "/account/payment-methods",
  },
  {
    key: "digital-services",
    title: "Digital Services and Device Support",
    icon: "/common/question_icon.svg",
    href: "/account/digital-services",
  },
  {
    key: "messages",
    title: "Your Messages",
    icon: "/account/account_messages_icon.svg",
    href: "/account/messages",
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full font-[var(--font-roboto)]">
      {/* Mobile navigation */}
      <nav className="flex w-full gap-[8px] overflow-x-auto rounded-[16px] bg-[#F8F8F8] p-[8px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:hidden">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/account"
              ? pathname === "/account"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex h-[44px] shrink-0 items-center gap-[8px] whitespace-nowrap rounded-[12px] px-[12px] transition-colors ${
                isActive
                  ? "bg-[#E3E3E3] text-[#333333]"
                  : "text-[#555555]"
              }`}
            >
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
                className="h-[18px] w-[18px] shrink-0 object-contain"
              />

              <span className="text-[13px] font-normal">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop navigation */}
      <div className="hidden min-h-[520px] w-full flex-col overflow-hidden rounded-[20px] bg-[#F8F8F8] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:flex">
        <nav className="flex flex-col py-[16px]">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex min-h-[50px] items-center gap-[14px] px-[20px] transition-colors xl:px-[24px] ${
                  isActive
                    ? "bg-[#E8E8E8] text-[#333333]"
                    : "text-[#444444] hover:bg-[#EEEEEE]"
                }`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                  className="h-[20px] w-[20px] shrink-0 object-contain"
                />

                <span className="text-[14px] font-normal leading-[130%] xl:text-[16px]">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Delete account */}
        <div className="mt-auto px-[24px] pb-[30px] pt-[40px] xl:px-[28px] xl:pb-[36px]">
          <button
            type="button"
            className="flex h-[46px] w-full items-center justify-center rounded-[24px] bg-[#7C9BC0] px-[20px] text-[14px] font-medium text-white xl:text-[16px]"
          >
            Delete Account
          </button>
        </div>
      </div>
    </aside>
  );
}