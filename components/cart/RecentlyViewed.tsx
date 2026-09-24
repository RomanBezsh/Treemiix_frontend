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
    <div className="cart-fade-up cart-delay-2">
      <section
        className="
          w-full rounded-[16px] bg-[#F8F8F8]
          px-[20px] py-[18px]
          shadow-[0_2px_5px_rgba(0,0,0,0.08)]
          transition-shadow duration-300
          hover:shadow-[0_7px_18px_rgba(0,0,0,0.10)]
        "
      >
        {/* Section title */}
        <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
          Your recently viewed items
        </h2>

        {/* Products */}
        <div className="mt-[18px] flex flex-col gap-[22px]">
          {recentlyViewedItems.map((item) => (
            <article
              key={item.id}
              className="
                group flex min-w-0 items-center gap-[12px]
                rounded-[12px] px-[4px] py-[3px]
                transition-all duration-200 ease-out
                hover:translate-x-[3px]
                hover:bg-white/50
              "
            >
              {/* Product image */}
              <div
                className="
                  flex h-[82px] w-[82px] shrink-0
                  items-center justify-center
                  rounded-[10px] bg-white
                  shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                  transition-all duration-300 ease-out
                  group-hover:-translate-y-[2px]
                  group-hover:shadow-[0_6px_12px_rgba(0,0,0,0.14)]
                "
              >
                <Image
                  src="/account/lists/product-placeholder.png"
                  alt={item.title}
                  width={72}
                  height={72}
                  className="
                    max-h-[72px] max-w-[72px] object-contain
                    transition-transform duration-300 ease-out
                    group-hover:scale-[1.06]
                  "
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
                className="
                  flex min-h-[41px] shrink-0 items-center justify-center
                  rounded-[20px] bg-[#7C9BC0]
                  px-[20px] py-[12px]
                  text-[14px] font-medium leading-[120%] text-white
                  transition-all duration-200 ease-out
                  hover:-translate-y-[2px]
                  hover:bg-[#6F90B7]
                  hover:shadow-[0_6px_14px_rgba(124,155,192,0.28)]
                  active:translate-y-0
                  active:scale-[0.96]
                "
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}