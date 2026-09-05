"use client";

import { useState } from "react";

import FilterSection from "./FilterSection";

const departments = [
  "Amazon Devices",
  "Arts, Crafts & Sewing",
  "Automotive & Motorcycle",
  "Baby",
  "Baby Clothing & Accessories",
  "Beauty",
  "Books",
  "Boys’ Fashion",
  "Camera & Photo",
  "Cell Phones & Accessories",
  "Computers & Accessories",
  "Costumes & Accessories",
  "Electronics",
  "Everything Else",
  "Fashion",
  "Gift Cards",
  "Girls’ Fashion",
  "Grocery",
  "Headphones",
  "Health & Personal Care",
  "Home",
  "Home Audio",
  "Home Improvement",
  "Industrial & Scientific",
  "Kitchen",
  "Luggage Travel Gear",
  "Magazines",
  "Men's Shoes",
  "Men’s Clothing",
  "Men’s Fashion",
  "Movies & TV",
  "Musical Instruments",
  "Office Electronics & Supplies",
  "Patio, Lawn & Garden",
  "Pet Supplies",
  "Power & Hand Tools",
  "Software",
  "Sports & Outdoors",
  "Television & Video",
  "Toys & Games",
  "Video Games",
  "Women's Shoes",
  "Women's Clothing",
  "Women's Fashion",
];

const discountOptions = [
  "All deals",
  "10% off or more",
  "25% off or more",
  "50% off or more",
  "70% off or more",
];

export default function DealsSidebar() {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [primeEligible, setPrimeEligible] = useState(false);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("59 999");

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((current) =>
      current.includes(department)
        ? current.filter((item) => item !== department)
        : [...current, department],
    );
  };

  return (
    <aside className="w-full font-[var(--font-roboto)] lg:w-[280px] lg:shrink-0">
      {/* Top navigation */}
      <div className="border-b border-[#E5E5E5] pb-[16px]">
        <button
          type="button"
          className="block text-[14px] font-semibold leading-[130%] text-[#496B94]"
        >
          All deals
        </button>

        <button
          type="button"
          className="mt-[18px] block text-[14px] font-normal leading-[130%] text-[#333333]"
        >
          Available
        </button>

        <button
          type="button"
          className="mt-[18px] block text-[14px] font-normal leading-[130%] text-[#333333]"
        >
          Upcoming
        </button>

        <button
          type="button"
          className="mt-[18px] block text-[14px] font-normal leading-[130%] text-[#333333]"
        >
          Watchlist
        </button>
      </div>

      {/* Prime */}
      <FilterSection title="Prime">
        <label className="flex cursor-pointer items-center gap-[10px]">
          <input
            type="checkbox"
            checked={primeEligible}
            onChange={(event) => setPrimeEligible(event.target.checked)}
            className="h-[18px] w-[18px] rounded-[5px] accent-[#7E8CBD]"
          />

          <span className="text-[14px] font-normal leading-[130%] text-[#333333]">
            Prime eligible
          </span>
        </label>
      </FilterSection>

      {/* Departments */}
      <FilterSection title="Departments">
        <div className="flex flex-col gap-[13px]">
          {departments.map((department) => (
            <label
              key={department}
              className="flex cursor-pointer items-start gap-[10px]"
            >
              <input
                type="checkbox"
                checked={selectedDepartments.includes(department)}
                onChange={() => toggleDepartment(department)}
                className="mt-[1px] h-[18px] w-[18px] shrink-0 rounded-[5px] accent-[#7E8CBD]"
              />

              <span className="text-[14px] font-normal leading-[130%] text-[#333333]">
                {department}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Deal type */}
      <FilterSection title="Deal type">
        <div className="flex flex-col gap-[16px]">
          <button
            type="button"
            className="w-fit text-[14px] font-normal leading-[130%] text-[#496B94]"
          >
            All deals
          </button>

          <button
            type="button"
            className="w-fit text-[14px] font-normal leading-[130%] text-[#333333]"
          >
            Top Deal
          </button>

          <button
            type="button"
            className="w-fit text-[14px] font-normal leading-[130%] text-[#333333]"
          >
            Lightning deal
          </button>

          <button
            type="button"
            className="w-fit text-[14px] font-normal leading-[130%] text-[#333333]"
          >
            Best deal
          </button>
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div>
          {/* Price inputs */}
          <div className="flex items-center gap-[8px]">
            <input
              type="text"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="h-[26px] w-[70px] rounded-[6px] border border-[#E5E5E5] bg-[#F8F8F8] text-center text-[12px] font-normal text-[#828282] outline-none"
            />

            <span className="text-[14px] text-[#B3B3B3]">−</span>

            <input
              type="text"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="h-[26px] w-[70px] rounded-[6px] border border-[#E5E5E5] bg-[#F8F8F8] text-center text-[12px] font-normal text-[#828282] outline-none"
            />

            <button
              type="button"
              className="flex h-[26px] min-w-[46px] items-center justify-center rounded-[13px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[12px] text-[12px] font-medium text-white"
            >
              GO
            </button>
          </div>

          {/* Range */}
          <div className="relative mt-[18px] h-[20px]">
            <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#D9D9D9]" />

            <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]" />

            <span className="absolute left-0 top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]" />

            <span className="absolute right-0 top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]" />
          </div>
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <div className="flex flex-col gap-[16px]">
          {discountOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`w-fit text-[14px] font-normal leading-[130%] ${
                index === 0 ? "text-[#496B94]" : "text-[#333333]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Customer review */}
      <FilterSection title="Avg. Customer Review">
        <button
          type="button"
          className="flex items-center gap-[8px]"
        >
          {/* Stars */}
          <div className="flex items-center gap-[3px]">
            {[1, 2, 3, 4].map((star) => (
              <span
                key={star}
                className="text-[20px] leading-none text-[#FF9D55]"
              >
                ★
              </span>
            ))}

            <span className="text-[20px] leading-none text-[#FF9D55]">
              ☆
            </span>
          </div>

          <span className="text-[14px] font-normal leading-[130%] text-[#828282]/50">
            &amp; Up
          </span>
        </button>
      </FilterSection>
    </aside>
  );
}