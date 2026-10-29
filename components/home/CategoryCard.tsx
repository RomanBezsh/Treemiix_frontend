import Image from 'next/image';
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

const CategoryCard = ({ title, imageSrc, href }: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#F8F8F8] px-3 pb-3 pt-3.5 shadow-[0px_2px_4px_0px_#00000033] tm-lift sm:rounded-[20px] sm:px-5 sm:pt-5 2xl:h-115 2xl:w-92 2xl:px-7.5 2xl:pb-0 2xl:pt-6"
    >

      <div className="mb-2 flex flex-row items-center justify-between gap-2 sm:mb-3.5">
        <h2 className="truncate text-[16px] font-semibold sm:text-[20px] 2xl:text-[24px]">{title}</h2>

        <span className="flex shrink-0 flex-row items-center">
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </span>
      </div >
      <Image
        src={imageSrc}
        alt={title}
        width={308}
        height={360}
        className="mx-auto h-auto w-full max-w-[308px] object-contain"
      />
    </Link >
  );
}


export default CategoryCard;
