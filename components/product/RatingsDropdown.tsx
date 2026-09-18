"use client";

import Image from "next/image";
import Link from "next/link";

interface RatingsDropdownProps {
  rating: number;
  ratingsCount: number;
  isOpen: boolean;
}

const ratingData = [
  { stars: 5, percentage: 77 },
  { stars: 4, percentage: 12 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 4 },
];

export default function RatingsDropdown({
  rating,
  ratingsCount,
  isOpen,
}: RatingsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[calc(100%+5px)] right-[-155px] z-[60] w-[360px] rounded-[20px] bg-[#F8F8F8] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] p-6 pt-8 cursor-default" onClick={(e) => e.stopPropagation()}>
      {/* Triangle/Pointer */}
      <div className="absolute -top-[10px] left-[180px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[10px] border-b-[#F8F8F8]"></div>
      
      <div className="flex items-center gap-4 mb-1">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => {
            const isFilled = index < Math.floor(rating);
            return (
              <div key={index} className="relative w-5 h-[19px]">
                 <Image
                    src={isFilled ? "/common/star_filled.svg" : "/common/star_empty.svg"}
                    alt={isFilled ? "Filled star" : "Empty star"}
                    fill
                    className="object-contain"
                />
              </div>
            );
          })}
        </div>
        <div className="bg-[#F8F8F8] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] rounded-[20px] px-4 py-1 text-[18px] text-[#333333]">
          4.6/5
        </div>
      </div>

      <div className="text-[14px] text-[#828282] mb-6 px-0.5">
        {ratingsCount.toLocaleString("en-US")} global ratings
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {ratingData.map((data) => (
          <div key={data.stars} className="flex items-center gap-3">
            <div className="w-[11px] text-[18px] text-[#333333] leading-none">
              {data.stars}
            </div>
            <div className="relative w-5 h-[19px]">
                 <Image
                    src="/common/star_filled.svg"
                    alt="Star"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="flex-1 h-[15px] bg-[#F8F8F8] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)] rounded-[20px] overflow-hidden relative">
              <div
                className="h-full bg-[#FFA95A] rounded-[20px]"
                style={{ width: `${data.percentage}%` }}
              ></div>
            </div>
            <div className="w-[34px] text-[18px] text-[#333333] text-right leading-none">
              {data.percentage.toString().padStart(2, "0")}%
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#EFEFEF] pt-6 flex justify-center">
        <Link
          href="#"
          className="flex items-center gap-2 text-[18px] text-[#828282] hover:text-[#333333] transition-colors"
        >
          See all customer reviews
          <Image
            src="/catalog/chewron_down.svg"
            width={19}
            height={19}
            alt="chewron"
            className="-rotate-90 filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
          />
        </Link>
      </div>
    </div>
  );
}
