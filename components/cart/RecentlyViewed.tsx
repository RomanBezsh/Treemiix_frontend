import Image from "next/image";

const recentlyViewedItems = [
  {
    id: 1,
    title: "Fisher-Price Sit-Me-Up Floor",
    price: 230,
  },
  {
    id: 2,
    title: "Bright Starts Lots of Links",
    price: 5,
  },
  {
    id: 3,
    title: "Graco DuetSoothe Swing",
    price: 350,
  },
  {
    id: 4,
    title: "Portable crib",
    price: 350,
  },
];

export default function RecentlyViewed() {
  return (
    <section className="w-full rounded-[16px] bg-[#F8F8F8] px-[20px] py-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
      {/* Section title */}
      <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
        Your recently viewed items
      </h2>

      {/* Products */}
      <div className="mt-[18px] flex flex-col gap-[22px]">
        {recentlyViewedItems.map((item) => (
          <article
            key={item.id}
            className="flex min-w-0 items-center gap-[12px]"
          >
            {/* Product image */}
            <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
              <Image
                src="/account/lists/product-placeholder.png"
                alt={item.title}
                width={72}
                height={72}
                className="max-h-[72px] max-w-[72px] object-contain"
              />
            </div>

            {/* Product information */}
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-normal leading-[120%] text-[#333333]">
                {item.title}
              </h3>

              {/* Rating */}
              <div className="mt-[5px] flex items-center gap-[2px] text-[16px] leading-none text-[#FF9D55]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>

              {/* Price */}
              <p className="mt-[5px] flex items-baseline gap-[4px] text-[#555555]">
                <span className="text-[16px] font-light leading-[120%]">
                  $
                </span>

                <span className="text-[24px] font-normal leading-[120%]">
                  {item.price}
                </span>
              </p>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              className="flex min-h-[41px] shrink-0 items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[20px] py-[12px] text-[14px] font-medium leading-[120%] text-white"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}