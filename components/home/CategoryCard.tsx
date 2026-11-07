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
      className="flex flex-col w-full max-w-[280px] min-h-[280px] rounded-[20px] pt-5 px-5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] transition-transform hover:scale-[1.02] sm:w-[360px] sm:min-h-[320px] lg:w-[400px] lg:min-h-[360px]"
    >

      <div className="flex flex-row justify-between items-center mb-3 px-2">
        <h2 className="text-[18px] sm:text-[24px] font-semibold line-clamp-1">{title}</h2>

        <span className="flex flex-row items-center">
          <span className="text-[#333333] text-[12px] sm:text-[13px] mr-2">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={18}
            height={6}
          />
        </span>
      </div >
      <div className="relative flex items-center justify-center w-full h-full max-h-[220px] sm:max-h-[280px]">
        <Image
          src={imageSrc}
          alt={title}
          width={308}
          height={360}
          className="max-w-full max-h-full object-contain mx-auto"
        />
      </div>
    </Link >
  );
};


export default CategoryCard;
