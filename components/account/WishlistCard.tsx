"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import WishlistProductCard from "./WishlistProductCard";

const wishlistProducts = [
  {
    id: 1,
    title: "Splashkins Inflatable Tummy Time",
    price: 50,
    rating: 4,
    reviews: 25,
  },
  {
    id: 2,
    title: "4moms rockaRoo and mamaRoo Infant Insert",
    price: 49.99,
    rating: 4,
    reviews: 25,
  },
  {
    id: 3,
    title: "Zig Zag Zebra Walker with Easy Fold Frame for Storage",
    price: 40,
    rating: 4,
    reviews: 25,
  },
  {
    id: 4,
    title: "Graco Pack 'n Play Close2Baby Bassinet",
    price: 127.99,
    rating: 4,
    reviews: 25,
  },
  {
    id: 5,
    title: "Logitech G Pro Wireless Gaming Mouse",
    price: 50.3,
    rating: 4,
    reviews: 25,
  },
  {
    id: 6,
    title: "Razer Kraken X Ultralight Gaming Headset",
    price: 25.2,
    rating: 4,
    reviews: 25,
  },
  {
    id: 7,
    title: "Elgato Stream Deck MK.2 – Studio Controller",
    price: 149.99,
    rating: 4,
    reviews: 25,
  },
  {
    id: 8,
    title: "Logitech G502 HERO Gaming Mouse",
    price: 25.6,
    rating: 4,
    reviews: 25,
  },
];

export default function WishlistCard() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected = selectedIds.length === wishlistProducts.length;

  const toggleProduct = (id: number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const selectAll = () => {
    setSelectedIds(
      allSelected ? [] : wishlistProducts.map((product) => product.id),
    );
  };

  const deleteSelected = () => {
    setSelectedIds([]);
  };

  const selectedProducts = wishlistProducts.filter((product) =>
    selectedIds.includes(product.id),
  );

  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );

  return (
    <section className="relative w-full rounded-[20px] border border-[#E3E3E3] bg-[#FAFAFA] px-[28px] pb-[28px] pt-[28px] font-[var(--font-roboto)] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
      {/* Wishlist menu */}
      <button
        type="button"
        aria-label="Wishlist options"
        className="absolute right-[28px] top-[24px]"
      >
        <Image
          src="/account/lists/more_icon.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="h-[24px] w-[24px]"
        />
      </button>

      {/* Wishlist title */}
      <h2 className="pr-[50px] text-[18px] font-normal leading-[130%] text-[#333333]">
        My Wish List (Default)
      </h2>

      {/* Actions */}
      <div className="mt-[12px] flex items-center gap-[12px]">
        <button
          type="button"
          onClick={selectAll}
          className="flex h-[32px] items-center justify-center rounded-[16px] border border-[#7C9BC0] bg-white px-[20px] text-[12px] font-normal text-[#333333]"
        >
          {allSelected ? "Unselect all items" : "Select all items"}
        </button>

        <button
          type="button"
          onClick={deleteSelected}
          className="flex h-[32px] items-center justify-center rounded-[16px] border border-[#7C9BC0] bg-white px-[20px] text-[12px] font-normal text-[#333333]"
        >
          Delete
        </button>
      </div>

      {/* Products */}
      <div className="mt-[18px] grid grid-cols-1 gap-x-[22px] gap-y-[22px] sm:grid-cols-2 xl:grid-cols-4">
        {wishlistProducts.map((product) => (
          <WishlistProductCard
            key={product.id}
            title={product.title}
            price={`$${product.price.toFixed(2)}`}
            rating={product.rating}
            reviews={product.reviews}
            isSelected={selectedIds.includes(product.id)}
            onSelect={() => toggleProduct(product.id)}
          />
        ))}
      </div>

      {/* Selection summary */}
      {selectedIds.length > 0 && (
        <div className="mt-[28px] flex justify-end">
          <div className="w-full max-w-[360px] rounded-[22px] bg-[#F3F3F3] px-[22px] pb-[18px] pt-[16px] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
            {/* Subtotal */}
            <div className="flex items-end justify-between">
              <p className="text-[18px] font-normal leading-[130%] text-[#8B86C5]">
                Subtotal{" "}
                <span className="text-[22px] font-medium">
                  {selectedIds.length}
                </span>
              </p>

              <p className="text-[34px] font-normal leading-[110%] text-[#F5A623]">
                {subtotal.toFixed(2)}{" "}
                <span className="text-[18px]">$</span>
              </p>
            </div>

            {/* Buy */}
            <button
              type="button"
              className="mt-[14px] flex h-[56px] w-full items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] text-[26px] font-medium leading-[120%] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
            >
              Buy
            </button>

            {/* Cart link */}
            <Link
              href="/cart"
              className="mt-[8px] flex items-center justify-center gap-[10px] text-[18px] font-normal text-[#8B86C5]"
            >
              <span>Go to cart</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Show more */}
      <button
        type="button"
        className="mx-auto mt-[34px] block text-[13px] font-normal text-[#A0A0A0]"
      >
        See more
      </button>
    </section>
  );
}