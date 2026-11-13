import Image from "next/image";
import Link from "next/link";
import HorizontalProductCard, { HorizontalProductCardProps } from "./HorizontalProductCard";

interface PopularProductsSectionProps {
  href: string;
  items: HorizontalProductCardProps[];
}





const PopularProductsSection = ({ href, items }: PopularProductsSectionProps) => {
  return (
    <div className="flex w-full min-w-0 flex-col 2xl:h-158.75 2xl:w-164.75">
      <div className="mb-4 flex flex-row items-center justify-between sm:mb-7">
        <h2 className="text-[20px] font-semibold text-[#333333] sm:text-2xl">Popular</h2>
        <Link className="flex flex-row items-center" href={href}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:gap-5">
        {items.map((item, index) => (
          <HorizontalProductCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default PopularProductsSection;
