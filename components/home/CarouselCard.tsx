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
}

const CarouselCard = ({ title, imageSrc, href, items = [] }: CarouselCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = items.length > 0 ? items : [{ id: 'default', title, imageSrc, price: 13 }];
  const activeProduct = products[activeIndex] ?? products[0];

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + products.length) % products.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % products.length);
  };

  return (
    <div className="flex flex-col w-92 h-115 rounded-[20px] justify-between pt-6 pb-2.75 px-7.5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033]">

      <div className="flex flex-row justify-between items-center mb-3.5">
        <h2 className="text-[24px] font-semibold">{title}</h2>
      </div >
      <div className="flex flex-row justify-between items-center">

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous product"
          className="flex justify-center items-center -ml-7  border-0 w-19 h-19 shadow-[0_2px_4px_0px_#00000033] rounded-[20px]"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={17 * 2}
            height={37 * 2}
            className="rotate-180"
          />
        </button>

        <Link
          href={href}
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
          className="flex justify-center items-center -mr-7 border-0 w-19 h-19 shadow-[0_2px_4px_0px_#00000033] rounded-[20px]"
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt="carousel_chewron"
            width={17 * 2}
            height={37 * 2}

          />
        </button>
      </div >
      <div>
        <p className="text-[18px] text-[#333333]">{activeProduct.title}</p>
        <p className="text-4xl font-light text-[#2D2D2D]">
          <span className="text-[18px] inline-block align-top font-light">$</span>
          {activeProduct.price.toFixed(2)}
        </p>
      </div>

    </div >
  );
}


export default CarouselCard;
