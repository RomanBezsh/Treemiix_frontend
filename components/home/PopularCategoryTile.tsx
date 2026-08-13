import Image from "next/image";

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
    <div className="relative h-139 w-67.75 shrink-0 overflow-hidden rounded-lg bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033]">
      <Image
        src={imageSrc}
        alt={category}
        width={432}
        height={378}
        className="absolute mt-17.5 -right-1/4 h-[378px] w-[432px] object-cover"
      />

      <h3 className="absolute bottom-4 left-4 text-[22px] font-normal text-[#333333]">
        {category}
      </h3>
    </div>
  );
};

export default PopularCategoryTile;
