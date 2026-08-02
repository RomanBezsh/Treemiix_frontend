import Image from "next/image";
import Link from "next/link";

interface QuadItem {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
}

interface CategoryQuadCardProps {
  title: string;
  moreHref: string;
  items: QuadItem[];
}

const CategoryQuadCard = ({ title, moreHref, items }: CategoryQuadCardProps) => {
  return (
    <div className="flex flex-col w-92 h-115 rounded-[20px] pt-6 px-5.5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033]">
      <div className="flex flex-row justify-between items-center mb-3.5">
        <h2 className="text-[24px] font-semibold">{title}</h2>

        <Link className="flex flex-row items-center" href={moreHref}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div >
      <div className="grid grid-cols-2 gap-5">
        {items.slice(0, 4).map((item) => (
          <CategoryQuadItem
            key={item.id}
            title={item.title}
            imageSrc={item.imageSrc}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
}

const CategoryQuadItem = ({ title, imageSrc, href }: Omit<QuadItem, "id">) => {
  return (
    <Link
      href={href}
      className="flex flex-col p-3 w-38 h-38 bg-white rounded-[16px] shadow-[0px_2px_4px_0px_#0000001A] hover:shadow-md transition-shadow group overflow-hidden cursor-pointer"
    >
      {/* Название товара */}
      <span className="text-[12px] font-light text-[#333333] line-clamp-1 mb-2">
        {title}
      </span>

      {/* Обертка для картинки */}
      <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center p-1">
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
