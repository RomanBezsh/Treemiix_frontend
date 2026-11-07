import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  title: string;
  priceOriginal?: number;
  priceSale: number;
  imageSrc?: string;
  stars: number;
  shipTo: string;
  isSale?: boolean;
  onClick?: () => void;
  id?: string;
}

const ProductCard = ({
  title,
  priceOriginal,
  priceSale,
  imageSrc,
  stars,
  shipTo,
  isSale,
  onClick,
  id,
}: ProductCardProps) => {
  const router = useRouter();

  // Show the SALE badge for real discounts: explicit prop or priceOriginal > priceSale
  const showSale = isSale !== undefined ? isSale : Boolean(priceOriginal && priceOriginal > priceSale);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      router.push(`/product/${id}`);
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full max-w-[271px] min-h-[420px] bg-[#F8F8F8] rounded-[10px] px-4 pt-3 cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="flex flex-row w-full items-center justify-between mb-4">
        {showSale ? (
          <span className="w-16 h-8 text-[#FFFFFF] py-1 px-3 rounded-[8px] bg-[#FFA95A] shadow-[0_2px_4px_rgba(255,169,90,0.3)]">
            SALE
          </span>
        ) : (
          <span aria-hidden />
        )}
        <div className="w-8 h-8 bg-[#F8F8F8] shadow-[0_1px_2px_rgba(0,0,0,0.08)] flex items-center justify-center rounded-[8px]">
          <div className="flex items-center justify-center w-5 h-4">
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

      <div className="relative flex items-center justify-center w-full aspect-square max-w-[190px] max-h-[170px] mb-3">
        <Image
          className="max-w-full max-h-full object-contain"
          src={imageSrc || ""}
          alt={title}
          width={190}
          height={170}
        />
      </div>

      <h2 className="text-[16px] sm:text-[18px] font-medium text-[#333333] mb-2 leading-[1.4] line-clamp-2">{title}</h2>

      <div className="flex flex-row gap-1 self-start mb-2">
        {Array.from({ length: 5 }, (_, index) => {
          const isFilled = index < stars;

          return (
            <img
              key={index}
              src={isFilled ? "/common/star_filled.svg" : "/common/star_empty.svg"}
              alt={isFilled ? "Filled star" : "Empty star"}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            />
          );
        })}
      </div>

      <div className="flex flex-row self-start gap-2">
        <p className="text-3xl sm:text-4xl font-light text-[#2D2D2D]">
          <span className="text-[16px] sm:text-[18px] inline-block align-top font-light mr-1">$</span>
          {priceSale}
        </p>
        {priceOriginal && (
          <div className="relative flex items-center">
            <span className="text-xl sm:text-2xl font-light text-[#9A9A9A]">
              <span className="text-xs sm:text-sm font-light mr-0.5">$</span>
              {priceOriginal}
            </span>

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#FFA95A] -translate-y-1/2" />
          </div>
        )}
      </div>

      <span className="self-start text-xs sm:text-sm text-[#666666]">
        Ship to {shipTo}
      </span>
    </div>
  );
};

export default ProductCard;