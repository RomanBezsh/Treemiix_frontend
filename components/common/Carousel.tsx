import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";






interface ProductCarouselSectionProps {
  title: string;
  href?: string;
  children: ReactNode;
}



const Carousel = ({ title, href, children }: ProductCarouselSectionProps) => {
  return (
    <div className="flex flex-col w-[1534px] h-[431px]">
      <div className="flex flex-row justify-between items-center mb-7">
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

      <div className="flex flex-row gap-8.75 items-center justify-center">
        <Image
          src="/home/carousel_chewron.svg"
          alt="carousel_chewron"
          width={17 * 2}
          height={37 * 2}
          className="rotate-180"
        />


        <div className="flex flex-row gap-5">
          {children}
        </div>



        <Image
          src="/home/carousel_chewron.svg"
          alt="carousel_chewron"
          width={17 * 2}
          height={37 * 2}

        />
      </div>

    </div>
  );
};





export default Carousel;




