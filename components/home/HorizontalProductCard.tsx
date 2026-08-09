import Image from "next/image";

export interface HorizontalProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  isLastItem?: boolean;
}

const HorizontalProductCard = ({ imageSrc, title, price, isLastItem }: HorizontalProductCardProps) => {
  return (
    <div
      className={`flex flex-row items-start gap-4 transition-colors ${isLastItem ? "bg-[#F8F8F8] rounded-[10px] shadow-[0px_2px_4px_0px_#00000033]" : ""
        }`}
    >
      <div className={`relative w-43.5 h-43   flex items-center justify-center ${!isLastItem ? "shadow-[0px_2px_4px_0px_#00000033] rounded-[10px] bg-[#F8F8F8]" : ""}`}>
        <Image
          src={imageSrc}
          alt={title}
          width={144}
          height={144}
          className="object-contain max-h-36 max-w-36"
        />
      </div>
      <div className="flex flex-col mt-4 gap-3">
        <h3 className="text-[18px] text-[#333333] leading-tight">{title}</h3>
        <h3 className="text-4xl font-light">
          <span className="text-[18px] inline-block align-top font-light">$</span>
          {price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
