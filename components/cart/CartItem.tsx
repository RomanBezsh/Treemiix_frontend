"use client";

import Image from "next/image";
import { useState } from "react";

import AdditionalServices from "./AdditionalServices";

type CartItemProps = {
  id: number;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  selected: boolean;
  inStock?: boolean;
  onSelect: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
};

const additionalServices = [
  {
    id: 1,
    title:
      "Installing licensed Windows (Windows OS is not included in the price)",
    price: 20,
  },
  {
    id: 2,
    title:
      "Antivirus ESET Internet Security (2 PCs) license for 1 year Basic (electronic key in an envelope) +50% discount when buying with a laptop or PC!",
    price: 25,
  },
  {
    id: 3,
    title:
      "Installing licensed Windows (Windows OS is not included in the price)",
    price: 20,
  },
  {
    id: 4,
    title:
      "Installing licensed Windows (Windows OS is not included in the price)",
    price: 20,
  },
];

export default function CartItem({
  id,
  title,
  image = "/account/lists/product-placeholder.png",
  price,
  quantity,
  selected,
  inStock = true,
  onSelect,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>(
    id === 1 ? [2] : [],
  );

  const toggleService = (serviceId: number) => {
    setSelectedServiceIds((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  };

  const servicesTotal = additionalServices
    .filter((service) => selectedServiceIds.includes(service.id))
    .reduce((total, service) => total + service.price, 0);

  const totalPrice = price * quantity + servicesTotal;

  return (
    <article className="relative flex w-full gap-[18px] rounded-[14px] bg-[#F8F8F8] px-[18px] py-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Select item */}
      <button
        type="button"
        onClick={() => onSelect(id)}
        aria-label={selected ? "Unselect item" : "Select item"}
        className="mt-[4px] shrink-0"
      >
        <Image
          src={
            selected
              ? "/account/lists/checkbox_checked_icon.svg"
              : "/account/lists/checkbox_empty_icon.svg"
          }
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className="h-[20px] w-[20px] object-contain"
        />
      </button>

      {/* Product image */}
      <div className="flex h-[130px] w-[150px] shrink-0 items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={140}
          height={120}
          className="max-h-[120px] max-w-[140px] object-contain"
        />
      </div>

      {/* Product information */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Product title */}
        <h2 className="max-w-[720px] pr-[48px] text-[18px] font-normal leading-[150%] text-[#333333]">
          {title}
        </h2>

        {/* Stock */}
        <p
          className={`mt-[6px] text-[16px] font-normal leading-[150%] ${
            inStock ? "text-[#333333]" : "text-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Gift */}
        <label className="mt-[6px] flex items-center gap-[8px] text-[16px] font-normal leading-[150%] text-[#333333]">
          <input
            type="checkbox"
            className="h-[14px] w-[14px] accent-[#7C9BC0]"
          />

          <span>
            This is a gift.{" "}
            <button type="button" className="text-[#496B94]">
              Learn more
            </button>
          </span>
        </label>

        {/* Additional services toggle */}
        <button
          type="button"
          onClick={() => setServicesOpen((current) => !current)}
          className="mt-[8px] flex w-fit items-center gap-[8px] text-[18px] font-normal leading-[150%] text-[#496B94]"
        >
          <span
            className={`text-[12px] transition-transform duration-200 ${
              servicesOpen ? "rotate-180" : ""
            }`}
          >
           ⌄
          </span>

          <span>Additional services</span>
        </button>

        {/* Additional services list */}
        {servicesOpen && (
          <AdditionalServices
            services={additionalServices}
            selectedServiceIds={selectedServiceIds}
            onToggleService={toggleService}
          />
        )}

        {/* Quantity and price */}
        <div className="mt-auto flex items-end justify-between gap-[20px] pt-[12px]">
          {/* Quantity */}
          <div className="flex h-[26px] w-[119px] items-center">
            <button
              type="button"
              onClick={() => onDecrease(id)}
              aria-label="Decrease quantity"
              className="flex h-[26px] w-[37px] shrink-0 items-center justify-center rounded-[31px] bg-[#7C9BC0] text-[18px] font-normal leading-[130%] text-white"
            >
              −
            </button>

            <span className="flex h-[26px] flex-1 items-center justify-center text-[16px] font-normal text-[#333333]">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => onIncrease(id)}
              aria-label="Increase quantity"
              className="flex h-[26px] w-[37px] shrink-0 items-center justify-center rounded-[31px] bg-[#7C9BC0] text-[18px] font-normal leading-[130%] text-white"
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="flex items-baseline gap-[4px] text-[#555555]">
            <span className="text-[18px] font-light leading-[120%]">$</span>

            <span className="text-[28px] font-normal leading-[120%]">
              {totalPrice.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Delete item */}
      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Delete item"
        className="absolute right-[16px] top-[14px]"
      >
        <Image
          src="/cart/trash_icon.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className="h-[20px] w-[20px] object-contain"
        />
      </button>
    </article>
  );
}