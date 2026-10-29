import Image from "next/image";

export interface HorizontalProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  rating?: number;
  isLastItem?: boolean;
}

const HorizontalProductCard = ({ imageSrc, title, price, rating = 0, isLastItem }: HorizontalProductCardProps) => {
  return (
    <div
      className={`flex flex-row items-start gap-3 sm:gap-4 transition-colors ${isLastItem ? "bg-[#F8F8F8] rounded-[10px] shadow-[0px_2px_4px_0px_#00000033]" : ""
        }`}
    >
      <div className={`relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-32 sm:w-32 2xl:h-43 2xl:w-43.5 ${!isLastItem ? "shadow-[0px_2px_4px_0px_#00000033] rounded-[10px] bg-[#F8F8F8]" : ""}`}>
        <Image
          src={imageSrc}
          alt={title}
          width={144}
          height={144}
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain 2xl:max-h-36 2xl:max-w-36"
        />
      </div>
      <div className="mt-2 flex min-w-0 flex-col gap-1.5 pr-2 sm:mt-4 sm:gap-3">
        <h3 className="line-clamp-2 text-[14px] leading-tight text-[#333333] sm:text-[16px] 2xl:text-[18px]">{title}</h3>
        <div className="flex flex-row gap-0.5 sm:-mt-1.5 sm:gap-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={index < rating ? "Filled star" : "Empty star"}
              className="h-3 w-3 sm:h-auto sm:w-auto"
            />
          ))}
        </div>
        <h3 className="text-[24px] font-light sm:text-3xl 2xl:text-4xl">
          <span className="inline-block align-top text-[13px] font-light sm:text-[16px] 2xl:text-[18px]">$</span>
          {price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
