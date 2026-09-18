"use client";

import React from 'react';

const categories = [
  "All Departments",
  "Arts & Crafts",
  "Baby",
  "Beauty & Personal Care",
  "Computers",
  "Electronics",
  "Home & Kitchen",
  "Men's Fashion",
  "Smart Home",
  "Sports & Outdoors",
  "Tools & Home Improvement",
  "Women's Fashion",
];

interface AllCategoriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllCategoriesDropdown({ isOpen, onClose }: AllCategoriesDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[224px] rounded-[20px] bg-[#F8F8F8] py-4 shadow-[0px_2px_4px_rgba(0,0,0,0.2)]">
      {/* Triangle/Pointer */}
      <div className="absolute -top-[10px] left-[95px] h-[10px] w-[20px] bg-[#F8F8F8] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />

      <div className="flex flex-col gap-[5px]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={onClose}
            className="w-full rounded-[4px] px-7 py-1 text-left text-[14px] leading-[190%] text-[#828282] hover:bg-[#EFEFEF] hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
