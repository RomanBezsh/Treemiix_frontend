"use client";

import Image from "next/image";

type WishlistProductCardProps = {
  title: string;
  price: string;
  rating: number;
  reviews: number;
  image?: string;
  isSelected?: boolean;
  onSelect?: () => void;
};

const colors = ["#CBE4DB", "#D9D9D9", "#FFD400", "#FF0A3D"];

export default function WishlistProductCard({
  title,
  price,
  rating,
  reviews,
  image = "/account/lists/product-placeholder.png",
  isSelected = false,
  onSelect,
}: WishlistProductCardProps) {
  return (
    <article className="relative flex h-full w-full flex-col rounded-[10px] bg-[#F3F3F3] px-[12px] pb-[14px] pt-[12px] font-[var(--font-roboto)]">
      {/* Checkbox */}
      <button
        type="button"
        onClick={onSelect}
        aria-label={isSelected ? "Unselect product" : "Select product"}
        className="absolute right-[12px] top-[12px] z-10"
      >
        <Image
          src={
            isSelected
              ? "/account/lists/checkbox_checked_icon.svg"
              : "/account/lists/checkbox_empty_icon.svg"
          }
          alt=""
          width={22}
          height={22}
          aria-hidden="true"
          className="h-[22px] w-[22px]"
        />
      </button>

      {/* Product image */}
      <div className="flex h-[190px] w-full items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={180}
          height={180}
          className="max-h-[180px] w-auto max-w-[90%] object-contain"
        />
      </div>

      {/* Product title */}
      <h3 className="mt-[8px] min-h-[42px] text-[14px] font-medium leading-[130%] text-[#333333]">
        {title}
      </h3>

      {/* Colors */}
      <div className="mt-[8px] flex items-center gap-[6px]">
        {colors.map((color) => (
          <span
            key={color}
            className="h-[14px] w-[14px] rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Rating */}
      <div className="mt-[8px] flex items-center gap-[8px]">
        <div className="flex items-center gap-[2px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              src={
                star <= rating
                  ? "/account/lists/star_filled_icon.svg"
                  : "/account/lists/star_empty_icon.svg"
              }
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
              className="h-[14px] w-[14px]"
            />
          ))}
        </div>

        <span className="text-[11px] font-normal text-[#666666]">
          {reviews} Reviews
        </span>
      </div>

      {/* Price */}
      <p className="mt-[8px] text-[18px] font-medium leading-[130%] text-[#111111]">
        {price}
      </p>

      {/* Shipping */}
      <p className="mt-[5px] text-[11px] font-normal text-[#8A8A8A]">
        Ship to USA
      </p>
    </article>
  );
}