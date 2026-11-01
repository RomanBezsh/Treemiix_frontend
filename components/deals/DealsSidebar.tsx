"use client";

import Link from "next/link";
import { useState } from "react";

import FilterSection from "./FilterSection";
import {
  DEAL_TYPES,
  DISCOUNT_OPTIONS,
  type DealsFilters,
  type DealsView,
} from "./dealsFilters";

export interface DealsDepartment {
  id: string;
  name: string;
  count: number;
}

interface DealsSidebarProps {
  filters: DealsFilters;
  onChange: (next: DealsFilters) => void;
  departments: DealsDepartment[];
  /** Number of personalized deals — "For you" is shown only when there are some */
  forYouCount: number;
}

const parsePrice = (value: string): number | null => {
  const number = Number(value.replace(/[^\d.]/g, ""));
  return value.trim() && Number.isFinite(number) ? number : null;
};

export default function DealsSidebar({ filters, onChange, departments, forYouCount }: DealsSidebarProps) {
  // Local text so the user can type freely; applied with GO
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? "");
  const [syncedFilters, setSyncedFilters] = useState(filters);

  // Reset local inputs when filters are reset from the toolbar
  if (syncedFilters !== filters) {
    setSyncedFilters(filters);
    if (filters.minPrice === null && filters.maxPrice === null) {
      setMinPrice("");
      setMaxPrice("");
    }
  }

  const update = (patch: Partial<DealsFilters>) => onChange({ ...filters, ...patch });

  const toggleDepartment = (id: string) =>
    update({
      departments: filters.departments.includes(id)
        ? filters.departments.filter((item) => item !== id)
        : [...filters.departments, id],
    });

  const applyPrice = () => update({ minPrice: parsePrice(minPrice), maxPrice: parsePrice(maxPrice) });

  const linkButtonClass =
    "w-fit transition-all duration-200 ease-out hover:translate-x-[3px] hover:text-[#496B94]";
  const activeClass = (active: boolean) =>
    active ? "font-semibold text-[#496B94]" : "font-normal text-[#333333]";

  const views: { value: DealsView; label: string }[] = [
    { value: "all", label: "All deals" },
    ...(forYouCount > 0 ? [{ value: "for-you" as const, label: `For you (${forYouCount})` }] : []),
  ];

  const priceInputClass = `
    h-[26px] w-[70px]
    rounded-[6px] border border-[#E5E5E5]
    bg-[#F8F8F8]
    text-center text-[12px] font-normal text-[#828282]
    outline-none
    transition-all duration-200
    focus:border-[#7E8CBD]
    focus:shadow-[0_2px_6px_rgba(126,140,189,0.15)]
  `;

  return (
    <aside className="tm-fade-left w-full font-[var(--font-roboto)] lg:w-[280px] lg:shrink-0">
      {/* Top navigation */}
      <div className="flex flex-col gap-[18px] border-b border-[#E5E5E5] pb-[16px]">
        {views.map((view) => (
          <button
            key={view.value}
            type="button"
            onClick={() => update({ view: view.value })}
            aria-pressed={filters.view === view.value}
            className={`${linkButtonClass} text-left text-[14px] leading-[130%] ${activeClass(filters.view === view.value)}`}
          >
            {view.label}
          </button>
        ))}

        <Link href="/account/lists" className={`${linkButtonClass} text-[14px] font-normal leading-[130%] text-[#333333]`}>
          Watchlist
        </Link>
      </div>

      {/* Departments */}
      <FilterSection title="Departments">
        <div className="flex flex-col gap-[13px]">
          {departments.length === 0 && <p className="text-[13px] text-[#828282]">No departments yet</p>}
          {departments.map((department) => (
            <label
              key={department.id}
              className="
                group flex cursor-pointer items-start gap-[10px]
                transition-transform duration-200 ease-out
                hover:translate-x-[3px]
              "
            >
              <input
                type="checkbox"
                checked={filters.departments.includes(department.id)}
                onChange={() => toggleDepartment(department.id)}
                className="
                  mt-[1px] h-[18px] w-[18px] shrink-0
                  rounded-[5px] accent-[#7E8CBD]
                  transition-transform duration-200
                  group-hover:scale-[1.08]
                "
              />

              <span className="text-[14px] font-normal leading-[130%] text-[#333333] transition-colors duration-200 group-hover:text-[#496B94]">
                {department.name} <span className="text-[#828282]">({department.count})</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Deal type */}
      <FilterSection title="Deal type">
        <div className="flex flex-col gap-[16px]">
          {DEAL_TYPES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => update({ dealType: item.value })}
              aria-pressed={filters.dealType === item.value}
              className={`${linkButtonClass} text-left text-[14px] leading-[130%] ${activeClass(filters.dealType === item.value)}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <form
          className="flex items-center gap-[8px]"
          onSubmit={(event) => {
            event.preventDefault();
            applyPrice();
          }}
        >
          <input
            type="text"
            inputMode="decimal"
            aria-label="Minimum price"
            placeholder="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className={priceInputClass}
          />

          <span className="text-[14px] text-[#B3B3B3]">−</span>

          <input
            type="text"
            inputMode="decimal"
            aria-label="Maximum price"
            placeholder="Any"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className={priceInputClass}
          />

          <button
            type="submit"
            className="
              tm-press
              flex h-[26px] min-w-[46px]
              items-center justify-center
              rounded-[13px]
              bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]
              px-[12px]
              text-[12px] font-medium text-white
            "
          >
            GO
          </button>
        </form>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <div className="flex flex-col gap-[16px]">
          {DISCOUNT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update({ minDiscount: option })}
              aria-pressed={filters.minDiscount === option}
              className={`${linkButtonClass} text-left text-[14px] leading-[130%] ${activeClass(filters.minDiscount === option)}`}
            >
              {option === 0 ? "All deals" : `${option}% off or more`}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Customer review */}
      <FilterSection title="Avg. Customer Review">
        <button
          type="button"
          onClick={() => update({ minRating: filters.minRating === 4 ? 0 : 4 })}
          aria-pressed={filters.minRating === 4}
          className={`
            group flex items-center gap-[8px] rounded-[8px] px-[6px] py-[4px] -mx-[6px]
            transition-all duration-200 ease-out
            hover:translate-x-[3px]
            ${filters.minRating === 4 ? "bg-[#7E8CBD]/15" : ""}
          `}
        >
          <div className="flex items-center gap-[3px]" aria-hidden="true">
            {[1, 2, 3, 4].map((star) => (
              <span key={star} className="text-[20px] leading-none text-[#FF9D55]">★</span>
            ))}
            <span className="text-[20px] leading-none text-[#FF9D55]">☆</span>
          </div>

          <span className="text-[14px] font-normal leading-[130%] text-[#828282]">&amp; Up</span>
        </button>
      </FilterSection>
    </aside>
  );
}
