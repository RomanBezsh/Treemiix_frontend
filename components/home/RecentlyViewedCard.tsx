import Image from "next/image";

interface RecentlyViewedCardProps {
  id: string;
  title: string;
  imageSrc: string;
}

const RecentlyViewedCard = ({ id, title, imageSrc }: RecentlyViewedCardProps) => {
  return (
    <div className="flex-shrink-0 flex flex-col w-[250px] h-[256px] bg-[#F8F8F8] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] rounded-[20px] relative">
      <div className="flex items-center justify-center w-[140px] h-[140px] absolute left-[55px] top-[25px]">
        <Image
          src={imageSrc}
          alt={title}
          width={140}
          height={140}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <p className="absolute w-[199px] h-[36px] left-[25px] top-[189px] font-sans text-[18px] leading-[120%] text-[#333333] line-clamp-2">
        {title}
      </p>
    </div>
  );
};

export default RecentlyViewedCard;
