import Image from "next/image";
import Link from "next/link";
import HeartButton from "@/components/common/HeartButton";

type DealCardProps = {
  /** Product id: the card links to the product and gets a wishlist button */
  id?: string;
  title: string;
  price: number;
  oldPrice?: number;
  image?: string;
  rating?: number;
};

export default function DealCard({
  id,
  title,
  price,
  oldPrice,
  image = "/account/lists/product-placeholder.png",
  rating = 4,
}: DealCardProps) {
  return (
    <article
      className="
        deals-scale-in
        group relative flex h-full flex-col
        rounded-[12px] bg-[#F8F8F8] p-[12px]
        shadow-[0_1px_3px_rgba(0,0,0,0.08)]
        transition-all duration-300 ease-out
        hover:-translate-y-[5px]
        hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)]
      "
    >
      {/* Deal badge */}
      <span
        className="
          absolute left-[10px] top-[10px]
          flex min-h-[39px] items-center justify-center
          rounded-[10px] bg-[#DE3A3A]
          px-[14px]
          text-[18px] font-normal leading-[130%] text-white
          transition-transform duration-200 ease-out
          group-hover:scale-[1.04]
        "
      >
        Deal
      </span>

      {/* Favorite: above the stretched product link */}
      {id && (
        <HeartButton productId={id} variant="deal" className="absolute right-[8px] top-[9px] z-10" />
      )}

      {/* Product image */}
      <div className="mt-[48px] flex h-[150px] items-center justify-center">
        <Image
          src={image}
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
          mt-[10px] line-clamp-2
          text-[18px] font-normal leading-[120%] text-[#333333]
          transition-colors duration-200
          group-hover:text-[#496B94]
        "
      >
        {id ? (
          // The link covers the whole card (after:absolute), the heart stays clickable above it
          <Link href={`/product/${id}`} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>

      {/* Rating */}
      <div className="mt-[8px] flex items-center gap-[2px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="
              text-[14px] leading-none text-[#FF9D55]
              transition-transform duration-200
              group-hover:scale-[1.04]
            "
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