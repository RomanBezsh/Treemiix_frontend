"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { toggleWishlist, useWishlistIds } from "@/lib/wishlist";

interface HeartButtonProps {
  productId: string;
  /** "card": small square on product cards; "deal": Today's Deals card; "page": labelled button on the product page */
  variant?: "card" | "deal" | "page";
  className?: string;
}

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const HeartIcon = ({ active, className }: { active: boolean; className: string }) => (
  <svg viewBox="0 0 24 22" aria-hidden="true" className={className}>
    <path
      d={HEART_PATH}
      fill={active ? "#FF825A" : "none"}
      stroke={active ? "#FF825A" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Adds / removes a product from the user's wishlist; guests are sent to sign in. */
export default function HeartButton({ productId, variant = "card", className = "" }: HeartButtonProps) {
  const router = useRouter();
  const active = useWishlistIds().has(productId);
  const label = active ? "Remove from Your Lists" : "Add to Your Lists";

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    // The button sits on clickable cards: do not open the product
    event.preventDefault();
    event.stopPropagation();
    const result = await toggleWishlist(productId);
    if (result.status === "auth") router.push("/auth");
  };

  if (variant === "page") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        className={`flex min-h-[44px] w-full items-center justify-center gap-[10px] rounded-[20px] border-2 border-[#EFEFEF] px-[16px] text-[16px] text-[#333333] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#FF825A] active:translate-y-0 active:scale-[0.98] ${className}`}
      >
        <HeartIcon active={active} className="h-[18px] w-[20px] text-[#828282]" />
        {active ? "Saved to Your Lists" : "Add to Your Lists"}
      </button>
    );
  }

  const box =
    variant === "deal"
      ? "h-[40px] w-[40px] rounded-[10px] bg-[#F8F8F8]/10 shadow-[0_2px_4px_0_rgba(0,0,0,0.20)] hover:scale-[1.1] hover:bg-white/60"
      : "h-8 w-8 rounded-[8px] bg-[#F8F8F8] shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:scale-[1.08]";
  const icon = variant === "deal" ? "h-[22px] w-[24px]" : "h-4 w-5";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`group/heart flex shrink-0 items-center justify-center text-[#B3B3B3] transition-all duration-200 ease-out hover:text-[#FF825A] active:scale-[0.92] ${box} ${className}`}
    >
      <HeartIcon active={active} className={icon} />
    </button>
  );
}
