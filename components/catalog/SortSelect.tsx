import Image from "next/image";
import { useState } from "react";

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Avg. Customer Review',
  'Newest Arrivals',
];

const SortSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Featured');

  return (
    <div className="relative align-middle h-7.5 w-[210px]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-full w-full items-center justify-between rounded-full bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] px-6"
        >
          <span className="mr-2 truncate text-left text-[14px] text-white">
            Sort by: <strong className="font-medium">{selected}</strong>
          </span>
          <Image
            width={15}
            height={15}
            src={"/catalog/chewron_dowm.svg"}
            alt={""}
            className="flex-shrink-0"
          />
        </button>
      )}

      {isOpen && (
        <div className="absolute left-0 top-0 z-50 w-full overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.15)]">
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-[31px] w-full items-center justify-between bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] px-4 text-left text-[14px] font-medium text-white"
          >
            <span className="truncate">{selected}</span>
            <Image
              width={15}
              height={15}
              src={"/catalog/chewron_dowm.svg"}
              alt={""}
              className="flex-shrink-0 rotate-180"
            />
          </button>

          <div className="flex flex-col py-1.5">
            {SORT_OPTIONS.filter((item) => item !== selected).map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="truncate px-4 py-1.5 text-left text-[14px] font-medium text-[#7E8CBD] transition-colors hover:bg-[#F8F8F8]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortSelect;
