import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecentlyViewedCardProps {
  id: string;
  title: string;
  imageSrc: string;
  rating?: number;
  onClick?: () => void;
}

const RecentlyViewedCard = ({
  id,
  title,
  imageSrc,
  rating = 0,
  onClick,
}: RecentlyViewedCardProps) => {
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
      className="tm-lift relative flex w-full min-w-0 flex-shrink-0 cursor-pointer flex-col rounded-[16px] bg-[#F8F8F8] px-3 pb-3 pt-4 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] sm:rounded-[20px] 2xl:h-[256px] 2xl:w-[250px] 2xl:px-[25px] 2xl:pb-0 2xl:pt-[25px]"
      onClick={handleClick}
    >
      <div className="mx-auto flex aspect-square w-full max-w-[140px] items-center justify-center 2xl:h-[140px] 2xl:w-[140px]">
        <Image
          src={imageSrc}
          alt={title}
          width={140}
          height={140}
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
      <p className="mt-3 line-clamp-2 min-h-[2.4em] font-sans text-[14px] leading-[120%] text-[#333333] sm:text-[16px] 2xl:mt-6 2xl:h-[36px] 2xl:text-[18px]">
        {title}
      </p>
      <div className="mt-1 flex gap-[2px] 2xl:mt-[4px]">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            key={index}
            src={index < rating ? "/common/star_filled.svg" : "/common/star_empty.svg"}
            alt={index < rating ? "Filled star" : "Empty star"}
            className="w-[14px] h-[14px]"
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedCard;