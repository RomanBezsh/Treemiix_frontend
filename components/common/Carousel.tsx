"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Children,
  ReactNode,
  useRef,
} from "react";

const cn = (
  ...classes: (
    | string
    | false
    | null
    | undefined
  )[]
) => classes.filter(Boolean).join(" ");

interface ProductCarouselSectionProps {
  title: string;
  href?: string;
  children: ReactNode;
  width?: string;
}

const Carousel = ({
  title,
  href,
  children,
  width = "max-w-[1480px]",
}: ProductCarouselSectionProps) => {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const scroll = (
    direction: "left" | "right",
  ) => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const firstItem =
      container.firstElementChild as HTMLElement | null;

    if (!firstItem) {
      return;
    }

    const containerStyle =
      window.getComputedStyle(container);

    const gap =
      parseFloat(containerStyle.columnGap) || 20;

    const itemWidth =
      firstItem.getBoundingClientRect().width;

    const scrollAmount =
      itemWidth + gap;

    container.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col",
        width,
      )}
    >
      {/* Header */}
      <div
        className="
          mb-[18px]
          flex items-center justify-between
          gap-[15px]
          px-[16px]
          sm:mb-[22px]
          sm:px-[24px]
          lg:mb-[28px]
          lg:px-[40px]
        "
      >
        <h2
          className="
            min-w-0
            text-[20px] font-semibold
            leading-[130%] text-[#333333]
            sm:text-[22px]
            lg:text-2xl
          "
        >
          {title}
        </h2>

        {href && (
          <Link
            className="
              flex shrink-0 items-center
              transition-opacity duration-200
              hover:opacity-70
            "
            href={href}
          >
            <span className="mr-[9px] text-[13px] text-[#333333]">
              More
            </span>

            <Image
              src="/home/vector.svg"
              alt=""
              width={22}
              height={8}
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className="relative flex w-full min-w-0 items-center">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="
            absolute left-[3px] top-1/2 z-20
            flex h-[38px] w-[38px]
            -translate-y-1/2
            cursor-pointer
            items-center justify-center
            rounded-full
            bg-white/90
            shadow-[0_2px_6px_rgba(0,0,0,0.15)]
            transition-all duration-200
            hover:scale-105
            active:scale-95
            sm:left-[6px]
            sm:h-[44px]
            sm:w-[44px]
            lg:left-[8px]
            lg:h-[52px]
            lg:w-[52px]
          "
          aria-label="Scroll left"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt=""
            width={17}
            height={37}
            aria-hidden="true"
            className="
              h-[22px] w-auto rotate-180
              sm:h-[26px]
              lg:h-[30px]
            "
          />
        </button>

        {/* Viewport */}
        <div
          className="
            w-full min-w-0
            overflow-hidden
            px-[46px]
            sm:px-[58px]
            lg:px-[70px]
          "
        >
          <div
            ref={scrollRef}
            className="
              no-scrollbar
              flex w-full min-w-0
              snap-x snap-mandatory
              items-stretch
              gap-[12px]
              overflow-x-auto
              scroll-smooth
              sm:gap-[16px]
              lg:gap-[20px]
            "
          >
            {Children.toArray(children).map(
              (child, index) => (
                <div
                  key={index}
                  className="
                    min-w-0 shrink-0 snap-start

                    w-[88%]

                    sm:w-[calc(50%-8px)]

                    lg:w-[calc(33.333%-14px)]

                    xl:w-[calc(25%-15px)]

                    2xl:w-[calc(20%-16px)]

                    [&>*]:w-full
                  "
                >
                  {child}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="
            absolute right-[3px] top-1/2 z-20
            flex h-[38px] w-[38px]
            -translate-y-1/2
            cursor-pointer
            items-center justify-center
            rounded-full
            bg-white/90
            shadow-[0_2px_6px_rgba(0,0,0,0.15)]
            transition-all duration-200
            hover:scale-105
            active:scale-95
            sm:right-[6px]
            sm:h-[44px]
            sm:w-[44px]
            lg:right-[8px]
            lg:h-[52px]
            lg:w-[52px]
          "
          aria-label="Scroll right"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt=""
            width={17}
            height={37}
            aria-hidden="true"
            className="
              h-[22px] w-auto
              sm:h-[26px]
              lg:h-[30px]
            "
          />
        </button>
      </div>
    </section>
  );
};

export default Carousel;