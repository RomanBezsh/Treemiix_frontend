import Image from "next/image";
import Link from "next/link";

interface QuadItem {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  rating?: number;
}

interface CategoryQuadCardProps {
  title: string;
  moreHref: string;
  items: QuadItem[];
}

const CategoryQuadCard = ({ title, moreHref, items }: CategoryQuadCardProps) => {
  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-[16px] bg-[#F8F8F8] px-3.5 pb-3.5 pt-3.5 shadow-[0px_2px_4px_0px_#00000033] sm:rounded-[20px] sm:px-5 sm:pb-5 sm:pt-5 2xl:h-115 2xl:w-92 2xl:px-5.5 2xl:pb-0 2xl:pt-6">
      <div className="mb-3 flex flex-row items-center justify-between gap-2 sm:mb-3.5">
        <h2 className="truncate text-[18px] font-semibold sm:text-[20px] 2xl:text-[24px]">{title}</h2>

        <Link className="flex shrink-0 flex-row items-center" href={moreHref}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 2xl:gap-5">
        {items.slice(0, 4).map((item) => (
          <CategoryQuadItem
            key={item.id}
            title={item.title}
            imageSrc={item.imageSrc}
            href={item.href}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}

const CategoryQuadItem = ({ title, imageSrc, href, rating = 0 }: Omit<QuadItem, "id">) => {
  return (
    <Link
      href={href}
      className="group flex aspect-square w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[14px] bg-white p-2.5 shadow-[0px_2px_4px_0px_#0000001A] tm-lift sm:rounded-[16px] sm:p-3 2xl:h-38 2xl:w-38"
    >
      {/* Название товара */}
      <span className="text-[12px] font-light text-[#333333] line-clamp-1 mb-2">
        {title}
      </span>

      {/* Рейтинг */}
      <div className="flex gap-[2px] mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            key={index}
            src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
            alt={index < rating ? "Filled star" : "Empty star"}
            className="w-[12px] h-[12px]"
          />
        ))}
      </div>

      {/* Обертка для картинки */}
      <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center p-1">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 45vw, 152px"
          className="object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>
    </Link>
  );
};

export default CategoryQuadCard;
