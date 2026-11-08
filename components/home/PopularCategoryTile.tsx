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
      className="relative w-[170px] h-[200px] shrink-0 overflow-hidden rounded-lg bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] transition-transform hover:scale-[1.02] flex flex-col items-center"
    >
      <Image
        src={imageSrc}
        alt={category}
        width={170}
        height={140}
        className="w-full h-[140px] object-cover object-center mb-3"
      />
      <h3 className="px-2 text-[13px] font-normal text-[#333333] line-clamp-2 text-center leading-tight">
        {category}
      </h3>
    </Link>
  );
};

export default PopularCategoryTile;
