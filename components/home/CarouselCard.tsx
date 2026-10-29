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
    <div className="tm-lift flex h-full w-full min-w-0 flex-col justify-between rounded-[16px] bg-[#F8F8F8] px-3 pb-3 pt-3.5 shadow-[0px_2px_4px_0px_#00000033] sm:rounded-[20px] sm:px-5 sm:pt-5 2xl:h-115 2xl:w-92 2xl:px-7.5 2xl:pb-2.75 2xl:pt-6">

      <div className="mb-2 flex flex-row items-center justify-between sm:mb-3.5">
        <h2 className="truncate text-[16px] font-semibold sm:text-[20px] 2xl:text-[24px]">{title}</h2>
      </div >
      <div className="flex flex-row items-center justify-center sm:justify-between">

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous product"
          className="hidden shrink-0 items-center justify-center rounded-[14px] border-0 shadow-[0_2px_4px_0px_#00000033] sm:-ml-4 sm:flex sm:h-12 sm:w-12 2xl:-ml-7 2xl:h-19 2xl:w-19 2xl:rounded-[20px]"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={17 * 2}
            height={37 * 2}
            className="h-auto w-[60%] rotate-180 2xl:w-auto"
          />
        </button>

        <Link
          href={productHref}
          className="relative flex aspect-[208/255] w-full min-w-0 max-w-[208px] items-center justify-center sm:mx-2 2xl:mx-0 2xl:h-[255px] 2xl:w-[208px]"
        >
          <Image
            src={activeProduct.imageSrc}
            alt={activeProduct.title}
            width={208}
            height={255}
            className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300"
          />
        </Link>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next product"
          className="hidden shrink-0 items-center justify-center rounded-[14px] border-0 shadow-[0_2px_4px_0px_#00000033] sm:-mr-4 sm:flex sm:h-12 sm:w-12 2xl:-mr-7 2xl:h-19 2xl:w-19 2xl:rounded-[20px]"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={17 * 2}
            height={37 * 2}
            className="h-auto w-[60%] 2xl:w-auto"
          />
        </button>
      </div >
      <div>
        <p className="mt-2 line-clamp-1 text-[13px] text-[#333333] sm:text-[16px] 2xl:mt-0 2xl:text-[18px]">{activeProduct.title}</p>
        <div className="my-1 flex flex-row gap-0.5 sm:gap-1.5 2xl:my-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < (activeProduct.rating ?? 0) ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={index < (activeProduct.rating ?? 0) ? "Filled star" : "Empty star"}
              className="h-3 w-3 sm:h-auto sm:w-auto"
            />
          ))}
        </div>
        <p className="text-[22px] font-light text-[#2D2D2D] sm:text-3xl 2xl:text-4xl">
          <span className="inline-block align-top text-[12px] font-light sm:text-[16px] 2xl:text-[18px]">$</span>
          {activeProduct.price.toFixed(2)}
        </p>
      </div>

    </div >
  );
}


export default CarouselCard;
