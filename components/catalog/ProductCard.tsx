
import Image from "next/image";

interface ProductCardProps {
  title: string;
  priceOriginal?: number;
  priceSale: number;
  imageSrc: string;
  stars: number;
  shipTo: string;
  isSale?: boolean;
}

const ProductCard = ({ title, priceOriginal, priceSale, imageSrc, stars, shipTo, isSale }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center w-[271px] h-[460px] bg-[#F8F8F8] rounded-[10px] px-4.5 pt-3">
      <div className="flex flex-row w-full items-center justify-between mb-8.25">
        <span className="w-19.75 h-9.75 text-[#FFFFFF] py-2 px-4.5 rounded-[10px] bg-[#FFA95A] shadow-inner-[-4px_4px_6px_0px_#0000001A]">
          SALE
        </span>
        <div className="w-10 h-10 bg-[#F8F8F8] shadow-[0px_2px_4px_0px_#00000033] flex items-center justify-center rounded-[10px]">
          <div className="flex items-center justify-center w-6 h-5.5">
            <svg
              className="w-full h-full stroke-[#D6D6D6]"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <Image
        className="mb-8"
        src={imageSrc}
        alt={title}
        width={199}
        height={172}
      />

      <h2 className="text-[18px] text-[#333333] mb-8">{title}</h2>

      <div className="flex flex-row gap-1.5 self-start mb-2.5">
        {Array.from({ length: 5 }, (_, index) => {
          const isFilled = index < stars;

          return (
            <img
              key={index}
              src={isFilled ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={isFilled ? "Filled star" : "Empty star"}
            />
          );
        })}
      </div>

      <div className="flex flex-row self-start gap-2">
        <p className="text-4xl font-light text-[#2D2D2D]">
          <span className="text-[18px] inline-block align-top font-light mr-1">$</span>
          {priceSale}
        </p>
        {priceOriginal && (
          <div className="relative flex items-center">
            <span className="text-2xl font-light text-[#9A9A9A]">
              <span className="text-sm font-light mr-0.5">$</span>
              {priceOriginal}
            </span>

            <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#FFA95A] -translate-y-1/2" />
          </div>
        )}
      </div>

      <span className="self-start">
        Ship to {shipTo}
      </span>


    </div>
  );
};

export default ProductCard;
