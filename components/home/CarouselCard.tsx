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
    <div className="flex flex-col w-92 h-115 rounded-[20px] justify-between pt-6 pb-2.75 px-7.5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] product-card-enter animate-fade-in-up hover-lift">

      <div className="flex flex-row justify-between items-center mb-3.5">
        <h2 className="text-[24px] font-semibold">{title}</h2>
      </div >
      <div className="flex flex-row justify-between items-center">

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous product"
          className="
            carousel-btn
            flex justify-center items-center -ml-7
            border-0 w-[48px] h-[48px]
            rounded-[50%]
            bg-white
            shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
            transition-all duration-300
            --rotate: -180deg
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={34}
            height={74}
            className="rotate-180 transition-transform duration-300 hover:scale-110"
          />
        </button>

        <Link
          href={productHref}
          className="relative flex items-center justify-center w-[208px] h-[255px]"
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
          className="
            carousel-btn
            flex justify-center items-center -mr-7
            border-0 w-[48px] h-[48px]
            rounded-[50%]
            bg-white
            shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
            transition-all duration-300
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={34}
            height={74}
            className="transition-transform duration-300 hover:scale-110"
          />
        </button>
      </div >
      <div>
        <p className="text-[18px] text-[#333333]">{activeProduct.title}</p>
        <div className="flex flex-row gap-1.5 mt-1.5 mb-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < (activeProduct.rating ?? 0) ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={index < (activeProduct.rating ?? 0) ? "Filled star" : "Empty star"}
            />
          ))}
        </div>
        <p className="text-4xl font-light text-[#2D2D2D]">
          <span className="text-[18px] inline-block align-top font-light">$</span>
          {activeProduct.price.toFixed(2)}
        </p>
      </div>

    </div >
  );
}


export default CarouselCard;
