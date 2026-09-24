"use client";

import { useEffect, useRef, useState } from "react";

const initialFilters = ["Razer", "Last 30 days"];

const sortOptions = [
  { value: "Featured", label: "Featured" },
  { value: "PriceLow", label: "Price: Low to High" },
  { value: "PriceHigh", label: "Price: High to Low" },
  { value: "Rating", label: "Avg. Customer Review" },
];

export default function DealsToolbar() {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("Featured");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const removeFilter = (filter: string) => {
    setFilters((current) =>
      current.filter((item) => item !== filter),
    );
  };

  const resetFilters = () => {
    setFilters([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSort =
    sortOptions.find((option) => option.value === sort)?.label ??
    "Featured";

  return (
    <div className="deals-fade-down deals-delay-1 flex w-full flex-col gap-[14px] sm:flex-row sm:items-center sm:justify-between">
      {/* Selected filters */}
      <div className="flex flex-wrap items-center gap-[10px]">
        {/* Selected count */}
        <div className="flex items-baseline gap-[5px] text-[#333333]">
          <span className="text-[24px] font-normal leading-[130%]">
            26
          </span>

          <span className="text-[18px] font-normal leading-[130%]">
            Item selected
          </span>
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={resetFilters}
          className="
            flex h-[40px] items-center justify-center
            rounded-[51px]
            bg-[#B3B3B3]/40
            px-[24px]
            text-[16px] font-normal leading-[130%] text-white
            shadow-[inset_-4px_4px_6px_0_rgba(0,0,0,0.10)]
            transition-all duration-200 ease-out
            hover:-translate-y-[2px]
            hover:bg-[#A7A7A7]/50
            hover:shadow-[0_4px_10px_rgba(0,0,0,0.10),inset_-4px_4px_6px_0_rgba(0,0,0,0.10)]
            active:translate-y-0
            active:scale-[0.97]
          "
        >
          Reset
        </button>

        {/* Active filters */}
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => removeFilter(filter)}
            className="
              group flex h-[40px] items-center justify-center gap-[10px]
              rounded-[51px]
              border-2 border-[#B3B3B3]/60
              bg-white
              px-[24px]
              text-[16px] font-normal leading-[130%]
              text-[#828282]/70
              transition-all duration-200 ease-out
              hover:-translate-y-[2px]
              hover:border-[#7E8CBD]/50
              hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)]
              active:translate-y-0
              active:scale-[0.97]
            "
          >
            <span>{filter}</span>

            <span
              aria-hidden="true"
              className="
                text-[18px] leading-none text-[#828282]/60
                transition-transform duration-200
                group-hover:rotate-90
              "
            >
              ×
            </span>
          </button>
        ))}
      </div>

      {/* Sorting */}
      <div ref={sortRef} className="relative shrink-0">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
          onClick={() => setIsSortOpen((current) => !current)}
          className="
            flex h-[40px] min-w-[274px]
            items-center justify-center gap-[8px]
            rounded-full
            bg-[#B3B3B3]/40
            px-[24px]
            text-[18px] font-normal leading-[120%]
            text-white
            shadow-[inset_-4px_4px_6px_0_rgba(0,0,0,0.10)]
            transition-all duration-200 ease-out
            hover:-translate-y-[2px]
            hover:bg-[#A7A7A7]/50
            hover:shadow-[0_4px_10px_rgba(0,0,0,0.10),inset_-4px_4px_6px_0_rgba(0,0,0,0.10)]
            active:translate-y-0
          "
        >
          <span>
            Sort by:{" "}
            <span className="font-medium">
              {selectedSort}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`ml-[2px] block h-[9px] w-[9px] border-b-[2px] border-r-[2px] border-white transition-transform duration-300 ${
              isSortOpen ? "rotate-[225deg]" : "rotate-45"
            }`}
          />
        </button>

        {/* Dropdown */}
        <div
          role="listbox"
          aria-hidden={!isSortOpen}
          className={`
            absolute right-0 top-[48px] z-30
            w-[274px] overflow-hidden
            rounded-[14px]
            border border-[#E8E8E8]
            bg-white py-[6px]
            shadow-[0_4px_12px_rgba(0,0,0,0.12)]
            origin-top
            transition-all duration-200 ease-out
            ${
              isSortOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible pointer-events-none -translate-y-[7px] scale-[0.97] opacity-0"
            }
          `}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={sort === option.value}
              onClick={() => {
                setSort(option.value);
                setIsSortOpen(false);
              }}
              className={`block w-full px-[18px] py-[10px] text-left text-[14px] leading-[130%] transition-all duration-150 hover:translate-x-[2px] hover:bg-[#F5F5F5] ${
                sort === option.value
                  ? "font-medium text-[#333333]"
                  : "font-normal text-[#828282]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}