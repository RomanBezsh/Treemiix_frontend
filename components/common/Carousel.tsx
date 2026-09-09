'use client';

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useRef, Children } from "react";

// Local utility for merging classes
const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

interface ProductCarouselSectionProps {
  title: string;
  href?: string;
  children: ReactNode;
  width?: string; // Принимает произвольные классы Tailwind, например "max-w-[1200px]"
}

const Carousel = ({ title, href, children, width = "max-w-[1480px]" }: ProductCarouselSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("flex flex-col w-full mx-auto", width)}>
      <div className="flex flex-row justify-between items-center mb-7 px-4">
        <h2 className="text-2xl font-semibold text-[#333333]">{title}</h2>
        {href && (
          <Link className="flex flex-row items-center" href={href}>
            <span className="text-[#333333] text-[13px] mr-2.25">More</span>
            <Image
              src="/home/vector.svg"
              alt="vector"
              width={22}
              height={8}
            />
          </Link>
        )}
      </div>

      <div className="relative flex items-center">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 z-20 p-2 cursor-pointer"
          aria-label="Scroll left"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="Previous"
            width={17}
            height={37}
            className="rotate-180"
          />
        </button>

        <div className="w-full overflow-hidden px-12">
          <div
            ref={scrollRef}
            className="flex flex-row items-center w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-5"
          >
            {Children.map(children, (child) => (
              <div className="snap-start shrink-0 w-[calc(20%-16px)]">
                {child}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 z-20 p-2 cursor-pointer"
          aria-label="Scroll right"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="Next"
            width={17}
            height={37}
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

