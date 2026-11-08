import Image from "next/image";

export interface HorizontalProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  rating?: number;
  isLastItem?: boolean;
}

const HorizontalProductCard = ({ imageSrc, title, price, rating = 0 }: HorizontalProductCardProps) => {
  return (
    <div className="flex flex-row items-start gap-4 bg-[#F8F8F8] rounded-[10px] shadow-[0px_2px_4px_0px_#00000033] p-3">
      <div className="relative w-43.5 h-43 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={144}
          height={144}
          className="object-contain max-h-36 max-w-36"
        />
      </div>
      <div className="flex flex-col mt-1 gap-2 w-full">
        <h3 className="text-[13px] sm:text-[15px] text-[#333333] font-medium leading-tight line-clamp-1 overflow-hidden">{title}</h3>
        <div className="flex flex-row gap-1.5 mt-1">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={index < rating ? "Filled star" : "Empty star"}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            />
          ))}
        </div>
        <h3 className="text-lg sm:text-2xl font-light">
          <span className="text-[13px] sm:text-[16px] inline-block align-top font-light">$</span>
          {price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
