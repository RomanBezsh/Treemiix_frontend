'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CarouselCardProps {
  title: string;
  imageSrc: string;
  href: string;
  items?: Product[];
}

interface Product {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
  rating?: number;
}

const CarouselCard = ({ title, imageSrc, href, items = [] }: CarouselCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = items.length > 0 ? items : [{ id: 'default', title, imageSrc, price: 13 }];
  const activeProduct = products[activeIndex] ?? products[0];

  const isGuid = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const productHref = isGuid(activeProduct.id) ? `/product/${activeProduct.id}` : href;

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + products.length) % products.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % products.length);
  };

  return (
    <div className="flex flex-col w-full max-w-[280px] min-h-[340px] rounded-[20px] justify-between pt-5 px-5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] product-card-enter animate-fade-in-up hover-lift sm:w-[340px] sm:min-h-[380px] lg:w-[380px] lg:min-h-[420px]">

      <div className="flex flex-row justify-between items-center mb-3 px-2">
        <h2 className="text-[18px] sm:text-[24px] font-semibold line-clamp-1">{title}</h2>
      </div>
      <div className="relative flex-1 flex items-center justify-center min-h-[160px] sm:min-h-[200px]">

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous product"
          className="
            absolute left-0 top-1/2
            flex justify-center items-center
            border-0 w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]
            rounded-[50%]
            bg-white/90
            shadow-[0_2px_8px_rgba(0,0,0,0.12)]
            hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]
            transition-all duration-300
            -translate-y-1/2
            --rotate: -180deg
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={24}
            height={48}
            className="rotate-180 transition-transform duration-300 hover:scale-105"
          />
        </button>

        <Link
          href={productHref}
          className="relative flex items-center justify-center w-full max-h-full"
        >
          <Image
            src={activeProduct.imageSrc}
            alt={activeProduct.title}
            width={180}
            height={200}
            className="max-w-full max-h-full object-contain mx-auto"
          />
        </Link>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next product"
          className="
            absolute right-0 top-1/2
            flex justify-center items-center
            border-0 w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]
            rounded-[50%]
            bg-white/90
            shadow-[0_2px_8px_rgba(0,0,0,0.12)]
            hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]
            transition-all duration-300
            -translate-y-1/2
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={24}
            height={48}
            className="transition-transform duration-300 hover:scale-105"
          />
        </button>
      </div >
      <div className="px-2 mt-2">
        <p className="text-[14px] sm:text-[18px] text-[#333333] font-medium line-clamp-1 mb-1">{activeProduct.title}</p>
        <div className="flex flex-row gap-1 mt-1 mb-1">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < (activeProduct.rating ?? 0) ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={index < (activeProduct.rating ?? 0) ? "Filled star" : "Empty star"}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            />
          ))}
        </div>
        <p className="text-xl sm:text-2xl font-light text-[#2D2D2D]">
          <span className="text-[14px] sm:text-[18px] inline-block align-top font-light mr-1">$</span>
          {activeProduct.price.toFixed(2)}
        </p>
      </div>

    </div >
  );
};


export default CarouselCard;
