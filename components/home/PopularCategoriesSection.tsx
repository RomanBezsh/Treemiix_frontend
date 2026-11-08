import Image from "next/image";
import Link from "next/link";
import PopularCategoryTile, { PopularCategoryTileProps } from "./PopularCategoryTile";


interface PopularCategoriesSectionProps {
  href: string;
  items: PopularCategoryTileProps[];
}

export default function PopularCategoriesSection({ href, items }: PopularCategoriesSectionProps) {
  return (
    <div className="flex flex-col w-full max-w-[380px] gap-3">
      <div className="flex flex-row justify-between items-center mb-2 px-2">
        <h2 className="text-[16px] sm:text-2xl font-semibold text-[#333333] line-clamp-1 webkit-line-clamp-1">Most popular categories of the week</h2>
        <Link className="flex flex-row items-center" href={href}>
          <span className="text-[#333333] text-[12px] sm:text-[13px] mr-2">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={18}
            height={6}
          />
        </Link>
      </div>
      <div className="flex flex-row gap-4 sm:gap-5">
        {items.map((item) => (
          <PopularCategoryTile key={item.category} {...item} />
        ))}
      </div>
    </div>
  );
}
