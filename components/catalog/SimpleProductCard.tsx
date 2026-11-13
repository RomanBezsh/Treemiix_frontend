import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
}

interface SimpleProductCardProps {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
  rating?: number;
  onClick?: () => void;
}

const SimpleProductCard = ({
  id,
  title,
  imageSrc,
  price,
  rating = 0,
  onClick,
}: SimpleProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/product/${id}`);
    }
  };

  return (
    <div
      className="group flex w-full min-w-0 cursor-pointer flex-col 2xl:h-93.75 2xl:w-67.5"
      onClick={handleClick}
    >
      <div className="relative mb-3 flex aspect-square w-full transition-[translate,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[4px] group-hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)] items-center justify-center rounded-[16px] bg-[#F8F8F8] p-3 shadow-[0_2px_4px_0px_#00000033] sm:mb-[18px] sm:rounded-[20px] sm:p-4 2xl:h-[270px] 2xl:w-[270px]">
        <Image
          src={imageSrc}
          alt={title}
          width={232}
          height={210}
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
      <p className="line-clamp-2 text-[14px] text-[#333333] sm:text-[16px] 2xl:text-[18px]">{title}</p>
      <div className="my-1 flex flex-row gap-0.5 sm:gap-1.5 2xl:my-1.5">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            key={index}
            src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
            alt={index < rating ? "Filled star" : "Empty star"}
            className="h-3 w-3 sm:h-auto sm:w-auto"
          />
        ))}
      </div>
      <p className="text-[22px] font-light text-[#2D2D2D] sm:text-3xl 2xl:text-4xl">
        <span className="inline-block align-top text-[12px] font-light sm:text-[16px] 2xl:text-[18px]">$</span>
        {price.toFixed(2)}
      </p>
    </div>
  );
};

export default SimpleProductCard;