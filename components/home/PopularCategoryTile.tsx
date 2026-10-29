import Image from "next/image";
import Link from "next/link";

export interface PopularCategoryTileProps {
  category: string;
  href: string;
  imageSrc: string;
}

const PopularCategoryTile = ({
  category,
  href,
  imageSrc,
}: PopularCategoryTileProps) => {
  return (
    <Link
      href={href}
      className="relative block aspect-[271/556] w-full min-w-0 overflow-hidden rounded-lg sm:aspect-auto sm:h-[360px] lg:h-[460px] 2xl:h-139 2xl:w-67.75 2xl:shrink-0 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] tm-lift"
    >
      <Image
        src={imageSrc}
        alt={category}
        width={432}
        height={378}
        className="absolute -right-1/4 top-[12%] h-[68%] w-[160%] max-w-none object-cover 2xl:top-auto 2xl:mt-17.5 2xl:h-[378px] 2xl:w-[432px]"
      />

      <h3 className="absolute bottom-2 left-2 right-2 text-[13px] font-normal leading-tight text-[#333333] sm:bottom-4 sm:left-4 sm:text-[18px] 2xl:text-[22px]">
        {category}
      </h3>
    </Link>
  );
};

export default PopularCategoryTile;
