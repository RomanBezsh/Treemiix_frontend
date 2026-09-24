import Image from "next/image";

const recommended = [
  { id: 1, title: "Tablets" },
  { id: 2, title: "Tablets" },
  { id: 3, title: "Tablets" },
  { id: 4, title: "Tablets" },
  { id: 5, title: "Tablets" },
  { id: 6, title: "Tablets" },
];

export default function RecommendedDeals() {
  return (
    <section className="deals-fade-up deals-delay-2 w-full">
      {/* Categories title */}
      <h2 className="text-[18px] font-medium leading-[130%] text-[#333333]">
        Categories
      </h2>

      {/* Categories grid */}
      <div className="mt-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:grid-cols-6">
        {recommended.map((item, index) => (
          <article
            key={item.id}
            className="
              deals-scale-in
              group rounded-[12px] bg-[#F8F8F8] p-[10px]
              shadow-[0_1px_3px_rgba(0,0,0,0.08)]
              transition-all duration-300 ease-out
              hover:-translate-y-[5px]
              hover:shadow-[0_8px_18px_rgba(0,0,0,0.11)]
            "
            style={{
              animationDelay: `${100 + index * 80}ms`,
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-[14.41px] font-semibold leading-[120%] text-[#333333] transition-colors duration-200 group-hover:text-[#496B94]">
                {item.title}
              </span>

              <button
                type="button"
                className="
                  shrink-0 text-[7.81px] font-normal leading-[100%] text-[#777777]
                  transition-all duration-200 ease-out
                  hover:translate-x-[2px]
                  hover:text-[#496B94]
                "
              >
                More →
              </button>
            </div>

            {/* Category image */}
            <div className="mt-[10px] flex h-[120px] items-center justify-center">
              <Image
                src="/account/lists/product-placeholder.png"
                alt={item.title}
                width={110}
                height={110}
                className="
                  max-h-[110px] max-w-[110px] object-contain
                  transition-transform duration-300 ease-out
                  group-hover:scale-[1.07]
                "
              />
            </div>
          </article>
        ))}
      </div>

      {/* More categories */}
      <div className="mt-[10px] flex justify-end">
        <button
          type="button"
          className="
            text-[7.81px] font-normal leading-[100%] text-[#555555]
            transition-all duration-200 ease-out
            hover:translate-x-[3px]
            hover:text-[#496B94]
          "
        >
          More →
        </button>
      </div>
    </section>
  );
}