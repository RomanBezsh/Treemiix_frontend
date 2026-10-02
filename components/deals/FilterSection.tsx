"use client";

import { ReactNode, useState } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-[#E5E5E5] py-[16px]">
      {/* Section header */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          group flex w-full items-center justify-between gap-[12px]
          text-left
          transition-transform duration-200 ease-out
          hover:translate-x-[2px]
        "
      >
        <span className="bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)] bg-clip-text text-[18px] font-medium leading-[130%] text-transparent">
          {title}
        </span>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className={`relative h-[11px] w-[6px] shrink-0 transition-transform duration-300 ease-out ${
            isOpen ? "-rotate-90" : "rotate-90"
          }`}
        >
          <span className="absolute left-0 top-[4px] h-[1px] w-[6px] rotate-45 bg-[#828282]/50 transition-colors duration-200 group-hover:bg-[#7E8CBD]" />
          <span className="absolute left-0 top-[7px] h-[1px] w-[6px] -rotate-45 bg-[#828282]/50 transition-colors duration-200 group-hover:bg-[#7E8CBD]" />
        </span>
      </button>

      {/* Animated content */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "mt-[12px] grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}