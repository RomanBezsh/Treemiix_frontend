import Image from "next/image";

type DealCardProps = {
  title: string;
  price: number;
  oldPrice?: number;
  image?: string;
  rating?: number;
};

export default function DealCard({
  title,
  price,
  oldPrice,
  image = "/account/lists/product-placeholder.png",
  rating = 4,
}: DealCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-[12px] bg-[#F8F8F8] p-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Deal badge */}
      <span className="absolute left-[10px] top-[10px] flex min-h-[39px] items-center justify-center rounded-[10px] bg-[#DE3A3A] px-[14px] text-[18px] font-normal leading-[130%] text-white">
        Deal
      </span>

     {/* Favorite */}
<button
  type="button"
  aria-label="Add to favorites"
  className="
    absolute right-[8px] top-[9px]
    flex h-[40px] w-[40px]
    items-center justify-center
    rounded-[10px]
    bg-[#F8F8F8]/10
    shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
  "
>
  <Image
    src="/deals/deal_favorite_icon.svg"
    alt=""
    width={24}
    height={22}
    aria-hidden="true"
    className="h-[22px] w-[24px] object-contain opacity-30"
  />
</button>
      {/* Product image */}
      <div className="mt-[48px] flex h-[150px] items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={140}
          height={140}
          className="max-h-[140px] max-w-[140px] object-contain"
        />
      </div>

      {/* Product title */}
      <h3 className="mt-[10px] line-clamp-2 text-[18px] font-normal leading-[120%] text-[#333333]">
        {title}
      </h3>

      {/* Rating */}
      <div className="mt-[8px] flex items-center gap-[2px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-[14px] leading-none text-[#FF9D55]"
          >
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Price */}
      <div className="mt-[8px] flex items-baseline gap-[5px]">
        <span className="text-[14px] font-light text-[#777777]">
          $
        </span>

        <span className="text-[24px] font-normal leading-[120%] text-[#333333]">
          {price}
        </span>

        {oldPrice !== undefined && (
          <span className="text-[12px] text-[#B3B3B3] line-through">
            ${oldPrice}
          </span>
        )}
      </div>

      {/* Shipping */}
      <p className="mt-[4px] text-[10px] font-normal text-[#999999]">
        Ship to USA
      </p>
    </article>
  );
}