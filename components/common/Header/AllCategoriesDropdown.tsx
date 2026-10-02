"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApi } from "@/components/api/useApi";

const fallbackCategories = [
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

interface DropdownItem {
  label: string;
  categoryId?: string;
}

interface AllCategoriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllCategoriesDropdown({
  isOpen,
  onClose,
}: AllCategoriesDropdownProps) {
  const router = useRouter();
  const [items, setItems] = useState<DropdownItem[]>([
    { label: "All Departments" },
    ...fallbackCategories.map((label) => ({ label })),
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const { data } = await getApi("/categories");
        if (cancelled || !Array.isArray(data) || data.length === 0) return;

        const sorted = [...data].sort(
          (a: { sortOrder?: number; isActive?: boolean }, b: { sortOrder?: number; isActive?: boolean }) =>
            (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
            (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
        );
        const active = sorted.filter(
          (c: { isActive?: boolean }) => c.isActive !== false
        );
        setItems([
          { label: "All Departments" },
          ...active.map((c: { id: string; name: string }) => ({
            label: c.name,
            categoryId: c.id,
          })),
        ]);
      } catch {
        // Keep the fallback list on API errors
      }
    }

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    onClose();
    router.push(
      item.categoryId ? `/catalog?category=${item.categoryId}` : "/catalog"
    );
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`
        absolute left-0 top-[calc(100%+10px)] z-50
        w-[224px] rounded-[20px] bg-[#F8F8F8] py-4
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
      <div className="absolute -top-[10px] left-[95px] h-[10px] w-[20px] bg-[#F8F8F8] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />

      <div className="flex flex-col gap-[5px]">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleItemClick(item)}
            className="
              w-full rounded-[4px] px-7 py-1
              text-left text-[14px] leading-[190%] text-[#828282]
              transition-all duration-150 ease-out
              hover:translate-x-[2px]
              hover:bg-[#EFEFEF]
              hover:text-[#555555]
              hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)]
              active:translate-x-0
              active:scale-[0.99]
            "
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}