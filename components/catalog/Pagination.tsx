"use client";

import Image from "next/image";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-row items-center gap-1.5 mx-auto">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-[#F8F8F8] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] disabled:opacity-50"
      >
        <Image
          src="/home/carousel_chewron.svg"
          alt="Previous"
          width={12}
          height={26}
          className="rotate-180"
        />
      </button>

      {/* Pages */}
      {renderPages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`flex h-[76px] w-[76px] items-center justify-center rounded-[20px] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] ${
            currentPage === page
              ? "border-4 border-[#D6D6D6] bg-[#FAFAFA]"
              : "bg-[#FAFAFA]"
          } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
        >
          <span className="text-[24px] font-medium text-[#828282]">
            {page}
          </span>
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-[#F8F8F8] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] disabled:opacity-50"
      >
        <Image
          src="/home/carousel_chewron.svg"
          alt="Next"
          width={12}
          height={26}
        />
      </button>
    </div>
  );
};

export default Pagination;
