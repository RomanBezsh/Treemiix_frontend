import Image from 'next/image';
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

const CategoryCard = ({ title, imageSrc, href }: CategoryCardProps) => {
  return (
    <div className="flex flex-col w-92 h-115 rounded-[20px] pt-6 px-7.5 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033]">

      <div className="flex flex-row justify-between items-center mb-3.5">
        <h2 className="text-[24px] font-semibold">{title}</h2>

        <Link className="flex flex-row items-center" href={href}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div >
      <Image
        src={imageSrc}
        alt={title}
        width={308}
        height={360}
      />
    </div >
  );
}


export default CategoryCard;
