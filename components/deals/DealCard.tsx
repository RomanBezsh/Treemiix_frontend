import Image from "next/image";
import Link from "next/link";

type DealCardProps = {
  href: string;
  title: string;
  price: number;
  oldPrice?: number;
  discountPct: number;
  image?: string;
  rating?: number;
  /** Why this deal is recommended, e.g. "Because you viewed Electronics" */
  reason?: string | null;
};

const PLACEHOLDER = "/account/lists/product-placeholder.png";

export default function DealCard({
  href,
  title,
  price,
  oldPrice,
  discountPct,
  image,
  rating = 0,
  reason,
}: DealCardProps) {
  const stars = Math.round(rating);

  return (
    <article
      className="
        tm-scale-in tm-lift
        group relative flex h-full flex-col
        rounded-[12px] bg-[#F8F8F8] p-[12px]
        shadow-[0_1px_3px_rgba(0,0,0,0.08)]
      "
    >
      {/* Whole card is a link; the favorite button sits above it */}
      <Link href={href} aria-label={title} className="absolute inset-0 z-0 rounded-[12px]" />

      {/* Deal badge */}
      <span
        className="
          pointer-events-none absolute left-[10px] top-[10px] z-10
          flex min-h-[39px] items-center justify-center
          rounded-[10px] bg-[#DE3A3A]
          px-[14px]
          text-[18px] font-normal leading-[130%] text-white
          transition-transform duration-200 ease-out
          group-hover:scale-[1.04]
        "
      >
        −{discountPct}%
      </span>

      {/* Favorite */}
      <button
        type="button"
        aria-label="Add to favorites"
        className="
          tm-press
          absolute right-[8px] top-[9px] z-10
          flex h-[40px] w-[40px]
          items-center justify-center
          rounded-[10px]
          bg-[#F8F8F8]/10
          shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
          hover:bg-white/60
        "
      >
        <Image
          src="/deals/deal_favorite_icon.svg"
          alt=""
          width={24}
          height={22}
          aria-hidden="true"
          className="h-[22px] w-[24px] object-contain opacity-30 transition-opacity duration-200 hover:opacity-60"
        />
      </button>

      {/* Product image */}
      <div className="pointer-events-none relative mt-[48px] flex h-[150px] items-center justify-center">
        <Image
          src={image || PLACEHOLDER}
          alt={title}
          width={140}
          height={140}
          className="
            max-h-[140px] max-w-[140px] object-contain
            transition-transform duration-300 ease-out
            group-hover:scale-[1.06]
          "
        />
      </div>

      {/* Product title */}
      <h3
        className="
          pointer-events-none mt-[10px] line-clamp-2
          text-[18px] font-normal leading-[120%] text-[#333333]
          transition-colors duration-200
          group-hover:text-[#496B94]
        "
      >
        {title}
      </h3>

      {/* Rating */}
      <div className="pointer-events-none mt-[8px] flex items-center gap-[2px]" aria-label={`Rating ${stars} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} aria-hidden="true" className="text-[14px] leading-none text-[#FF9D55]">
            {star <= stars ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Price */}
      <div className="pointer-events-none mt-[8px] flex items-baseline gap-[5px]">
        <span className="text-[14px] font-light text-[#777777]">$</span>
        <span className="text-[24px] font-normal leading-[120%] text-[#333333]">{price.toFixed(2)}</span>
        {oldPrice !== undefined && (
          <span className="text-[12px] text-[#B3B3B3] line-through">${oldPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Why recommended */}
      {reason && (
        <p className="pointer-events-none mt-[6px] text-[12px] font-medium leading-[130%] text-[#7E8CBD]">
          {reason}
        </p>
      )}

      {/* Shipping */}
      <p className="pointer-events-none mt-auto pt-[4px] text-[10px] font-normal text-[#999999]">
        Ship to Ukraine
      </p>
    </article>
  );
}
