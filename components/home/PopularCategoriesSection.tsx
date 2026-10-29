import Image from "next/image";
import Link from "next/link";
import PopularCategoryTile, { PopularCategoryTileProps } from "./PopularCategoryTile";


interface PopularCategoriesSectionProps {
  href: string;
  items: PopularCategoryTileProps[];
}

const PopularCategoriesSection = ({ href, items }: PopularCategoriesSectionProps) => {
  return (
    <div className="flex w-full min-w-0 flex-col 2xl:h-158.75 2xl:w-213.25">
      <div className="mb-4 flex flex-row items-center justify-between gap-3 sm:mb-7">
        <h2 className="text-[20px] font-semibold text-[#333333] sm:text-2xl">Most popular categories of the week</h2>
        <Link className="flex shrink-0 flex-row items-center" href={href}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 2xl:flex 2xl:flex-row 2xl:gap-4.75">
        {items.map((item) => (
          <PopularCategoryTile key={item.category} {...item} />
        ))}
      </div>
    </div>
  );
}


export default PopularCategoriesSection;
