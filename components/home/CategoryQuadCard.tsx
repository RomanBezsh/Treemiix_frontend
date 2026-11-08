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
    <div className="flex flex-col w-full max-w-[280px] min-h-[400px] rounded-[20px] pt-5 px-5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] sm:w-[360px] sm:min-h-[460px] lg:w-[400px] lg:min-h-[520px]">
      <div className="flex flex-row justify-between items-center mb-3 px-2">
        <h2 className="text-[18px] sm:text-[24px] font-semibold line-clamp-1 webkit-line-clamp-1">{title}</h2>

        <Link className="flex flex-row items-center" href={moreHref}>
          <span className="text-[#333333] text-[12px] sm:text-[13px] mr-2">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={18}
            height={6}
          />
        </Link>
      </div >
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
};

const CategoryQuadItem = ({ title, imageSrc, href, rating = 0 }: Omit<QuadItem, "id">) => {
  return (
    <Link
      href={href}
      className="flex flex-col p-3 w-full min-h-[130px] bg-white rounded-[16px] shadow-[0px_2px_4px_0px_#0000001A] hover:shadow-md transition-shadow group overflow-hidden cursor-pointer"
    >
      {/* Название товара */}
      <span className="text-[11px] sm:text-[13px] font-light text-[#333333] line-clamp-2 webkit-line-clamp-2 mb-2 overflow-hidden">
        {title}
      </span>

      {/* Рейтинг */}
      <div className="flex gap-[2px] mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            key={index}
            src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
            alt={index < rating ? "Filled star" : "Empty star"}
            className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]"
          />
        ))}
      </div>

      {/* Обертка для картинки */}
      <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center p-2">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>
    </Link>
  );
};

export default CategoryQuadCard;
